// @app
import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Text,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { t } from 'i18next';
import { useToast } from 'react-native-toast-notifications';
import { parsePhoneNumberFromString, validatePhoneNumberLength } from 'libphonenumber-js';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CountryPicker, {
    Country,
} from 'react-native-country-picker-modal';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { styles } from './sign-up.style';
import {
    emailValidation,
    phoneValidation
} from '../../../core/helpers/validation/validation';
import {
    centralStyle,
    windowHeight,
} from '../../../styles/constant.style';
import {
    changeRoute,
} from '../../../core/helpers/async-storage';
import {
    Title,
    FooterText,
} from '../../../core/components/screen-title.component';
import ModalComp from '../../../core/components/modal-component';
import { LanguageDropDown } from './sign-up.components';

const SignUp: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [country, setCountry] = useState<{ callingCode: string, countryCode: any }>({ callingCode: '92', countryCode: 'PK' });
    const [phoneNumber, setphoneNumber] = useState<string>('')
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState<string>(t('Phone'))
    const [isCheck, setIsCheck] = useState<boolean>(false)
    const [termsModal, setTermsModal] = useState<boolean>(false)
    const [modalEnabled, setModalEnabled] = useState<boolean>(false)

    const toast = useToast();

    // const otpSupported = useSelector((state: any) => state.root.otpSupported)

    const handleOnSelect = (country: Country) => {
        setphoneNumber('')

        setIsCountryPickerVisible(false);
        setCountry({ callingCode: country.callingCode[0], countryCode: country.cca2 });
    };

    const phoneOrEmailCallback = useCallback((val: string) => {
        setEmail(val);
    }, [setEmail]);
    const formatPhoneNumber = (number: any) => {
        // console.log(number, country.countryCode,'number, country.countryCode')
        const phoneNumberObject = parsePhoneNumberFromString(number, country.countryCode);
        if (phoneNumberObject?.number?.length) {
            // console.log(phoneNumberObject?.number?.length - country.callingCode.length - 1, 'phoneNumberObject.number.length', phoneNumberObject.isValid())

        }
        // console.log(phoneNumberObject, 'phoneNumberObject.number.length',)

        const regex = new RegExp(`^\\+${country.callingCode}\\s*`);
        // Remove the calling code using the regular expression
        if (phoneNumberObject && phoneNumberObject.isValid()) {
            return phoneNumberObject ? phoneNumberObject.formatInternational().replace(regex, '') : number;
        } else {
            return phoneNumberObject ? phoneNumberObject.formatInternational().replace(regex, '') : number;
            // return phoneNumberObject ? phoneNumberObject.formatNational() : number;
            // return null
        }

    };

    const handleSubmit = async () => {
        if (isCheck) {
            if (selectedTab == t('Phone')) {
                if (!isToastVisible) {
                    let isValid = phoneValidation(phoneNumber, country.countryCode)
                    if (isValid.success) changeRoute(navigation, 'VerifyCode')
                    else {
                        setIsToastVisible(true);
                        await toast.show(isValid.message, { type: "custom_toast", })
                        setTimeout(() => {
                            setIsToastVisible(false);
                        }, 5000);
                    }
                }
            } else if (selectedTab == t('Email')) {
                if (!isToastVisible) {
                    let isValid = emailValidation(email);
                    if (isValid.success) changeRoute(navigation, 'EnterNameAndEmail', { email })
                    else {
                        setIsToastVisible(true);
                        await toast.show(isValid.message, { type: "custom_toast", })
                        setTimeout(() => {
                            setIsToastVisible(false);
                        }, 5000);
                    }
                }
            }
        } else {
            setTermsModal(true)
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => { toast.hideAll() });
        return unsubscribe;
    }, [navigation]);

    const continueBtn = () => {
        setIsCheck(true)
        setTermsModal(false)
    }

    return (
        <>
            <KeyboardAwareScrollView>
                <View style={[centralStyle.container, { height: windowHeight }]}>
                    <SafeAreaView style={centralStyle.flex1}>

                        {modalEnabled && <LanguageDropDown
                            disableModal={() => setModalEnabled(!modalEnabled)}
                            setSelectedTab={setSelectedTab}
                            selectedTab={selectedTab}
                        />}

                        <View style={styles.LanguageSection}>
                            <TouchableOpacity activeOpacity={.7} onPress={() => setModalEnabled(!modalEnabled)} style={styles.LanguageButton}>
                                <View>
                                    <Ionicons color={Colors.gray} name='earth-outline' size={RFPercentage(2.5)} />
                                </View>
                                <View>
                                    <Title
                                        type='Poppin-12'
                                        color={Colors.gray}
                                        title={t(`English`)}
                                        weight='600' />
                                </View>
                                <View style={styles.LanguageIcon}>
                                    <AntDesign name='caretdown' />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.topSection}>

                            <View style={centralStyle.width70}>
                                <Image
                                    style={styles.logoStyle}
                                    resizeMode='contain'
                                    source={require('../../../assets/auth-images/splashLogo.png')} />
                                <Title
                                    type='Poppin-24'
                                    color={Colors.black}
                                    title={t(`Create_Your_Free_Account`)}
                                    weight='600' />
                            </View>

                            <View style={[centralStyle.row, centralStyle.m2]}>
                                <TouchableOpacity
                                    onPress={() => setSelectedTab(t('Phone'))}
                                    activeOpacity={.9} style={[styles.tabContainer(selectedTab), centralStyle.XAndYCenter]}>
                                    <Title
                                        weight='600'
                                        type='Poppin-14' color={selectedTab == t('Phone') ? Colors.primary : Colors.fontColor}
                                        title={t('Phone')} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setSelectedTab(t('Email'))}
                                    activeOpacity={.9} style={[styles.tabContainer2(selectedTab), centralStyle.XAndYCenter]}>
                                    <Title type='Poppin-14'
                                        weight='600'
                                        color={selectedTab == t('Email') ? Colors.primary : Colors.fontColor}
                                        title={t('Email')} />
                                </TouchableOpacity>
                            </View>


                            {/* <View style={centralStyle.mb3}>
                            <Title
                                type='Poppin-14'
                                color={Colors.fontColor}
                                title={t(`Whats_your_mobile_number`)}
                                weight='600' />

                        </View> */}
                        </View>
                        <View style={styles.bottomSection}>

                            {selectedTab == t('Phone') ?
                                <View style={[{
                                    height: 65,
                                    justifyContent: "flex-end"
                                },]}>
                                    <View style={styles.inputWrapper}>
                                        <TouchableOpacity
                                            onPress={() => setIsCountryPickerVisible(true)}
                                            style={styles.flagContainer}
                                        >
                                            <View>
                                                <CountryPicker
                                                    countryCode={country.countryCode}
                                                    withCallingCode
                                                    withFilter
                                                    withCallingCodeButton
                                                    renderFlagButton={() =>
                                                        <Text style={{ fontSize: RFValue(16, windowHeight) }}>
                                                            +{country.callingCode}</Text>}
                                                    withFlagButton={false}
                                                    onClose={() => setIsCountryPickerVisible(false)}
                                                    onSelect={handleOnSelect}
                                                    visible={isCountryPickerVisible}
                                                />
                                            </View>
                                            <AntDesign
                                                name={`down`}
                                                style={styles.downIcon}
                                                color={Colors.black}
                                                size={RFPercentage(2)}
                                            />
                                        </TouchableOpacity>
                                        < View style={styles.phoneNumberInput}>
                                            <TextInput
                                                style={styles.phoneInput}
                                                placeholder={t(`enterYourPhoneNumber`)}
                                                value={formatPhoneNumber(phoneNumber) && formatPhoneNumber(phoneNumber)}
                                                // maxLength={validatePhoneNumberLength(phoneNumber) === 'TOO_SHORT' ? phoneNumber.length + 1 : phoneNumber.length  }
                                                // maxLength={getMaxLength(country.countryCode)} // Set maximum length based on country
                                                onChangeText={(val: string) => {
                                                    // console.log(formatPhoneNumber(val),'formatPhoneNumber(phoneNumber)',val)
                                                    setphoneNumber(val)
                                                }}
                                                keyboardType='numeric'
                                            />
                                            {/* <OutlinedTextInput
                                                val={phoneNumber}
                                                // height={RFPercentage(9)}
                                                onChange={(val) => setphoneNumber(val)}
                                                title={t('Mobile_phone_number')}
                                                placeHolder={t(`Mobile_phone_number`)}
                                                keyboardType='numeric'
                                            /> */}
                                        </View>
                                    </View>
                                </View>
                                :
                                <OutlinedTextInput
                                    val={email}
                                    onChange={phoneOrEmailCallback}
                                    title={t('Email')}
                                    placeHolder={t('Email')}
                                />
                            }
                            <View style={[centralStyle.row, centralStyle.mt1, centralStyle.XAndYCenter]}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={centralStyle.mr05}
                                    onPress={() => setIsCheck(!isCheck)} >
                                    <Fontisto
                                        name={!isCheck ? `radio-btn-passive` : `radio-btn-active`}
                                        // style={styles.mx}
                                        color={isCheck ? Colors.primary : Colors.lightGray}
                                        size={RFPercentage(2.5)}
                                    />
                                </TouchableOpacity>
                                <View style={styles.PolicyText}>
                                    <FooterText color={Colors.fontColor} title={t('Readaccept') + ' '} />
                                    <TouchableOpacity onPress={() => changeRoute(navigation, 'SignUp')} activeOpacity={0.8}>
                                        <FooterText color={Colors.primary} title={t('Termsofservices') + ' '} />
                                    </TouchableOpacity>
                                    <FooterText color={Colors.fontColor} title={t('And') + ' '} />
                                    <TouchableOpacity onPress={() => changeRoute(navigation, 'SignUp')} activeOpacity={0.8}>
                                        <FooterText color={Colors.primary} title={t('Privacypolicy')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[centralStyle.mt3, centralStyle.my1]}>
                                {email.length || phoneNumber.length ? <Button
                                    callBack={handleSubmit}
                                    title={t(`Next`)}
                                    primary /> :
                                    <Button
                                        disable
                                        title={t(`Next`)}
                                        primary />}
                            </View>
                            <View style={styles.footerTextWrapper}>
                                <FooterText color={Colors.fontColor} title={t('Already_have_an_account')} />
                                <TouchableOpacity onPress={() => changeRoute(navigation, 'SignIn')} activeOpacity={0.8}>
                                    <FooterText color={Colors.primary} title={t('logintText') + " "} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.orContainer}>
                                <View style={styles.line} />
                                <Title
                                    type={'Poppin-12'}
                                    color={Colors.lightGray}
                                    title={t('MoreLoginoptions')} />
                                <View style={styles.line} />
                            </View>
                            <Button
                                title={t('Continue_with_SSO')}
                                customStyle={[centralStyle.socialButtonContainer,]}
                                titleStyle={styles.socialText}
                            />
                            <Button
                                icon={<Image source={require('../../../assets/auth-images/googleIcon.png')} style={styles.googleIcon} />}
                                title={' ' + t('Continue_with_google')}
                                customStyle={[centralStyle.socialButtonContainer,]}
                                titleStyle={styles.socialText}
                            />
                            <Button
                                icon={<AntDesign name={`apple1`} size={RFPercentage(2.5)} color={Colors.black} style={centralStyle.mr1} />}
                                title={" " + t('Continue_with_Apple')}
                                customStyle={centralStyle.socialButtonContainer}
                                titleStyle={styles.socialText}
                            />
                            {/* <View style={[styles.footerTextWrapper, centralStyle.flex1, centralStyle.alignitemEnd]}>
                                <FooterText color={Colors.fontColor} title={t('AgreeTo') + ' '} />
                                <TouchableOpacity onPress={() => changeRoute(navigation, 'SignUp')} activeOpacity={0.8}>
                                    <FooterText color={Colors.primary} title={t('TermsAndConditions')} />
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </SafeAreaView>
                </View >
            </KeyboardAwareScrollView >
            {termsModal &&
                <ModalComp
                    cancel={setTermsModal}
                    state={termsModal}
                    navigation={undefined}
                    callBack={continueBtn}
                />}
        </>

    );
};

export default SignUp;
