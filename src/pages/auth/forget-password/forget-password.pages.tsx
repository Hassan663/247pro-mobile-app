// @app
import React from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import { t } from 'i18next';
import AntDesign from 'react-native-vector-icons/AntDesign'

import Colors from '../../../styles/colors';
import Input from '../../../core/components/input.component';
import Button from '../../../core/components/button.component';
import { styles } from './forget-password.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { changeRoute } from '../../../core/helpers/async-storage';
import {
    FooterText,
    ScreenTitle,
    Title,
} from '../../../core/components/screen-title.component';
import { centralStyle, heightFlex1 } from '../../../styles/constant.style';

const ForgetPassword: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={{ height: heightFlex1 * 10 }}>
            <View style={centralStyle.container}>
                <View style={styles.titleWrapper}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => changeRoute(navigation, 'pop')}>
                        <AntDesign name={`left`} size={RFPercentage(3)} />
                    </TouchableOpacity>
                    <Image style={styles.logoStyle} source={require('../../../assets/auth-images/splashLogo.png')} />
                    <ScreenTitle title={t(`Forget_your_password`)} />
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
                        <FooterText color={Colors.fontColor} title={t('Remember_you_password')} />
                        <TouchableOpacity
                            activeOpacity={0.8}>
                            <FooterText color={Colors.primary} title={t('logintText')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default ForgetPassword;
