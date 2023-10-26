// @app
import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';

import { t } from 'i18next';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../styles/colors';
import Input from '../../../core/components/input.component';
import Button from '../../../core/components/button.component';
import { styles } from './forget-password.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { changeRoute } from '../../../core/helpers/async-storage';
import {
    FooterText,
    Title,
} from '../../../core/components/screen-title.component';
import {
    centralStyle,
    windowHeight
} from '../../../styles/constant.style';

const ForgetPassword: React.FC<{ navigation: any }> = ({ navigation }) => {
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
                                <Input placeholder={t('Email_or_phone')} />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.logInBtnContainer,]}>
                        <View />
                        <Button callBack={() => changeRoute(navigation, 'ForgetVerifyCode')} title={t(`Reset_Password`)} primary />
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
