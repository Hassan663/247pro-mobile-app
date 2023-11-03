// @app
import React, { useState } from 'react';
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
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { useToast } from 'react-native-toast-notifications';
import { setUpPasswordValidation } from '../../../core/helpers/validation/validation';

const SetNewPassword: React.FC<{ navigation: any }> = ({ navigation }) => {

    const toast = useToast();
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const handleSubmit = () => {
        let isValid = setUpPasswordValidation(password1, password2)
        if (isValid.success) { }
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
                        <Title
                            color={Colors.black}
                            weight='600'
                            title={t(`Set_your_password`)}
                            type={`Poppin-24`} />

                        <Title color={Colors.fontColor} title={t('newPassMsg')} type={`Poppin-16`} />
                    </View>

                    <View style={styles.inputContainer}>
                        <OutlinedTextInput
                            val={password1}
                            onChange={(val) => setPassword1(val)}
                            title={t('New_password')}
                            Password
                            placeHolder={t('New_password')}
                        />
                        <OutlinedTextInput
                            val={password2}
                            onChange={(val) => setPassword2(val)}
                            title={t('Confirm_password')}
                            Password
                            placeHolder={t('Confirm_password')}
                        />
                    </View>
                    <View style={styles.logInBtnContainer}>
                        <View />
                        <Button callBack={handleSubmit} title={t(`Continue`)} primary />
                    </View>

                </SafeAreaView>
            </View >
        </KeyboardAwareScrollView>

    );
};

export default SetNewPassword;
