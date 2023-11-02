// @app
import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CountryPicker, {
    Country,
} from 'react-native-country-picker-modal';

import Colors from '../../../styles/colors';
import Input from '../../../core/components/input.component';
import Button from '../../../core/components/button.component';
import i18n from '../../../i18n';
import { t } from 'i18next';
import { styles } from './sign-up.style';
import { useSelector } from 'react-redux';
import { appLanguages } from '../../../utilities/languageData';
import {
    centralStyle,
    windowHeight,
} from '../../../styles/constant.style';
import {
    changeRoute,
    setItem
} from '../../../core/helpers/async-storage';
import {
    Title,
    FooterText,
} from '../../../core/components/screen-title.component';

const SignUp: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [countryCode, setCountryCode] = useState<any>('PK');
    const [flag, setflag] = useState<boolean>(false);
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);

    const otpSupported = useSelector((state: any) => state.root.otpSupported)

    const handleOnSelect = (country: Country) => {
        setIsCountryPickerVisible(false);
        setCountryCode(country.cca2);
    };

    // CHANGE LANGUAGE 
    const setLanguageAsync = async (lang: string) => {
        await setItem('languagecode', lang);
    };
    const onLanguageSelect = async (langId: string) => {
        let lang = appLanguages.find((item) => item.id === langId);
        if (lang) {
            await i18n.changeLanguage(lang.code);
            await setLanguageAsync(lang.code);
            setflag(!flag);
        }
    };
    // CHANGE LANGUAGE 

    return (
        <KeyboardAwareScrollView>
            <View style={[centralStyle.container, { height: windowHeight }]}>
                <SafeAreaView style={centralStyle.flex1}>
                    <View style={styles.topSection}>
                        <View style={centralStyle.width70}>
                            <Image
                                style={styles.logoStyle}
                                resizeMode='contain'
                                source={require('../../../assets/auth-images/splashLogo.png')} />
                            <Title
                                type='Poppin-24'
                                color={Colors.black}
                                title={t(`Create_Your_Free_Account`)}
                                weight='600' />
                        </View>
                        <View style={centralStyle.mb3}>
                            <Title
                                type='Poppin-14'
                                color={Colors.fontColor}
                                title={t(`Whats_your_mobile_number`)}
                                weight='600' />

                        </View>
                    </View>
                    <View style={styles.bottomSection}>
                        <View style={styles.inputWrapper}>
                            <TouchableOpacity
                                onPress={() => setIsCountryPickerVisible(true)}
                                style={styles.flagContainer}
                            >
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
                                    size={RFPercentage(2)}
                                />
                            </TouchableOpacity>
                            <View style={styles.phoneNumberInput}>
                                <Input placeholder={t(`Mobile_phone_number`)} />
                            </View>
                        </View>
                        <View style={[centralStyle.mt3, centralStyle.my1]}>
                            <Button
                                callBack={() => { changeRoute(navigation, 'VerifyCode') }}
                                title={t(`Next`)}
                                primary />
                        </View>
                        <View style={styles.footerTextWrapper}>
                            <FooterText color={Colors.fontColor} title={t('Already_have_an_account')} />
                            <TouchableOpacity onPress={() => changeRoute(navigation, 'SignIn')} activeOpacity={0.8}>
                                <FooterText color={Colors.primary} title={t('logintText') + " "} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.orContainer}>
                            <View style={styles.line} />
                            <Title
                                type={'Poppin-14'}
                                color={Colors.lightGray}
                                title={t('or')} />
                            <View style={styles.line} />
                        </View>
                        <Button
                            title={t('Continue_with_Email')}
                            callBack={() => changeRoute(navigation, 'EnterNameAndEmail')}
                            customStyle={[centralStyle.socialButtonContainer,]}
                            titleStyle={styles.socialText}
                        />
                        <Button
                            icon={<Image source={require('../../../assets/auth-images/googleIcon.png')} style={styles.googleIcon} />}
                            title={' ' + t('Continue_with_google')}
                            customStyle={[centralStyle.socialButtonContainer,]}
                            titleStyle={styles.socialText}
                        />
                        <Button
                            icon={<AntDesign name={`apple1`} size={RFPercentage(2.5)} style={centralStyle.mr1} />}
                            title={" " + t('Continue_with_Apple')}
                            customStyle={centralStyle.socialButtonContainer}
                            titleStyle={styles.socialText}
                        />
                        <View style={[styles.footerTextWrapper, centralStyle.flex1, centralStyle.alignitemEnd]}>
                            <FooterText color={Colors.fontColor} title={t('AgreeTo') + ' '} />
                            <TouchableOpacity onPress={() => changeRoute(navigation, 'SignUp')} activeOpacity={0.8}>
                                <FooterText color={Colors.primary} title={t('TermsAndConditions')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>

    );
};

export default SignUp;
