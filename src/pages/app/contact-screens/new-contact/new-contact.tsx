// @app
import React, {
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
import { CONTACTTYPEDATA } from './data';
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
    SelectedAttachmentUI
} from './new-contact-component';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

const NewContact: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [openPicker, setOpenPicker] = useState(false);
    const [imageUriLocal, setimageUriLocal] = useState('');
    const [selectedIndustry, setselectedIndustry] = useState<string>('');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<any>('PK');
    const [showMore, setShowMore] = useState<boolean>(false);
    const [anim, setanim] = useState<string>('fadeInUpBig');
    const [contactModal, setcontactModal] = useState<boolean>(false);
    const [selectedCompany, setSelectedCompany] = useState<any>([])
    const [attechments, setAttechments] = useState<any>([])

    const dispatch: Dispatch<any> = useDispatch();

    return (
        <>

            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={centralStyle.flex1}>
                        <AppHeader
                            iconL1={LeftIcon(navigation)}
                            iconR1={RightIcon(dispatch)}
                            type='Poppin-18'
                            weight='600'
                            title={t(`NewContact`)} />

                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            {imageUriLocal.length > 0 ?
                                <View
                                    style={[centralStyle.circle(RFPercentage(16)), styles.imgContainer]}>
                                    <Image
                                        style={styles.profileImage}
                                        source={{ uri: imageUriLocal }} />
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

                            {openPicker && <PicImgModal disableModal={() => setOpenPicker(false)} setimageUriLocal={setimageUriLocal} />}

                            <View style={styles.mx2}>
                                <View style={centralStyle.my1}>
                                    <OutlinedDropDown
                                        dropDownStyle={styles.dropdownstyle}
                                        title={t('Contacttype')}
                                        color={Colors.lightGray}
                                        // fontSize={RFPercentage(1.5)}
                                        iconsSize={RFPercentage(2)}
                                        onselect={(value: string) => { setselectedIndustry(value) }}
                                        DATA={CONTACTTYPEDATA}
                                        drop_down_button_style={[styles.dropDownStyle,]}
                                    />
                                </View>

                                <OutlinedTextInput title={t('firstname')} placeHolder={t('firstname')} />
                                <OutlinedTextInput title={t('lastname')} placeHolder={t('lastname')} />
                                <OutlinedTextInput title={t('Companyname')} placeHolder={t('Companyname')} />

                                <OutlinedDropDown
                                    dropDownStyle={styles.dropdownstyle}
                                    title={t('Industry')}
                                    color={Colors.lightGray}
                                    // fontSize={RFPercentage(1.5)}
                                    iconsSize={RFPercentage(2)}
                                    onselect={(value: string) => { setselectedIndustry(value) }}
                                    DATA={CONTACTTYPEDATA}
                                    drop_down_button_style={[styles.dropDownStyle,]}
                                />
                                <OutlinedDropDown
                                    dropDownStyle={styles.dropdownstyle}
                                    title={t('Speciality')}
                                    color={Colors.lightGray}
                                    // fontSize={RFPercentage(1.5)}
                                    iconsSize={RFPercentage(2)}
                                    onselect={(value: string) => { setselectedIndustry(value) }}
                                    DATA={CONTACTTYPEDATA}
                                    drop_down_button_style={[styles.dropDownStyle,]}
                                />

                                <OutlinedTextInput title={t('jobTitle')} placeHolder={t('jobTitle')} />
                                <OutlinedTextInput title={t('Websiteurl')} placeHolder={t('Websiteurl')} />

                                <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                                    <View style={{ flex: 9 }}>
                                        <OutlinedTextInput title={t('Email')} placeHolder={t('Email')} />
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
                                            onselect={(value: string) => { setselectedIndustry(value) }}
                                            DATA={CONTACTTYPEDATA}
                                            drop_down_button_style={[styles.dropDownStyle,]}
                                        />

                                        <OutlinedTextInput title={t('StreetAddress')} placeHolder={t('StreetAddress')} />
                                        <OutlinedTextInput title={t('StreetAddressLine2')} placeHolder={t('StreetAddressLine2')} />
                                        <OutlinedTextInput title={t('City')} placeHolder={t('City')} />

                                        <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                                            <View style={styles.leftSide}>
                                                <OutlinedTextInput title={t('State')} placeHolder={t('State')} />
                                            </View>
                                            <View style={styles.rightSide}>
                                                <OutlinedTextInput title={t('ZipCode')} placeHolder={t('ZipCode')} />
                                            </View>
                                        </View>

                                        <OutlinedTextInput title={t('PObox')} placeHolder={t('PObox')} />
                                        <OutlinedTextInput title={t('Label')} placeHolder={t('Label')} />

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
