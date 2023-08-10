// @app
import React from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import { t } from 'i18next';

import {
    FooterText,
    ScreenTitle,
    Title,
} from '../../../core/components/screen-title.component';
import Colors from '../../../styles/colors';
import Input from '../../../core/components/input.component';
import Button from '../../../core/components/button.component';
import { styles } from './forget-password.style';

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
                    <Button title={t(`Reset_Password`)} primary />
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
