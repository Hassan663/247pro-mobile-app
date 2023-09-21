// @app
import React, {
    useState,
    useRef
} from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    FlatList,
    Text,
} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RBSheet from 'react-native-raw-bottom-sheet';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
import CountryPicker, {
    Country,
} from 'react-native-country-picker-modal';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import OutlinedTextInput from '../../../../core/components/Outlined-TextInput.component';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import { styles } from './new-contact.style';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { Title } from '../../../../core/components/screen-title.component';
import { CONTACTTYPEDATA, SECTIONLISTDATA } from './data';
import { platform } from '../../../../utilities';
import { CompanyList, LeftIcon, PicImgModal, RightIcon } from './new-contact-component';
import {
    centralStyle,
    heightFlex1,
} from '../../../../styles/constant.style';
import Input from '../../../../core/components/input.component';
import { AlphabetList } from 'react-native-section-alphabet-list';


const NewContact: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [openPicker, setOpenPicker] = useState(false);
    const [imageUriLocal, setimageUriLocal] = useState('');
    const [selectedIndustry, setselectedIndustry] = useState<string>('');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<any>('PK');
    const [showMore, setShowMore] = useState<boolean>(false);
    const [contactModal, setcontactModal] = useState<boolean>(true);

    const sheetRef = useRef<any>(null)

    const handleOnSelect = (country: Country) => {
        setIsCountryPickerVisible(false);
        setCountryCode(country.cca2);
    };

    return (
        <>
            <KeyboardAvoidingView
                style={[centralStyle.flex1]}
                behavior={platform === 'ios' ? 'padding' : 'height'}
            >
                <SafeAreaView style={styles.container}>
                    <AppHeader
                        iconL1={LeftIcon(navigation)}
                        iconR1={RightIcon()}
                        type='Poppin-18'
                        weight='600'
                        title={t(`NewContact`)} />

                    <ScrollView
                        showsVerticalScrollIndicator={false}>
                        <TouchableOpacity
                            onPress={() => setOpenPicker(true)}
                            style={[centralStyle.circle(RFPercentage(16)), styles.imgContainer]}>
                            {imageUriLocal.length > 0
                                ?
                                <Image
                                    style={styles.profileImage}
                                    source={{ uri: imageUriLocal }} /> :
                                <SimpleLineIcons name={'picture'} size={RFPercentage(4)} />
                            }
                        </TouchableOpacity>

                        {openPicker && <PicImgModal disableModal={() => setOpenPicker(false)} setimageUriLocal={setimageUriLocal} />}

                        <View style={styles.mx2}>
                            <View style={centralStyle.my1}>
                                <OutlinedDropDown
                                    dropDownStyle={styles.dropdownstyle}
                                    title={t('Contacttype')}
                                    color={Colors.lightGray}
                                    fontSize={RFPercentage(1.5)}
                                    iconsSize={RFPercentage(2)}
                                    onselect={(value: string) => { setselectedIndustry(value) }}
                                    DATA={CONTACTTYPEDATA}
                                    drop_down_button_style={[styles.dropDownStyle,]}
                                />
                            </View>
                            <OutlinedTextInput
                                title={t('firstname')}
                                placeHolder={t('firstname')}
                            />
                            <OutlinedTextInput
                                title={t('lastname')}
                                placeHolder={t('lastname')}
                            />
                            <OutlinedTextInput
                                title={t('Companyname')}
                                placeHolder={t('Companyname')}
                            />
                            <OutlinedDropDown
                                dropDownStyle={styles.dropdownstyle}
                                title={t('Industry')}
                                color={Colors.lightGray}
                                fontSize={RFPercentage(1.5)}
                                iconsSize={RFPercentage(2)}
                                onselect={(value: string) => { setselectedIndustry(value) }}
                                DATA={CONTACTTYPEDATA}
                                drop_down_button_style={[styles.dropDownStyle,]}
                            />
                            <OutlinedDropDown
                                dropDownStyle={styles.dropdownstyle}
                                title={t('Speciality')}
                                color={Colors.lightGray}
                                fontSize={RFPercentage(1.5)}
                                iconsSize={RFPercentage(2)}
                                onselect={(value: string) => { setselectedIndustry(value) }}
                                DATA={CONTACTTYPEDATA}
                                drop_down_button_style={[styles.dropDownStyle,]}
                            />
                            <OutlinedTextInput
                                title={t('jobTitle')}
                                placeHolder={t('jobTitle')}
                            />
                            <OutlinedTextInput
                                title={t('Websiteurl')}
                                placeHolder={t('Websiteurl')}
                            />
                            <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                                <View style={{ flex: 9 }}>
                                    <OutlinedTextInput
                                        title={t('Email')}
                                        placeHolder={t('Email')}
                                    />

                                </View>
                                <View style={[centralStyle.flex1, centralStyle.justifyContentCenter, centralStyle.alignitemEnd]}>
                                    <AntDesign name={`plus`} size={RFPercentage(3)} />
                                </View>
                            </View>
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
                                        title={t('MobilePhone')}
                                        placeHolder={t('MobilePhone')}
                                    />
                                </View>
                            </View>
                            {!showMore && <TouchableOpacity onPress={() => { setShowMore(true) }} activeOpacity={.9}>
                                <Title
                                    color={Colors.primary}
                                    type='Poppin-14'
                                    weight='600'
                                    title={t('SHOWMORE')} />

                            </TouchableOpacity>}
                            {showMore &&
                                <>
                                    <OutlinedDropDown
                                        dropDownStyle={styles.dropdownstyle}
                                        title={t('country')}
                                        color={Colors.lightGray}
                                        fontSize={RFPercentage(1.5)}
                                        iconsSize={RFPercentage(2)}
                                        onselect={(value: string) => { setselectedIndustry(value) }}
                                        DATA={CONTACTTYPEDATA}
                                        drop_down_button_style={[styles.dropDownStyle,]}
                                    />
                                    <OutlinedTextInput
                                        title={t('StreetAddress')}
                                        placeHolder={t('StreetAddress')}
                                    />
                                    <OutlinedTextInput
                                        title={t('StreetAddressLine2')}
                                        placeHolder={t('StreetAddressLine2')}
                                    />
                                    <OutlinedTextInput
                                        title={t('City')}
                                        placeHolder={t('City')}
                                    />
                                    <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                                        <View style={styles.leftSide}>
                                            <OutlinedTextInput
                                                title={t('State')}
                                                placeHolder={t('State')}
                                            />
                                        </View>
                                        <View style={styles.rightSide}>
                                            <OutlinedTextInput
                                                title={t('ZipCode')}
                                                placeHolder={t('ZipCode')}
                                            />
                                        </View>
                                    </View>
                                    <OutlinedTextInput
                                        title={t('PObox')}
                                        placeHolder={t('PObox')}
                                    />
                                    <OutlinedTextInput
                                        title={t('Label')}
                                        placeHolder={t('Label')}
                                    />
                                    <View style={[centralStyle.my1]}>
                                        <Title
                                            color={Colors.black}
                                            type='Poppin-18'
                                            weight='600'
                                            title={t('Linktocompany')} />
                                    </View>
                                    <TouchableOpacity
                                        // onPress={() => { sheetRef?.current?.open() }}
                                        onPress={(() => setcontactModal(true))}
                                        style={[centralStyle.row, centralStyle.my1, centralStyle.alignitemCenter]}>
                                        <View style={[centralStyle.circle(RFPercentage(4)), styles.selectCompany,]}>
                                            <AntDesign name={`plus`} color={Colors.white} size={RFPercentage(2.5)} />
                                        </View>
                                        <Title
                                            color={Colors.fontColor}
                                            type='Poppin-16'
                                            weight='400'
                                            title={t('SelectAcompany')} />
                                    </TouchableOpacity>
                                    <View style={[centralStyle.my1]}>
                                        <Title
                                            color={Colors.black}
                                            type='Poppin-18'
                                            weight='600'
                                            title={t('Attachment')} />
                                    </View>
                                    <View style={[styles.AttechmentIcon, centralStyle.XAndYCenter, centralStyle.mb2]}>
                                        <AntDesign name={`plus`} color={Colors.fontColor} size={RFPercentage(2.5)} />
                                    </View>
                                </>
                            }
                            {showMore &&
                                <TouchableOpacity onPress={() => { setShowMore(false) }} activeOpacity={.9}>
                                    <Title
                                        color={Colors.primary}
                                        type='Poppin-14'
                                        weight='600'
                                        title={t('SHOWLESS')} />
                                </TouchableOpacity>}
                        </View>

                    </ScrollView >
                    {contactModal &&
                        <View style={{ position: 'absolute', height: "100%", width: "100%", justifyContent: "flex-end", alignItems: "flex-end", backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2 }}>
                            <TouchableOpacity activeOpacity={1} onPress={(() => setcontactModal(false))} style={{ height: '20%', width: "100%" }}></TouchableOpacity>
                            <View style={{ height: '80%', width: '100%', backgroundColor: Colors.white, overflow: "hidden", borderRadius: RFPercentage(2), }}>
                                <View style={[centralStyle.row, centralStyle.px2, centralStyle.py1, { alignItems: "center", justifyContent: "space-between", }]}>
                                    <View />
                                    <View style={{ height: 3, width: '20%', borderRadius: RFPercentage(2), backgroundColor: Colors.fontColor }}></View>
                                    <View style={[centralStyle.circle(20), styles.downIconWrapper]}>
                                        <AntDesign name={`arrowdown`} size={RFPercentage(1.5)} />
                                    </View>

                                </View>
                                <View style={[styles.inputWrapper, centralStyle.row, centralStyle.my05, centralStyle.XAndYCenter]}>
                                    <AntDesign
                                        style={centralStyle.mx1}
                                        name={`search1`}
                                        size={RFPercentage(2)} />
                                    <TextInput placeholder='Search' style={{ flex: 1, height: '100%', }} />
                                </View>
                                <View style={[centralStyle.px2, { height: heightFlex1 * 6 }]}>
                                    <AlphabetList
                                        data={SECTIONLISTDATA}
                                        letterListContainerStyle={{ justifyContent: 'space-between', paddingVertical: RFPercentage(1) }}
                                        showsVerticalScrollIndicator={false}
                                        indexContainerStyle={{ width: 20 }}
                                        indexLetterStyle={{
                                            textAlign: 'right',
                                            color: Colors.fontColor,
                                            fontSize: 15,
                                            width: 20,
                                        }}
                                        renderCustomItem={(item) => (
                                            <CompanyList item={item} />
                                            // <View style={styles.listItemContainer}>
                                            //     <Text style={styles.listItemLabel}>{item.value}</Text>
                                            // </View>
                                        )}
                                        renderCustomSectionHeader={(section) => (
                                            <View style={styles.sectionHeaderContainer}>
                                                <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
                                            </View>
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                    }
                </SafeAreaView >
            </KeyboardAvoidingView >
        </>

    );
};

export default NewContact;
