import {
    useEffect,
    useRef,
    useState
} from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
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
import { search } from "./call-back";
import { styles } from "./edit-company-profile.style";
import { platform } from "../../../../../utilities";
import { pickImage } from "../../../contact-screens/new-contact/call-back";
import { AddInputSheet } from "../../../biz-card-screens/edit-biz-card/edit-biz-card-component";
import { handleOnSelect } from "../../../contact-screens/edit-company/call-back";
import { CONTACTTYPEDATA } from "../../../contact-screens/edit-company/data";
import {
    closeSheet,
    openSheet
} from "../../../../../store/action/action";
import {
    centralStyle,
    heightFlex1
} from "../../../../../styles/constant.style";
import {
    ALLPHOTOSDATA,
    COUNTRYDATA,
    INSDUSTRYTAGS,
    PHOTOTABSDATA,
    RADIOBTNDATA,
    SERVICEDATA,
    SPECIALITYDATA
} from "./data";

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
                    onPress={() => openSheet(addSpecialitysheetRef)}
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

export const EditOverView = () => {

    const [imageUriLocal, setimageUriLocal] = useState('')
    const [selectedType, setSelectedType] = useState('first');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<any>('PK');
    const [country, setcountry] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [newField, setNewField] = useState<string>('')
    const [contactInfoInputs, setcontactInfoInputs] = useState<any>([])
    const [specialties, setspecialties] = useState<any>([])

    const addSpecialitysheetRef = useRef<any>(null)
    const addNewSpecialitysheetRef = useRef<any>(null)
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
                        ))}
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
                        ))}
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
                    callBack={() => { openSheet(sheetRef) }}
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
                        addNewSpecialitysheetRef={addNewSpecialitysheetRef}
                        addSpecialitysheetRef={addSpecialitysheetRef}
                        specialties={specialties} />
                </RBSheet>
                <RBSheet
                    ref={addNewSpecialitysheetRef}
                    height={heightFlex1 * 9}
                    closeOnPressMask={true}
                    closeOnDragDown={true}
                    openDuration={250}
                    animationType={`slide`}
                    customStyles={{ container: styles.specialitySheetContainer }}
                >
                    <SafeAreaView style={centralStyle.container}>

                        <AddSpeciality
                            setspecialties={setspecialties}
                            AddNewSpeciality
                            specialties={specialties} />
                    </SafeAreaView>
                </RBSheet>
            </View>
        </>
    )
}

