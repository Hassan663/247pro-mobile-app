// @app
import React, {
    useEffect,
    useState
} from 'react';
import {
    View,
    Image,
    SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { styles } from './enter-name-and-email.style';
import { Title } from '../../../core/components/screen-title.component';
import { changeRoute } from '../../../core/helpers/async-storage';
import { centralStyle, windowHeight } from '../../../styles/constant.style';
import { useToast } from 'react-native-toast-notifications';
import { enterNameAndEmailValidation, setUpPasswordValidation } from '../../../core/helpers/validation/validation';
import { signUpAction } from '../../../store/action/action';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../core/components/loader.component';

const EnterNameAndEmail: React.FC<{ navigation: any }> = ({ navigation, route }: any) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const loader = useSelector((state: any) => state.root.loader);
    const toast = useToast();
    const dispatch: Dispatch<any> = useDispatch();

  const currentUserProfile = useSelector((state: any) => state.root.currentUserProfile);

  useEffect(() => {
    console.log('currentUserProfile:', currentUserProfile);
    if (currentUserProfile && Object.keys(currentUserProfile).length > 0) {
        if (!currentUserProfile.isOnboarded) {
            changeRoute(navigation, 'BuisnessQuestions', { yesABuisness: true })
            //changeRoute(navigation, 'VerifyBuisness');
        }
    }
}, [currentUserProfile]);

    const handleSubmit = async () => {
        const { email } = route.params;

        if (!isToastVisible) {
            let isValid = await enterNameAndEmailValidation(name, email, password, route?.params?.comeFromVerifyCode)

            if (isValid.success) {
                let passwordisValid = await setUpPasswordValidation(password, confirmPassword)
                if (passwordisValid.success) {
                    // if (!route?.params?.comeFromVerifyCode) {
                    //     const isSignUpSuccessful = await dispatch(signUpAction(name, email, password));
                    //     if (isSignUpSuccessful) {
                    //         changeRoute(navigation, 'VerifyBuisness'); // Navigate to VerifyBuisness
                    //     }
                    // } else {
                    //     changeRoute(navigation, 'VerifyBuisness');
                    // }
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

    return (
        <KeyboardAwareScrollView>
            <View style={[centralStyle.container, { height: windowHeight }]}>
                <SafeAreaView style={centralStyle.flex1}>
                    <View style={styles.titleWrapper}>
                        <AntDesign
                            onPress={() => changeRoute(navigation, 'pop')}
                            color={Colors.fontColor}
                            name={`left`}
                            size={RFPercentage(2.5)} />
                        <Image style={styles.logoStyle} source={require('../../../assets/auth-images/splashLogo.png')} />
                        <Title
                            color={Colors.black}
                            weight='600'
                            title={t(`Welcome_to_247PRO`) + '!'}
                            type={`Poppin-24`} />
                        <Title
                            color={Colors.fontColor}
                            title={t(`Please_provide_your_login_information`)}
                            type={`Poppin-16`} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <OutlinedTextInput
                            val={name}
                            onChange={(val) => { setName(val) }}
                            title={t('Full_name')}
                            placeHolder={t('Full_name')}
                        />
                        {!route?.params?.comeFromVerifyCode &&
                            <OutlinedTextInput
                                val={password}
                                onChange={(val) => { setPassword(val) }}
                                title={t('SetAPassword')}
                                Password
                                placeHolder={t('SetAPassword')}
                            />
                        }
                        <OutlinedTextInput
                            val={confirmPassword}
                            onChange={(val) => { setConfirmPassword(val) }}
                            title={t('Confirm_password')}
                            Password
                            placeHolder={t('Confirm_password')}
                        />
                    </View>
                    <View style={styles.footer}>
                        {!loader ?
                            <Button
                                title={t('Next')}
                                callBack={handleSubmit}
                                primary
                            />
                            :
                            <View style={[styles.primaryBtnClone, centralStyle.XAndYCenter]}>
                                <Loader size={'small'} color={Colors.white} />
                            </View>
                        }
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default EnterNameAndEmail;
