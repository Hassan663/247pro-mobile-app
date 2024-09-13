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
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { t } from 'i18next';
import { Dispatch } from 'redux';
import { useToast } from "react-native-toast-notifications";
import { RFPercentage } from 'react-native-responsive-fontsize';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector, } from 'react-redux';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import Loader from '../../../core/components/loader.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { styles } from './sign-in.style';
import { loginAction } from '../../../store/action/action';
import { changeRoute } from '../../../core/helpers/async-storage';
import { emailValidation, loginValidation, passwordValidation } from '../../../core/helpers/validation/validation';
import { RootStackParamList } from '../../../router/auth';
import { FooterText, Title, } from '../../../core/components/screen-title.component';
import { centralStyle, windowHeight, } from '../../../styles/constant.style';
import { useFocusEffect } from '@react-navigation/native';
import { platform } from '../../../utilities';
import { SPLASHSTATUSBAR } from '../../../store/constant/constant';
import { Text } from 'react-native-paper';

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
    const toast = useToast();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => { toast.hideAll() });
        return unsubscribe;
    }, [navigation]);


    const currentUserProfile = useSelector((state: any) => state.root.currentUserProfile);

    useEffect(() => {
        if (currentUserProfile && Object.keys(currentUserProfile).length > 0) {
            if (!currentUserProfile.isOnboarded) {
                changeRoute(navigation, 'BuisnessQuestions', { yesABuisness: true })
            }
        }
    }, [currentUserProfile]);


    const validateForm = (email: string, pass: string) => {
        let isValidated = loginValidation(email, pass);
        if (isValidated.success) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
        return isValidated;
    };

    const handleSubmit = useCallback(async () => {
        if (!isToastVisible) {
            setIsToastVisible(true);
            let isValidated = await loginValidation(inputValue, password);
            if (isValidated.success) { await dispatch(loginAction(inputValue, password)); }
            else await toast.show(isValid.message, { type: "custom_toast" });
            setTimeout(() => {
                setIsToastVisible(false);
            }, 5000);
        }
    }, [dispatch, inputValue, isToastVisible, password, toast]);

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
    const checkBoxCallback = useCallback(() => {
        setisSelected((prevIsSelected) => !prevIsSelected);
    }, [isSelected]);
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
                            customStyle={[centralStyle.socialButtonContainer,]}
                            titleStyle={styles.socialText}
                        />

                        <View style={styles.orContainer}>
                            <Title
                                type={'Poppin-14'}
                                color={Colors.fontColor}
                                textTransform='capitalize'
                                title={t('or')} />
                        </View>
                        <View style={styles.inputContainer}>
                            <OutlinedTextInput
                                val={inputValue}
                                errorLine={errors.emailError ? true : false}
                                onChange={phoneOrEmailCallback}
                                title={t('_email')}
                                placeHolder={t('_email')}
                            />
                            {errors.emailError ? <Text style={styles.errorText}>{errors.emailError}</Text> : null}
                            <OutlinedTextInput
                                title={t('Password')}
                                val={password}
                                errorLine={errors.passwordError ? true : false}
                                onChange={passwordCallback}
                                placeHolder={t('Password')}
                                Password
                            />
                            {errors.passwordError ? <Text style={styles.errorText}>{errors.passwordError}</Text> : null}

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

    );
});

export default SignIn;
