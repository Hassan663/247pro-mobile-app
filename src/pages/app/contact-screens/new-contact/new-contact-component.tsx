// @app
import React, { Dispatch, useCallback, useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { t } from 'i18next';
import Entypo from 'react-native-vector-icons/Entypo'
import CountryPicker, {
    CountryCode
} from 'react-native-country-picker-modal';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { AlphabetList } from 'react-native-section-alphabet-list';

import Colors from '../../../../styles/colors';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import { Img } from '../../../../core/components/image-component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './new-contact.style';
import { debounce } from "lodash";
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import {
    ALPHABET_SIZE,
    platform
} from '../../../../utilities/constants';
import {
    CreateContactAction,
    CreateSpeciality,
    handleSearch
} from '../../../../store/action/action';
import { newContactValidation } from '../../../../core/helpers/validation/validation';
import {
    RenderComponentOFPhonePropsModal,
    RenderComponentPropsModal
} from '../../../../core/modals/contact.modal';
import {
    EMAILLABELDATA,
    SECTIONLISTDATA,
} from './data';
import {
    addNewContactField,
    addNewContactFieldInPhone,
    captureImage,
    handleAttachments,
    pickImage,
    removeEmptyFields,
    removePrevField,
    removePrevFieldOfPhone,
    searchServices
} from './call-back';
import Button from '../../../../core/components/button.component';
import { useDispatch, useSelector } from 'react-redux';


export const PicImgModal = ({ setimageUriLocal, disableModal, setInputValues, inputLabel }: any) => {
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => { disableModal() }}
            style={[centralStyle.alignitemCenter, styles.uploadImageModal]}>
            <View style={styles.uploadImageModalContentContainer}>
                <TouchableOpacity onPress={() => {
                    captureImage(setimageUriLocal)
                    disableModal()
                }}
                    style={styles.captureBtn}>
                    <Title
                        title='Capture new'
                        type='Poppin-12'
                        weight='400'
                        color={Colors.fontColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    pickImage(setInputValues, inputLabel)
                    disableModal()
                }}
                    style={styles.uploadBtn}>
                    <Title
                        title='Upload from gallery'
                        type='Poppin-12'
                        weight='400'
                        color={Colors.fontColor} />
                </TouchableOpacity>

            </View>
        </TouchableOpacity >
    )
}
export const LeftIcon = (navigation?: any) => (
    <TouchableOpacity
        onPress={() => changeRoute(navigation, 'pop')}
        activeOpacity={.8}
        style={styles.mx2}>
        <Title
            color={Colors.primary}
            type='Poppin-14'
            weight='600'
            title={t('Cancel')} />
    </TouchableOpacity>
)
export const RightIcon = (dispatch?: any, inputValues?: any, isToastVisible?: boolean, setIsToastVisible?: any, toast?: any, Loader?: boolean, navigation?: any) => (
    <TouchableOpacity
        disabled={Loader}
        onPress={async () => {
            try {
                if (!isToastVisible) {
                    let isValid = await newContactValidation(inputValues.firstName);
                    if (isValid.success) {
                        if (inputValues.contactTypeId == 1 || inputValues.contactTypeId == 4) inputValues.contactSpecialities = [];
                        const contactDetails = await removeEmptyFields({ ...inputValues });
                        await dispatch(CreateContactAction(contactDetails))
                        if (!Loader) changeRoute(navigation, 'pop');
                    } else {
                        setIsToastVisible(true)
                        await toast.show(isValid.message, { type: "custom_toast" });
                        setTimeout(() => {
                            setIsToastVisible(false);
                        }, 5000);
                    }
                }
            } catch (error) {
                console.log('error--->', error)
            }
        }
        }

        activeOpacity={0.8}
        style={styles.mx2}>
        <Title
            color={inputValues.firstName.length ? Colors.primary : Colors.fontColor}
            type='Poppin-14'
            weight='600'
            title={t('Done')} />
    </TouchableOpacity>
)
export const CompanyList = ({ item, getCompany, disableSheet }: any) => {
    return (
        <TouchableOpacity onPress={() => {
            if (getCompany) { getCompany(item) }
            if (disableSheet) { disableSheet() }
        }} activeOpacity={.9} style={[centralStyle.row, { height: ALPHABET_SIZE.ITEM_HEIGHT }]}>
            <View style={[styles.companyListContainer, { height: ALPHABET_SIZE.ITEM_HEIGHT }]}>
                <View style={[centralStyle.row, styles.listWrapper]}>
                    <View style={[styles.flex1p2, centralStyle.justifyContentCenter]}>
                        <Img
                            source={{ uri: item.profilePicture }}
                            customStyle={styles.userImgStyle} />
                    </View>
                    <View style={[styles.flex8p8, centralStyle.justifyContentCenter]}>
                        <Title
                            color={Colors.black}
                            type='Poppin-14'
                            weight='600'
                            title={item.value} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const ContactModal = ({ anim, setanim, setcontactModal, getCompany, invitePeopleModal }: any) => {
    const [searchData, setSearchData] = useState<{}>();
    const [selectedTab, setSelectedTab] = useState(t('Contacts'))
    const disableSheet = () => {
        setanim('fadeOutDownBig')
        setTimeout(() => {
            setcontactModal(false)
        }, 800)
    };
    const handleTextDebounce = useCallback(debounce(async (value) => {
        let searchedData = handleSearch(value, SECTIONLISTDATA, 'value')
        setSearchData(searchedData);
    }, 400), []);

    return (
        <View style={styles.contactModalContainer}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={disableSheet}
                style={styles.disableModalContainer} />
            <Animatable.View
                duration={600}
                animation={anim}
                useNativeDriver
                iterationCount={1}
                direction="alternate"
                style={[styles.contactModalContentWrapper]}>
                <View style={[centralStyle.row, centralStyle.py1, centralStyle.px2, styles.contactModalHeader]}>
                    <View style={[centralStyle.circle(20)]} />
                    <View style={styles.headerLine} />
                    {invitePeopleModal ?
                        <View /> :
                        <View style={[centralStyle.circle(20), styles.downIconWrapper]}>
                            <AntDesign onPress={disableSheet} name={`arrowdown`} size={RFPercentage(1.5)} />
                        </View>}
                </View>
                {invitePeopleModal ?
                    <View style={centralStyle.row}>
                        <TouchableOpacity
                            onPress={() => setSelectedTab(t('Contacts'))}
                            activeOpacity={.9} style={[styles.tabContainer(selectedTab), centralStyle.XAndYCenter]}>
                            <Title
                                weight='600'
                                type='Poppin-14' color={selectedTab == t('Contacts') ? Colors.primary : Colors.fontColor}
                                title={t('Contacts')} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setSelectedTab(t('Company'))}
                            activeOpacity={.9} style={[styles.tabContainer2(selectedTab), centralStyle.XAndYCenter]}>
                            <Title type='Poppin-14'
                                weight='600'
                                color={selectedTab == t('Company') ? Colors.primary : Colors.fontColor}
                                title={t('Company')} />
                        </TouchableOpacity>
                    </View> : <></>}
                <View style={centralStyle.px2}>
                    <View style={[styles.inputWrapper, centralStyle.width100, centralStyle.row, centralStyle.my05, centralStyle.XAndYCenter, centralStyle.selfCenter]}>
                        <AntDesign
                            style={centralStyle.mx1}
                            color={Colors.gray}
                            name={`search1`}
                            size={RFPercentage(2)} />
                        <TextInput onChangeText={handleTextDebounce} placeholder={t('search')} placeholderTextColor={Colors.gray} style={styles.searchInput} />
                    </View>
                </View>
                <View style={[centralStyle.selfCenter, centralStyle.px2, { flex: 1, width: "100%" }]}>
                    <AlphabetList
                        data={searchData ? searchData : SECTIONLISTDATA}
                        letterListContainerStyle={styles.listContainerStyle}
                        showsVerticalScrollIndicator={false}
                        indexContainerStyle={{ width: 20 }}
                        indexLetterStyle={styles.letterStyle}
                        sectionHeaderHeight={ALPHABET_SIZE.HEADER_HEIGHT}
                        getItemHeight={() => ALPHABET_SIZE.ITEM_HEIGHT}
                        renderCustomItem={(item) => <CompanyList disableSheet={disableSheet} getCompany={(val: any) => getCompany && getCompany(val)} item={item} />}
                        renderCustomSectionHeader={CustomSectionHeader}
                    />
                </View>
            </Animatable.View>
        </View>
    )
}
export const CustomSectionHeader = (section: any) => {
    return (
        <View style={[styles.sectionHeaderContainer, { height: ALPHABET_SIZE.HEADER_HEIGHT }]}>
            <Title
                color={Colors.black}
                type='Poppin-14'
                weight='600'
                title={section.title} />
        </View>
    )
}

export const SelectedAttachmentUI = ({ attechments, setAttechments }: any) => {
    return (
        <View style={[styles.selectedAttachmentContainer, centralStyle.XAndYCenter, centralStyle.mb2]}>
            <TouchableOpacity
                style={[centralStyle.height100, centralStyle.width100]}
                onPress={() => handleAttachments(setAttechments)}>
                <Image
                    resizeMode='contain'
                    source={attechments.type == "application/pdf" ? require('../../../../assets/app-images/pdfIcon.png') : { uri: attechments.uri }}
                    style={[centralStyle.height100, centralStyle.width100]}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => setAttechments([])}
                style={[centralStyle.circle(RFPercentage(2.5)), styles.editIconAdd2,]}>
                <AntDesign
                    name={'close'}
                    color={Colors.primary}
                    size={RFPercentage(1.5)} />
            </TouchableOpacity>
        </View>
    )
}


