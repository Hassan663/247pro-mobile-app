// @app
import React, {
    useRef,
    useState,
} from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Text,
    TextInput,
    StatusBar,
} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CountryPicker from 'react-native-country-picker-modal';
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import Button from '../../../../core/components/button.component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './new-company.style';
import { platform } from '../../../../utilities';
import { AddInputSheet } from '../../biz-card-screens/edit-biz-card/edit-biz-card-component';
import { centralStyle, windowHeight, } from '../../../../styles/constant.style';
import { CONTACTTYPEDATA } from './data';
import { SOCIALINPUTSDATA } from '../../biz-card-screens/edit-biz-card/data';
import {
    handleBlur,
    handleFocus
} from '../../biz-card-screens/edit-biz-card/call-back';
import {
    handleAttachments,
    handleOnSelect
} from './call-back';
import {
    ContactModal,
    LeftIcon,
    PicImgModal,
    RightIcon,
    SelectedAttachmentUI
} from './new-company-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COUNTRY_LIST } from '../../../../utilities/contact-data';

const NewCompany: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [openPicker, setOpenPicker] = useState(false);
    // const [imageUriLocal, setimageUriLocal] = useState('');
    const [selectedIndustry, setselectedIndustry] = useState<string>('');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<any>('US');
    const [showMore, setShowMore] = useState<boolean>(false);
    const [anim, setanim] = useState<string>('fadeInUpBig');
    const [contactModal, setcontactModal] = useState<boolean>(false);
    const [selectedCompany, setSelectedCompany] = useState<any>([])
    const [attechments, setAttechments] = useState<any>([])
    const [newField, setNewField] = useState<string>('')

    const [addSocialAccountInput, setaddSocialAccountInput] = useState(false)
    const [contactInfoInputs, setcontactInfoInputs] = useState<any>([])
    const [isActive, setIsActive] = useState(false);
    const [about, setAbout] = useState('')
    const [socialInputs, setsocialInputs] = useState(SOCIALINPUTSDATA)

    const sheetRef = useRef<any>(null)

    const [inputValues, setInputValues] = useState<any>({
        firstName: '',
        lastName: '',
        contactTypeColor: '#FBC02D',
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
            phone: '',
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



    const handleInputChange = (inputName: string, text: any, nestedProperty?: string, index?: number) => {
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
    };



    console.log('inputValuesinputValues', inputValues)

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={centralStyle.flex1}>
                        <AppHeader
                            iconL1={LeftIcon(navigation)}
                            iconR1={RightIcon()}
                            type='Poppin-18'
                            weight='600'
                            title={t(`NewCompany`)} />

                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            {inputValues.profilePicture.length > 0 ?
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

                            {openPicker && <PicImgModal setInputValues={setInputValues} inputLabel={'profilePicture'} disableModal={() => setOpenPicker(false)} />}

                            <View style={styles.mx2}>
                                <OutlinedTextInput
                                    val={inputValues.companyName}
                                    onChange={(text: string) => handleInputChange('companyName', text)}
                                    title={t('Companyname')} placeHolder={t('Companyname')} />
                                <OutlinedTextInput title={t('Contactperson')} placeHolder={t('Contactperson')} />
                                <OutlinedTextInput
                                    val={inputValues.jobTitle}
                                    onChange={(text: string) => handleInputChange('jobTitle', text)}
                                    title={t('jobTitle')} placeHolder={t('jobTitle')} />
                                <OutlinedTextInput
                                    val={inputValues.companyName}
                                    onChange={(text: string) => handleInputChange('contactEmails', text, 'email', 0)}
                                    title={t('Email')} placeHolder={t('Email')} />
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
                                                onSelect={async (country) => {
                                                    handleOnSelect(country, setIsCountryPickerVisible, setCountryCode)
                                                    const getCuntryID: any = await COUNTRY_LIST.filter((code) => country.cca2.toLowerCase() == code.code)
                                                    handleInputChange('contactPhones', getCuntryID[0].code, 'countryCode', 0)
                                                    handleInputChange('contactPhones', getCuntryID[0].id, 'countryId', 0)
                                                    handleInputChange('contactPhones', getCuntryID[0].phoneCode, 'countryPhoneCode', 0)
                                                }}
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
                                        <OutlinedTextInput title={t('MobilePhone')} placeHolder={t('MobilePhone')} />
                                    </View>
                                </View>
                                <OutlinedTextInput
                                    val={inputValues.contactOthers.value}
                                    onChange={(text: string) => handleInputChange('contactOthers', text, 'value', 0)}
                                    title={t('Websiteurl')} placeHolder={t('Websiteurl')} />
                                <OutlinedTextInput title={t('Industry')} placeHolder={t('Industry')} />
                                <OutlinedTextInput title={t('Speciality')} placeHolder={t('Speciality')} />
                                <OutlinedTextInput
                                    val={inputValues.jobTitle.value}
                                    onChange={(text: string) => handleInputChange('jobTitle', text, 'value', 0)}
                                    title={t('JobType')} placeHolder={t('JobType')} />
                                <View style={[styles.inputContainer(60), {}]}>
                                    {
                                        about?.length && about?.length > 0 ?
                                            <Text style={styles.inputtitle(isActive)}>{t(`Notes`)}</Text>
                                            : isActive &&
                                            <Text style={styles.inputtitle(isActive)}>{t(`Notes`)}</Text>
                                    }
                                    <View style={styles.textInputContainer(isActive)}>
                                        <TextInput
                                            placeholder={isActive ? '' : t('Notes')}
                                            value={about}
                                            onFocus={() => handleFocus(setIsActive)}
                                            multiline={true}
                                            onBlur={() => handleBlur(setIsActive)}
                                            onChangeText={(val) => setAbout(val)}
                                            style={[styles.input(false, isActive), {}]} />
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
                                            title={t('Entitytype')}
                                            color={Colors.lightGray}
                                            iconsSize={RFPercentage(2)}
                                            onselect={(value: string) => { setselectedIndustry(value) }}
                                            DATA={CONTACTTYPEDATA}
                                            drop_down_button_style={[styles.dropDownStyle,]}
                                        />


                                        <OutlinedDropDown
                                            dropDownStyle={styles.dropdownstyle}
                                            title={t('country')}
                                            color={Colors.lightGray}
                                            iconsSize={RFPercentage(2)}
                                            onselect={(value: string) => { setselectedIndustry(value) }}
                                            DATA={CONTACTTYPEDATA}
                                            drop_down_button_style={[styles.dropDownStyle,]}
                                        />

                                        <OutlinedTextInput title={t('StreetAddress')} placeHolder={t('StreetAddress')} />
                                        <OutlinedTextInput title={t('StreetAddressLine2')} placeHolder={t('StreetAddressLine2')} />
                                        <OutlinedTextInput title={t('City')} placeHolder={t('City')} />

                                        <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                                            <View style={styles.leftSide}>
                                                <OutlinedDropDown
                                                    dropDownStyle={styles.dropdownstyle}
                                                    title={t('State')}
                                                    color={Colors.lightGray}
                                                    iconsSize={RFPercentage(2)}
                                                    onselect={(value: string) => { setselectedIndustry(value) }}
                                                    DATA={CONTACTTYPEDATA}
                                                    drop_down_button_style={[styles.dropDownStyle,]}
                                                />
                                            </View>
                                            <View style={styles.rightSide}>
                                                <OutlinedTextInput title={t('ZipCode')} placeHolder={t('ZipCode')} />
                                            </View>
                                        </View>
                                        <OutlinedTextInput title={t('Staff')} placeHolder={t('Staff')} />
                                        <OutlinedTextInput title={t('Notes')} placeHolder={t('Notes')} />
                                        <OutlinedTextInput title={t('Revenue')} placeHolder={t('Revenue')} />
                                        <View style={[centralStyle.mb1]}>
                                            {contactInfoInputs?.map((item: any, index: number) => {
                                                return (
                                                    <OutlinedTextInput
                                                        key={index.toString()}
                                                        title={item}
                                                        placeHolder={item}
                                                    />
                                                )
                                            })}
                                        </View>
                                        <Button
                                            callBack={() => {
                                                sheetRef?.current?.open()
                                                setaddSocialAccountInput(false)
                                            }}
                                            icon={
                                                <AntDesign name={'plus'}
                                                    size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)}
                                                    color={Colors.primary} />
                                            }
                                            customStyle={[
                                                centralStyle.mb3,
                                                centralStyle.row, centralStyle.alignitemCenter, styles.addCustomField, { marginHorizontal: 0 }]}
                                            title={t('AddCustomField')}
                                            titleStyle={styles.addCustomFieldTitle} />


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
                        </ScrollView >

                        {contactModal &&
                            <ContactModal
                                getCompany={(val: any) => { setSelectedCompany(val) }}
                                anim={anim}
                                setanim={setanim}
                                setcontactModal={setcontactModal} />}
                    </View></KeyboardAwareScrollView>
            </SafeAreaView >
        </>

    );
};

export default NewCompany;
