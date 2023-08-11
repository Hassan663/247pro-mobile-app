// @app
import React, {
    useState
} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CountryPicker, {
    Country,
} from 'react-native-country-picker-modal';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import OutlinedDropDown from '../../../core/components/outlined-dropdown.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { Title } from '../../../core/components/screen-title.component';
import { styles } from './buisness-questions.style';
import { changeRoute } from '../../../core/helpers/async-storage';
import { INDUSTRIES } from './data';
import { useSelector } from 'react-redux';
import { centralStyle, heightFlex1 } from '../../../styles/constant.style';

const BuisnessQuestions: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const isBuisness = route?.params?.yesABuisness;

    const [countryCode, setCountryCode] = useState<any>('PK');
    const [phoneNumber, setphoneNumber] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [loading, setloading] = useState<boolean>(false)
    const [selectedIndustry, setselectedIndustry] = useState<string>('');

    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);

    const handleOnSelect = (country: Country) => {
        setIsCountryPickerVisible(false);
        setCountryCode(country.cca2);
    };
    const otpSupported = useSelector((state: any) => state.root.otpSupported)

    return (
        <>
            {loading &&
                <TouchableOpacity
                    onPress={() => setloading(!loading)}
                    style={styles.loadingContainer}>
                    <Image source={require('../../../assets/auth-images/loading.png')} />
                </TouchableOpacity>}
            <View style={centralStyle.container}>
                <ScrollView contentContainerStyle={{ height: heightFlex1 * 10 }}>
                    <View style={[styles.titleWrapper,]}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => changeRoute(navigation, 'pop')}>
                            <AntDesign name={`left`} size={RFPercentage(3)} />
                        </TouchableOpacity>

                        <Image style={styles.logoStyle} source={require('../../../assets/auth-images/splashLogo.png')} />
                        <Title
                            color={Colors.black}
                            weight='600'
                            title={t(`completeQuestions`)}
                            type={`Poppin-18`} />
                    </View>
                    <View style={[styles.inputWrapper,]}>
                        {isBuisness ?
                            <>
                                <OutlinedDropDown
                                    title={t('Industry')}
                                    onselect={(value: string) => { setselectedIndustry(value) }}
                                    DATA={INDUSTRIES}
                                    drop_down_button_style={styles.drop_down_button_style}
                                />
                                <OutlinedDropDown
                                    title={t('primarySpecialty')}
                                    onselect={(value: string) => { console.log(value, 'value') }}
                                    DATA={INDUSTRIES}
                                    drop_down_button_style={styles.drop_down_button_style}
                                />
                                {selectedIndustry == 'Construction' &&
                                    <OutlinedDropDown
                                        title={t('JobType')}
                                        onselect={(value: string) => { console.log(value, 'value') }}
                                        DATA={INDUSTRIES}
                                        drop_down_button_style={styles.drop_down_button_style}
                                    />
                                }

                                <OutlinedTextInput
                                    val={zipCode}
                                    onChange={(val) => { setZipCode(val) }}
                                    title={t('ZipCode')}
                                    placeHolder={t('ZipCode')}
                                />
                                {!otpSupported &&
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
                                            <OutlinedTextInput
                                                val={phoneNumber}
                                                onChange={(val) => { setphoneNumber(val) }}
                                                title={t('MobilePhone')}
                                                placeHolder={t('MobilePhone')}
                                            />
                                        </View>
                                    </View>
                                }
                            </>
                            :
                            <OutlinedTextInput
                                val={zipCode}
                                onChange={(val) => { setZipCode(val) }}
                                title={t('ZipCode')}
                                placeHolder={t('ZipCode')}
                            />
                        }

                    </View>
                    <View style={[styles.footer,]}>
                        <Button
                            callBack={() => setloading(true)}
                            title={t('CompleteRegisration')} primary />
                    </View>

                </ScrollView >
            </View>


        </>

    );
};

export default BuisnessQuestions;
