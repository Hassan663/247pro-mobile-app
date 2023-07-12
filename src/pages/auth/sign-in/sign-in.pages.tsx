// @app
import React from 'react';
import {
    Dimensions,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';

import { styles } from './sign-in.style';
import {
    ScreenTitle,
    FooterText
} from '../../../core/components/screen-title.component';
import Colors from '../../../styles/colors';
import Input from '../../../core/components/input.component';
import Button from '../../../core/components/button.component';
import { changeRoute } from '../../../core/helpers/async-storage';

const windowHeight = Dimensions.get('window').height;
const heightFlex1 = windowHeight / 10

const SignIn = ({ navigation }) => {

    return (
        <ScrollView contentContainerStyle={{ height: heightFlex1 * 10, }}>
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <ScreenTitle title={'Welcome to'} />
                    <ScreenTitle color={Colors.primary} title={' 247PRO'} />
                </View>

                <View style={styles.inputContainer}>
                    <Input placeholder={`Email`} />
                    <Input placeholder={`Password`} />
                    <Button title={`Forget Password?`} customStyle={styles.customStyle} titleStyle={styles.forgetPassword} />
                </View>
                <View style={styles.logInBtnContainer}>
                    <Button title={`Login`} primary />
                </View>
                <View style={styles.footerContainer}>
                    <FooterText title={'New here? '} />
                    <TouchableOpacity onPress={() => changeRoute(navigation, 'SignUp')} activeOpacity={0.8}>
                        <FooterText color={Colors.primary} title={'Create an free account '} />
                    </TouchableOpacity>
                </View>
            </View >
        </ScrollView>
    );
};
export default SignIn;