export const AddSpeciality = ({
    specialties,
    setspecialties,
    AddNewSpeciality,
    addNewSpecialitysheetRef,
    addSpecialitysheetRef,
    AddNewService
}: any) => {

    const [specialtiesData, setspecialtiesData] = useState(SPECIALITYDATA)
    const [searchInput, setsearchInput] = useState('')

    const handleNewSpeciality = async () => {
        if (addSpecialitysheetRef) closeSheet(addSpecialitysheetRef)
        if (addNewSpecialitysheetRef) setTimeout(() => {
            setspecialties([])
            openSheet(addNewSpecialitysheetRef)
        }, 500);
    }

    const handleCreateSpeciality = () => {
        SPECIALITYDATA.unshift(searchInput)
        setspecialtiesData(SPECIALITYDATA)
        setsearchInput('')
    }
    const handlewOnChangeText = (text: string) => {
        setsearchInput(text)
        search(text, specialtiesData, setspecialtiesData, SPECIALITYDATA)
    }

    return (
        <View style={centralStyle.container}>
            <Title
                title={t(AddNewSpeciality ? `AddNewSpecialty` : AddNewService ? 'AddNewService' : `AddSpeciality`)}
                type='Poppin-18'
                textAlignCenter="center"
                color={Colors.black}
                weight='600' />
            <View style={[
                (AddNewSpeciality || AddNewService) ? styles.sheetBody2 : styles.sheetBody,
                centralStyle.p1,
                centralStyle.my1,
                centralStyle.mb2,]}>

                <TextInput
                    onChangeText={handlewOnChangeText}
                    value={searchInput}
                    placeholder={t('search')}
                    style={styles.searchInput} />

                {specialtiesData.length > 0 ?
                    <>
                        <View style={[centralStyle.row, centralStyle.justifyContentBetween, centralStyle.my1]}>
                            <Title
                                title={specialties.length + " " + t(`selected`)}
                                type='Poppin-16'
                                textAlignCenter="center"
                                color={Colors.fontColor}
                                weight='400' />
                            <TouchableOpacity
                                onPress={handleNewSpeciality}
                                activeOpacity={.8}
                                style={[centralStyle.row, centralStyle.XAndYCenter]}>
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
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={specialtiesData}
                            renderItem={({ item, index }) => (
                                <CheckBox
                                    setspecialties={setspecialties}
                                    specialties={specialties}
                                    item={item}
                                    index={index} />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </>
                    :
                    <>
                        <View style={centralStyle.my2}>
                            <Title
                                title={t('Nodatafound')}
                                type='Poppin-16'
                                color={Colors.black}
                                weight='400' />

                        </View>
                        {(AddNewSpeciality || AddNewService) &&
                            <TouchableOpacity
                                onPress={handleCreateSpeciality}
                                activeOpacity={.9}
                            >
                                <Title
                                    title={t(`Create`) + ' ' + searchInput + ' ' + t('asnewspecialty')}
                                    type='Poppin-14'
                                    color={Colors.primary}
                                    weight='600' />
                            </TouchableOpacity>
                        }
                    </>
                }
            </View>
            <Button
                titleStyle={styles.btnStyle}
                title={t(`SaveChanges`)}
                disable={specialties.length > 0 ? false : true}
                primary={specialties.length > 0 ? true : false}
            />
        </View>
    )
}

export const CheckBox = ({ item, index, specialties, setspecialties }: any) => {

    const handleCheckBox = () => {
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

    let isAlreadySelect = specialties.findIndex((val: string) => val == item)

    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={handleCheckBox}
            style={[centralStyle.row, centralStyle.alignitemCenter]}>
            <View style={[styles.checkSquareContainer, centralStyle.my05, centralStyle.mr1,]}>
                {isAlreadySelect !== -1 &&
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

export const ServiceUi = () => {
    const [specialties, setspecialties] = useState<any>([])
    const addSpecialitysheetRef = useRef(null)
    return (

        <View style={centralStyle.container}>
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => openSheet(addSpecialitysheetRef)}
                style={[
                    centralStyle.row,
                    centralStyle.flex1,
                    centralStyle.justifyContentBetween,
                    centralStyle.alignitemCenter,
                    centralStyle.my2,
                ]}>
                <Title
                    color={Colors.black}
                    type='Poppin-18'
                    weight='600'
                    title={t('Services')} />
                <AntDesign name={`plus`} size={RFPercentage(2)} />
            </TouchableOpacity>
            <FlatList
                data={SERVICEDATA}
                contentContainerStyle={styles.serviceListContainer}
                renderItem={ServiceListUi}
                keyExtractor={(item, index) => index.toString()}
            />
            <RBSheet
                ref={addSpecialitysheetRef}
                height={heightFlex1 * 9}
                closeOnPressMask={true}
                closeOnDragDown={true}
                openDuration={250}
                animationType={`slide`}
                customStyles={{ container: styles.specialitySheetContainer }}
            >
                <AddSpeciality
                    setspecialties={setspecialties}
                    addSpecialitysheetRef={addSpecialitysheetRef}
                    AddNewService
                    specialties={specialties} />
            </RBSheet>
        </View>
    )
}
export const ServiceListUi = ({ item, index }: { item: any; index: number }) => (
    <View style={[
        styles.serviceListWrapper(index),
        centralStyle.row,
        centralStyle.alignitemCenter,
        centralStyle.justifyContentBetween,
        centralStyle.px1]}>
        <Title
            color={Colors.black}
            type='Poppin-14'
            weight='400'
            title={item} />
        <AntDesign name={`delete`} color={Colors.red} size={RFPercentage(2)} />
    </View>
)

export const EdtiPhotos = () => {
    const [selectedTab, setSelectedTab] = useState(t('All'))
    const sheetRef = useRef(null)

    return (
        <View>
            <View style={centralStyle.row}>
                {PHOTOTABSDATA.map((item, index) => (
                    <TouchableOpacity
                        key={index.toString()}
                        onPress={() => setSelectedTab(t(item))}
                        activeOpacity={.9} style={[
                            styles.tabsContainer(selectedTab, item),
                            centralStyle.XAndYCenter]}>
                        <Title
                            weight='400'
                            type='Poppin-12' color={selectedTab == item ? Colors.primary : Colors.fontColor}
                            title={item} />
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={[centralStyle.justifyContentBetween, centralStyle.px2,]}
                contentContainerStyle={[centralStyle.my1]}
                data={ALLPHOTOSDATA}
                renderItem={({ item, index }) => {
                    return (
                        index == 0
                            ?
                            defaultUi(sheetRef) :
                            <View>
                                <Image
                                    style={styles.posterImg}
                                    source={require('../../../../../assets/app-images/labor.png')} />
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    style={[
                                        centralStyle.circle(RFPercentage(2.5)),
                                        styles.closeContainer,
                                        centralStyle.XAndYCenter]}>
                                    <AntDesign
                                        name={`close`}
                                        color={Colors.fontColor}
                                        size={RFPercentage(2)} />
                                </TouchableOpacity>
                            </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
            <RBSheet
                ref={sheetRef}
                height={heightFlex1 * 5}
                closeOnPressMask={true}
                closeOnDragDown={true}
                openDuration={250}
                animationType={`slide`}
                customStyles={{
                    container: styles.specialitySheetContainer,
                    draggableIcon: styles.draggableIconstyle
                }}
            >
                <PickFromDocumentCenter sheetRef={sheetRef} />
            </RBSheet>
        </View>
    )
}

const PickFromDocumentCenter = ({ sheetRef }: any) => {
    const [imgUrl, setImgURL] = useState('')

    useEffect(() => {
        if (imgUrl.length > 0) { closeSheet(sheetRef) }
    }, [imgUrl])

    return (
        <SafeAreaView style={centralStyle.flex1}>
            <View style={[centralStyle.flex1, centralStyle.justifyContentCenter]}>
                <TouchableOpacity
                    onPress={() => { pickImage(setImgURL) }}
                    activeOpacity={.8}
                    style={[centralStyle.row, centralStyle.selfCenter]}>
                    <Title
                        weight='400'
                        type='Poppin-16'
                        color={Colors.primary}
                        title={t(`Upload`)} />
                    <View style={centralStyle.mx05}>
                        <Title
                            weight='400'
                            type='Poppin-16'
                            color={Colors.black}
                            title={t(`filefromyourdevice`)} />
                    </View>
                </TouchableOpacity>
                <View style={[centralStyle.selfCenter]}>
                    <Title
                        weight='400'
                        type='Poppin-12'
                        color={Colors.gray}
                        title={t(`Maximum5fileseachupload`)} />
                </View>
                <View style={[centralStyle.row, centralStyle.XAndYCenter, centralStyle.my2]}>
                    <View style={styles.orLine}></View>
                    <Title
                        weight='400'
                        type='Poppin-16'
                        color={Colors.gray}
                        title={t(`OR`)} />
                    <View style={styles.orLine}></View>
                </View>
                <View style={[centralStyle.row, centralStyle.selfCenter]}>
                    <View style={centralStyle.mx05}>
                        <Title
                            weight='400'
                            type='Poppin-16'
                            color={Colors.black}
                            title={t(`Pickfrom`)} />
                    </View>
                    <Title
                        weight='400'
                        type='Poppin-16'
                        color={Colors.primary}
                        title={t(`DocumentCenter`)} />
                </View>
            </View>
            <View style={[centralStyle.width90, centralStyle.selfCenter]}>
                <Button
                    titleStyle={styles.btnStyle}
                    title={t(`SaveChanges`)}
                    primary={true}
                />
            </View>
        </SafeAreaView>
    )
}

export const defaultUi = (sheetRef: any) => {
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => openSheet(sheetRef)}
            style={[
                styles.posterImg,
                styles.uploadImgContainer,
                centralStyle.row,
                centralStyle.XAndYCenter]}>
            <AntDesign
                name={`plus`}
                style={centralStyle.mx05}
                color={Colors.fontColor}
                size={RFPercentage(2.5)} />
            <Title
                weight='400'
                type='Poppin-20'
                color={Colors.fontColor}
                title={t('Photos')} />
        </TouchableOpacity>
    )
}