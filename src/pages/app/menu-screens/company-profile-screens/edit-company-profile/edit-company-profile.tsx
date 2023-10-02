// @app
import React, {
    useRef,
    useState
} from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../../../core/components/app-headers';
import Colors from '../../../../../styles/colors';
import TabsUi from '../company-profile/company-profile-component';
import OutlinedDropDown from '../../../../../core/components/outlined-dropdown.component';
import OutlinedTextInput from '../../../../../core/components/Outlined-TextInput.component';
import Button from '../../../../../core/components/button.component';
import { Title } from '../../../../../core/components/screen-title.component';
import { styles } from './edit-company-profile.style';
import { platform } from '../../../../../utilities';
import { changeRoute } from '../../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../../styles/constant.style';
import { AddInputSheet } from '../../../biz-card-screens/edit-biz-card/edit-biz-card-component';
import { CONTACTTYPEDATA } from '../../../contact-screens/edit-company/data';
import {
    IndustryTagUI,
    JobTypePreference,
    MobilePhoneUI
} from './edit-company-profile-component';
import {
    COUNTRYDATA,
    INSDUSTRYTAGS,
    RADIOBTNDATA,
    TABSDATA
} from './data';

const EditCompanyProfile: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState(t('Overview'))
    const [selectedType, setSelectedType] = useState('first');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<any>('PK');
    const [country, setcountry] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [addSocialAccountInput, setaddSocialAccountInput] = useState(false)
    const [newField, setNewField] = useState<string>('')
    const [contactInfoInputs, setcontactInfoInputs] = useState<any>([])

    const sheetRef = useRef<any>(null)

    return (
        <KeyboardAvoidingView
            style={[centralStyle.flex1]}
            behavior={platform === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView style={styles.container}>

                <AppHeader
                    iconL1={
                        <TouchableOpacity
                            onPress={() => changeRoute(navigation, 'pop')}
                            activeOpacity={.8}
                            style={centralStyle.mx2}>
                            <Title
                                color={Colors.primary}
                                type='Poppin-14'
                                weight='600'
                                title={t('Cancel')} />
                        </TouchableOpacity>
                    }
                    iconR1={
                        <View style={centralStyle.mx2}>
                            <Title
                                color={Colors.primary}
                                type='Poppin-14'
                                weight='600'
                                title={t('Done')} />
                        </View>
                    }
                    type='Poppin-18'
                    weight='600'
                    title={t(`EditCompanyProfile`)} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={centralStyle.row}>
                        {TABSDATA.map((item, index) => (
                            <TabsUi
                                item={item}
                                index={index}
                                setSelectedTab={setSelectedTab}
                                selectedTab={selectedTab} />
                        ))}
                    </View>
                    <View style={[
                        styles.companyLogoContainer,
                        centralStyle.XAndYCenter,
                        centralStyle.mx2,
                        centralStyle.my2
                    ]}>
                        <Image style={styles.galleryImg} source={require('../../../../../assets/app-images/Group.png')} />
                        <Title
                            title={t(`Companylogo`)}
                            type='Poppin-10'
                            color={Colors.fontColor}
                            weight='400' />
                    </View>
                    <View style={centralStyle.mx2}>
                        <OutlinedTextInput
                            title={t('Companyname')}
                            placeHolder={t('Companyname')}
                        />
                        <View style={centralStyle.my05}>
                            <Title
                                color={Colors.black}
                                type='Poppin-14'
                                weight='600'
                                title={t('Industry')} />
                            <View style={[centralStyle.wrap, centralStyle.row]}>
                                {INSDUSTRYTAGS.map((item, index) => <IndustryTagUI item={item} index={index} />)}
                            </View>
                        </View>
                        <View style={centralStyle.my05}>
                            <Title
                                color={Colors.black}
                                type='Poppin-14'
                                weight='600'
                                title={t('Speciality')} />
                            <View style={[centralStyle.wrap, centralStyle.row]}>
                                {INSDUSTRYTAGS.map((item, index) => <IndustryTagUI item={item} index={index} />)}
                            </View>
                        </View>
                        <Title
                            color={Colors.black}
                            type='Poppin-14'
                            weight='600'
                            title={t('Jobtypepreferences')} />

                        {RADIOBTNDATA.map((item, index) => <JobTypePreference
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                            item={item} index={index} />)}

                        <MobilePhoneUI
                            countryCode={countryCode}
                            setIsCountryPickerVisible={setIsCountryPickerVisible}
                            isCountryPickerVisible={isCountryPickerVisible}
                            setCountryCode={setCountryCode}
                        />
                        <View style={[centralStyle.width100, centralStyle.row, centralStyle.alignitemCenter, centralStyle.justifyContentBetween]}>
                            <View style={[styles.width90]}>
                                <OutlinedTextInput
                                    val={`abc123@gmail.com`}
                                    title={t('Email')}
                                    placeHolder={t('Email')} />
                            </View>
                            <AntDesign
                                name={`plus`}
                                style={styles.downIcon}
                                size={RFPercentage(2)}
                            />
                        </View>
                        <OutlinedTextInput
                            val={`www.247pro.com`}
                            title={t('Websiteurl')}
                            placeHolder={t('Websiteurl')} />
                        <View style={[centralStyle.row, centralStyle.justifyContentBetween, centralStyle.my1]}>
                            <Title
                                title={t(`Address 1`)}
                                type='Poppin-14'
                                color={Colors.black}
                                weight='600' />
                            <AntDesign
                                name={`plus`}
                                style={styles.downIcon}
                                size={RFPercentage(2)}
                            />
                        </View>
                        <OutlinedDropDown
                            dropDownStyle={styles.dropdownstyle}
                            title={t('country')}
                            defaultValueByIndex={1}
                            color={Colors.lightGray}
                            fontSize={RFPercentage(1.5)}
                            iconsSize={RFPercentage(2)}
                            onselect={(value: string) => { setcountry(value) }}
                            DATA={COUNTRYDATA}
                            drop_down_button_style={[styles.dropDownStyle,]}
                        />
                        <OutlinedTextInput
                            val={t('Addressline1')}
                            title={t('Addressline1')}
                            placeHolder={t('Addressline1')} />

                        <OutlinedTextInput
                            val='2715 Ash Dr. San Jose, South Dakota 83475'
                            title={t('Addressline2')}
                            placeHolder={t('Addressline2')} />
                        <OutlinedTextInput
                            val='New York'
                            title={t('City')}
                            placeHolder={t('City')} />

                        <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                            <View style={styles.leftSide}>
                                <OutlinedDropDown
                                    dropDownStyle={styles.dropdownstyle}
                                    title={t('State')}
                                    defaultValueByIndex={1}
                                    color={Colors.lightGray}
                                    fontSize={RFPercentage(1.5)}
                                    iconsSize={RFPercentage(2)}
                                    onselect={(value: string) => { setState(value) }}
                                    DATA={['California', 'California', ...CONTACTTYPEDATA]}
                                    drop_down_button_style={[styles.dropDownStyle,]}
                                />
                            </View>
                            <View style={styles.rightSide}>
                                <OutlinedTextInput
                                    val='123456'
                                    title={t('ZipCode')}
                                    placeHolder={t('ZipCode')} />
                            </View>
                        </View>

                        <OutlinedTextInput title={t('PO Box')} placeHolder={t('PO Box')} />
                        <OutlinedTextInput
                            val='CA Lic# 55555'
                            title={t('License')}
                            placeHolder={t('License')} />
                        <OutlinedTextInput
                            val='CA Lic# 55555'
                            title={t('Insurance')}
                            placeHolder={t('Insurance')} />
                        <OutlinedTextInput
                            val='CA Lic# 55555'
                            title={t('Numberofstaff')}
                            placeHolder={t('Numberofstaff')} />
                        <OutlinedTextInput
                            val='$1,00,000'
                            title={t('Annualrevenue')}
                            placeHolder={t('Annualrevenue')} />

                        <View style={[centralStyle.width100, centralStyle.row, centralStyle.alignitemCenter, centralStyle.justifyContentBetween]}>
                            <View style={[styles.width90]}>
                                <OutlinedTextInput
                                    val='abc123@gmail.com'
                                    title={t('CFBond')}
                                    placeHolder={t('CFBond')} />
                            </View>
                            <AntDesign
                                name={`plus`}
                                style={styles.downIcon}
                                size={RFPercentage(2)}
                            />
                        </View>

                        <View style={[centralStyle.mb1]}>
                            {contactInfoInputs?.map((item: any, index: number) => {
                                return (
                                    <OutlinedTextInput
                                        key={index.toString()}
                                        title={item}
                                        placeHolder={item}
                                    />
                                )
                            })}
                        </View>

                        <Button
                            callBack={() => {
                                sheetRef?.current?.open()
                                setaddSocialAccountInput(false)
                            }}
                            icon={
                                <AntDesign name={'plus'}
                                    size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)}
                                    color={Colors.primary} />
                            }
                            customStyle={[
                                centralStyle.mb3,
                                centralStyle.row,
                                centralStyle.alignitemCenter,
                                styles.addCustomField,]}
                            title={t('AddCustomField')}
                            titleStyle={styles.addCustomFieldTitle} />



                        <RBSheet
                            ref={sheetRef}
                            height={RFPercentage(35)}
                            closeOnPressMask={true}
                            closeOnDragDown={true}
                            openDuration={250}
                            animationType={`slide`}
                            customStyles={{ container: { borderRadius: RFPercentage(2) } }}
                        >
                            <AddInputSheet
                                contactInfoInputs={contactInfoInputs}
                                setcontactInfoInputs={setcontactInfoInputs}
                                sheetRef={sheetRef}
                                placeHolder={t(`Entercustomfieldlabel`)}
                                newField={newField}
                                addSocialAccountInput={addSocialAccountInput}
                                title={t('AddCustomField')}
                                btnText={t(`SaveField`)}
                                setNewField={setNewField}
                            />
                        </RBSheet>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default EditCompanyProfile;
