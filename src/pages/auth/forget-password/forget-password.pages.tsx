// @app
import React, { useState, useEffect, Dispatch } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { useToast } from "react-native-toast-notifications";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { styles } from './forget-password.style';
import { changeRoute } from '../../../core/helpers/async-storage';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { emailValidation } from '../../../core/helpers/validation/validation';
import {
    FooterText,
    Title,
} from '../../../core/components/screen-title.component';
import {
    centralStyle,
    windowHeight
} from '../../../styles/constant.style';
import { forgetAction } from '../../../store/action/action';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../core/components/loader.component';

const ForgetPassword: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setemail] = useState<string>('mynameismuzammilhussainshah@gmail.com')
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

    const loader = useSelector((state: any) => state.root.loader);

    const toast = useToast();
    const dispatch: Dispatch<any> = useDispatch();

    const handleSubmit = async () => {
        if (!isToastVisible) {
            setIsToastVisible(true);
            let isValid = emailValidation(email)
            if (isValid.success) {
                await dispatch(forgetAction(email))
                // changeRoute(navigation, 'ForgetVerifyCode')
            }
            else { await toast.show(isValid.message, { type: "custom_toast", }) }
            setTimeout(() => {
                setIsToastVisible(false);
            }, 5000);
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
                        <View style={{ width: '60%' }}>
                            <Title
                                color={Colors.black}
                                weight='600'
                                title={t(`Forget_your_password`)}
                                type={`Poppin-24`} />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>

                        <Title
                            type={`Poppin-16`}
                            color={Colors.fontColor}
                            weight='400' title={t(`resetInfoMsg`)} />

                        <View style={styles.inputWrapper}>
                            <View style={{ width: '100%' }}>
                                <OutlinedTextInput
                                    val={email}
                                    onChange={(val) => setemail(val)}
                                    title={t('Email_or_phone')}
                                    placeHolder={t('Email_or_phone')}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.logInBtnContainer,]}>
                        <View />

                        {!loader ?
                            <Button callBack={handleSubmit} title={t(`Reset_Password`)} primary />
                            // <Button
                            //     title={t('logintText')}
                            //     callBack={handleSubmit}
                            //     primary
                            // />
                            :
                            <View style={[centralStyle.primaryBtnClone, centralStyle.XAndYCenter]}>
                                <Loader size={'small'} color={Colors.white} />
                            </View>
                        }
                    </View>

                    <View style={styles.footerContainer}>
                        <View style={styles.footerTextWrapper}>
                            <FooterText color={Colors.fontColor} title={t('Remember_you_password') + "  "} />
                            <TouchableOpacity
                                activeOpacity={0.8}>
                                <FooterText color={Colors.primary} title={t('logintText')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView >
            </View>
        </KeyboardAwareScrollView>
    );
};

export default ForgetPassword;
