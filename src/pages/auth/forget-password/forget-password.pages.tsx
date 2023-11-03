// @app
import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { Dispatch } from 'redux';
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

const ForgetPassword: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setemail] = useState<string>('')

    const toast = useToast();

    const handleSubmit = () => {
        let isValid = emailValidation(email)
        if (isValid.success) changeRoute(navigation, 'ForgetVerifyCode')
        else toast.show(isValid.message, { type: "custom_toast", })
    }

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
                        <Button callBack={handleSubmit} title={t(`Reset_Password`)} primary />
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
