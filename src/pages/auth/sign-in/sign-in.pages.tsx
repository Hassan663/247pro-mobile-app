import React, {
    useEffect,
    useState,
    useCallback,
} from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { t } from 'i18next';
import { Dispatch } from 'redux';
import { useToast } from "react-native-toast-notifications";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector, } from 'react-redux';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import Loader from '../../../core/components/loader.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { styles } from './sign-in.style';
import { FaceIdLogo } from '../../../assets/svg-icons/CustomSvgIcon';
import { loginAction, socialLoginAction } from '../../../store/action/action';
import { changeRoute } from '../../../core/helpers/async-storage';
import { emailValidation, loginValidation, passwordValidation } from '../../../core/helpers/validation/validation';
import { RootStackParamList } from '../../../router/auth';
import { FooterText, Title, } from '../../../core/components/screen-title.component';
import { centralStyle, windowHeight, } from '../../../styles/constant.style';
import { useFocusEffect } from '@react-navigation/native';
import { platform } from '../../../utilities';
import { SPLASHSTATUSBAR } from '../../../store/constant/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleGoogle } from '../../../core/helpers/social-auths';

interface Props { navigation: StackNavigationProp<RootStackParamList>; }

const SignIn: React.FC<Props> = React.memo(({ navigation }: Props) => {
    const [password, setPassword] = useState<string>("");
    const [isSelected, setisSelected] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(""); //email
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<any>(false);
    const [errors, setErrors] = useState<any>({
        emailError: '',
        passwordError: '',
    });


    const dispatch: Dispatch<any> = useDispatch();
    const loader = useSelector((state: any) => state.root.loader);
    const errorMsg = useSelector((state: any) => state.root.errorMsg);
    const toast = useToast();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => { toast.hideAll() });
        return unsubscribe;
    }, [navigation]);


    const currentUserProfile = useSelector((state: any) => state.root.currentUserProfile);

    // useEffect(() => {
    //     if (currentUserProfile && Object.keys(currentUserProfile).length > 0) {
    //         if (!currentUserProfile.isOnboarded && getBooleanValue('IsBusiness')) {
    //             changeRoute(navigation, 'BuisnessQuestions', { yesABuisness: true })
    //         }
    //     }
    // }, [currentUserProfile]);
    // const getBooleanValue = async (key) => {
    //     try {
    //       const value = await AsyncStorage.getItem(key);
    //       // Convert string back to boolean
    //       return value != null ? JSON.parse(value) : null;
    //     } catch (error) {
    //       console.error('Error retrieving boolean value', error);
    //     }
    //   };
    console.log("currentUserProfile", currentUserProfile);
    
    

    useEffect(() => {
        const checkBusinessStatus = async () => {
            try {
               
                const isBusiness = await AsyncStorage.getItem('isBusiness');
                const accessToken = await AsyncStorage.getItem('accessToken')

                console.log("isBusiness", isBusiness);

                // Check if currentUserProfile exists and has the onboarding status
               
                if (currentUserProfile && Object.keys(currentUserProfile).length > 0 ) {
                    const isUserOnboarded = currentUserProfile.isOnboarded;

                   
                    if (isBusiness === 'yes') {
                        if (isUserOnboarded) {
                            // Navigate to Menu if user is onboarded
                            console.log("else if  is here");
                            changeRoute(navigation, 'MenuScreen');
                        } 
                       
                       else{
                        console.log(" if bussiness is here");
                        changeRoute(navigation, 'BuisnessQuestions', { yesABuisness: true });
                       } 
                    } else if (isBusiness === 'no') {
                        
                        console.log("else if bussiness is ");
                        //  changeRoute(navigation, 'BuisnessQuestions', { yesABuisness: false });
                          changeRoute(navigation, 'MenuScreen', );
                       } 
                    
                    else   {
                        console.log("else if bussiness is here");
                        
                        changeRoute(navigation, 'BuisnessQuestions', { yesABuisness: false });
                    }
                   
                }
               
            } catch (error) {
                console.error('Error checking business status', error);
            }
        };

        checkBusinessStatus();
    }, [currentUserProfile, navigation]);


    const validateForm = (email: string, pass: string) => {
        let isValidated = loginValidation(email, pass);
        if (isValidated.success) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
        return isValidated;
    };

    // const handleSubmit = useCallback(async () => {
    //     if (!isToastVisible) {
    //         setIsToastVisible(true);
    //         let isValidated = await loginValidation(inputValue, password);
    //         if (isValidated.success) { await dispatch(loginAction(inputValue, password)); }
    //         else await toast.show(isValid.message, { type: "custom_toast" });
    //         setTimeout(() => {
    //             setIsToastVisible(false);
    //         }, 5000);
    //     }
    // }, [dispatch, inputValue, isToastVisible, password, toast]);

    const handleSubmit = useCallback(async () => {
        if (!isToastVisible) {
            setIsToastVisible(true);
    
            // Validate login input and password
            let isValidated = await loginValidation(inputValue, password);
            if (isValidated.success) {
    
                // Check if rememberMe checkbox is checked and store the value in AsyncStorage
                if (isSelected) {
                    await AsyncStorage.setItem('rememberMe', 'yes');
                } else {
                    await AsyncStorage.setItem('rememberMe', 'no');
                }
    
                // Proceed with login action
                await dispatch(loginAction(inputValue, password));
    
                // Check if rememberME is stored as 'yes'
                const rememberMeValue = await AsyncStorage.getItem('rememberMe');
                if (rememberMeValue === 'yes') {
                    // Handle navigation logic here based on business logic
                    console.log("RememberMe is set to yes, handle navigation.");
                } else {
                    console.log("RememberMe is set to no or doesn't exist.");
                }
    
            } else {
                // Show validation error
                await toast.show(isValidated.message, { type: "custom_toast" });
            }
    
            // Hide toast after 5 seconds
            setTimeout(() => {
                setIsToastVisible(false);
            }, 5000);
        }
    }, [dispatch, inputValue, isToastVisible, password, toast, isSelected]);
    

    // Callback to update the inputValue state based on phone or email input
    const phoneOrEmailCallback = useCallback((val: string) => {
        setInputValue(val);
        let valid = emailValidation(val);
        validateForm(val, password);
        console.log(valid.message);
        if (valid.success) {
            setErrors({ ...errors, emailError: '' });
        }
        else {
            setErrors({ ...errors, emailError: valid.message });
        }
    }, [inputValue]);

    // Callback to update the password state based on password input
    const passwordCallback = useCallback((val: string) => {
        setPassword(val);
        validateForm(inputValue, val);
        let valid = passwordValidation(val);
        if (valid.success) {
            setErrors({ ...errors, passwordError: '' });
        }
        else {
            setErrors({ ...errors, passwordError: valid.message });
        }
    }, [password]);

    // Callback to toggle the isSelected state for a checkbox
    // const checkBoxCallback = useCallback(() => {
    //     setisSelected((prevIsSelected) => !prevIsSelected);
    // }, [isSelected]);
    // useFocusEffect(
    //     React.useCallback(() => {
    //         if (platform == 'android') dispatch({ type: SPLASHSTATUSBAR, payload: false });
    //     }, [])
    // );

    // Define the checkbox callback
