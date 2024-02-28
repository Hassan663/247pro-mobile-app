// @app
import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import {
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo'
import { t } from 'i18next';
import { Dispatch } from 'redux';
import { debounce } from "lodash";
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    useDispatch,
    useSelector
} from 'react-redux';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import Button from '../../../../core/components/button.component';

import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './contact.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { CONTACTLIST } from './data';
import { centralStyle } from '../../../../styles/constant.style';
import { SpecialityModal } from '../../../../core/modals/contact.modal';
import {
    contactTypefilter,
    getProContacts,
    specialities,
    specialityCount
} from './call-back';
import {
    ContactAction,
    SearchContactAction
} from '../../../../store/action/action';
import {
    AlphabetList,
    IData
} from 'react-native-section-alphabet-list';
import {
    CompanyList,
    CustomSectionHeader,
} from '../new-contact/new-contact-component';
import {
    ConnectionRequest,
    FilesModal,
    FilterCompany,
    ImportModal,
    RenderItem,
    SepecialityModal,
} from './contact.components';
import { ALPHABET_SIZE } from '../../../../utilities/constants';

const Contact: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [importModal, setImportModal] = useState(false)
    const [modalEnabled, setmodalEnabled] = useState(false)
    const [contactModal, setcontactModal] = useState<boolean>(false);
    const [contactCategory, setContactCategory] = useState<number>(0);
    const [specialityModal, setSpecialityModal] = useState<boolean>(false);
    const [pageIndex, setpageIndex] = useState<number>(1);
    const [clientpageIndex, setClientpageIndex] = useState<number>(2);
    const [propageIndex, setPropageIndex] = useState<number>(2);
    const [supplierpageIndex, setSupplierpageIndex] = useState<number>(2);
    const [staffpageIndex, setStaffpageIndex] = useState<number>(2);
    const [searchInput, setSearchInput] = useState('')
    const [anim, setanim] = useState<string>('fadeInUpBig');
    const [selectedTab, setSelectedTab] = useState(t('Contacts'))
    const [listData, setlistData] = useState<[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<any>([])
    const [selectedProType, setSelectedProType] = useState<any>([])
    const [selectedSupplierType, setSelectedSupplierType] = useState<any>([])
    const [contactTypes, setContactTypes] = useState<any>([])
    const [supplierSpecialityListData, setSupplierSpecialityListData] = useState<SpecialityModal>()
    const [proSpecialityListData, setProSpecialityListData] = useState<SpecialityModal>()

    const sheetRef = useRef<any>(null)
    const contact = useSelector((state: any) => state.root.contacts)
    const searchedData = useSelector((state: any) => state.root.searchedData)
    const totalContacts = useSelector((state: any) => state.root.totalContacts)

    const handleChangeRoute = (item: IData) => {
        if (selectedTab == t('Contacts')) changeRoute(navigation, 'ViewContact', item)
        else changeRoute(navigation, 'ViewCompany', item)
    }
    const dispatch: Dispatch<any> = useDispatch();

    const loadMoreData = async () => {
        if (searchedData.length > 0) {
        } else {
            let seletectTabRecords = totalContacts.filter((val: any) => val.id == contactCategory)
            if (contactCategory == 0) {
                if (seletectTabRecords[0].totalRecords > listData.length) {
                    if (searchInput.length < 2) dispatch(ContactAction(setpageIndex, pageIndex));
                }
            } else if (contactCategory == 1) {
                if (seletectTabRecords[0].totalRecords > listData.length) {
                    await contactTypefilter(1, dispatch, setClientpageIndex, clientpageIndex);
                }
            } else if (contactCategory == 2) {
                if (seletectTabRecords[0].totalRecords > listData.length) {
                    await contactTypefilter(2, dispatch, setPropageIndex, propageIndex);
                }
            } else if (contactCategory == 3) {
                if (seletectTabRecords[0].totalRecords > listData.length) {
                    await contactTypefilter(3, dispatch, setSupplierpageIndex, supplierpageIndex);
                }
            } else if (contactCategory == 4) {
                if (seletectTabRecords[0].totalRecords > listData.length) {
                    await contactTypefilter(4, dispatch, setStaffpageIndex, staffpageIndex);
                }
            }
        }
    };
    const handleSearch = async (value: string) => {
        try {
            setSearchInput(value)
            if (value && value.length > 0) {
                await dispatch(SearchContactAction(value, contactCategory));
            }
            else await setlistData(contact[contactCategory]?.contacts)
        } catch (error) {
            console.log('error--->', error)
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [contact, searchedData])

    const getMoreContact = async (contact: string | any[]) => {
        const contactClone = await JSON.parse(JSON.stringify(contact));
        console.log(contact, 'contact', contactCategory)
        if (contact.length > 0) {
            let selectedTabData = contactClone.filter((val: any) => val.id == contactCategory)
            console.log(selectedTabData, 'selectedTabData')
            setlistData(selectedTabData[0]?.contacts)
            // if (contactClone[0]?.id === contactCategory && contactClone[0]?.contacts) setlistData(contactClone[0]?.contacts)
            // else {
            //     if (contactCategory === 1 && contactClone[1]?.contacts.length > 0) setlistData(contactClone[1]?.contacts);
            //     else if (contactCategory === 2 && contactClone[2]?.contacts.length > 0) setlistData(contactClone[2]?.contacts);
            //     else if (contactCategory === 3 && contactClone[3]?.contacts.length > 0) setlistData(contactClone[3]?.contacts);
            //     else if (contactCategory === 4 && contactClone[4]?.contacts.length > 0) setlistData(contactClone[4]?.contacts);
            // }
        }
        else setlistData([])
    };

    useEffect(() => {
        getMoreContact(contact);
    }, [contact, contactCategory]);

    useEffect(() => {
        if (searchedData.length > 0) {
            const searchContactClone = JSON.parse(JSON.stringify(searchedData));
            searchContactClone.forEach((obj: any) => {
                if (obj.id === contactCategory) {
                    setlistData(obj.contacts);
                }
            })
        }
    }, [searchedData]);

    const contactTypesFunc = async () => {
        await specialityCount(dispatch)
    }

    const getSpeciality = async () => {
        const response = await specialities();
        if (response && response.data) {
            const specialityDataClone = JSON.parse(JSON.stringify(response.data.resultData));
            specialityDataClone.forEach(function (obj: any) { obj.value = obj.name; obj.key = obj.id; });
            const idustryId27 = specialityDataClone.filter((obj: SpecialityModal) => obj.industryId === 27);
            const idustryId5 = specialityDataClone.filter((obj: SpecialityModal) => obj.industryId === 5);
            setSupplierSpecialityListData(idustryId27);
            setProSpecialityListData(idustryId5);
        }
    }

    useEffect(() => {
        dispatch(ContactAction(setpageIndex, pageIndex));
        contactTypesFunc();
        getSpeciality();
    }, []);

    const proContacts = async (val: any) => {
        await setSelectedProType(val);
        await getProContacts(dispatch, 2, val.id);
    };

    const SupplierContacts = async (val: any) => {
        await setSelectedSupplierType(val);
        await getProContacts(dispatch, 3, val.id);
    };

    return (
        <>
            <AppHeader
                iconR1={
                    <AntDesign
                        onPress={() => changeRoute(navigation, 'NewContact')}
                        name={`plus`}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />}
                iconR2={
                    <Entypo
                        onPress={() => setmodalEnabled(true)}
                        style={centralStyle.mx2}
                        name={`dots-three-vertical`}
                        size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />
                }
                type='Poppin-18'
                weight='600'
                title={selectedTab == t('Company') ? t('company') : t(`Contacts`)} />

            {modalEnabled && <ConnectionRequest
                importModalEnable={() => setImportModal(!importModal)}
                navigation={navigation}
                disableModal={() => setmodalEnabled(!modalEnabled)} />}

            {importModal && <ImportModal
                navigation={navigation}
                openfiles={() => setcontactModal(true)}
                disableModal={() => {
                    setanim(`fadeInUpBig`)
                    setImportModal(false)
                }}
            />}
            <View style={[centralStyle.fullHeightWithoutBottomTab, { backgroundColor: 'white' }]}>
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
                </View>
                <View style={[styles.listWrapper,]}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={centralStyle.XAndYCenter}
                        data={CONTACTLIST}
                        renderItem={({ item, index }) => <RenderItem
                            item={item}
                            index={index}
                            contactCategory={contactCategory}
                            setContactCategory={setContactCategory}
                            dispatch={dispatch}
                            setSpecialityModal={setSpecialityModal}
                            specialityModal={specialityModal}
                            setanim={setanim}
                            selectedProType={selectedProType}
                            selectedSupplierType={selectedSupplierType}
                        />
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <View style={[
                    styles.height7,
                    centralStyle.mx2,
                    centralStyle.row,
                    centralStyle.XAndYCenter]}>
                    <AntDesign size={RFPercentage(2)} name='search1' color={Colors.fontColor} />
                    <TextInput
                        onChangeText={handleTextDebounce}
                        style={[centralStyle.flex1, centralStyle.height100, centralStyle.mx1,]}
                        placeholder={t('search')}
                    />
                    <MaterialIcons
                        onPress={() => { sheetRef.current.open() }}
                        size={RFPercentage(2.5)} name='filter-list' />
                </View>
                <View style={[listData?.length ? centralStyle.XAndYStart : centralStyle.XAndYCenter, centralStyle.flex1,]}>

                    {listData?.length ?
                        <View style={[centralStyle.px2, { flex: 1, width: "100%" }]}>
                            <AlphabetList
                                data={listData}
                                letterListContainerStyle={styles.listContainerStyle}
                                showsVerticalScrollIndicator={false}
                                sectionHeaderHeight={ALPHABET_SIZE.HEADER_HEIGHT}
                                getItemHeight={() => ALPHABET_SIZE.ITEM_HEIGHT}
                                indexContainerStyle={{ width: 20 }}
                                indexLetterStyle={styles.letterStyle}
                                renderCustomItem={(item) => {
                                    return (
                                        <CompanyList
                                            getCompany={() => { handleChangeRoute(item) }}
                                            item={item} />
                                    )
                                }}
                                renderCustomSectionHeader={CustomSectionHeader}
                                onEndReached={loadMoreData}
                                onEndReachedThreshold={0.1}
                            />
                        </View>
                        :
                        <>
                            <Title type='Poppin-12'
                                weight='400'
                                color={Colors.black}
                                title={t('Youhavenocontact')} />
                            <Button
                                icon={<AntDesign size={RFPercentage(2)} name='plus' color={Colors.primary} />}
                                title={selectedTab == t('Company') ? t('AddCompany') : t('AddContact')}
                                titleStyle={{ color: Colors.primary }}
                                callBack={() => {
                                    if (selectedTab == t('Company')) { changeRoute(navigation, 'NewCompany') }
                                    else if (selectedTab == t('Contacts')) changeRoute(navigation, 'NewContact')
                                }}
                                customStyle={[centralStyle.row,
                                centralStyle.alignitemCenter,
                                centralStyle.my2,
                                styles.addContactContaienr
                                ]}
                            />
                        </>
                    }
                    <RBSheet
                        ref={sheetRef}
                        // height={RFValue(240,windowHeight)}
                        height={RFPercentage(40)}
                        closeOnPressMask={true}
                        closeOnDragDown={true}
                        openDuration={250}
                        animationType={`slide`}
                        customStyles={{ container: { borderRadius: RFPercentage(2) } }}
                    >
                        <FilterCompany />
                    </RBSheet>
                </View>
                {contactModal &&
                    <FilesModal
                        getCompany={(val: any) => { setSelectedCompany(val) }}
                        anim={anim}
                        setanim={setanim}
                        setcontactModal={setcontactModal} />}


                {specialityModal &&
                    <SepecialityModal
                        getCompany={(val: any) => {
                            contactCategory == 2 ? proContacts(val) : SupplierContacts(val)
                        }}
                        anim={anim}
                        setanim={setanim}
                        contact
                        data={contactCategory == 2 ? proSpecialityListData : supplierSpecialityListData}
                        setcontactModal={setSpecialityModal} />}
            </View >
        </>

    );
};

export default Contact;
