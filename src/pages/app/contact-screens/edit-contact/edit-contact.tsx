// @app
import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Text,
    FlatList,
} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { Dispatch } from 'redux';
import { useToast } from 'react-native-toast-notifications';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CountryPicker,
{ Country } from 'react-native-country-picker-modal';
import {
    useDispatch,
    useSelector
} from 'react-redux';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import { Img } from '../../../../core/components/image-component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './edit-contact.style';
import { centralStyle } from '../../../../styles/constant.style';
import { SOCIALINPUTSDATA } from '../../biz-card-screens/edit-biz-card/data';
import { AddInputSheet } from '../../biz-card-screens/edit-biz-card/edit-biz-card-component';
import {
    COUNTRY_LIST,
} from '../../../../utilities/contact-data';
import {
    CountryCodeModal,
    HandleInputChangeType
} from '../../../../core/modals/contact.modal';
import {
    CONTACTTYPECOLORDATA,
    CONTACTTYPEDATA
} from './data';
import {
    handleAttachments,
    handleOnSelect,
    openSheet
} from './call-back';
import {
    LeftIcon,
    PicImgModal,
    RightIcon,
    SelectedAttachmentUI,
    renderComponentOfEditContactEmails
} from './edit-contact-component';
import { ContactModal, SepecialityModal, SpecialityTags } from '../new-contact/new-contact-component';