const checkBoxCallback = useCallback(async () => {
    try {
        // Retrieve current value from AsyncStorage
        const rememberMeValue = await AsyncStorage.getItem('rememberMe');

        // Toggle checkbox selection
        setisSelected((prevIsSelected) => {
            const newIsSelected = !prevIsSelected;

            // If checkbox is selected, save 'yes' in storage
            if (newIsSelected) {
                AsyncStorage.setItem('rememberMe', 'yes');
            } else {
                // If checkbox is unselected, set it to 'no'
                AsyncStorage.setItem('rememberMe', 'no');
            }

            return newIsSelected;
        });
    } catch (error) {
        console.error('Error handling rememberME:', error);
    }
}, [isSelected]);

// Use focus effect for additional actions if needed
useFocusEffect(
    React.useCallback(() => {
        if (platform == 'android') dispatch({ type: SPLASHSTATUSBAR, payload: false });
    }, [])
);
    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.innerContainer}
                >
                    <View style={[centralStyle.container, { height: windowHeight, }]}>
                        <View style={styles.titleWrapper}>
                            <Image style={styles.logoStyle} source={require('../../../assets/auth-images/splashLogo.png')} />
                            <Title
                                color={`#212121`}
                                title={t(`Welcome_Back`) + "!"}
                                type={`Poppin-24`}
                                weight={`600`} />
                        </View>
                        <Button
                            icon={<Image source={require('../../../assets/auth-images/googleIcon.png')}
                                style={[styles.googleIcon, centralStyle.mr1]} />}
                            title={t('Continue_with_google')}
                            callBack={async () => {
                                const googleUserData = await handleGoogle()
                                console.log(googleUserData, 'googleUserData')
                                dispatch(socialLoginAction(googleUserData))
                            }}
                            customStyle={[centralStyle.socialButtonContainer,]}
                            titleStyle={styles.socialText}
                        />

                        <View style={[styles.orContainer, { paddingVertical: 10 }]}>
                            <Text
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    fontSize: RFValue(14, windowHeight),
                                    fontWeight: "400",
                                    color: Colors.fontColor,
                                    textTransform: 'capitalize',
                                }}>
                                or
                            </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <OutlinedTextInput
                                val={inputValue}
                                errorLine={errors.emailError ? true : false}
                                onChange={phoneOrEmailCallback}
                                title={t('_email')}
                                placeHolder={t('_email')}
                            />
                            {!errorMsg && errors.emailError ? <Text style={styles.errorText}>{errors.emailError}</Text> : null}
                            <OutlinedTextInput
                                title={t('Password')}
                                val={password}
                                errorLine={errors.passwordError ? true : false}
                                onChange={passwordCallback}
                                placeHolder={t('Password')}
                                Password
                            />
                            {!errorMsg && errors.passwordError ? <Text style={styles.errorText}>{errors.passwordError}</Text> : null}

                            <View style={[styles.checkBoxWrapper, centralStyle.alignitemCenter]}>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={checkBoxCallback}
                                    style={[styles.row, { alignItems: "center", height: RFPercentage(3) }]}
                                >
                                    {isSelected ?
                                        <AntDesign
                                            style={styles.mr1}
                                            color={Colors.fontColor}
                                            name={'checksquareo'}
                                            size={RFPercentage(2.5)} />
                                        :
                                        <Feather
                                            style={styles.mr1}
                                            color={Colors.gray}
                                            name={'square'}
                                            size={RFPercentage(2.5)} />
                                    }
                                    <Title
                                        type={'Roboto-14'}
                                        color={Colors.fontColor}
                                        title={t('Remember_me')} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => changeRoute(navigation, 'ForgetPassword')}>
                                    <Title
                                        type={'Roboto-14'}
                                        color={Colors.gray}
                                        title={t('forgetPasswordSign')} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.logInBtnContainer]}>
                            {!loader ?
                                <Button
                                    title={t('logintText')}
                                    callBack={handleSubmit}
                                    disable={isValid ? false : true}
                                    // titleStyle={{textTransform:'capitalize'}}
                                    primary
                                />
                                :
                                <View style={[styles.primaryBtnClone, centralStyle.XAndYCenter]}>
                                    <Loader size={'small'} color={Colors.white} />
                                </View>
                            }
                        </View>
                        <View style={styles.footerContainer}>
                            <FooterText title={t('Noaccount') + " "} />
                            <TouchableOpacity onPress={() => changeRoute(navigation, 'SignUp')} activeOpacity={0.8}>
                                <FooterText color={Colors.primary} title={t('Createone') + ' '} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>

        // <<<<<<< HEAD
        // =======
        //                     <View style={styles.orContainer}>
        //                         <View style={styles.line} />
        //                         <Title
        //                             type={'Poppin-14'}
        //                             color={Colors.lightGray}
        //                             title={t('or')} />
        //                         <View style={styles.line} />
        //                     </View>
        //                     <Button
        //                         icon={<Image source={require('../../../assets/auth-images/googleIcon.png')} style={[styles.googleIcon, centralStyle.mr1]} />}
        //                         title={t('Continue_with_google')}
        //                         callBack={async () => {
        //                             const googleUserData = await handleGoogle()
        //                              dispatch(socialLoginAction(googleUserData))



        //                             // alert('googel auth')

        //                         }}
        //                         customStyle={[centralStyle.socialButtonContainer,]}
        //                         titleStyle={styles.socialText}
        //                     />
        //                     <Button
        //                         icon={<AntDesign name={`apple1`} size={RFPercentage(2.5)} style={centralStyle.mr1} />}
        //                         title={" " + t('Continue_with_Apple')}
        //                         customStyle={centralStyle.socialButtonContainer}
        //                         titleStyle={styles.socialText}
        //                     />
        //                 </View>

        //                 <View style={styles.footerContainer}>
        //                     <FooterText title={t('New_here') + " "} />
        //                     <TouchableOpacity onPress={() => changeRoute(navigation, 'SignUp')} activeOpacity={0.8}>
        //                         <FooterText color={Colors.primary} title={t('Create_an_free_account') + ' '} />
        //                     </TouchableOpacity>
        //                 </View>
        //             </View>
        //         </KeyboardAwareScrollView>
        // >>>>>>> muz_2
    );
});

export default SignIn;
