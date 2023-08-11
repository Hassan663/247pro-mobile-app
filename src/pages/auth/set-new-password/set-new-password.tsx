// @app
import React from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Button from '../../../core/components/button.component';
import Input from '../../../core/components/input.component';
import { changeRoute } from '../../../core/helpers/async-storage';
import { styles } from './set-new-password.style';
import { centralStyle, heightFlex1 } from '../../../styles/constant.style';
import {
    ScreenTitle,
    Title,
} from '../../../core/components/screen-title.component';

const SetNewPassword: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={{ height: heightFlex1 * 10 }}>
            <View style={centralStyle.container}>
                <View style={styles.titleWrapper}>
                    <TouchableOpacity
                        style={{ marginTop: RFPercentage(3) }}
                        activeOpacity={0.8}
                        onPress={() => changeRoute(navigation, 'pop')}>
                        <AntDesign name={`left`} size={RFPercentage(3)} />
                    </TouchableOpacity>
                    <Image style={styles.logoStyle} source={require('../../../assets/auth-images/splashLogo.png')} />
                    <ScreenTitle title={t(`Set_your_password`)} />
                    <Title title={t('newPassMsg')} type={`Poppin-16`} />
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Input placeholder={t('New_password')} />
                    </View>
                    <View>
                        <Input placeholder={t('Confirm_password')} />
                    </View>
                </View>
                <View style={[styles.logInBtnContainer,]}>
                    <View />
                    <Button title={t(`Continue`)} primary />
                </View>

            </View>
        </ScrollView>
    );
};

export default SetNewPassword;
