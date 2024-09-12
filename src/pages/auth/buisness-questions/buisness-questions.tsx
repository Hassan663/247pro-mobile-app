// @app
import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import OutlinedDropDown from '../../../core/components/outlined-dropdown.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { Title } from '../../../core/components/screen-title.component';
import { styles } from './buisness-questions.style';
import { useToast } from 'react-native-toast-notifications';
import { INDUSTRIES } from './data';
import { changeRoute } from '../../../core/helpers/async-storage';
import { buisnessQuestionsValidation } from '../../../core/helpers/validation/validation';
import {
    centralStyle, windowHeight,
} from '../../../styles/constant.style';
import SearchDropDown from '../../../core/components/search-dropdown-with-create-button.component';

const BuisnessQuestions: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const isBuisness = route?.params?.yesABuisness;

    const [countryCode, setCountryCode] = useState<any>('PK');
    const [phoneNumber, setphoneNumber] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [loading, setloading] = useState<boolean>(false)
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const [selectedIndustry, setselectedIndustry] = useState<string>('');
    const [jobType, setjobType] = useState<string>('');
    const [primarySpecialty, setprimarySpecialty] = useState<string>('');

    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);

    const toast = useToast();


    const handleSubmit = async () => {
        if (!isToastVisible) {
            let isValid = buisnessQuestionsValidation(selectedIndustry, primarySpecialty, zipCode, jobType)
            if (isValid.success) {
                setloading(true)
                setTimeout(() => {
                    setloading(false)
                    // dispatch({ type: ISUSERLOGIN, payload: true });
                }, 500);
            }
            else {
                setIsToastVisible(true);
                await toast.show(isValid.message, { type: "custom_toast", })
                setTimeout(() => { setIsToastVisible(false); }, 5000);
            }
        }
    }


    return (
        <>
            <KeyboardAwareScrollView>
                {loading &&
                    <TouchableOpacity
                        onPress={() => setloading(!loading)}
                        style={styles.loadingContainer}>
                        <Image source={require('../../../assets/auth-images/loading.png')} />
                    </TouchableOpacity>}
                <View style={[centralStyle.container, { height: windowHeight }]}>
                    <SafeAreaView style={centralStyle.flex1}>
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={false}>
                            <View style={centralStyle.flex1}>
                                <View style={[styles.titleWrapper]}>
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => changeRoute(navigation, 'pop')}>
                                        <AntDesign color={Colors.gray} name={`left`} size={RFPercentage(2.5)} />
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
                                            {/* <SearchDropDown
                                                title={t('Industry')}
                                                onselect={(value: string) => { setselectedIndustry(value) }}
                                                DATA={INDUSTRIES}
                                                isPrimaryBorderOnFocus={true}
                                                drop_down_button_style={styles.drop_down_button_style}
                                            /> */}
                                            <OutlinedDropDown
                                                title={t('Industry')}
                                                onselect={(value: string) => { setselectedIndustry(value) }}
                                                DATA={INDUSTRIES}
                                                drop_down_button_style={styles.drop_down_button_style}
                                            />
                                            <OutlinedDropDown
                                                title={t('primarySpecialty')}
                                                onselect={(value: string) => { setprimarySpecialty(value) }}
                                                DATA={INDUSTRIES}
                                                drop_down_button_style={styles.drop_down_button_style}
                                            />
                                            {selectedIndustry == 'Construction' &&
                                                <OutlinedDropDown
                                                    title={t('JobType')}
                                                    onselect={(value: string) => { setjobType(value) }}
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
                                            {/* {!otpSupported &&
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
                                            } */}
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
                                        callBack={handleSubmit}
                                        title={t('CompleteRegisration')}
                                        primary />
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </KeyboardAwareScrollView>
        </>
    );
};

export default BuisnessQuestions;
