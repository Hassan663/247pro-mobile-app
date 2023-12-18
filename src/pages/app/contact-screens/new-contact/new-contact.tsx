// @app
import React, {
    useCallback,
    useState,
} from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CountryPicker from 'react-native-country-picker-modal';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import { styles } from './new-contact.style';
import { Title } from '../../../../core/components/screen-title.component';
import { centralStyle } from '../../../../styles/constant.style';
import { CONTACTTYPEDATA, CONTACTTYPECOLORDATA } from './data';
import {
    handleAttachments,
    handleOnSelect,
    openSheet
} from './call-back';
import {
    ContactModal,
    LeftIcon,
    PicImgModal,
    RightIcon,
    SelectedAttachmentUI,
} from './new-contact-component';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ContactModel, CountryCodeModal, IContactCreateModel } from '../../../../core/modals/contact.modal';
import { COUNTRY_LIST } from '../../../../utilities/contact-data';
import { emailValidation } from '../../../../core/helpers/validation/validation';
import { useToast } from 'react-native-toast-notifications';
import { CreateContactAction } from '../../../../store/action/action';

const NewContact: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [openPicker, setOpenPicker] = useState(false);
    // const [imageUriLocal, setimageUriLocal] = useState('');
    const [countryId, setCountryId] = useState<number>()
    // const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    // const [selectedIndustry, setselectedIndustry] = useState<string>('');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<any>('US');
    const [showMore, setShowMore] = useState<boolean>(false);
    const [anim, setanim] = useState<string>('fadeInUpBig');
    const [contactModal, setcontactModal] = useState<boolean>(false);
    const [selectedCompany, setSelectedCompany] = useState<any>([])
    const [attechments, setAttechments] = useState<any>([])
    const toast = useToast();

    const dispatch: Dispatch<any> = useDispatch();

    const [inputValues, setInputValues] = useState<IContactCreateModel>({
        firstName: '',
        lastName: '',
        contactTypeColor: '',
        contactTypeId: 1,
        companyName: '',
        jobTitle: '',
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
            email: '',
            label: '',
            visible: true,
        }],
        contactAddresses: [{
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
            countryId: 0,
            provinceId: '',
            provinceText: '',
        }],
        contactPhones: [{
            phone: '',
            label: '',
            visible: true,
            countryId: 0,
        }],
        contactOthers: [{
            label: '',
            value: '',
            contactOtherTypeId: '',
        }],
    });





    const handleInputChange = useCallback((inputName: string, text: any, nestedProperty?: string) => {
        setInputValues((prevValues: any) => {
            if (nestedProperty) {
                // If a nested property is specified, update it
                return {
                    ...prevValues,
                    [inputName]: {
                        ...prevValues[inputName],
                        [nestedProperty]: text,
                    },
                };
            } else {
                // If no nested property is specified, update the top-level property
                return {
                    ...prevValues,
                    [inputName]: text,
                };
            }
        });
    }, [setInputValues]);


  

    const filteredContactObj = Object.fromEntries(
        Object.entries(inputValues).filter(([_, value]) => {
            // Exclude properties with empty values (null, undefined, empty string, etc.)
            return value !== null && value !== undefined && value !== '';
        })
    );

    console.log(filteredContactObj, 'filteredContactObjfilteredContactObjfilteredContactObj')


    return (
        <>

            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={centralStyle.flex1}>
                        <AppHeader
                            iconL1={LeftIcon(navigation)}
                            iconR1={RightIcon(dispatch, inputValues)}
                            type='Poppin-18'
                            weight='600'
                            title={t(`NewContact`)} />

                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            {inputValues?.profilePicture?.length > 0 ?
                                <View
                                    style={[centralStyle.circle(RFPercentage(16)), styles.imgContainer]}>
                                    <Image
                                        style={styles.profileImage}
                                        source={{ uri: inputValues.profilePicture }} />
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

                            // setimageUriLocal={setimageUriLocal} 


                            />}

                            <View style={styles.mx2}>
                                <View style={centralStyle.my1}>
                                    <OutlinedDropDown
                                        dropDownStyle={styles.dropdownstyle}
                                        title={t('Contacttype')}
                                        color={Colors.lightGray}
                                        // fontSize={RFPercentage(1.5)}
                                        iconsSize={RFPercentage(2)}
                                        onselect={(value: string, index: number) => {
                                            handleInputChange('contactTypeId', (index + 1))
                                            handleInputChange('contactTypeColor', CONTACTTYPECOLORDATA[index])
                                        }}
                                        DATA={CONTACTTYPEDATA}
                                        drop_down_button_style={[styles.dropDownStyle,]}
                                    />
                                </View>

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

                                {/* <OutlinedDropDown
                                    dropDownStyle={styles.dropdownstyle}
                                    title={t('Industry')}
                                    color={Colors.lightGray}
                                    // fontSize={RFPercentage(1.5)}
                                    iconsSize={RFPercentage(2)}
                                    onselect={(value: string) => handleInputChange('selectedIndustry', value)}
                                    DATA={CONTACTTYPEDATA}
                                    drop_down_button_style={[styles.dropDownStyle,]}
                                /> */}
                                {inputValues.contactTypeId == 2 || inputValues.contactTypeId == 3 ? <OutlinedDropDown
                                    dropDownStyle={styles.dropdownstyle}
                                    title={t('Speciality')}
                                    color={Colors.lightGray}
                                    // fontSize={RFPercentage(1.5)}
                                    iconsSize={RFPercentage(2)}
                                    onselect={(value: string) => handleInputChange('contactSpecialities', value, 'specialtyName')}
                                    DATA={CONTACTTYPEDATA}
                                    drop_down_button_style={[styles.dropDownStyle,]}
                                /> : <></>}

                                <OutlinedTextInput
                                    val={inputValues.jobTitle}
                                    onChange={(text) => handleInputChange('jobTitle', text)}
                                    title={t('jobTitle')} placeHolder={t('jobTitle')} />
                                <OutlinedTextInput

                                    val={inputValues.contactOthers[0].value}
                                    onChange={(text) => handleInputChange('contactOthers', text, 'value')}

                                    title={t('Websiteurl')} placeHolder={t('Websiteurl')} />

                                <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                                    <View style={{ flex: 9 }}>
                                        <OutlinedTextInput
                                            val={inputValues.contactEmails[0].email}
                                            onChange={(text) => handleInputChange('contactEmails', text, 'email')}
                                            title={t('Email')} placeHolder={t('Email')} />
                                    </View>
                                    <View style={[centralStyle.flex1, centralStyle.justifyContentCenter, centralStyle.alignitemEnd]}>
                                        <AntDesign name={`plus`} size={RFPercentage(3)} />
                                    </View>
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
                                                onSelect={(country) => {
                                                    handleOnSelect(country, setIsCountryPickerVisible, setCountryCode)
                                                    const getCuntryID: CountryCodeModal[] = COUNTRY_LIST.filter((code) => countryCode.toLowerCase() == code.code)
                                                    setCountryId(getCuntryID[0].id)
                                                    handleInputChange('contactPhones', getCuntryID[0].id, 'countryId')
                                                    console.log(country, getCuntryID, 'getCuntryIDgetCuntryIDgetCuntryID')
                                                }
                                                }
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
                                            onChange={(text) => handleInputChange('contactPhones', text, 'phone')}
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
                                            // fontSize={RFPercentage(1.5)}
                                            iconsSize={RFPercentage(2)}
                                            // onselect={(value: string) => { setselectedIndustry(value) }}
                                            DATA={CONTACTTYPEDATA}
                                            drop_down_button_style={[styles.dropDownStyle,]}
                                        />

                                        <OutlinedTextInput
                                            val={inputValues.contactAddresses[0].streetAddress}
                                            onChange={(text) => handleInputChange('contactAddresses', text, 'streetAddress')}
                                            title={t('StreetAddress')} placeHolder={t('StreetAddress')} />
                                        <OutlinedTextInput
                                            val={inputValues.contactAddresses[0].streetAddressLine2}
                                            onChange={(text) => handleInputChange('contactAddresses', text, 'streetAddressLine2')}
                                            title={t('StreetAddressLine2')} placeHolder={t('StreetAddressLine2')} />
                                        <OutlinedTextInput
                                            val={inputValues.contactAddresses[0].city}
                                            onChange={(text) => handleInputChange('contactAddresses', text, 'city')}
                                            title={t('City')} placeHolder={t('City')} />

                                        <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                                            <View style={styles.leftSide}>
                                                <OutlinedTextInput
                                                    val={inputValues.contactAddresses[0].stateText}
                                                    onChange={(text) => handleInputChange('contactAddresses', text, 'stateText')}
                                                    title={t('State')} placeHolder={t('State')} />
                                            </View>
                                            <View style={styles.rightSide}>
                                                <OutlinedTextInput
                                                    val={inputValues.contactAddresses[0].zipCode}
                                                    onChange={(text) => handleInputChange('contactAddresses', text, 'zipCode')}
                                                    title={t('ZipCode')} placeHolder={t('ZipCode')} />
                                            </View>
                                        </View>

                                        <OutlinedTextInput
                                            val={inputValues.contactAddresses[0].poBox}
                                            onChange={(text) => handleInputChange('contactAddresses', text, 'poBox')}
                                            title={t('PObox')} placeHolder={t('PObox')} />
                                        <OutlinedTextInput
                                            val={inputValues.contactAddresses[0].label}
                                            onChange={(text) => handleInputChange('contactAddresses', text, 'label')}
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
                        </ScrollView >

                    </View>
                </KeyboardAwareScrollView >
                {contactModal &&
                    <ContactModal
                        getCompany={(val: any) => { setSelectedCompany(val) }}
                        anim={anim}
                        setanim={setanim}
                        setcontactModal={setcontactModal} />}
            </SafeAreaView >
        </>

    );
};

export default NewContact;
