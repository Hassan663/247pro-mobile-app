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
    ActivityIndicator,
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
import { hideError, showError, signUpAction } from '../../../store/action/action';
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
    const errorMsg = useSelector((state: any) => state.root.errorMsg);
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

    useEffect(() => {
        return () => {
            dispatch({ type: 'IS_ERROR', payload: false });
            dispatch({ type: 'SET_ERROR_MSG', payload: '' });
            dispatch({ type: 'SET_ERROR_TITLE', payload: '' });
        }
    }, [])
    const handleSubmit = async () => {
        // const { email } = route.params;


        if (!isToastVisible) {
            let isValid: any = await enterNameAndEmailValidation(name, email, password, false)

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
                // setIsToastVisible(true);
                // toast.hideAll()
                // await toast.show(isValid.message, { type: "custom_toast", })
                dispatch(showError(isValid.message, isValid.type))

                // setTimeout(() => {
                //     setIsToastVisible(false);
                // }, 5000);
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

                        <View style={[centralStyle.container, { height: windowHeight, }]}>
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

                                <View style={[centralStyle.width70, centralStyle.mb3]}>
                                    <Image
                                        style={styles.logoStyle}
                                        resizeMode='contain'
                                        source={require('../../../assets/auth-images/splashLogo.png')} />
                                    <Title
                                        type='Poppin-24'
                                        color={Colors.black}
                                        textTransform='capitalize'
                                        title={t(`Join us today`)}
                                        weight='600' />
                                    <Title
                                        type='Roboto-16'
                                        color={Colors.fontColor}
                                        title={t(`Enjoylifetimeaccessatnocost`)}
                                    />
                                </View>
                                <Button
                                    icon={<Image source={require('../../../assets/auth-images/googleIcon.png')} style={styles.googleIcon} />}
                                    title={' ' + t('Continue_with_google')}
                                    customStyle={[centralStyle.socialButtonContainer,]}
                                    titleStyle={styles.socialText}
                                />
                                <View style={styles.orContainer}>
                                    <Title
                                        type={'Poppin-12'}
                                        color={Colors.fontColor}
                                        textTransform='capitalize'
                                        title={t('or')} />
                                </View>
                            </View>
                            <View style={styles.bottomSection}>
                                <OutlinedTextInput
                                    val={name}
                                    onChange={(val) => { setName(val) }}
                                    title={t('Full_name')}
                                    autoFocus={true}
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

                                {!errorMsg &&
                                    <Title
                                        type={'Roboto-12'}
                                        color={Colors.gray}
                                        textTransform='capitalize'
                                        title={t('Mustbeatleast6characters')} />
                                }

                                <View style={[centralStyle.row, centralStyle.mt1, centralStyle.XAndYCenter]}>

                                    <View style={styles.PolicyText}>
                                        <Text style={{
                                            fontFamily: "Poppins-Regular",
                                            fontSize: RFValue(14, windowHeight)

                                        }}>{t('byClickingNext') + ' '}
                                            <Text style={{ color: Colors.primary }}>
                                                {t('terms')}
                                            </Text>
                                            {' ' + t('And') + ' '}
                                            <Text style={{ color: Colors.primary }}>
                                                {t('privacypolicy')}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                                <View style={{
                                    flex: 1, justifyContent: "flex-end",
                                }}>
                                    <View style={[centralStyle.mt3, centralStyle.my1, {

                                    }]}>
                                        {name.length && email.length && password.length ?
                                            <Button
                                                callBack={handleSubmit}
                                                title={loader ? <ActivityIndicator color={'white'} /> : t(`Next`)}
                                                // title={t(`Next`)}
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

                            </View>
                            {/* </SafeAreaView> */}
                            {/* </View > */}
                        </View>
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
