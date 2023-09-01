// @app
import React, {
    useState
} from 'react';
import {
    View,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';

import { t } from 'i18next';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import OutlinedTextInput from '../../../core/components/Outlined-TextInput.component';
import { styles } from './enter-name-and-email.style';
import { changeRoute } from '../../../core/helpers/async-storage';
import {
    ScreenTitle,
    Title,
} from '../../../core/components/screen-title.component';
import { centralStyle, heightFlex1 } from '../../../styles/constant.style';
 
const EnterNameAndEmail: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <ScrollView contentContainerStyle={{ height: heightFlex1 * 10 }}>
            <View style={centralStyle.container}>
                <View style={styles.titleWrapper}>
                    <Image style={styles.logoStyle} source={require('../../../assets/auth-images/splashLogo.png')} />
                    <ScreenTitle widthAuto title={t(`Welcome_to_247PRO`)} />
                    <Title color={Colors.fontColor} title={t(`Please_provide_your_login_information`)} type={`Poppin-16`} />
                </View>
                <View style={styles.inputWrapper}>
                    <OutlinedTextInput
                        val={name}
                        onChange={(val) => { setName(val) }}
                        title={t('Full_name')}
                        placeHolder={t('Full_name')}
                    />
                    <OutlinedTextInput
                        val={email}
                        onChange={(val) => { setEmail(val) }}
                        title={t('Email')}
                        placeHolder={t('Email')}
                    />
                    <OutlinedTextInput
                        val={password}
                        onChange={(val) => { setPassword(val) }}
                        title={t('Password')}
                        placeHolder={t('Password')}
                        Password
                    />
                </View>
                <View style={styles.footer}>
                    <Button
                        callBack={() => changeRoute(navigation, 'VerifyBuisness')}
                        title={t('Next')} primary />
                </View>
            </View>
        </ScrollView>
    );
};

export default EnterNameAndEmail;
