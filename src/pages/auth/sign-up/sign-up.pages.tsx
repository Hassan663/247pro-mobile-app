// @app
import React, {
    useState
} from 'react';
import {
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import CountryPicker from 'react-native-country-picker-modal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';

import {
    FooterText,
    ScreenSubTitle,
    ScreenTitle
} from '../../../core/components/screen-title.component';
import { styles } from './sign-up.style';
import Colors from '../../../styles/colors';
import Input from '../../../core/components/input.component';
import Button from '../../../core/components/button.component';
import { changeRoute } from '../../../core/helpers/async-storage';

const windowHeight = Dimensions.get('window').height;
const heightFlex1 = windowHeight / 10

const SignUp = ({ navigation }) => {

    const [countryCode, setCountryCode] = useState('PK');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false)

    const handleOnSelect = (country) => {
        setIsCountryPickerVisible(false);
        setCountryCode(country.cca2);
    }

    return (
        <ScrollView contentContainerStyle={{ height: heightFlex1 * 10, }}>

            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <ScreenTitle title={'Create Your Free Account'} />
                </View>

                <View style={styles.inputContainer}>
                    <ScreenSubTitle title={`What’s your mobile phone number?`} />

                    <View style={styles.inputWrapper}>
                        <TouchableOpacity
                            onPress={() => setIsCountryPickerVisible(true)}
                            style={styles.flagContainer}>
                            <View style={styles.flagWrapper}>
                                <CountryPicker
                                    countryCode={countryCode}
                                    withCallingCode
                                    withFlagButton={true}
                                    onClose={() => setIsCountryPickerVisible(false)}
                                    onSelect={handleOnSelect}
                                    visible={isCountryPickerVisible}
                                />
                            </View>
                            <AntDesign
                                name={`down`}
                                style={styles.downIcon}
                                size={RFPercentage(2)} />
                        </TouchableOpacity>
                        <View style={styles.phoneNumberInput}>
                            <Input placeholder={`Mobile phone number`} />
                        </View>
                    </View>

                </View>

                <View style={styles.logInBtnContainer}>

                    <Button title={`Next`} primary />

                    <View style={styles.orContainer}>
                        <View style={styles.orLine}></View>
                        <FooterText color={Colors.lightGray} title={' or '} />
                        <View style={styles.orLine}></View>
                    </View>

                    <Button
                        icon={<Image source={require('../../../assets/auth-images/googleIcon.png')} style={styles.googleIcon} />}
                        title={`Continue with google`}
                        customStyle={styles.socialButtonContainer}
                        titleStyle={styles.socialText} />
                    <Button
                        icon={<AntDesign name={`apple1`} size={RFPercentage(3)} />}
                        title={` Continue with Apple`}
                        customStyle={styles.socialButtonContainer}
                        titleStyle={styles.socialText} />

                </View>

                <View style={styles.footerContainer}>
                    <View style={styles.footerTextWrapper}>

                        <FooterText color={Colors.fontColor} title={'By signing up, I agree to 247Pro’s '} />

                        <TouchableOpacity
                            onPress={() => changeRoute(navigation, 'SignUp')}
                            activeOpacity={0.8}>
                            <FooterText color={Colors.primary} title={'Terms & Conditions.'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footerTextWrapper}>

                        <FooterText color={Colors.fontColor} title={'Already have an account? '} />

                        <TouchableOpacity
                            // onPress={() => alert( 'SignUp')}
                            onPress={() => changeRoute(navigation, 'SignIn')}
                            activeOpacity={0.8}>
                            <FooterText color={Colors.primary} title={'Login '} />
                        </TouchableOpacity>

                    </View>
                </View>
            </View >
        </ScrollView >
    );
};
export default SignUp;