const EditContact: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [openPicker, setOpenPicker] = useState(false);
    const [sepecialityModal, setSepecialityModal] = useState<boolean>(false);
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<any>('PK');
    const [showMore, setShowMore] = useState<boolean>(false);
    const [anim, setanim] = useState<string>('fadeInUpBig');
    const [contactModal, setcontactModal] = useState<boolean>(false);
    const [selectedCompany, setSelectedCompany] = useState<any>([])
    const [attechments, setAttechments] = useState<any>({ type: "application/pdf" })
    const [newField, setNewField] = useState<string>('')

    const [addSocialAccountInput, setaddSocialAccountInput] = useState(false)
    const [contactInfoInputs, setcontactInfoInputs] = useState<any>([])
    const [isActive, setIsActive] = useState(false);
    const [about, setAbout] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ')
    const [socialInputs, setsocialInputs] = useState(SOCIALINPUTSDATA)


    // My work in States 
    const [contactDetails, setContactDetails] = useState<any>({});
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const toast = useToast();
    const dispatch: Dispatch<any> = useDispatch();

    const sheetRef = useRef<any>(null)
    const Loader = useSelector((state: any) => state.root.loader);

    const handleInputChange: HandleInputChangeType = useCallback((inputName, text, nestedProperty, index) => {
        setContactDetails((prevValues: any) => {
            if (nestedProperty && typeof (index) === 'number') {
                let contactDetailsClone = { ...prevValues }; // Corrected: Use the cloned previous values
                contactDetailsClone[inputName][index][nestedProperty] = text;
                return contactDetailsClone; // Corrected: Return the updated values
            } else {
                // If no nested property is specified, update the top-level property
                return {
                    ...prevValues,
                    [inputName]: text,
                };
            }
        });
    }, [contactDetails])

    useEffect(() => {
        const { companyName, jobTitle, firstName, lastName, contactTypeColor, profilePicture, contactTypeId, contactSpecialities, contactEmails, contactAddresses, contactPhones, contactOthers, id } = route.params;
        setContactDetails({
            id,
            firstName,
            lastName,
            contactTypeColor,
            contactTypeId,
            companyName,
            jobTitle,
            profilePicture,
            contactTags: [{
                tagId: '',
                tagName: '',
            }],
            contactSpecialities: contactSpecialities.length > 0 ? contactSpecialities : [{
                specialtyId: 0,
                specialtyName: '',
            }],
            contactEmails: contactEmails && contactEmails?.length > 0 ? contactEmails : [{
                email: '',
                label: '',
                visible: true,
            }],
            contactAddresses: contactAddresses && contactAddresses.length > 0 ? contactAddresses : [{
                city: '',
                poBox: '',
                label: '',
                zipCode: '',
                stateText: '',
                streetAddress: '',
                streetAddressLine2: '',
                latitude: 0,
                longitude: 0,
                visible: true,
                stateId: '',
                countryId: 224,
                provinceId: '',
                provinceText: '',
                hasState: true,
                searchGenerated: true,
                countryText: "United States"
            }],
            contactPhones: contactPhones && contactPhones.length > 0 ? contactPhones : [{
                phone: '',
                label: '',
                visible: true,
                countryId: 224,
                countryCode: "us",
                countryPhoneCode: '+1'
            }],
            contactOthers: contactOthers && contactOthers?.length > 0 && contactOthers[0]?.contactOtherTypeId === 2 ? contactOthers : [{
                label: '',
                value: '',
                contactId: 0,
                contactOtherTypeId: 2,
            }],
        });
    }, [route.params]);

    const getCountrySet = (id: number) => {
        const index = COUNTRY_LIST.findIndex(countries => countries.id === id);
        if (index !== -1) {
            return index
        } else {
            console.log(`'${2}' not found in the array.`);
        }
    }
    // PROB IN IT
    const HandleCountrySelect: (country: Country) => Promise<void> = async (country) => {
        handleOnSelect(country, setIsCountryPickerVisible, setCountryCode)
        const getCuntryID: CountryCodeModal[] = await COUNTRY_LIST.filter((code) => country.cca2.toLowerCase() == code.code)
        const contactPhoneData = [{
            phone: contactDetails.contactPhones[0].phone,
            label: '',
            visible: true,
            countryId: getCuntryID && getCuntryID[0].id,
            countryCode: getCuntryID && getCuntryID[0].code,
            countryPhoneCode: getCuntryID && getCuntryID[0].phoneCode
        }];
        handleInputChange('contactPhones', contactPhoneData)
    };
    const removeSpeciality = (index: number) => {
        const specialitiesClone = JSON.parse(JSON.stringify(contactDetails.contactSpecialities))
        specialitiesClone.splice(index, 1)
        handleInputChange('contactSpecialities', specialitiesClone)
    }
    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={[centralStyle.flex1,]}>
                        <AppHeader
                            iconL1={LeftIcon(navigation)}
                            iconR1={RightIcon(navigation,
                                dispatch,
                                contactDetails,
                                isToastVisible,
                                setIsToastVisible,
                                toast,
                                Loader,
                                route.params.contactTypeId)}
                            type='Poppin-18'
                            weight='600'
                            title={t(`Edit`) + ' ' + t(`Contacts`)} />
                        <View
                            style={centralStyle.flex1}>
                            {contactDetails?.profilePicture?.length > 0 ?
                                <View
                                    style={[centralStyle.circle(RFPercentage(16)), styles.imgContainer]}>
                                    <Img
                                        customStyle={styles.profileImage}
                                        source={{ uri: contactDetails.profilePicture }}
                                    />
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => setOpenPicker(true)}
                                        style={[centralStyle.circle(RFPercentage(4)), styles.editIconAdd]}>
                                        <Feather
                                            name={'edit-2'}
                                            color={Colors.primary}
                                            size={RFPercentage(2)} />
                                    </TouchableOpacity>
                                </View> :
                                <TouchableOpacity
                                    onPress={() => setOpenPicker(true)}
                                    activeOpacity={.8}
                                    style={[centralStyle.circle(RFPercentage(16)), styles.imgContainer]}>
                                    <SimpleLineIcons name={'picture'} size={RFPercentage(4)} />
                                </TouchableOpacity>
                            }
                            {openPicker && <PicImgModal disableModal={() => setOpenPicker(false)} setContactDetails={setContactDetails} inputLabel={'profilePicture'} />}

                            <View style={styles.mx2}>
                                <View style={centralStyle.my1}>
                                    <OutlinedDropDown
                                        dropDownStyle={styles.dropdownstyle}
                                        title={t('Contacttype')}
                                        color={Colors.black}
                                        iconsSize={RFPercentage(2)}
                                        isPrimaryBorderOnFocus={true}
                                        onselect={(value: string, index: number) => {
                                            handleInputChange('contactTypeId', (index + 1))
                                            handleInputChange('contactTypeColor', CONTACTTYPECOLORDATA[index])
                                        }}
                                        DATA={CONTACTTYPEDATA}
                                        defaultValueByIndex={(contactDetails.contactTypeId - 1)}
                                        drop_down_button_style={styles.dropDownStyle(contactDetails.contactTypeId)}
                                    />
                                </View>

                                {contactDetails.contactTypeId == 2 || contactDetails.contactTypeId == 3 ?
                                    contactDetails.contactSpecialities[0]?.specialtyName ?
                                        <View style={{
                                            paddingVertical: 10,
                                            justifyContent: "flex-end"
                                        }}>
                                            <Text style={styles.inputtitle()} > Speciality</Text>
                                            <TouchableOpacity
                                                activeOpacity={.9}
                                                onPress={() => openSheet(setanim, setSepecialityModal)}
                                                style={styles.specialityTextInputContainer}>
                                                <FlatList
                                                    data={contactDetails.contactSpecialities}
                                                    showsVerticalScrollIndicator={false}
                                                    contentContainerStyle={styles.flatListContainer}
                                                    renderItem={({ item, index }) => <SpecialityTags
                                                        key={index.toString()}
                                                        item={item}
                                                        index={index}
                                                        removeSpeciality={removeSpeciality}
                                                    />}
                                                />

                                            </TouchableOpacity>
                                        </View>
                                        : <TouchableOpacity
                                        style={{height: 55.25}}
                                        activeOpacity={.8}
                                        onPress={() => openSheet(setanim, setSepecialityModal)}
                                    >
                                        <View style={styles.specialityButton}>
                                            <Title  
                                            type='Poppin-14'
                                            title={t('Speciality')}
                                            color={Colors.lightGray}
                                            />
                                        </View>
                                    </TouchableOpacity>  : <></>}

                                {<OutlinedTextInput
                                    val={contactDetails.firstName}
                                    onChange={(text) => handleInputChange('firstName', text)}
                                    title={t('firstname')}
                                    placeHolder={t('firstname')} />}
                                <OutlinedTextInput
                                    val={contactDetails.lastName}
                                    onChange={(text) => handleInputChange('lastName', text)}
                                    title={t('lastname')}
                                    placeHolder={t('lastname')} />
                                <OutlinedTextInput
                                    val={contactDetails.companyName}
                                    onChange={(text) => handleInputChange('companyName', text)}
                                    title={t('Companyname')}
                                    placeHolder={t('Companyname')} />

                                <OutlinedTextInput
                                    val={contactDetails.jobTitle}
                                    onChange={(text) => handleInputChange('jobTitle', text)}
                                    title={t('jobTitle')} placeHolder={t('jobTitle')} />

                                <OutlinedTextInput
                                    val={contactDetails.length > 0 && contactDetails.contactOthers[0].value}
                                    onChange={(text) => {
                                        handleInputChange('contactOthers', text, 'value', 0);
                                    }}
                                    title={t('Websiteurl')} placeHolder={t('Websiteurl')} />
                                <View style={{ flex: 9, }}>
                                    {contactDetails?.contactEmails?.map((item: any, index: number) => renderComponentOfEditContactEmails({ item, index, contactDetails, handleInputChange, setContactDetails }))}
                                </View>

                                <View style={styles.inputWrapper2}>
                                    <TouchableOpacity
                                        onPress={() => setIsCountryPickerVisible(true)}
                                        style={styles.flagContainer}
                                    >
                                        <View style={styles.flagWrapper}>
                                            <CountryPicker
                                                countryCode={countryCode}
                                                withCallingCode
                                                withFlagButton={true}
                                                onClose={() => setIsCountryPickerVisible(false)}
                                                onSelect={HandleCountrySelect}
                                                visible={isCountryPickerVisible}
                                            />
                                        </View>
                                        <AntDesign
                                            name={`down`}
                                            style={styles.downIcon}
                                            size={RFPercentage(2)}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.phoneNumberInput}>
                                        <OutlinedTextInput
                                            val={contactDetails.length > 0 && contactDetails.contactPhones[0].phone}
                                            onChange={(text) => handleInputChange('contactPhones', text, 'phone', 0)}
                                            title={t('MobilePhone')} placeHolder={t('MobilePhone')} />
                                    </View>
                                </View>

                                {!showMore && <TouchableOpacity onPress={() => { setShowMore(true) }} activeOpacity={.9}>
                                    <Title
                                        color={Colors.primary}
                                        type='Poppin-14'
                                        weight='600'
                                        title={t('SHOWMORE')} />

                                </TouchableOpacity>}

                                {showMore &&
                                    <>
                                        <OutlinedDropDown
                                            dropDownStyle={styles.dropdownstyle}
                                            title={t('country')}
                                            color={Colors.lightGray}
                                            isPrimaryBorderOnFocus={true}
                                            iconsSize={RFPercentage(2)}
                                            onselect={(value: string) => {
                                                const getCuntryID: CountryCodeModal[] = COUNTRY_LIST.filter(countries => value == countries.name);
                                                handleInputChange('contactAddresses', value, 'countryText', 0);
                                                handleInputChange('contactAddresses', getCuntryID[0].id, 'countryId', 0);
                                            }}
                                            DATA={COUNTRY_LIST.map(country => country.name)}
                                            drop_down_button_style={styles.dropDownStyle()}
                                            defaultValueByIndex={contactDetails.contactAddresses.length > 0 && getCountrySet(contactDetails.contactAddresses.countryId)}
                                            search={true}
                                        />

                                        <OutlinedTextInput
                                            val={contactDetails.contactAddresses[0].streetAddress}
                                            onChange={(text) => handleInputChange('contactAddresses', text, 'streetAddress', 0)}
                                            title={t('StreetAddress')} placeHolder={t('StreetAddress')} />

                                        <OutlinedTextInput
                                            val={contactDetails.contactAddresses[0].streetAddressLine2}
                                            onChange={(text) => handleInputChange('contactAddresses', text, 'streetAddressLine2', 0)}
                                            title={t('StreetAddressLine2')} placeHolder={t('StreetAddressLine2')} />
                                        <OutlinedTextInput
                                            val={contactDetails.contactAddresses[0].city}
                                            onChange={(text) => handleInputChange('contactAddresses', text, 'city', 0)}
                                            title={t('City')} placeHolder={t('City')} />

                                        <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                                            <View style={styles.leftSide}>
                                                <OutlinedTextInput
                                                    val={contactDetails.contactAddresses[0].stateText}
                                                    onChange={(text) => handleInputChange('contactAddresses', text, 'stateText', 0)}
                                                    title={t('State')} placeHolder={t('State')} />
                                            </View>
                                            <View style={styles.rightSide}>
                                                <OutlinedTextInput
                                                    val={contactDetails.contactAddresses[0].zipCode}
                                                    onChange={(text) => handleInputChange('contactAddresses', text, 'zipCode', 0)}
                                                    title={t('ZipCode')} placeHolder={t('ZipCode')} />
                                            </View>
                                        </View>

                                        <OutlinedTextInput
                                            val={contactDetails.contactAddresses[0].poBox}
                                            onChange={(text) => handleInputChange('contactAddresses', text, 'poBox', 0)}
                                            title={t('PObox')} placeHolder={t('PObox')} />
                                        <OutlinedTextInput
                                            val={contactDetails.contactAddresses[0].label}
                                            onChange={(text) => handleInputChange('contactAddresses', text, 'label', 0)}
                                            title={t('Label')} placeHolder={t('Label')} />

                                        <View style={[centralStyle.my1]}>
                                            <Title
                                                color={Colors.black}
                                                type='Poppin-18'
                                                weight='600'
                                                title={t('Linktocompany')} />
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => openSheet(setanim, setcontactModal)}
                                            style={[centralStyle.row, centralStyle.my1, centralStyle.alignitemCenter]}>
                                            <View style={[centralStyle.circle(RFPercentage(4)), styles.selectCompany,]}>
                                                {selectedCompany?.length == 0 ?
                                                    <AntDesign name={`plus`} color={Colors.white} size={RFPercentage(2.5)} /> :
                                                    <Image style={styles.companyImg} source={require('../../../../assets/app-images/userImg.png')}></Image>
                                                }
                                            </View>
                                            <Title
                                                color={Colors.fontColor}
                                                type='Poppin-16'
                                                weight='400'
                                                title={selectedCompany?.length == 0 ? t('SelectAcompany') : selectedCompany?.value} />

                                        </TouchableOpacity>
                                        <View
                                            style={[centralStyle.my1]}>
                                            <Title
                                                color={Colors.black}
                                                type='Poppin-18'
                                                weight='600'
                                                title={t('Attachment')} />
                                        </View>

                                        {Object.keys(attechments).length > 0 ?
                                            <SelectedAttachmentUI
                                                attechments={attechments}
                                                setAttechments={setAttechments}
                                            /> :
                                            <TouchableOpacity
                                                onPress={() => handleAttachments(setAttechments)}
                                                style={[styles.AttechmentIcon, centralStyle.XAndYCenter, centralStyle.mb2]}>
                                                <AntDesign name={`plus`} color={Colors.fontColor} size={RFPercentage(2.5)} />
                                            </TouchableOpacity>
                                        }
                                    </>
                                }

                                {showMore &&
                                    <TouchableOpacity
                                        onPress={() => { setShowMore(false) }}
                                        activeOpacity={.9}>
                                        <Title
                                            color={Colors.primary}
                                            type='Poppin-14'
                                            weight='600'
                                            title={t('SHOWLESS')} />
                                    </TouchableOpacity>
                                }

                            </View>

                            <RBSheet
                                ref={sheetRef}
                                height={RFPercentage(35)}
                                closeOnPressMask={true}
                                closeOnDragDown={true}
                                openDuration={250}
                                animationType={`slide`}
                                customStyles={{ container: { borderRadius: RFPercentage(2) } }}
                            >
                                <AddInputSheet
                                    contactInfoInputs={!addSocialAccountInput ? contactInfoInputs : socialInputs}
                                    setcontactInfoInputs={!addSocialAccountInput ? setcontactInfoInputs : setsocialInputs}
                                    sheetRef={sheetRef}
                                    placeHolder={!addSocialAccountInput ? `Enter custom field label` : `Select social acount`}
                                    newField={newField}
                                    addSocialAccountInput={addSocialAccountInput}
                                    title={!addSocialAccountInput ? t('AddCustomField') : `Add Social Account`}
                                    btnText={!addSocialAccountInput ? `Save Field` : `Add Account`}
                                    setNewField={setNewField}
                                />
                            </RBSheet>
                        </View>

                    </View>
                </KeyboardAwareScrollView>
                {contactModal &&
                    <ContactModal
                        getCompany={(val: any) => { setSelectedCompany(val) }}
                        anim={anim}
                        setanim={setanim}
                        contact
                        setcontactModal={setcontactModal} />}

                {sepecialityModal &&
                    <SepecialityModal
                        getSpecialityData={(specialData: any) => { handleInputChange('contactSpecialities', contactDetails.contactSpecialities.length > 0 ? [...specialData, ...contactDetails.contactSpecialities] : specialData) }}
                        anim={anim}
                        selectedData={contactDetails.contactSpecialities}
                        setanim={setanim}
                        contact
                        setcontactModal={setSepecialityModal}
                        industryId={contactDetails.contactTypeId}
                    />}
            </SafeAreaView >
        </>
    );
};

export default EditContact;
