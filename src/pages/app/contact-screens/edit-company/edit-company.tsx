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

import Feather from 'react-native-vector-icons/Feather'
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CountryPicker from 'react-native-country-picker-modal';
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import Button from '../../../../core/components/button.component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './edit-company.style';
import { platform } from '../../../../utilities';
import { centralStyle, windowHeight, } from '../../../../styles/constant.style';
import { AddInputSheet } from '../../biz-card-screens/edit-biz-card/edit-biz-card-component';
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
} from './edit-company-component';

const EditCompany: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [openPicker, setOpenPicker] = useState(false);
    const [imageUriLocal, setimageUriLocal] = useState('');
    const [selectedIndustry, setselectedIndustry] = useState<string>('');
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

    const sheetRef = useRef<any>(null)

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={[centralStyle.flex1,]}>
                        <AppHeader
                            iconL1={LeftIcon(navigation)}
                            iconR1={RightIcon()}
                            type='Poppin-18'
                            weight='600'
                            title={``} />
                        <View
                            style={centralStyle.flex1}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}>
                                <View
                                    style={[centralStyle.circle(RFPercentage(14)), styles.imgContainer]}>
                                    <Image
                                        style={styles.profileImage}
                                        source={imageUriLocal.length > 0 ? { uri: imageUriLocal } : require('../../../../assets/app-images/userImg.png')} />
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => setOpenPicker(true)}
                                        style={[centralStyle.circle(RFPercentage(4)), styles.editIconAdd]}>
                                        <Feather
                                            name={'edit-2'}
                                            color={Colors.primary}
                                            size={RFPercentage(2)} />
                                    </TouchableOpacity>
                                </View>

                                {openPicker && <PicImgModal disableModal={() => setOpenPicker(false)} setimageUriLocal={setimageUriLocal} />}

                                <View style={styles.mx2}>

                                    <OutlinedTextInput val='247 pro' title={t('Companyname')} placeHolder={t('Companyname')} />
                                    <OutlinedTextInput val='George Lee' title={t('Contactperson')} placeHolder={t('Contactperson')} />
                                    <OutlinedTextInput val='Marketing lead' title={t('jobTitle')} placeHolder={t('jobTitle')} />
                                    <OutlinedTextInput val='abc123@gmail.com' title={t('Email')} placeHolder={t('Email')} />

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
                                                    onSelect={(country) => handleOnSelect(country, setIsCountryPickerVisible, setCountryCode)}
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
                                    <OutlinedTextInput val='htttps://www.247pro.com' title={t('Websiteurl')} placeHolder={t('Websiteurl')} />
                                    <OutlinedTextInput val='Business' title={t('Industry')} placeHolder={t('Industry')} />
                                    <OutlinedTextInput val='Marketing' title={t('Speciality')} placeHolder={t('Speciality')} />
                                    <OutlinedTextInput val='Contractor' title={t('JobType')} placeHolder={t('JobType')} />
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
                                                style={styles.input(false, isActive)} />
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
                                                defaultValueByIndex={1}
                                                color={Colors.lightGray}
                                                fontSize={RFPercentage(1.5)}
                                                iconsSize={RFPercentage(2)}
                                                onselect={(value: string) => { setselectedIndustry(value) }}
                                                DATA={CONTACTTYPEDATA}
                                                drop_down_button_style={[styles.dropDownStyle,]}
                                            />


                                            <OutlinedDropDown
                                                dropDownStyle={styles.dropdownstyle}
                                                title={t('country')}
                                                color={Colors.lightGray}
                                                defaultValueByIndex={1}
                                                fontSize={RFPercentage(1.5)}
                                                iconsSize={RFPercentage(2)}
                                                onselect={(value: string) => { setselectedIndustry(value) }}
                                                DATA={CONTACTTYPEDATA}
                                                drop_down_button_style={[styles.dropDownStyle,]}
                                            />

                                            <OutlinedTextInput val='2715 Ash Dr. San Jose, South Dakota 83475' title={t('StreetAddress')} placeHolder={t('StreetAddress')} />
                                            <OutlinedTextInput val='2715 Ash Dr. San Jose, South Dakota 83475' title={t('StreetAddressLine2')} placeHolder={t('StreetAddressLine2')} />
                                            <OutlinedTextInput val='New York' title={t('City')} placeHolder={t('City')} />

                                            <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                                                <View style={styles.leftSide}>
                                                    <OutlinedDropDown
                                                        dropDownStyle={styles.dropdownstyle}
                                                        title={t('State')}
                                                        defaultValueByIndex={1}
                                                        color={Colors.lightGray}
                                                        fontSize={RFPercentage(1.5)}
                                                        iconsSize={RFPercentage(2)}
                                                        onselect={(value: string) => { setselectedIndustry(value) }}
                                                        DATA={CONTACTTYPEDATA}
                                                        drop_down_button_style={[styles.dropDownStyle,]}
                                                    />
                                                </View>
                                                <View style={styles.rightSide}>
                                                    <OutlinedTextInput val='123456' title={t('ZipCode')} placeHolder={t('ZipCode')} />
                                                </View>
                                            </View>
                                            <OutlinedTextInput val='200' title={t('Staff')} placeHolder={t('Staff')} />
                                            <OutlinedTextInput val='Text place here' title={t('Notes')} placeHolder={t('Notes')} />
                                            <OutlinedTextInput val='$2,00,000,000.00' title={t('Revenue')} placeHolder={t('Revenue')} />
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
                                    <Button
                                        customStyle={[
                                            centralStyle.my2,
                                            centralStyle.XAndYCenter
                                        ]}
                                        title={t('Delete Contact')}
                                        titleStyle={styles.deleteBtn}
                                    />
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
                        </View>

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

export default EditCompany;
