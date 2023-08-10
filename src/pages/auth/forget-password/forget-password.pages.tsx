// @app
import React, { useState } from 'react';
import {
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import CountryPicker, {
    Country,
} from 'react-native-country-picker-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage } from 'react-native-responsive-fontsize';

import {
    FooterText,
    ScreenSubTitle,
    ScreenTitle,
    Title,
} from '../../../core/components/screen-title.component';
import { styles } from './forget-password.style';
import Colors from '../../../styles/colors';
import Input from '../../../core/components/input.component';
import Button from '../../../core/components/button.component';
import { changeRoute, setItem } from '../../../core/helpers/async-storage';
import { t } from 'i18next';
import { appLanguages } from '../../../utilities/languageData';
import i18n, { fetchTranslations } from '../../../i18n';
import { useSelector } from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const heightFlex1 = windowHeight / 10;

const ForgetPassword: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={{ height: heightFlex1 * 10 }}>
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
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
                    <Button
                        // callBack={() => { changeRoute(navigation, 'VerifyCode') }}
                        title={t(`Reset_Password`)} primary />
                </View>

                <View style={styles.footerContainer}>
                    <View style={styles.footerTextWrapper}>
                        <FooterText color={Colors.fontColor} title={t('Remember_you_password')} />
                        <TouchableOpacity
                            // onPress={() => changeRoute(navigation, 'SignUp')}
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
