// @app
import React, {
    useState
} from 'react';
import {
    View,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import CountryPicker from 'react-native-country-picker-modal';
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './edit-job-contact-info.style';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { handleOnSelect } from '../../contact-screens/new-contact/call-back';

const EditJobContactInfo: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [countryCode, setCountryCode] = useState<any>('PK');
    const [selectedIndustry, setselectedIndustry] = useState<string>('');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={centralStyle.flex1}>
                        <AppHeader
                            iconL1={
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => changeRoute(navigation, 'pop')}
                                    style={centralStyle.ml2}>
                                    <Title
                                        title={t(`Cancel`)}
                                        type='Poppin-14'
                                        color={Colors.primary}
                                        weight='600' />
                                </TouchableOpacity>}
                            iconR1={
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => changeRoute(navigation, 'pop')}
                                    style={centralStyle.mx2}>
                                    <Title
                                        title={t(`Next`)}
                                        type='Poppin-14'
                                        color={Colors.primary}
                                        weight='600' />
                                </TouchableOpacity>
                            }
                            weight='700'
                            type='Poppin-18'
                            title={t('EditJob')} />

                        <View style={centralStyle.container}>
                            <View style={[styles.tabContainer, centralStyle.my3]}>
                                <View style={styles.tabStyle(Colors.lightGrey)}></View>
                                <View style={styles.tabStyle(Colors.primary)}></View>
                            </View>

                            <Title
                                title={t(`FindlocalprosandgetbidsforKitchenRemodelforsinglefamilyhome`)}
                                type='Poppin-16'
                                color={Colors.fontColor}
                                weight='500' />
                            <View style={centralStyle.mt3}>
                                <Title
                                    title={t(`ContactInfo`)}
                                    type='Poppin-14'
                                    color={Colors.black}
                                    weight='600' />
                            </View>
                            <OutlinedTextInput val={`George`} title={t('firstname')} placeHolder={t('firstname')} />
                            <View style={centralStyle.mt1}>
                                <OutlinedTextInput val={`Lee`} title={t('lastName')} placeHolder={t('lastName')} />
                            </View>
                            <View style={centralStyle.mt1}>
                                <OutlinedTextInput val={`geolee@247pro.com`} title={t('Email')} placeHolder={t('Email')} />
                            </View>
                            <View style={[styles.inputWrapper2, centralStyle.mt1]}>
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
                                    <OutlinedTextInput val={`123456789`} title={t('MobilePhone')} placeHolder={t('MobilePhone')} />
                                </View>
                            </View>
                            <>
                                <View style={centralStyle.mt1}>
                                    <OutlinedTextInput val={`533 Airport Blvd. Burlingame, CA 94010`} title={t('Address')} placeHolder={t('Address')} />
                                </View>

                                <View style={centralStyle.mt1}>
                                    <OutlinedDropDown
                                        dropDownStyle={styles.dropdownstyle}
                                        title={t('country')}
                                        defaultValueByIndex={1}
                                        color={Colors.lightGray}
                                        iconsSize={RFPercentage(2)}
                                        onselect={(value: string) => { setselectedIndustry(value) }}
                                        DATA={[`USA`, "Pakistan", 'India']}
                                        drop_down_button_style={[styles.dropDownStyle("Pakistan"),]}
                                    />
                                </View>

                                <View style={centralStyle.mt1}>
                                    <OutlinedTextInput val={`533 Airport Blvd`} title={t('StreetAddress')} placeHolder={t('StreetAddress')} />
                                </View>

                                <View style={centralStyle.mt1}>
                                    <OutlinedTextInput val={`Enterstreetaddressline2`} title={t('Enterstreetaddressline2')} placeHolder={t('Enterstreetaddressline2')} />
                                </View>

                                <View style={centralStyle.mt1}>
                                    <OutlinedTextInput val={`Burlingame`} title={t('City')} placeHolder={t('City')} />
                                </View>

                                <View style={[centralStyle.row, centralStyle.mt1, centralStyle.XAndYCenter]}>
                                    <View style={styles.leftSide}>
                                        <OutlinedTextInput val={`CA`} title={t('State')} placeHolder={t('State')} />
                                    </View>
                                    <View style={styles.rightSide}>
                                        <OutlinedTextInput val={`45222`} title={t('ZipCode')} placeHolder={t('ZipCode')} />
                                    </View>
                                </View>
                            </>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        </>
    );
};

export default EditJobContactInfo;
