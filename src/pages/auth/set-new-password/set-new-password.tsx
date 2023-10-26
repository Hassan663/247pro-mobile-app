// @app
import React from 'react';
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
import Input from '../../../core/components/input.component';
import { Title } from '../../../core/components/screen-title.component';
import { styles } from './set-new-password.style';
import { changeRoute } from '../../../core/helpers/async-storage';
import { centralStyle, windowHeight } from '../../../styles/constant.style';

const SetNewPassword: React.FC<{ navigation: any }> = ({ navigation }) => {
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
                            title={t(`Set_your_password`)}
                            type={`Poppin-24`} />

                        <Title color={Colors.fontColor} title={t('newPassMsg')} type={`Poppin-16`} />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Input placeholder={t('New_password')} />
                        </View>
                        <View>
                            <Input placeholder={t('Confirm_password')} />
                        </View>
                    </View>
                    <View style={styles.logInBtnContainer}>
                        <View />
                        <Button title={t(`Continue`)} primary />
                    </View>

                </SafeAreaView>
            </View >
        </KeyboardAwareScrollView>

    );
};

export default SetNewPassword;