export const RenderItem = ({ item }: any) => {
    return (
        <View style={[centralStyle.px2, styles.titleContainer, centralStyle.py05, centralStyle.mx2]}>
            <Title
                weight='400'
                type='Poppin-12'
                color={Colors.fontColor}
                title={item} />
        </View>
    )
}




export const renderComponentOfContactEmails = ({ item, index, inputValues, handleInputChange, setInputValues }: RenderComponentPropsModal) => {
    const condition = inputValues.contactEmails.length === index + 1;
    return (
        <View key={index?.toString()} style={[centralStyle.row, centralStyle.alignitemCenter, centralStyle.flex1]}>
            <View style={{ flex: 7 }}>
                <OutlinedTextInput
                    val={item.email}
                    onChange={(text) => handleInputChange('contactEmails', text, 'email', index)}
                    title={t('Email')} placeHolder={t('Email')} />
            </View>
            {item?.email?.length > 0 &&
                <View style={[{ flex: 2.3, marginHorizontal: RFPercentage(.6) }]}>
                    <OutlinedDropDown
                        dropDownStyle={styles.dropdownstyle}
                        title={t('Label')}
                        color={Colors.lightGray}
                        isPrimaryBorderOnFocus={true}
                        iconsSize={RFPercentage(2)}
                        onselect={(value: string) => handleInputChange('contactEmails', value, 'label', index)}
                        DATA={EMAILLABELDATA}
                        drop_down_button_style={styles.dropDownStyle()}
                    />
                </View>
            }
            {condition ? (
                <TouchableOpacity
                    onPress={() => addNewContactField(setInputValues)}
                    style={[centralStyle.flex1, centralStyle.justifyContentCenter, centralStyle.alignitemEnd, { flex: .7 }]}>
                    <AntDesign name={`plus`} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => removePrevField(index, setInputValues, inputValues)}
                    style={[centralStyle.flex1, centralStyle.justifyContentCenter, centralStyle.alignitemEnd, { flex: .7 }]}>
                    <AntDesign name={`minus`} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
                </TouchableOpacity>
            )}
        </View>
    );
}

