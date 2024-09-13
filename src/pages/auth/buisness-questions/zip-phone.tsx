// @app
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {t} from 'i18next';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import OutlinedDropDown from '../../../core/components/outlined-dropdown.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import {Title} from '../../../core/components/screen-title.component';
import {styles} from './buisness-questions.style';
import {useToast} from 'react-native-toast-notifications';
import {INDUSTRIES} from './data';
import {changeRoute} from '../../../core/helpers/async-storage';
import {zipAndPhoneValidation} from '../../../core/helpers/validation/validation';
import {centralStyle, windowHeight} from '../../../styles/constant.style';
import {submitZipAndPhone} from '../../../core/http-services/apis/application-api/onboarding-api/zipphone.service';
import {ZipAndPhone} from '../../../core/modals/zipphone.modal';
import {useDispatch, useSelector} from 'react-redux';
import CountryPicker, {Country, CountryCode} from 'react-native-country-picker-modal';
import {getCountryCallingCode} from 'libphonenumber-js';
import Loader from '../../../core/components/loader.component';
import ScreenLoader from '../../../core/components/screen-loader-component';
import { CURRENTUSERPROFILE, LOADER } from '../../../store/constant/constant';

const ZipAndPhoneNumber: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  //const [loading, setloading] = useState<boolean>(false);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [countryCallineCode, setCountryCallingCode] = useState<number>(1);
  const loader = useSelector((state: any) => state.root.loader);
  const [zipCode, setZipCode] = useState<string>();
  const [phoneNumber, setphoneNumber] = useState<string>();

  const toast = useToast();
  const [isCountryPickerVisible, setIsCountryPickerVisible] =
    useState<boolean>(false);
    const dispatch = useDispatch();

  const handleOnSelect = (country: any) => {
    setIsCountryPickerVisible(false);
    // Assuming country.callingCode is an array, we select the first one
    console.log('Selected Country Numeric Code:', getCountryCallingCode(countryCode));
    setCountryCallingCode(getCountryCallingCode(countryCode)); // Set the country code as an integer
    if (country.callingCode && country.callingCode.length > 0) {
      const numericCode = parseInt(country.callingCode[0], 10);
    }
    //setCountryCode(country.cca2);
    console.log(country, ': country');
  };

  const handleSubmit = async () => {
    if (!isToastVisible) {
      console.log('Selected Country Numeric Code:', getCountryCallingCode(countryCode));
    setCountryCallingCode(getCountryCallingCode(countryCode)); // Set the country code as an integer
      let isValid = zipAndPhoneValidation(zipCode, phoneNumber, countryCode);
      if (isValid.success) {
       // setloading(true);
       dispatch({type: LOADER, payload: true});
        let accessToken = await AsyncStorage.getItem('accessToken');
        console.log(zipCode, phoneNumber, countryCode);
        await submitZipAndPhone(accessToken, zipCode, phoneNumber, countryCallineCode)
          .then(response => {
            dispatch({type: CURRENTUSERPROFILE, payload: response.data.resultData});
            dispatch({type: LOADER, payload: false});
            //setloading(false);
            console.log('API Response ZipCode:', response.data);
            if (response.data.isSuccess) {
             // changeRoute(navigation, 'AppNavigation');
            }
          })
          .catch(error => {
            console.error('API Error:', error);
           // setloading(false);
            toast.show(isValid.message, {type: 'custom_toast'});
            // dispatch({ type: ISUSERLOGIN, payload: true });
          }, 500);
      } else {
        setIsToastVisible(true);
        await toast.show(isValid.message, {type: 'custom_toast'});
        setTimeout(() => {
          setIsToastVisible(false);
        }, 5000);
      }
    }
  };

  return (
    <>
      <KeyboardAwareScrollView>
        {/* {loading && (
          <TouchableOpacity
            onPress={() => setloading(!loading)}
            style={styles.loadingContainer}>
            <Image
              source={require('../../../assets/auth-images/loading.png')}
            />
          </TouchableOpacity>
        )} */}
        <View style={[centralStyle.container, {height: windowHeight}]}>
          <SafeAreaView style={centralStyle.flex1}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              <View style={centralStyle.flex1}>
                <View style={[styles.titleWrapper]}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => changeRoute(navigation, 'pop')}>
                    <AntDesign
                      color={Colors.gray}
                      name={'left'}
                      size={RFPercentage(2.5)}
                    />
                  </TouchableOpacity>
                  <Image
                    style={styles.logoStyle}
                    source={require('../../../assets/auth-images/splashLogo.png')}
                  />
                  <Title
                    color={Colors.black}
                    weight="600"
                    title={t('completeQuestions')}
                    type={'Poppin-18'}
                  />
                </View>
                <View style={[styles.inputWrapper]}>
                  <>
                    <OutlinedTextInput
                      val={zipCode}
                      onChange={val => {
                        setZipCode(val);
                      }}
                      title={t('ZipCode')}
                      placeHolder={t('ZipCode')}
                    />

                    <View style={styles.inputWrapper2}>
                      <TouchableOpacity
                        onPress={() => setIsCountryPickerVisible(true)}
                        style={styles.flagContainer}>
                        <View style={styles.flagWrapper}>
                          <CountryPicker
                            countryCode={countryCode}
                            withCallingCode
                            withFlagButton={true}
                            onClose={() => setIsCountryPickerVisible(false)}
                            onSelect={country => handleOnSelect(country)}
                            visible={isCountryPickerVisible}
                          />
                        </View>
                        <AntDesign
                          name={'down'}
                          style={styles.downIcon}
                          size={RFPercentage(2)}
                        />
                      </TouchableOpacity>
                      <View style={styles.phoneNumberInput}>
                        <OutlinedTextInput
                          val={phoneNumber}
                          onChange={val => {
                            setphoneNumber(val);
                          }}
                          title={t('MobilePhone')}
                          placeHolder={t('MobilePhone')}
                        />
                      </View>
                    </View>
                  </>
                </View>
                <View style={styles.footer}>
                        {!loader ?
                            <Button
                                title={t('CompleteRegisration')}
                                callBack={handleSubmit}
                                primary
                            />
                            :
                            <View style={[styles.primaryBtnClone, centralStyle.XAndYCenter]}>
                                <Loader size={'small'} color={Colors.white} />
                            </View>
                        }
                    </View>
                {/* <View style={[styles.footer]}>
                  <Button
                    callBack={handleSubmit}
                    title={t('CompleteRegisration')}
                    primary
                  />
                </View> */}
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
export default ZipAndPhoneNumber;
