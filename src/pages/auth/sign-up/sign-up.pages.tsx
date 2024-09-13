// @app
import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { t } from 'i18next';
import { useToast } from 'react-native-toast-notifications';
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

import { enterNameAndEmailValidation, setUpPasswordValidation } from '../../../core/helpers/validation/validation';
import { signUpAction } from '../../../store/action/action';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../core/components/loader.component';

const SignUp: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState<{ callingCode: string, countryCode: any }>({ callingCode: '92', countryCode: 'PK' });
    const [phoneNumber, setphoneNumber] = useState<string>('')
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState<string>(t('Phone'))
    const [isCheck, setIsCheck] = useState<boolean>(false)
    const [termsModal, setTermsModal] = useState<boolean>(false)
    const [modalEnabled, setModalEnabled] = useState<boolean>(false)
    const loader = useSelector((state: any) => state.root.loader);
    const dispatch: Dispatch<any> = useDispatch();

    const toast = useToast();
    const currentUserProfile = useSelector((state: any) => state.root.currentUserProfile);
    // const otpSupported = useSelector((state: any) => state.root.otpSupported)

    useEffect(() => {
        console.log('currentUserProfile:', currentUserProfile);
        if (currentUserProfile && Object.keys(currentUserProfile).length > 0) {
            if (!currentUserProfile.isOnboarded) {
                changeRoute(navigation, 'BuisnessQuestions', { yesABuisness: true })
                //changeRoute(navigation, 'VerifyBuisness');
            }
        }
    }, [currentUserProfile]);

    const handleOnSelect = (country: Country) => {
        setIsCountryPickerVisible(false);
        setCountry({ callingCode: country.callingCode[0], countryCode: country.cca2 });
    };

    const phoneOrEmailCallback = useCallback((val: string) => {
        setEmail(val);
    }, [setEmail]);

    // const handleSubmit = async () => {
    //     if (isCheck) {
    //         if (selectedTab == t('Phone')) {
    //             if (!isToastVisible) {
    //                 let isValid = phoneValidation(phoneNumber, country.countryCode)
    //                 if (isValid.success) changeRoute(navigation, 'VerifyCode')
    //                 else {
    //                     setIsToastVisible(true);
    //                     await toast.show(isValid.message, { type: "custom_toast", })
    //                     setTimeout(() => {
    //                         setIsToastVisible(false);
    //                     }, 5000);
    //                 }
    //             }
    //         } else if (selectedTab == t('Email')) {
    //             if (!isToastVisible) {
    //                 let isValid = emailValidation(email);
    //                 if (isValid.success) changeRoute(navigation, 'EnterNameAndEmail', { email })
    //                 else {
    //                     setIsToastVisible(true);
    //                     await toast.show(isValid.message, { type: "custom_toast", })
    //                     setTimeout(() => {
    //                         setIsToastVisible(false);
    //                     }, 5000);
    //                 }
    //             }
    //         }
    //     } else {
    //         setTermsModal(true)
    //     }
    // }
    const handleSubmit = async () => {
       // const { email } = route.params;

       
        if (!isToastVisible) {
            let isValid = await enterNameAndEmailValidation(name, email, password, false)

            console.log("subokk");
            if (isValid.success) {
                let passwordisValid = await setUpPasswordValidation(password, "7979")
                if (passwordisValid.success) {
                    // if (!route?.params?.comeFromVerifyCode) {
                    //     const isSignUpSuccessful = await dispatch(signUpAction(name, email, password));
                    //     if (isSignUpSuccessful) {
                    //         changeRoute(navigation, 'VerifyBuisness'); // Navigate to VerifyBuisness
                    //     }
                    // } else {
                    //     changeRoute(navigation, 'VerifyBuisness');
                    // }
                    console.log("subok");
                    const isSignUpSuccessful = await dispatch(signUpAction(name, email, password));

                } else {
                    setIsToastVisible(true);
                    await toast.show(passwordisValid.message, { type: "custom_toast" });
                    setTimeout(() => {
                        setIsToastVisible(false);
                    }, 5000);
                }
                // console.log('EmailVerifyCode')
                // changeRoute(navigation, 'EmailVerifyCode')
            }
            else {
                setIsToastVisible(true);
                await toast.show(isValid.message, { type: "custom_toast", })
                setTimeout(() => {
                    setIsToastVisible(false);
                }, 5000);
            }
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
            <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
        style={styles.innerContainer}
        >
                {/* <View style={[centralStyle.container, { height: windowHeight }]}> */}
                    {/* <SafeAreaView style={centralStyle.flex1}> */}

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

                        <View>

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
                            
                            {/* <Button
                                title={t('Continue_with_SSO')}
                                customStyle={[centralStyle.socialButtonContainer,]}
                                titleStyle={styles.socialText}
                            /> */}
                            <Button
                                icon={<Image source={require('../../../assets/auth-images/googleIcon.png')} style={styles.googleIcon} />}
                                title={' ' + t('Continue_with_google')}
                                customStyle={[centralStyle.socialButtonContainer,]}
                                titleStyle={styles.socialText}
                            />
                            <View style={styles.orContainer}>
                                {/* <View style={styles.line} /> */}
                                <Title
                                    type={'Poppin-12'}
                                    color={Colors.lightGray}
                                    title={t('or')} />
                                {/* <View style={styles.line} /> */}
                            </View>
                            {/* <Button
                                icon={<AntDesign name={`apple1`} size={RFPercentage(2.5)} color={Colors.black} style={centralStyle.mr1} />}
                                title={" " + t('Continue_with_Apple')}
                                customStyle={centralStyle.socialButtonContainer}
                                titleStyle={styles.socialText}
                            /> */}
                            {/* <View style={[styles.footerTextWrapper, centralStyle.flex1, centralStyle.alignitemEnd]}>
                                <FooterText color={Colors.fontColor} title={t('AgreeTo') + ' '} />
                                <TouchableOpacity onPress={() => changeRoute(navigation, 'SignUp')} activeOpacity={0.8}>
                                    <FooterText color={Colors.primary} title={t('TermsAndConditions')} />
                                </TouchableOpacity>
                            </View> */}
                            <View style={[centralStyle.row, centralStyle.m2]}>
                                {/* <TouchableOpacity
                                    onPress={() => setSelectedTab(t('Phone'))}
                                    activeOpacity={.9} style={[styles.tabContainer(selectedTab), centralStyle.XAndYCenter]}>
                                    <Title
                                        weight='600'
                                        type='Poppin-14' color={selectedTab == t('Phone') ? Colors.primary : Colors.fontColor}
                                        title={t('Phone')} />
                                </TouchableOpacity> */}

                                {/* <TouchableOpacity
                                    onPress={() => setSelectedTab(t('Email'))}
                                    activeOpacity={.9} style={[styles.tabContainer2(selectedTab), centralStyle.XAndYCenter]}
                                    
                                    >
                                    <Title type='Poppin-14'
                                        weight='600'
                                        color={selectedTab == t('Email') ? Colors.primary : Colors.fontColor}
                                        title={t('Email')} />
                                </TouchableOpacity> */}
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

                            {/* {selectedTab == t('Phone') ? 
                                // <View style={[{
                                //     height: 65,
                                //     justifyContent: "flex-end"
                                // },]}>
                                //     <View style={styles.inputWrapper}>
                                //         <TouchableOpacity
                                //             onPress={() => setIsCountryPickerVisible(true)}
                                //             style={styles.flagContainer}
                                //         >
                                //             <View>
                                //                 <CountryPicker
                                //                     countryCode={country.countryCode}
                                //                     withCallingCode
                                //                     withFilter
                                //                     withCallingCodeButton
                                //                     renderFlagButton={() =>
                                //                         <Text style={{ fontSize: RFValue(16, windowHeight) }}>
                                //                             +{country.callingCode}</Text>}
                                //                     withFlagButton={false}
                                //                     onClose={() => setIsCountryPickerVisible(false)}
                                //                     onSelect={handleOnSelect}
                                //                     visible={isCountryPickerVisible}
                                //                 />
                                //             </View>
                                //             <AntDesign
                                //                 name={`down`}
                                //                 style={styles.downIcon}
                                //                 color={Colors.black}
                                //                 size={RFPercentage(2)}
                                //             />
                                //         </TouchableOpacity>
                                //         < View style={styles.phoneNumberInput}>
                                //             <TextInput
                                //                 style={styles.phoneInput}
                                //                 placeholder={t(`enterYourPhoneNumber`)}
                                //                 onChangeText={(val: string) => setphoneNumber(val)}
                                //                 keyboardType='numeric'
                                //             />
                                //              <OutlinedTextInput
                                //                 val={phoneNumber}
                                //                 // height={RFPercentage(9)}
                                //                 onChange={(val) => setphoneNumber(val)}
                                //                 title={t('Mobile_phone_number')}
                                //                 placeHolder={t(`Mobile_phone_number`)}
                                //                 keyboardType='numeric'
                                //             />
                                //         </View>
                                //     </View>
                                // </View>
                                :*/}
                                <OutlinedTextInput
                            val={name}
                            onChange={(val) => { setName(val) }}
                            title={t('Full_name')}
                            placeHolder={t('Full_name')}
                        />
                                <OutlinedTextInput
                                    val={email}
                                    onChange={phoneOrEmailCallback}
                                    title={t('Email')}
                                    placeHolder={t('Email')}
                                />
                            <OutlinedTextInput
                                val={password}
                                onChange={(val) => { setPassword(val) }}
                                title={t('SetAPassword')}
                                Password
                                placeHolder={t('SetAPassword')}
                            />
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
                            
                        </View>
                    {/* </SafeAreaView> */}
                {/* </View > */}
                </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
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