export const RenderComponentOfPhone = ({ item, index, inputValues, HandleCountrySelect, isCountryPickerVisible, setIsCountryPickerVisible, handleInputChange, setInputValues }: RenderComponentOFPhonePropsModal) => {
    const condition = inputValues.contactPhones.length === index + 1;
    const [country, setcountry] = useState<CountryCode>('US')
    return (
        <View style={styles.inputWrapper2}>
            <TouchableOpacity
                onPress={() => setIsCountryPickerVisible(true)}
                style={styles.flagContainer}
            >
                <View style={styles.flagWrapper}>
                    <CountryPicker
                        countryCode={country}
                        withCallingCode
                        withFilter
                        withFlagButton={true}
                        onClose={() => setIsCountryPickerVisible(false)}
                        onSelect={(country) => {
                            setcountry(country.cca2)
                            HandleCountrySelect(country, index,)
                        }}
                        visible={isCountryPickerVisible}
                    />
                </View>
                <AntDesign
                    name={`down`}
                    style={styles.downIcon}
                    size={RFPercentage(2)}
                />
            </TouchableOpacity>
            <View style={[centralStyle.row, centralStyle.alignitemCenter, centralStyle.flex1]}>
                <View style={{ flex: 8.9 }} >
                    <OutlinedTextInput
                        val={item.phone}
                        onChange={(text) => handleInputChange('contactPhones', text, 'phone', index)}
                        title={t('MobilePhone')} placeHolder={t('MobilePhone')} />
                </View>
                {condition ? (
                    <TouchableOpacity
                        onPress={() => addNewContactFieldInPhone(setInputValues)}
                        style={[centralStyle.flex1, centralStyle.justifyContentCenter, centralStyle.alignitemEnd, { flex: 1.1 }]}>
                        <AntDesign name={`plus`} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => removePrevFieldOfPhone(index, setInputValues, inputValues)}
                        style={[centralStyle.flex1, centralStyle.justifyContentCenter, centralStyle.alignitemEnd, { flex: 1.1 }]}>
                        <AntDesign name={`minus`} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
                    </TouchableOpacity>
                )}
            </View>
        </View >
    );
};


