// @app
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
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
import { centralStyle, windowHeight } from '../../../styles/constant.style';
import {
  fetchIndustries,
  fetchSpecialityByIndustry,
  fetchJobTypeByIndustry,
  submitJobLeads,
} from '../../../core/http-services/apis/application-api/onboarding-api/industries.service';
import {
  Industry,
  PrimarySpecialty,
  JobType,
} from '../../../core/modals/industry.modal';
import { getIndustries } from './call-back'; // if redux needed
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../core/components/loader.component';
import ScreenLoader from '../../../core/components/screen-loader-component';
import { zipAndPhoneValidation } from '../../../core/helpers/validation/validation';
import { submitZipAndPhone } from '../../../core/http-services/apis/application-api/onboarding-api/zipphone.service';

import Fontisto from 'react-native-vector-icons/Fontisto';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import { getCountryCallingCode } from 'libphonenumber-js';
import { CURRENTUSERPROFILE, LOADER } from '../../../store/constant/constant';
import { Text } from 'react-native-paper';

const BuisnessQuestions: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const isBuisness = route?.params?.yesABuisness;

  //const [countryCode, setCountryCode] = useState<any>('PK');
  const [step, setStep] = useState(1);
  const [isCheck, setIsCheck] = useState(true);
  const [phoneNumber, setphoneNumber] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [selectedIndustry, setselectedIndustry] = useState<string>('');
  const [selectedPrimarySpeciality, setSelectedPrimarySpeciality] = useState<string>('');
  const [selectedJobType, setselectedJobType] = useState<string>('');
  const [speciality, setSpeciality] = useState<PrimarySpecialty>('');
  const loader = useSelector((state: any) => state.root.loader);
  const [selectedOption, setSelectedOption] = useState(null);
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [countryCallineCode, setCountryCallingCode] = useState<number>(1);
  //const industriess = useSelector(state => state.root.industries); for Redux
  //   const industries: Industry[] = useSelector(
  //     (state: RootState) => state.root.industries,
  //   );

  // Function to handle Next button press
  const handleNext = () => {
    if (step === 1 && isCheck) {
      console.log("step 2");
      setStep(2); // Move to the second step
    }
    else {
      console.log(step, isCheck);
    }
  };

  const handleCreateNew = async () => {
    // Replace with your API call
    Alert.alert('Create New', 'API call to create new item here.');
  };
  const [industries, setIndustries] = useState<Industry[]>([]);

  const [jobType, setjobType] = useState<JobType[]>([]);
  const [primarySpecialty, setprimarySpecialty] = useState<PrimarySpecialty[]>(
    [],
  );

  const [isCountryPickerVisible, setIsCountryPickerVisible] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  //let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVGVzdCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRlc3QwMEBnbWFpbC5jb20iLCJ1c2VySWQiOiIzNjE4MjhhYi0yYWNlLTRlNGYtODk3MC0wMjU3ODM5MDdiYTciLCJhY2NvdW50SWQiOiIzNjE4MjhhYi0yYWNlLTRlNGYtODk3MC0wMjU3ODM5MDdiYTciLCJpZGVudGl0eVVzZXJJZCI6ImFiNjMxZjRhLTRjY2ItNGVlNC1iNzA2LTE5YmMzYTUxZTg1OCIsImp0aSI6IjdmZTE1Yzk2LTBjOWMtNDk3My1iM2FkLTY5ZjU0ZThmZjRiYyIsImV4cCI6MTcyNTQ5MjgwNCwiaXNzIjoiaHR0cHM6Ly9hcGkuMjQ3cHJvLmNvbSIsImF1ZCI6Imh0dHBzOi8vYXBwLjI0N3Byby5jb20ifQ._2CiZjC0CLArpsjHtdIgzDb5K-X2B4J5uhKGk0wWdz4";
  const toast = useToast();

  // Fetch industries on component mount
  useEffect(() => {
    const loadIndustries = async () => {
      //await getIndustries(dispatch);
      setloading(true);
      try {
        let accessToken = await AsyncStorage.getItem('accessToken');
        // let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVGVzdCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRlc3QwMEBnbWFpbC5jb20iLCJ1c2VySWQiOiIzNjE4MjhhYi0yYWNlLTRlNGYtODk3MC0wMjU3ODM5MDdiYTciLCJhY2NvdW50SWQiOiIzNjE4MjhhYi0yYWNlLTRlNGYtODk3MC0wMjU3ODM5MDdiYTciLCJpZGVudGl0eVVzZXJJZCI6ImFiNjMxZjRhLTRjY2ItNGVlNC1iNzA2LTE5YmMzYTUxZTg1OCIsImp0aSI6IjdmZTE1Yzk2LTBjOWMtNDk3My1iM2FkLTY5ZjU0ZThmZjRiYyIsImV4cCI6MTcyNTQ5MjgwNCwiaXNzIjoiaHR0cHM6Ly9hcGkuMjQ3cHJvLmNvbSIsImF1ZCI6Imh0dHBzOi8vYXBwLjI0N3Byby5jb20ifQ._2CiZjC0CLArpsjHtdIgzDb5K-X2B4J5uhKGk0wWdz4";
        const industryResponse = await fetchIndustries(accessToken);
        if (industryResponse.resultData) {
          setIndustries(industryResponse.data.resultData);
          //   console.log('/n/n Array', industryResponse.data.resultData);
        }
      } catch (error) {
        console.error('Error fetching industries:', error);
      } finally {
        setloading(false);
      };
    };
    loadIndustries();
  }, []);


  const industryLabels = industries?.length
    ? industries.map(industry => industry.name)
    : [];

  useEffect(() => {
    if (industries !== null && selectedIndustry !== '') {
      const industryId = industries && industries.find(
        industry => industry.name === selectedIndustry,
      )?.id;

      const loadSpecialities = async () => {
        setloading(true);
        try {
          let accessToken = await AsyncStorage.getItem('accessToken');
          // let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVGVzdCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRlc3QwMEBnbWFpbC5jb20iLCJ1c2VySWQiOiIzNjE4MjhhYi0yYWNlLTRlNGYtODk3MC0wMjU3ODM5MDdiYTciLCJhY2NvdW50SWQiOiIzNjE4MjhhYi0yYWNlLTRlNGYtODk3MC0wMjU3ODM5MDdiYTciLCJpZGVudGl0eVVzZXJJZCI6ImFiNjMxZjRhLTRjY2ItNGVlNC1iNzA2LTE5YmMzYTUxZTg1OCIsImp0aSI6IjdmZTE1Yzk2LTBjOWMtNDk3My1iM2FkLTY5ZjU0ZThmZjRiYyIsImV4cCI6MTcyNTQ5MjgwNCwiaXNzIjoiaHR0cHM6Ly9hcGkuMjQ3cHJvLmNvbSIsImF1ZCI6Imh0dHBzOi8vYXBwLjI0N3Byby5jb20ifQ._2CiZjC0CLArpsjHtdIgzDb5K-X2B4J5uhKGk0wWdz4";
          const specialityResponse = await fetchSpecialityByIndustry(
            accessToken,
            industryId,
          );
          if (specialityResponse.resultData) {
            setprimarySpecialty(specialityResponse.data.resultData);
            //console.log('/n/n Primary Array', specialityResponse.data.resultData);
          }
        } catch (error) {
          console.error('Error fetching speciality:', error);
        } finally {
          setloading(false);
        }
      };
      loadSpecialities();
    }
  }, [selectedIndustry]);
  const specialityLabels = primarySpecialty.map(speciality => speciality.name);

  useEffect(() => {
    if ((industries.length > 0 && selectedIndustry != null)) {
      const industryId = industries && industries.find(
        industry => industry.name === selectedIndustry,
      )?.id;

      const loadJobType = async () => {
        setloading(true);
        try {
          let accessToken = await AsyncStorage.getItem('accessToken');
          // let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVGVzdCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRlc3QwMEBnbWFpbC5jb20iLCJ1c2VySWQiOiIzNjE4MjhhYi0yYWNlLTRlNGYtODk3MC0wMjU3ODM5MDdiYTciLCJhY2NvdW50SWQiOiIzNjE4MjhhYi0yYWNlLTRlNGYtODk3MC0wMjU3ODM5MDdiYTciLCJpZGVudGl0eVVzZXJJZCI6ImFiNjMxZjRhLTRjY2ItNGVlNC1iNzA2LTE5YmMzYTUxZTg1OCIsImp0aSI6IjdmZTE1Yzk2LTBjOWMtNDk3My1iM2FkLTY5ZjU0ZThmZjRiYyIsImV4cCI6MTcyNTQ5MjgwNCwiaXNzIjoiaHR0cHM6Ly9hcGkuMjQ3cHJvLmNvbSIsImF1ZCI6Imh0dHBzOi8vYXBwLjI0N3Byby5jb20ifQ._2CiZjC0CLArpsjHtdIgzDb5K-X2B4J5uhKGk0wWdz4";
          const jobTypeResponse = await fetchJobTypeByIndustry(
            accessToken,
            industryId,
          );
          if (jobTypeResponse.resultData) {
            setjobType(jobTypeResponse.data.resultData);
            // console.log('/n/n Array', jobType[0]);
          }
        } catch (error) {
          console.error('Error fetching industries:', error);
        } finally {
          setloading(false);
        }
      };
      loadJobType();
    }
  }, [selectedIndustry]);
  const jobTypeLabels = jobType?.length
    ? jobType.map(jobType => jobType.name)
    : [];

  const handleSubmit = async () => {
    if (!isToastVisible) {
      let isValid = buisnessQuestionsValidation(
        selectedIndustry,
        selectedPrimarySpeciality,
        selectedJobType,
      );
      if (isValid.success) {
        dispatch({ type: LOADER, payload: true });
        setloading(true);
        let accessToken = await AsyncStorage.getItem('accessToken');

        const industryId = industries.find(
          industry => industry.name === selectedIndustry,
        )?.id;

        const specialtyIds = primarySpecialty.find(
          industry => industry.name === selectedPrimarySpeciality,
        )?.id;

        const jobTypeId = jobType.find(
          industry => industry.name === selectedJobType,
        )?.id;
        console.log(industryId, specialtyIds, jobTypeId)
        await submitJobLeads(accessToken, industryId, jobTypeId, specialtyIds)
          .then(response => {
            setloading(false);
            console.log('API Response Abcd:', response.data);

            if (response.data.isSuccess) {
              dispatch({ type: LOADER, payload: false });
              handlePhoneAndZipSubmit();
              //changeRoute(navigation, 'ZipAndPhone');
            }
          })
          .catch(error => {
            console.error('API Error:', error);
            setloading(false);
            toast.show(isValid.message, { type: 'custom_toast' });
            // dispatch({ type: ISUSERLOGIN, payload: true });
          }, 500);
      } else {
        setIsToastVisible(true);
        await toast.show(isValid.message, { type: 'custom_toast' });
        setTimeout(() => {
          setIsToastVisible(false);
        }, 5000);
      }
    }
  };

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

  const handlePhoneAndZipSubmit = async () => {
    if (!isToastVisible) {
      console.log('Selected Country Numeric Code:', getCountryCallingCode(countryCode));
      setCountryCallingCode(getCountryCallingCode(countryCode)); // Set the country code as an integer
      let isValid = zipAndPhoneValidation(zipCode, phoneNumber, countryCode);
      if (isValid.success) {
        // setloading(true);
        dispatch({ type: LOADER, payload: true });
        let accessToken = await AsyncStorage.getItem('accessToken');
        console.log(zipCode, phoneNumber, countryCode);
        await submitZipAndPhone(accessToken, zipCode, phoneNumber, countryCallineCode)
          .then(response => {
            dispatch({ type: CURRENTUSERPROFILE, payload: response.data.resultData });
            dispatch({ type: LOADER, payload: false });
            //setloading(false);
            console.log('API Response ZipCode:', response.data);
            if (response.data.isSuccess) {
              // changeRoute(navigation, 'AppNavigation');
            }
          })
          .catch(error => {
            console.error('API Error:', error);
            // setloading(false);
            toast.show(isValid.message, { type: 'custom_toast' });
            // dispatch({ type: ISUSERLOGIN, payload: true });
          }, 500);
      } else {
        setIsToastVisible(true);
        await toast.show(isValid.message, { type: 'custom_toast' });
        setTimeout(() => {
          setIsToastVisible(false);
        }, 5000);
      }
    }
  };

  return (
    <>
      <SafeAreaView style={[centralStyle.flex1, { backgroundColor: Colors.white }]}>
        {loading ? <ScreenLoader /> : <></>}
        <View style={[centralStyle.container, centralStyle.flex1,]}>
          <View style={[styles.titleWrapper]}>

            <TouchableOpacity
              activeOpacity={.8}
              onPress={() => changeRoute(navigation, 'pop')}>
              <AntDesign color={Colors.gray} name={`left`} size={RFPercentage(2.5)} />
            </TouchableOpacity>

            <Image style={styles.logoStyle} source={require('../../../assets/auth-images/splashLogo.png')} />
            <View style={styles.progressContainer}>
              <View style={[styles.bar, step >= 1 && styles.activeBar]} />
              <View style={[styles.bar, step >= 2 && styles.activeBar]} />
            </View>
            <Title
              color={Colors.fontColor}
              weight='400'
              title={t(`verifyBuisnessHeader`)}
              type={`Poppin-16`} />
          </View>

          {step === 1 && (
            <SafeAreaView style={centralStyle.flex1}>

              <View style={styles.inputWrapper}>
                <Title
                  color={Colors.black}
                  weight='600'
                  title={t(`Are_you_a_business`)}
                  type={`Poppin-18`} />
                <View style={{ flex: 1 }}>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setIsCheck(true)}
                    style={[styles.row, styles.radioWrapper]}>
                    <Fontisto
                      name={!isCheck ? `radio-btn-passive` : `radio-btn-active`}
                      style={styles.mx}
                      color={isCheck ? Colors.primary : Colors.fontColor}
                      size={RFPercentage(2.5)}
                    />
                    <Title
                      color={Colors.fontColor}
                      weight='500'
                      title={t(`yes`)}
                      type={`Poppin-14`} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setIsCheck(false)}
                    style={[styles.row, styles.radioWrapper]}>
                    <Fontisto
                      name={isCheck ? `radio-btn-passive` : `radio-btn-active`}
                      color={!isCheck ? Colors.primary : Colors.fontColor}
                      style={styles.mx}
                      size={RFPercentage(2.5)}
                    />
                    <Title
                      color={Colors.fontColor}
                      weight='500'
                      title={t(`no`)}
                      type={`Poppin-14`} />
                  </TouchableOpacity>

                </View>
              </View>



            </SafeAreaView>
          )}
        </View>
        {step === 2 &&
          (
            <View style={[centralStyle.container,{flex:1.4} ]}>
              <SafeAreaView style={centralStyle.flex1}>
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1 }}
                  showsVerticalScrollIndicator={false}>
                  <View style={centralStyle.flex1}>
                    {/* <View style={[styles.titleWrapper]}>
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
                </View> */}
                    <View style={[styles.inputWrapper]}>
                      {isBuisness ? (
                        <>
                          <OutlinedDropDown
                            title={t('Industry')}
                            search={true}
                            onselect={(value: string) => {
                              setselectedIndustry(value);
                            }}
                            DATA={industryLabels}
                            drop_down_button_style={styles.drop_down_button_style}
                          />
                          <OutlinedDropDown
                            title={t('primarySpecialty')}
                            search={true}
                            onselect={(value: string) => {
                              setSelectedPrimarySpeciality(value);
                            }}
                            DATA={specialityLabels}
                            drop_down_button_style={styles.drop_down_button_style}

                          />
                          {selectedIndustry && selectedIndustry === 'Construction' && (
                            <OutlinedDropDown
                              title={t('JobType')}
                              onselect={(value: string) => {
                                setselectedJobType(value);
                              }}
                              DATA={jobTypeLabels}
                              drop_down_button_style={styles.drop_down_button_style}
                            />
                          )}

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
                        </>
                      ) : (
                        <OutlinedTextInput
                          val={zipCode}
                          onChange={val => {
                            setZipCode(val);
                          }}
                          title={t('ZipCode')}
                          placeHolder={t('ZipCode')}
                        />
                      )}
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
          )}
        <View style={[styles.footer]}>
          {!loader ?
            <View>
              {step === 2 &&
                <Button
                  title={t('CompleteRegisration')}
                  callBack={handleSubmit}
                  primary
                />
              }
              {step === 1 &&
                <Button
                  // onPress={handleNext}
                  callBack={() => {
                    console.log("pressd")
                    handleNext();
                  }}
                  title={t('Next')} primary />
              }
            </View>
            :
            <View style={[styles.primaryBtnClone, centralStyle.XAndYCenter]}>
              <Loader size={'small'} color={Colors.white} />
            </View>
          }


        </View>
      </SafeAreaView>
    </>
  );
};

export default BuisnessQuestions;
