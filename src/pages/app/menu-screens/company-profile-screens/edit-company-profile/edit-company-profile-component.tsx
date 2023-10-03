import {
    FlatList,
    Image,
    TextInput,
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
    RADIOBTNDATA,
    SPECIALITYDATA
} from "./data";
import { useRef, useState } from "react";
import { pickImage } from "../../../contact-screens/new-contact/call-back";

export const IndustryTagUI = ({ item, index, addSpecialitysheetRef }: any) => {
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
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => addSpecialitysheetRef.current.open()}
                    key={index.toString()}
                    style={centralStyle.XAndYCenter}>
                    <AntDesign color={Colors.fontColor} name={`plus`} size={RFPercentage(2)} />
                </TouchableOpacity>
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
    // selectedType,
    // setSelectedType,
    // countryCode,
    // setIsCountryPickerVisible,
    // contactInfoInputs,
    // isCountryPickerVisible,
    // setCountryCode,
    // setcountry,
    // setState,
    // // sheetRef,
    // setcontactInfoInputs,
    // newField,
    // addSocialAccountInput,
    // setNewField,
    // setaddSocialAccountInput,
}: any) => {

    const [imageUriLocal, setimageUriLocal] = useState('')
    const [selectedType, setSelectedType] = useState('first');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<any>('PK');
    const [country, setcountry] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [addSocialAccountInput, setaddSocialAccountInput] = useState(false)
    const [newField, setNewField] = useState<string>('')
    const [contactInfoInputs, setcontactInfoInputs] = useState<any>([])
    const [specialties, setspecialties] = useState<any>([])

    const addSpecialitysheetRef = useRef<any>(null)
    const sheetRef = useRef<any>(null)

    return (
        <>
            <TouchableOpacity activeOpacity={.8}
                onPress={() => { pickImage(setimageUriLocal) }}
                style={[
                    styles.companyLogoContainer,
                    centralStyle.XAndYCenter,
                    centralStyle.mx2,
                    centralStyle.my2
                ]}>

                {imageUriLocal.length > 0 ?
                    <Image
                        style={styles.companylogoImg}
                        source={{ uri: imageUriLocal }} /> :
                    <>
                        <Image style={styles.galleryImg} source={require('../../../../../assets/app-images/Group.png')} />
                        <Title
                            title={t(`Companylogo`)}
                            type='Poppin-10'
                            color={Colors.fontColor}
                            weight='400' />
                    </>

                }
            </TouchableOpacity>
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
                        {INSDUSTRYTAGS.map((item, index) => (<IndustryTagUI
                            item={item}
                            addSpecialitysheetRef={addSpecialitysheetRef}
                            index={index} />
                        )
                        )}
                    </View>
                </View>
                <View style={centralStyle.my05}>
                    <Title
                        color={Colors.black}
                        type='Poppin-14'
                        weight='600'
                        title={t('Speciality')} />
                    <View style={[centralStyle.wrap, centralStyle.row]}>
                        {INSDUSTRYTAGS.map((item, index) => (<IndustryTagUI
                            item={item}
                            addSpecialitysheetRef={addSpecialitysheetRef}
                            index={index} />
                        )
                        )}
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
                        title={t(`Address`) + " 1"}
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
                <RBSheet
                    ref={addSpecialitysheetRef}
                    height={RFPercentage(50)}
                    closeOnPressMask={true}
                    closeOnDragDown={true}
                    openDuration={250}
                    animationType={`slide`}
                    customStyles={{ container: styles.specialitySheetContainer }}
                >
                    <AddSpeciality
                        setspecialties={setspecialties}
                        specialties={specialties} />
                </RBSheet>
            </View>
        </>
    )
}
export const AddSpeciality = ({ specialties, setspecialties }: any) => {
    return (
        <View style={centralStyle.container}>
            <Title
                title={t(`AddSpeciality`)}
                type='Poppin-18'
                textAlignCenter="center"
                color={Colors.black}
                weight='600' />
            <View style={[styles.sheetBody, centralStyle.p1, centralStyle.my1, centralStyle.mb2,]}>
                <TextInput placeholder={t('search')} style={styles.searchInput} />
                <View style={[centralStyle.row, centralStyle.justifyContentBetween, centralStyle.my1]}>
                    <Title
                        title={'0 ' + t(`selected`)}
                        type='Poppin-16'
                        textAlignCenter="center"
                        color={Colors.fontColor}
                        weight='400' />
                    <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                        <AntDesign
                            color={Colors.primary}
                            name={`plus`}
                            size={RFPercentage(2)} />
                        <Title
                            title={t(`CreateNew`)}
                            type='Poppin-14'
                            textAlignCenter="center"
                            color={Colors.primary}
                            weight='600' />
                    </View>
                </View>
                <FlatList
                    data={SPECIALITYDATA}
                    renderItem={({ item, index }) => (<CheckBox
                        setspecialties={setspecialties}
                        specialties={specialties}
                        item={item}
                        index={index} />
                    )
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <Button
                titleStyle={{
                    color: Colors.white,
                    textTransform: "uppercase",
                }}
                title={t(`Save Changes`)}
                disable={specialties.length > 0 ? false : true}
                primary={specialties.length > 0 ? true : false}
            />
        </View>
    )
}
export const CheckBox = ({ item, index, specialties, setspecialties }: any) => {
    const [isCheck, setIsCheck] = useState(false)
    const handleCheckBox = () => {
        setIsCheck(!isCheck)
        let index = specialties.findIndex((val: any) => val == item)
        let copyArr = JSON.parse(JSON.stringify(specialties));
        if (index == -1) {
            copyArr.push(item)
            setspecialties(copyArr)
        } else {
            copyArr.splice(index, 1)
            setspecialties(copyArr)
        }
    }
    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={handleCheckBox}
            style={[centralStyle.row, centralStyle.alignitemCenter]}>
            <View style={[styles.checkSquareContainer, centralStyle.my05, centralStyle.mr1,]}>
                {isCheck &&
                    <AntDesign
                        name={`checksquare`}
                        color={index == 0 ? Colors.fontColor : Colors.primary}
                        size={RFPercentage(2.1)} />
                }
            </View>
            <Title
                title={item}
                type='Poppin-16'
                textAlignCenter="center"
                color={Colors.black}
                weight='400' />
        </TouchableOpacity>

    )
}