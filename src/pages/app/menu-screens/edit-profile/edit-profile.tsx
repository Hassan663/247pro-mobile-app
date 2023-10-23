// @app
import React, {
    useState
} from 'react';
import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CountryPicker, {
    Country
} from 'react-native-country-picker-modal';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './edit-profile.style';
import { INDUSTRIES } from '../../../auth/buisness-questions/data';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { PicImgModal } from '../../biz-card-screens/edit-biz-card/edit-biz-card-component';
import { centralStyle } from '../../../../styles/constant.style';
import {
    handleBlur,
    handleFocus
} from '../../biz-card-screens/edit-biz-card/call-back';
import { platform } from '../../../../utilities';

const EditProfile: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [isActive, setIsActive] = useState(false);
    const [openPicker, setOpenPicker] = useState(false);
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [imageUriLocal, setimageUriLocal] = useState('');
    const [countryCode, setCountryCode] = useState<any>('PK');
    const [phoneNumber, setphoneNumber] = useState<string>('317123423');
    const [selectedIndustry, setselectedIndustry] = useState<string>('');
    const [about, setAbout] = useState('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde delectus placeat ex? Vitae quos magni consequatur iure sapiente velit, vero expedita illo quasi exercitationem iste. Tempora mollitia eligendi similique incidunt.')

    const handleOnSelect = (country: Country) => {
        setIsCountryPickerVisible(false);
        setCountryCode(country.cca2);
    };
    console.log(imageUriLocal, 'imageUriLocal')
    return (
        <>
            <KeyboardAvoidingView
                style={[centralStyle.flex1]}
                behavior={platform === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}>
                    <AppHeader
                        iconL1={
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { changeRoute(navigation, 'pop') }}
                                style={centralStyle.mx2}>
                                <Title
                                    title={t(`Cancel`)}
                                    type='Poppin-14'
                                    color={Colors.primary}
                                    weight='600' />
                            </TouchableOpacity>
                        }
                        iconR1={
                            <TouchableOpacity
                                activeOpacity={.8}
                                style={centralStyle.mx2}>
                                <Title
                                    title={t(`Done`)}
                                    type='Poppin-14'
                                    color={Colors.primary}
                                    weight='600' />
                            </TouchableOpacity>
                        }
                    />
                    <View style={centralStyle.container}>
                        {openPicker && <PicImgModal
                            disableModal={() => setOpenPicker(false)}
                            setimageUriLocal={setimageUriLocal} />}

                        <View style={centralStyle.my3}>
                            <View style={[
                                centralStyle.circle(RFPercentage(10)),
                                centralStyle.selfCenter,
                                styles.imgContainer
                            ]}>
                                <View style={[
                                    centralStyle.circle(RFPercentage(3)),
                                    styles.editIcon]}>
                                    <MaterialIcons
                                        onPress={() => setOpenPicker(true)}
                                        name={`edit`}
                                        color={Colors.primary}
                                        size={RFPercentage(2)} />
                                </View>
                                {imageUriLocal.length > 0
                                    ? < Image
                                        style={[centralStyle.width100, centralStyle.height100, centralStyle.circle(RFPercentage(10)),]}
                                        source={{ uri: imageUriLocal }} /> :
                                    <Image
                                        style={[centralStyle.width100, centralStyle.height100]}
                                        source={require('../../../../assets/app-images/userImg.png')} />
                                }
                            </View>
                        </View>
                        <OutlinedTextInput
                            title={t('firstname')}
                            val='George'
                            placeHolder={t('firstname')}
                        />
                        <OutlinedTextInput
                            val='Lee'
                            title={t('lastname')}
                            placeHolder={t('lastname')}
                        />
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
                        <OutlinedDropDown
                            title={t('Industry')}
                            onselect={(value: string) => { setselectedIndustry(value) }}
                            DATA={INDUSTRIES}
                            iconsSize={RFPercentage(2)}
                            drop_down_button_style={styles.drop_down_button_style}
                        />
                        <OutlinedDropDown
                            title={t('PrimarySpeciality')}
                            onselect={(value: string) => { setselectedIndustry(value) }}
                            DATA={INDUSTRIES}
                            iconsSize={RFPercentage(2)}
                            drop_down_button_style={styles.drop_down_button_style}
                        />
                        <View style={styles.inputContainer()}>
                            {
                                about?.length && about?.length > 0 ?
                                    <Text style={styles.inputtitle(isActive)}>{t(`About`)}</Text>
                                    : isActive &&
                                    <Text style={styles.inputtitle(isActive)}>{t(`About`)}</Text>
                            }
                            <View style={styles.textInputContainer(isActive)}>
                                <TextInput
                                    placeholder={isActive ? '' : t('About')}
                                    value={about}
                                    onFocus={() => handleFocus(setIsActive)}
                                    multiline={true}
                                    onBlur={() => handleBlur(setIsActive)}
                                    onChangeText={(val) => setAbout(val)}
                                    style={styles.input(false, isActive)} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default EditProfile;