export const SepecialityModal = ({ anim, setanim, setcontactModal, getSpecialityData, industryId, selectedData }: any) => {
    const dispatch: Dispatch<any> = useDispatch();
    const specialities = useSelector((state: any) => state.root.specialities);
    const [isSelectedValues, setisSelectedValues] = useState([]);
    const [dataClone, setDataClone] = useState(specialities ? specialities : []);
    const [customField, setCustomField] = useState('');

    useEffect(() => {
        if (selectedData.length > 0) setisSelectedValues(selectedData)
    }, [selectedData])

    const disableSheet = () => {
        setanim('fadeOutDownBig')
        setTimeout(() => {
            setcontactModal(false)
        }, 800);
    };

    const getSpeciality = (obj: { specialtyId: number, specialtyName: string }) => {
        let deepCopyisSelectedValues = JSON.parse(JSON.stringify(isSelectedValues))
        let alreadySelected = deepCopyisSelectedValues.findIndex((val: any) => val.specialtyId === obj.specialtyId)
        if (alreadySelected == -1) deepCopyisSelectedValues.push(obj)
        else deepCopyisSelectedValues.splice(alreadySelected, 1)
        setisSelectedValues(deepCopyisSelectedValues)
    };

    const handleSearch = async (value: string) => {
        setCustomField(value);
        if (value.length > 0) {
            const searchData = searchServices(dataClone, value)
            setDataClone(searchData)
        } else setDataClone(specialities)
    };

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    const customFieldFunc = async () => {
        await dispatch(CreateSpeciality({ industryId: industryId == 2 ? 5 : 27, name: customField }))
        await setDataClone(specialities)
    };

    return (
        <View style={styles.contactModalContainer}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={disableSheet}
                style={styles.disableModalContainer} />
            <Animatable.View
                duration={600}
                animation={anim}
                useNativeDriver
                iterationCount={1}
                direction="alternate"
                style={styles.contactModalContentWrapper}>
                <View style={[centralStyle.row, centralStyle.px3, centralStyle.py1, centralStyle.alignitemCenter, centralStyle.justifyContentBetween]}>
                    <View />
                    <View style={styles.headerLine} />
                    <View style={[centralStyle.circle(20), styles.downIconWrapper]}>
                        <AntDesign onPress={disableSheet} name={`arrowdown`} size={RFPercentage(1.5)} />
                    </View>
                </View>
                <View style={[centralStyle.row, centralStyle.my05, centralStyle.justifyContentEvenly, centralStyle.selfCenter, centralStyle.width100, { height: RFPercentage(5) }]}>
                    <View style={[styles.inputWrapper, centralStyle.row, centralStyle.XAndYCenter]}>
                        <AntDesign
                            style={centralStyle.mx1}
                            color={Colors.fontColor}
                            name={`search1`}
                            size={RFPercentage(2)} />
                        <TextInput onChangeText={handleTextDebounce} placeholder={t('search')} style={styles.searchInput} />
                    </View>
                    <View style={{ width: '15%', height: RFPercentage(5) }}>
                        <Button
                            title={t(`Add`)}
                            callBack={() => {
                                disableSheet()
                                isSelectedValues.length > 0 && getSpecialityData(isSelectedValues)
                            }}
                            customStyle={styles.specialityModalcustomStyle}
                            titleStyle={styles.specialityModaltitleStyle}
                        />
                    </View>
                </View>
                <View >
                    <View>
                        {dataClone?.length > 0 ?
                            <View style={centralStyle.my05}>
                                <FlatList
                                    data={dataClone && dataClone}
                                    renderItem={({ item, index }) => <SpecialityRenderModal
                                        selectedData={selectedData}
                                        getSpecialities={(get: { specialtyId: number, specialtyName: string }) => getSpeciality(get)}
                                        key={index.toString()}
                                        item={item}
                                        index={index} />}
                                />
                            </View> :
                            <Button
                                icon={<AntDesign size={RFPercentage(2)} name='plus' color={Colors.primary} />}
                                title={` ${t(`Create`)} ` + customField}
                                titleStyle={{ color: Colors.primary }}
                                callBack={customFieldFunc}
                                customStyle={centralStyle.m2}
                            />}
                    </View>
                </View>
            </Animatable.View >
        </View >
    )
};

