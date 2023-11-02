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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { styles } from './enter-name-and-email.style';
import { Title } from '../../../core/components/screen-title.component';
import { changeRoute } from '../../../core/helpers/async-storage';
import { centralStyle, windowHeight } from '../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';

const EnterNameAndEmail: React.FC<{ navigation: any }> = ({ navigation, route }: any) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                            callBack={() => changeRoute(navigation, 'VerifyBuisness')}
                            title={t('Next')} primary />
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default EnterNameAndEmail;
