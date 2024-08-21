// @app
import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import CountryPicker from 'react-native-country-picker-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { t } from 'i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import AppHeader from '../../../../core/components/app-headers';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import { step } from './post-a-job-match-pro-component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './post-a-job-match-pro.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { COUNTRYDATA } from '../company-profile-screens/edit-company-profile/data';
import { centralStyle } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { handleOnSelect } from '../../contact-screens/edit-company/call-back';
import { CONTACTTYPEDATA } from '../../contact-screens/new-contact/data';
import { CONTACTINFOINPUTS } from '../../biz-card-screens/edit-biz-card/data';

const PostAJobMatchPro: React.FC<{ navigation: any, }> = ({ navigation, }) => {
    const [contactInfoInputs, setcontactInfoInputs] = useState(CONTACTINFOINPUTS)
    const [countryCode, setCountryCode] = useState<any>('PK');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [selectedIndustry, setselectedIndustry] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={[centralStyle.flex1,]}>
                        <AppHeader
                            iconL1={
                                <AntDesign
                                    name={`left`}
                                    onPress={() => changeRoute(navigation, 'pop')}
                                    color={Colors.black}
                                    style={centralStyle.mx2}
                                    size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />}
                            title={t(`PostaJob`)} />

                        <View style={[centralStyle.container, { backgroundColor: Colors.white }]}>
                            <View style={[styles.stepWrapper, centralStyle.alignitemCenter, centralStyle.row]}>
                                {step(`1`, true, true)}
                                <View style={styles.horizontalLine}></View>
                                {step(`2`, true, true)}
                                <View style={styles.horizontalLine}></View>
                                {step(`3`, true)}
                                <View style={centralStyle.mx05}>
                                    <Title
                                        title={t(`MatchPro`)}
                                        type='Poppin-11'
                                        color={Colors.fontColor}
                                        weight='500' />
                                </View>
                            </View>
                            <View style={[
                                centralStyle.row,
                                centralStyle.my1,
                            ]}>
                                <Title
                                    title={t(`FindlocalprosandgetbidsforKitchenRemodel`)}
                                    type='Poppin-16'
                                    weight='400' />
                                <MaterialCommunityIcons
                                    name={`attachment`}
                                    color={Colors.black}
                                    size={platform == 'ios' ? RFPercentage(2.4) : RFPercentage(2.9)} />
                            </View>

                            <View style={[styles.mx2, centralStyle.my3, centralStyle.mb1]}>
                                <Title
                                    color={Colors.fontColor}
                                    type='Poppin-16'
                                    weight='600'
                                    title={t('ContactInfo')} />
                                {contactInfoInputs?.map((item, index) => <OutlinedTextInput key={index.toString()} title={item} placeHolder={item} />)}
                            </View>
                            <View style={styles.inputWrapper2}>
                                <TouchableOpacity
                                    onPress={() => setIsCountryPickerVisible(true)}
                                    style={styles.flagContainer}
                                >
                                    <View style={styles.flagWrapper}>
                                        <CountryPicker
                                            countryCode={countryCode}
                                            withCallingCode
                                            withFlagButton={true}
                                            withFilter
                                            onClose={() => setIsCountryPickerVisible(false)}
                                            onSelect={(country) => handleOnSelect(country, setIsCountryPickerVisible, setCountryCode)}
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
                                    <OutlinedTextInput title={t('MobilePhone')} placeHolder={t('MobilePhone')} />
                                </View>
                            </View>
                            <OutlinedTextInput title={t('StreetAddress')} placeHolder={t('StreetAddress')} />
                            <OutlinedDropDown
                                dropDownStyle={styles.dropdownstyle}
                                title={t('country')}
                                color={Colors.lightGray}
                                iconsSize={RFPercentage(2)}
                                onselect={(value: string) => { setSelectedCity(value) }}
                                DATA={COUNTRYDATA}
                                drop_down_button_style={[styles.dropDownStyle(selectedCity),]}
                            />
                            <OutlinedTextInput title={t('StreetAddress')} placeHolder={t('StreetAddress')} />
                            <OutlinedTextInput title={t('StreetAddressLine2')} placeHolder={t('StreetAddressLine2')} />
                            <OutlinedTextInput title={t('City')} placeHolder={t('City')} />
                            <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                                <View style={styles.leftSide}>
                                    <OutlinedDropDown
                                        dropDownStyle={styles.dropdownstyle}
                                        title={t('State')}
                                        color={Colors.lightGray}
                                        iconsSize={RFPercentage(2)}
                                        onselect={(value: string) => { setselectedIndustry(value) }}
                                        DATA={CONTACTTYPEDATA}
                                        drop_down_button_style={[styles.dropDownStyle(selectedIndustry),]}
                                    />
                                </View>
                                <View style={styles.rightSide}>
                                    <OutlinedTextInput title={t('ZipCode')} placeHolder={t('ZipCode')} />
                                </View>
                            </View>
                            <View style={[centralStyle.my2, centralStyle.mt10]}>
                                <Button callBack={() => changeRoute(navigation, 'SuccessfullyPosted')} title={t('PostAndMatchPros')} primary />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </>
    );
};

export default PostAJobMatchPro;
