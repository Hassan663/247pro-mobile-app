// @app
import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { t } from 'i18next';
import { Dispatch } from 'redux';
import { useToast } from "react-native-toast-notifications";
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    useDispatch,
    useSelector
} from 'react-redux';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import Loader from '../../../core/components/loader.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { styles } from './sign-in.style';
import { LOADER } from '../../../store/constant/constant';
import { LoginModal } from '../../../core/modals/login.modal';
import { FaceIdLogo } from '../../../assets/svg-icons/CustomSvgIcon';
import { loginAction } from '../../../store/action/action';
import { changeRoute } from '../../../core/helpers/async-storage';
import { loginRequestKey } from '../../../utilities/constants';
import { loginValidation } from '../../../core/helpers/validation/validation';
import { RootStackParamList } from '../../../router/auth';
import {
    centralStyle,
    windowHeight
} from '../../../styles/constant.style';
import {
    FooterText,
    Title
} from '../../../core/components/screen-title.component';

type Navigation = StackNavigationProp<RootStackParamList>;

const SignIn: React.FC = () => {
    const navigation = useNavigation<Navigation>();
    const [isSelected, setisSelected] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("bilal.asghar@247pro.com");
    const [password, setPassword] = useState<string>("P@ssw0rd");
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

    const dispatch: Dispatch<any> = useDispatch();
    const loader = useSelector((state: any) => state.root.loader);
    const toast = useToast();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => { toast.hideAll() });
        return unsubscribe;
    }, [navigation]);

    const handleSubmit = async () => {
        if (!isToastVisible) {
            let isValid = await loginValidation(inputValue, password);
            if (isValid.success) {
                dispatch({ type: LOADER, payload: true });
                const loginData: LoginModal = {
                    "key": loginRequestKey,
                    "object": { "email": inputValue, "password": password }
                };
                await dispatch(loginAction(loginData))
                dispatch({ type: LOADER, payload: false });
            }
            else {
                setIsToastVisible(true);
                await toast.show(isValid.message, { type: "custom_toast" });
                setTimeout(() => {
                    setIsToastVisible(false);
                }, 5000);
            }
        }
    };
    return (
        <KeyboardAwareScrollView>
            <View style={[centralStyle.container, { height: windowHeight }]}>
                <View style={styles.titleWrapper}>
                    <View style={styles.titleContainer}>
                        <Title
                            type='Poppin-24'
                            title={t(`Welcome_To`)}
                            weight='600' />
                        <Title
                            type='Poppin-24'
                            title={t(`247PRO`)}
                            color={Colors.primary}
                            weight='600' />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <OutlinedTextInput
                        val={inputValue}
                        onChange={(val) => setInputValue(val)}
                        title={t('Phone_or_email')}
                        placeHolder={t('Phone_or_email')}
                    />
                    <OutlinedTextInput
                        title={t('Password')}
                        val={password}
                        onChange={(val) => setPassword(val)}
                        placeHolder={t('Password')}
                        Password
                    />
                    <View style={styles.checkBoxWrapper}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => setisSelected(!isSelected)}
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
                                type={'Poppin-14'}
                                color={Colors.fontColor}
                                title={t('Remember_me')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => changeRoute(navigation, 'ForgetPassword')}>
                            <Title
                                type={'Poppin-14'}
                                color={Colors.primary}
                                title={t('Forget_Password')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.logInBtnContainer]}>

                    {!loader ?
                        <Button
                            title={t('logintText')}
                            callBack={handleSubmit}
                            primary
                        />
                        :
                        <View style={[styles.primaryBtnClone, centralStyle.XAndYCenter]}>
                            <Loader size={'small'} color={Colors.white} />
                        </View>
                    }

                    <View style={[
                        centralStyle.row,
                        centralStyle.justifyContentBetween,
                        centralStyle.alignitemCenter,
                        centralStyle.width30,
                        centralStyle.selfCenter,
                        centralStyle.mt2]}>
                        <TouchableOpacity activeOpacity={.8}>
                            <FaceIdLogo
                                width={RFPercentage(4)}
                                height={RFPercentage(4)}
                                color={Colors.black} />
                        </TouchableOpacity>
                        <View style={styles.yline}></View>
                        <TouchableOpacity activeOpacity={.8}>
                            <Image
                                style={styles.fingerPrintImg}
                                source={require('../../../assets/app-images/fingerprint.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.orContainer}>
                        <View style={styles.line} />
                        <Title
                            type={'Poppin-14'}
                            color={Colors.lightGray}
                            title={t('or')} />
                        <View style={styles.line} />
                    </View>
                    <Button
                        icon={<Image source={require('../../../assets/auth-images/googleIcon.png')} style={[styles.googleIcon, centralStyle.mr1]} />}
                        title={t('Continue_with_google')}
                        customStyle={[centralStyle.socialButtonContainer,]}
                        titleStyle={styles.socialText}
                    />
                    <Button
                        icon={<AntDesign name={`apple1`} size={RFPercentage(2.5)} style={centralStyle.mr1} />}
                        title={" " + t('Continue_with_Apple')}
                        customStyle={centralStyle.socialButtonContainer}
                        titleStyle={styles.socialText}
                    />
                </View>

                <View style={styles.footerContainer}>
                    <FooterText title={t('New_here') + " "} />
                    <TouchableOpacity onPress={() => changeRoute(navigation, 'SignUp')} activeOpacity={0.8}>
                        <FooterText color={Colors.primary} title={t('Create_an_free_account') + ' '} />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default SignIn;
