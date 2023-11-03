// @app
import React, {
    useState
} from 'react';
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
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { styles } from './enter-name-and-email.style';
import { Title } from '../../../core/components/screen-title.component';
import { changeRoute } from '../../../core/helpers/async-storage';
import { centralStyle, windowHeight } from '../../../styles/constant.style';
import { useToast } from 'react-native-toast-notifications';
import { enterNameAndEmailValidation } from '../../../core/helpers/validation/validation';

const EnterNameAndEmail: React.FC<{ navigation: any }> = ({ navigation, route }: any) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const toast = useToast();

    const handleSubmit = async () => {

        if (!route?.params?.comeFromVerifyCode) {

        } else {

        }
        let isValid = await enterNameAndEmailValidation(name, email, password, route?.params?.comeFromVerifyCode)
        if (isValid.success) {
            if (!route?.params?.comeFromVerifyCode) changeRoute(navigation, 'EmailVerifyCode')
            else changeRoute(navigation, 'VerifyBuisness')
        }
        else await toast.show(isValid.message, { type: "custom_toast", })
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
                            title={t(`Welcome_to_247PRO`) + '!'}
                            type={`Poppin-24`} />
                        <Title
                            color={Colors.fontColor}
                            title={t(`Please_provide_your_login_information`)}
                            type={`Poppin-16`} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <OutlinedTextInput
                            val={name}
                            onChange={(val) => { setName(val) }}
                            title={t('Full_name')}
                            placeHolder={t('Full_name')}
                        />
                        {!route?.params?.comeFromVerifyCode &&
                            <OutlinedTextInput
                                val={email}
                                onChange={(val) => { setEmail(val) }}
                                title={t('Email')}
                                placeHolder={t('Email')}
                            />
                        }
                        <OutlinedTextInput
                            val={password}
                            onChange={(val) => { setPassword(val) }}
                            title={t('Password')}
                            placeHolder={t('Password')}
                        />
                    </View>
                    <View style={styles.footer}>
                        <Button
                            callBack={handleSubmit}
                            title={t('Next')} primary />
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default EnterNameAndEmail;