const SpecialityRenderModal = ({ item, index, getSpecialities, selectedData }: any) => {

    const [isSelected, setisSelected] = useState(false)
    const toggleCheckbox = () => {
        setisSelected(!isSelected)
        getSpecialities({ specialtyId: item.id, specialtyName: item.name })
    };
    useEffect(() => {
        if (selectedData.length > 0) {
            const isAlready = selectedData.findIndex(({ specialtyName }: { specialtyName: string }) => specialtyName == item.name);
            if (isAlready !== -1) setisSelected(true)
        }
    }, [selectedData.length]);

    return (
        <TouchableOpacity
            onPress={toggleCheckbox}
            activeOpacity={.8}
            style={[centralStyle.row, centralStyle.justifyContentBetween, centralStyle.mx2, centralStyle.my05]}>
            <Title
                type='Poppin-14'
                title={item.name}
            />
            <MaterialIcons
                color={isSelected ? Colors.primary : Colors.fontColor}
                name={isSelected ? 'check-box' : 'check-box-outline-blank'}
                size={RFPercentage(2.5)} />
        </TouchableOpacity>
    );
};


export const SpecialityTags = ({ item, index, removeSpeciality }: { item: { specialtyName: string }, index: number, removeSpeciality: any }) => {
    return (
        <View style={styles.specialitytags}>
            <Title
                type='Poppin-12'
                title={item.specialtyName}
            />
            <TouchableOpacity
                onPress={() => removeSpeciality(index)}
            >
                <Entypo
                    name={`cross`}
                    style={styles.downIcon}
                    color={Colors.fontColor}
                    size={RFPercentage(2)}
                />
            </TouchableOpacity>
        </View>
    )
};