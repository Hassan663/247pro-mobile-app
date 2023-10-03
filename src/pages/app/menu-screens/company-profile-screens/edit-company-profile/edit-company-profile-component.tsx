import {
    Image,
    TouchableOpacity,
    View
} from "react-native";

import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import CountryPicker from 'react-native-country-picker-modal';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { t } from "i18next";
import { RFPercentage } from "react-native-responsive-fontsize";

import Colors from "../../../../../styles/colors";
import OutlinedTextInput from "../../../../../core/components/Outlined-TextInput.component";
import OutlinedDropDown from "../../../../../core/components/outlined-dropdown.component";
import Button from "../../../../../core/components/button.component";
import { Title } from "../../../../../core/components/screen-title.component";
import { styles } from "./edit-company-profile.style";
import { platform } from "../../../../../utilities";
import { centralStyle } from "../../../../../styles/constant.style";
import { AddInputSheet } from "../../../biz-card-screens/edit-biz-card/edit-biz-card-component";
import { handleOnSelect } from "../../../contact-screens/edit-company/call-back";
import { CONTACTTYPEDATA } from "../../../contact-screens/edit-company/data";
import {
    COUNTRYDATA,
    INSDUSTRYTAGS,
    RADIOBTNDATA
} from "./data";

export const IndustryTagUI = ({ item, index }: any) => {
    return (
        <>
            <View key={index.toString()} style={[{ backgroundColor: Colors.lightGrey, borderRadius: RFPercentage(.5), marginRight: RFPercentage(1) }, centralStyle.p1, centralStyle.my1, centralStyle.row, centralStyle.XAndYCenter]}>
                <View style={centralStyle.mx05}>
                    <Title
                        color={Colors.fontColor}
                        type='Poppin-10'
                        weight='400'
                        title={item} />

                </View>
                <AntDesign name={`close`} size={RFPercentage(1.5)} />
            </View>
            {index == INSDUSTRYTAGS.length - 1 &&
                <View key={index.toString()} style={centralStyle.XAndYCenter}>
                    <AntDesign color={Colors.fontColor} name={`plus`} size={RFPercentage(2)} />
                </View>
            }
        </>

    )
}
export const JobTypePreference = ({ item, index, selectedType, setSelectedType }: any) => {

    return (
        <TouchableOpacity
            onPress={() => setSelectedType(item)}
            key={index.toString()} style={[centralStyle.row, centralStyle.alignitemCenter]}>
            <Fontisto
                size={RFPercentage(1.5)}
                name={selectedType == item ? `radio-btn-active` : 'radio-btn-passive'}
                style={[
                    centralStyle.mr1,
                    centralStyle.my1,
                    { color: selectedType == item ? Colors.primary : Colors.fontColor }]} />
            <Title
                color={Colors.fontColor}
                type='Poppin-14'
                weight='400'
                title={item} />
        </TouchableOpacity>
    )
}
export const MobilePhoneUI = ({ countryCode, setIsCountryPickerVisible, isCountryPickerVisible, setCountryCode, }: any) => {
    return (
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
                        onSelect={(country) => handleOnSelect(country, setIsCountryPickerVisible, setCountryCode)}
                        visible={isCountryPickerVisible}
                    />
                </View>
                <AntDesign
                    name={`down`}
                    style={[styles.downIcon,]}
                    size={RFPercentage(2)}
                />
            </TouchableOpacity>
            <View style={styles.phoneNumberInput}>
                <OutlinedTextInput title={t('MobilePhone')} placeHolder={t('MobilePhone')} />
            </View>
        </View>
    )
}
export const EditOverView = ({
    selectedType,
    setSelectedType,
    countryCode,
    setIsCountryPickerVisible,
    contactInfoInputs,
    isCountryPickerVisible,
    setCountryCode,
    setcountry,
    setState,
    sheetRef,
    setcontactInfoInputs,
    newField,
    addSocialAccountInput,
    setNewField,
    setaddSocialAccountInput, }: any) => {
    return (
        <>
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
        </>
    )
}