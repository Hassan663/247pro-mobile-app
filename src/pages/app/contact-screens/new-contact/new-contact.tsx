// @app
import React, {
    useCallback,
    useEffect,
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

import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { t } from 'i18next';
import { Dispatch } from 'redux';
import { useToast } from 'react-native-toast-notifications';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import { OutlinedDropDownSpeciality } from '../../../../core/components/outlined-dropdown-speciality.component';
import { styles } from './new-contact.style';
import { centralStyle } from '../../../../styles/constant.style';
import { Img } from '../../../../core/components/image-component';
import { Title } from '../../../../core/components/screen-title.component';
import {
    COUNTRY_LIST,
    SPECIALITIES_LIST
} from '../../../../utilities/contact-data';
import {
    CountryCodeModal,
    HandleInputChangeType,
    IContactCreateModel
} from '../../../../core/modals/contact.modal';
import {
    CONTACTTYPEDATA,
    CONTACTTYPECOLORDATA,
} from './data';
import {
    handleAttachments,
    handleOnSelect,
    openSheet,
} from './call-back';
import {
    ContactModal,
    LeftIcon,
    PicImgModal,
    RightIcon,
    SelectedAttachmentUI,
    SepecialityModal,
    renderComponentOfContactEmails,
} from './new-contact-component';
import { platform } from '../../../../utilities';

const NewContact: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [contactModal, setcontactModal] = useState<boolean>(false);
    const [sepecialityModal, setSepecialityModal] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);
    const [openPicker, setOpenPicker] = useState(false);
    const [countryCode, setCountryCode] = useState<any>('US');
    const [anim, setanim] = useState<string>('fadeInUpBig');
    const [selectedCompany, setSelectedCompany] = useState<any>([])
    const [specialityData, setSpecialityData] = useState<any>([]);
    const [attechments, setAttechments] = useState<any>([])
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const toast = useToast();

    const Loader = useSelector((state: any) => state.root.loader);
    const dispatch: Dispatch<any> = useDispatch();

    const [inputValues, setInputValues] = useState<IContactCreateModel>({
        firstName: 'momo1',
        lastName: '1',
        contactTypeColor: '#FBC02D',
        contactTypeId: 1,
        companyName: 'momo',
        jobTitle: 'momo',
        profilePicture: '',
        contactTags: [{
            tagId: '',
            tagName: '',
        }],
        contactSpecialities: [{
            specialtyId: 0,
            specialtyName: '',
        }],
        contactEmails: [{
            email: 'momo@gmail.com',
            label: 'Home',
            visible: true,

        }],
        contactAddresses: [{
            city: 'Karachi',
            poBox: '',
            label: 'Home',
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
        contactPhones: [{
            phone: '03178941276',
            label: '',
            visible: true,
            countryId: 224,
            countryCode: "us",
            countryPhoneCode: '+1'
        }],
        contactOthers: [{
            label: '',
            value: '',
            contactId: 0,
            contactOtherTypeId: 2,
        }],
    });

    const handleInputChange: HandleInputChangeType = useCallback((inputName, text, nestedProperty, index) => {
        setInputValues((prevValues: any) => {
            if (nestedProperty && typeof (index) === 'number') {
                let inputValuesClone = { ...prevValues }; // Corrected: Use the cloned previous values
                inputValuesClone[inputName][index][nestedProperty] = text;
                return inputValuesClone; // Corrected: Return the updated values
            } else {
                // If no nested property is specified, update the top-level property
                return {
                    ...prevValues,
                    [inputName]: text,
                };
            }
        });
    }, [inputValues])

    const HandleCountrySelect: (country: Country) => Promise<void> = async (country) => {
        handleOnSelect(country, setIsCountryPickerVisible, setCountryCode)
        const getCuntryID: CountryCodeModal[] = await COUNTRY_LIST.filter((code) => country.cca2.toLowerCase() == code.code)
        const contactPhoneData = [{
            phone: inputValues.contactPhones[0].phone,
            label: '',
            visible: true,
            countryId: getCuntryID[0].id,
            countryCode: getCuntryID[0].code,
            countryPhoneCode: getCuntryID[0].phoneCode
        }];
        handleInputChange('contactPhones', contactPhoneData)
    }
    console.log(inputValues, 'inputValues');
    useEffect(() => {
        const replaceValueWithKey = (SPECIALITIES_LIST: any[]) => {
            return SPECIALITIES_LIST.map(({ key, name, ...rest }, index) => ({ key: index, value: name, ...rest }));
        }
        setSpecialityData(replaceValueWithKey(SPECIALITIES_LIST))
    }, [])

    const addSpeciality = (specialities: any) => {
        const getIDOfSpecialities = SPECIALITIES_LIST
            .filter(obj => Object.values(obj).some(value => specialities.includes(value)))
            .map(({ id, name }) => ({ specialtyId: id, specialtyName: name }));
        handleInputChange('contactSpecialities', getIDOfSpecialities)
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={centralStyle.flex1}>
                        <AppHeader
                            iconL1={LeftIcon(navigation)}
                            iconR1={RightIcon(dispatch, inputValues, isToastVisible, setIsToastVisible, toast, Loader, navigation)}
                            type='Poppin-18'
                            weight='600'
                            title={t(`NewContact`)} />

                        {inputValues?.profilePicture?.length > 0 ?
                            <View
                                style={[centralStyle.circle(RFPercentage(16)), styles.imgContainer]}>
                                <Img
                                    customStyle={styles.profileImage}
                                    source={{ uri: inputValues.profilePicture }}
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

                        {openPicker && <PicImgModal disableModal={() => setOpenPicker(false)}
                            setInputValues={setInputValues} inputLabel={'profilePicture'}
                        />}

                        <View style={styles.mx2}>
                            <View style={centralStyle.my1}>
                                <OutlinedDropDown
                                    dropDownStyle={styles.dropdownstyle}
                                    title={t('Contacttype')}
                                    color={Colors.lightGray}
                                    iconsSize={RFPercentage(2)}
                                    isPrimaryBorderOnFocus={true}
                                    onselect={(value: string, index: number) => {
                                        handleInputChange('contactTypeId', (index + 1))
                                        handleInputChange('contactTypeColor', CONTACTTYPECOLORDATA[index])
                                    }}
                                    DATA={CONTACTTYPEDATA}
                                    drop_down_button_style={styles.dropDownStyle(inputValues.contactTypeId)}
                                />
                            </View>
                            {inputValues.contactTypeId == 2 || inputValues.contactTypeId == 3 ?
                                <View style={{
                                    paddingVertical: 10,
                                    justifyContent: "flex-end",

                                }}>
                                    <Text style={styles.inputtitle()}>Speciality</Text>
                                    <View style={styles.specialityTextInputContainer}>
                                        {inputValues.contactSpecialities.length > 0 ?
                                            <FlatList
                                                data={inputValues.contactSpecialities}
                                                showsVerticalScrollIndicator={false}
                                                contentContainerStyle={styles.flatListContainer}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <View style={styles.specialitytags}>
                                                            <Title
                                                                type='Poppin-10'
                                                                title={item.specialtyName}
                                                            />
                                                        </View>
                                                    )
                                                }}
                                            />
                                            : <></>
                                        }
                                    </View>
                                </View>
                                : <></>}
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => openSheet(setanim, setSepecialityModal)}
                            >
                                <OutlinedTextInput
                                    editable={false}
                                    placeHolder={t('Speciality')} />
                            </TouchableOpacity>
                            <OutlinedTextInput
                                val={inputValues.firstName}
                                onChange={(text) => handleInputChange('firstName', text)}
                                title={t('firstname')}
                                placeHolder={t('firstname')} />
                            <OutlinedTextInput
                                val={inputValues.lastName}
                                onChange={(text) => handleInputChange('lastName', text)}
                                title={t('lastname')}
                                placeHolder={t('lastname')} />
                            <OutlinedTextInput
                                val={inputValues.companyName}
                                onChange={(text) => handleInputChange('companyName', text)}
                                title={t('Companyname')}
                                placeHolder={t('Companyname')} />

                            <OutlinedTextInput
                                val={inputValues.jobTitle}
                                onChange={(text) => handleInputChange('jobTitle', text)}
                                title={t('jobTitle')} placeHolder={t('jobTitle')} />

                            <OutlinedTextInput
                                val={inputValues.contactOthers[0].value}
                                onChange={(text) => {
                                    handleInputChange('contactOthers', text, 'value', 0);
                                }}
                                title={t('Websiteurl')} placeHolder={t('Websiteurl')} />

                            <View style={{ flex: 9, }}>
                                {inputValues?.contactEmails?.map((item, index) => renderComponentOfContactEmails({ item, index, inputValues, handleInputChange, setInputValues }))}
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
                                        val={inputValues.contactPhones[0].phone}
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
                                            const getCuntryID: CountryCodeModal[] = COUNTRY_LIST.filter((countries) => value == countries.name);
                                            handleInputChange('contactAddresses', value, 'countryText', 0);
                                            handleInputChange('contactAddresses', getCuntryID[0].id, 'countryId', 0);
                                        }}
                                        DATA={COUNTRY_LIST.map(country => country.name)}
                                        drop_down_button_style={styles.dropDownStyle()}
                                        search={true}
                                    />

                                    <OutlinedTextInput
                                        val={inputValues.contactAddresses[0].streetAddress}
                                        onChange={(text) => handleInputChange('contactAddresses', text, 'streetAddress', 0)}
                                        title={t('StreetAddress')} placeHolder={t('StreetAddress')} />

                                    <OutlinedTextInput
                                        val={inputValues.contactAddresses[0].streetAddressLine2}
                                        onChange={(text) => handleInputChange('contactAddresses', text, 'streetAddressLine2', 0)}
                                        title={t('StreetAddressLine2')} placeHolder={t('StreetAddressLine2')} />
                                    <OutlinedTextInput
                                        val={inputValues.contactAddresses[0].city}
                                        onChange={(text) => handleInputChange('contactAddresses', text, 'city', 0)}
                                        title={t('City')} placeHolder={t('City')} />

                                    <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                                        <View style={styles.leftSide}>
                                            <OutlinedTextInput
                                                val={inputValues.contactAddresses[0].stateText}
                                                onChange={(text) => handleInputChange('contactAddresses', text, 'stateText', 0)}
                                                title={t('State')} placeHolder={t('State')} />
                                        </View>
                                        <View style={styles.rightSide}>
                                            <OutlinedTextInput
                                                val={inputValues.contactAddresses[0].zipCode}
                                                onChange={(text) => handleInputChange('contactAddresses', text, 'zipCode', 0)}
                                                title={t('ZipCode')} placeHolder={t('ZipCode')} />
                                        </View>
                                    </View>

                                    <OutlinedTextInput
                                        val={inputValues.contactAddresses[0].poBox}
                                        onChange={(text) => handleInputChange('contactAddresses', text, 'poBox', 0)}
                                        title={t('PObox')} placeHolder={t('PObox')} />
                                    <OutlinedTextInput
                                        val={inputValues.contactAddresses[0].label}
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

                    </View>
                </KeyboardAwareScrollView >

                {contactModal &&
                    <ContactModal
                        getCompany={(val: any) => { setSelectedCompany(val) }}
                        anim={anim}
                        setanim={setanim}
                        contact
                        setcontactModal={setcontactModal} />}

                {sepecialityModal &&
                    <SepecialityModal
                        getSpecialityData={(specialData: any) => { handleInputChange('contactSpecialities', specialData) }}
                        anim={anim}
                        setanim={setanim}
                        contact
                        setcontactModal={setSepecialityModal}
                        industryId={inputValues.contactTypeId}
                    />}

            </SafeAreaView >
        </>

    );
};

export default NewContact;
