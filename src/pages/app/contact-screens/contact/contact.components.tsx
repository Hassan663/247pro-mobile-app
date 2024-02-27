// @app
import React,
{
    useCallback,
    useEffect,
    useState
} from 'react';
import {
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo'
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { t } from 'i18next';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import { styles } from './contact.style';
import { debounce } from "lodash";
import { openSheet } from '../new-contact/call-back';
import { AlphabetList } from 'react-native-section-alphabet-list';
import { CompanyList } from '../new-contact/new-contact-component';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { Title } from '../../../../core/components/screen-title.component';
import {
    FILESDATA,
    contactTypefilter
} from './call-back';
import {
    RFPercentage,
    RFValue
} from 'react-native-responsive-fontsize';
import {
    centralStyle,
    heightFlex1
} from '../../../../styles/constant.style';
import { handleSearch } from '../../../../store/action/action';
import { ALPHABET_SIZE } from '../../../../utilities/constants';
import { SEARCHEDDATA } from '../../../../store/constant/constant';

export const RenderItem = ({ item, index, contactCategory, setContactCategory, dispatch, setSpecialityModal, setanim, selectedProType, selectedSupplierType, contactTypes, contact }: any) => {
    const [allData, setAllData] = useState(0);
    const handlePress = async () => {
        dispatch({ type: SEARCHEDDATA, payload: [] })
        await setContactCategory(index);
        if (contactCategory !== index && index !== 0) {
            if (index === 1 && typeof (contact[1]) === 'undefined') await contactTypefilter(index, dispatch);
            else if (index === 2 && typeof (contact[2]) === 'undefined') await contactTypefilter(index, dispatch);
            else if (index === 3 && typeof (contact[3]) === 'undefined') await contactTypefilter(index, dispatch);
            else if (index === 4 && typeof (contact[4]) === 'undefined') await contactTypefilter(index, dispatch);
        };
    };
    useEffect(() => {
        let allData = 0;
        contactTypes.map((val: any) => { allData = allData + val.count })
        setAllData(allData)
    }, [contactTypes.length]);

    return (
        <>
            <View style={styles.titleContainer(contactCategory, index)}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={handlePress}
                >
                    <Title
                        weight='400'
                        type='Poppin-12'
                        color={Colors.fontColor}
                        title={item}
                    />
                </TouchableOpacity >
                {contactCategory === index && index !== 0 && index !== 1 && index !== 4 ? (
                    <TouchableOpacity
                        onPress={() => openSheet(setanim, setSpecialityModal)}
                        activeOpacity={0.7}
                        style={styles.renderItemSpecialityType}>
                        <Title
                            weight='400'
                            type='Poppin-12'
                            color={Colors.fontColor}
                            title={contactCategory === 2 ? selectedProType?.length == 0 ? `${t('All')} (${contactTypes[index - 1]?.count}) ` : selectedProType?.value : selectedSupplierType?.length == 0 ? `${t('All')} (${contactTypes[index - 1]?.count}) ` : selectedSupplierType?.value}
                        />
                        <Entypo name='chevron-down' color={Colors.fontColor} size={RFPercentage(2)} />
                    </TouchableOpacity>
                ) :
                    index === 0 && typeof contactTypes[index]?.count !== 'undefined' ?
                        <TouchableOpacity onPress={handlePress}>
                            < Title
                                weight='400'
                                type='Poppin-12'
                                color={Colors.fontColor}
                                title={` (${allData})`}
                            />
                        </TouchableOpacity>
                        :
                        index > 0 && typeof contactTypes[index - 1]?.count !== 'undefined' ?
                            <TouchableOpacity
                                activeOpacity={.7}
                                onPress={handlePress}
                            >
                                <Title
                                    weight='400'
                                    type='Poppin-12'
                                    color={Colors.fontColor}
                                    title={` (${contactTypes[index - 1]?.count})`}
                                />
                            </TouchableOpacity> : <></>
                }
            </View>
        </>
    )
}
const handleMoreOptions = (navigation: any, name: any, disableModal: any) => {
    changeRoute(navigation, name)
    disableModal()
}
export const ImportModal: React.FC<{ disableModal?: any, navigation?: any, openfiles?: any }> = ({ disableModal, navigation, openfiles }) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            style={[styles.modalContainerAbs, centralStyle.XAndYCenter, styles.bgTransparent]}>

            <TouchableOpacity
                activeOpacity={.9}
                style={[styles.importModalContainer, centralStyle.row]}>

                <View style={[{ flex: 2.5 }, centralStyle.XAndYCenter]}>
                    <FontAwesome name={`folder-o`} size={RFPercentage(3)} />
                </View>

                <View style={[{ flex: 7.5, }, centralStyle.justifyContentCenter]}>

                    <View style={{ width: '70%' }}>
                        <Title
                            weight='400'
                            type='Poppin-12'
                            color={Colors.black}
                            title={t(`Allow247protoaccessphotosmediaandfilesonyourdevice`)} />
                    </View>

                    <View style={[centralStyle.row, centralStyle.selfEnd]}>
                        <Button
                            title={t('Deny')}
                            callBack={() => { disableModal() }}
                            customStyle={[centralStyle.XAndYCenter,]}
                            titleStyle={{ color: Colors.primary }}
                        />
                        <Button
                            title={t('Allow')}
                            callBack={() => {
                                disableModal()
                                openfiles()
                            }}
                            customStyle={[centralStyle.XAndYCenter, centralStyle.mx4]}
                            titleStyle={{ color: Colors.primary }}
                        />
                    </View>

                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export const ConnectionRequest: React.FC<{ disableModal?: any, navigation?: any, importModalEnable?: any }> = ({ disableModal, importModalEnable, navigation }) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => { disableModal() }}
            style={styles.modalContainerAbs}>
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                }}
                style={styles.modalContainer}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => { handleMoreOptions(navigation, 'ConnectionRequests', disableModal) }}>
                    <Title
                        title={t('ConnectionRequests')}
                        weight='400'
                        color={Colors.fontColor}
                        type='Poppin-12' />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={centralStyle.mt1}
                    onPress={() => { handleMoreOptions(navigation, 'NewCompany', disableModal) }}>
                    <Title
                        title={t('AddCompany')}
                        weight='400'
                        color={Colors.fontColor}
                        type='Poppin-12' />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={centralStyle.mt1}
                    onPress={() => { handleMoreOptions(navigation, 'NewContact', disableModal) }}>
                    <Title
                        title={t('AddContact')}
                        weight='400'
                        color={Colors.fontColor}
                        type='Poppin-12' />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={centralStyle.mt1}
                    onPress={() => { importModalEnable(), disableModal() }}
                >
                    <Title
                        title={t('Import')}
                        weight='400'
                        color={Colors.fontColor}
                        type='Poppin-12' />
                </TouchableOpacity>
            </TouchableOpacity>
        </TouchableOpacity >
    )
}
export const FilterCompany: React.FC<{}> = ({ }) => {
    const [miles, setMiles] = useState(0);
    const handleSliderChange = (value: any) => { setMiles(value.toFixed(0)) };
    return (
        <View
            style={[centralStyle.XAndYCenter, centralStyle.px2, centralStyle.flex1]}>
            <Title
                color={Colors.black}
                type='Poppin-18'
                weight='600'
                title={t('FilterCompany')} />
            <View style={{}}>
                <OutlinedTextInput
                    height={RFValue(65)}
                    title={t("Address")}
                    placeHolder={t("Address")}
                />
                <View style={[centralStyle.row, centralStyle.alignitemCenter, styles.justifyContentBetween, centralStyle.my2]}>
                    <Slider
                        style={styles.sliderStyle}
                        minimumValue={0}
                        maximumValue={30}
                        minimumTrackTintColor={Colors.primary}
                        maximumTrackTintColor={Colors.lightGrey}
                        thumbImage={require('../../../../assets/app-images/thumbImg.png')} // Set a custom image for the thumb
                        onValueChange={handleSliderChange} // Attach the event handler
                    />
                    <Title
                        color={Colors.black}
                        type='Poppin-12'
                        weight='400'
                        title={miles + " " + t('mile')} />
                </View>
            </View>
            <View style={centralStyle.width100}>
                <Button
                    title={t(`ApplyFilter`)}
                    primary />
                <Button
                    title={t('ClearFilters')}
                    customStyle={[centralStyle.XAndYCenter, centralStyle.p2,]}
                    titleStyle={styles.clearFiler}
                />
            </View>
        </View>
    )
}
export const FilesCompany: React.FC<{}> = ({ }) => {
    return (
        <View
            style={[centralStyle.XAndYCenter, centralStyle.px2, centralStyle.flex1, centralStyle.my2]}>
            <Title
                color={Colors.black}
                type='Poppin-18'
                weight='600'
                title={t('Files')} />
            <FlatList
                data={FILESDATA}
                numColumns={3}
                contentContainerStyle={centralStyle.pb5}
                columnWrapperStyle={[styles.listContentContainerStyle, centralStyle.my1,]}
                renderItem={({ item }) => (
                    <View style={styles.filesListContainer}>
                        <View style={centralStyle.width80}>
                            <Image
                                style={[centralStyle.height100, centralStyle.width100]}
                                resizeMode='contain'
                                source={require('../../../../assets/app-images/sheetIcon.png')}></Image>
                        </View>
                        <Title
                            color={Colors.black}
                            textAlignCenter='center'
                            type='Poppin-12'
                            weight='400'
                            title={t('Contacts.xlxx')} />
                    </View>
                )}
                keyExtractor={(_item, index) => index.toString()}
            />
        </View>
    )
}
export const FilesModal = ({ anim, setanim, setcontactModal, getCompany }: any) => {
    const disableSheet = () => {
        setanim('fadeOutDownBig')
        setTimeout(() => {
            setcontactModal(false)
        }, 800)
    };
    return (
        <View style={styles.contactModalContainer}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={disableSheet}
                style={styles.disableModalContainer} />
            <Animatable.View
                duration={600}
                useNativeDriver
                animation={anim}
                iterationCount={1}
                direction="alternate"
                style={styles.contactModalContentWrapper}>

                <View style={[centralStyle.row, centralStyle.px2, centralStyle.py1, styles.contactModalHeader]}>
                    <View style={styles.headerLine} />
                </View>

                <FilesCompany />

            </Animatable.View>
        </View>
    )
}
export const SepecialityModal = ({ anim, setanim, setcontactModal, getCompany, data }: any) => {
    const [searchData, setSearchData] = useState<{}[]>();
    const disableSheet = () => {
        setanim('fadeOutDownBig')
        setTimeout(() => {
            setcontactModal(false)
        }, 800)
    };

    const handleTextDebounce = useCallback(debounce((value) => {
        let searchedData = handleSearch(value, data,)
        setSearchData(searchedData)
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
                style={styles.specialityModalContentWrapper}>
                <View style={[centralStyle.row, centralStyle.px2, centralStyle.py1, styles.specialityModalHeader]}>
                    <View style={[centralStyle.circle(20),]} />
                    <View style={styles.headerLine} />
                    <View style={[centralStyle.circle(20), styles.downIconWrapper]}>
                        <AntDesign onPress={disableSheet} name={`arrowdown`} size={RFPercentage(1.5)} />
                    </View>
                </View>
                <View style={[styles.inputWrapper, centralStyle.row, centralStyle.my05, centralStyle.XAndYCenter]}>
                    <AntDesign
                        style={centralStyle.mx1}
                        color={Colors.fontColor}
                        name={`search1`}
                        size={RFPercentage(2)} />
                    <TextInput onChangeText={handleTextDebounce} placeholder={t('search')} style={styles.searchInput} />
                </View>
                <View style={[centralStyle.px2, { flex: heightFlex1 * 6, }]}>
                    <AlphabetList
                        data={searchData ? searchData : data}
                        sectionHeaderHeight={ALPHABET_SIZE.HEADER_HEIGHT}
                        getItemHeight={() => ALPHABET_SIZE.ITEM_HEIGHT}
                        letterListContainerStyle={styles.specialitylistContainerStyle}
                        showsVerticalScrollIndicator={false}
                        indexContainerStyle={{ width: 20 }}
                        indexLetterStyle={styles.letterStyle}
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
        <View style={{ height: ALPHABET_SIZE.HEADER_HEIGHT }} >
            <Title
                color={Colors.black}
                type='Poppin-14'
                weight='600'
                title={section.title} />
        </View >
    )
}