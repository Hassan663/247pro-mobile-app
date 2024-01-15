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

import { CONTACTLIST } from './data';
import { styles } from './contact.style';
import { platform } from '../../../../utilities';
import { centralStyle } from '../../../../styles/constant.style';
import { changeRoute } from '../../../../core/helpers/async-storage';
import {
    getProContacts,
    specialityCount
} from './call-back';
import { SPECIALITIES_LIST } from '../../../../utilities/contact-data';
import { Title } from '../../../../core/components/screen-title.component';
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

const Contact: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [importModal, setImportModal] = useState(false)
    const [modalEnabled, setmodalEnabled] = useState(false)
    const [contactModal, setcontactModal] = useState<boolean>(false);
    const [contactCategory, setContactCategory] = useState();
    const [specialityModal, setSpecialityModal] = useState<boolean>(false);
    const [pageIndex, setpageIndex] = useState<number>(1);
    const [searchInput, setSearchInput] = useState('')
    const [anim, setanim] = useState<string>('fadeInUpBig');
    const [selectedTab, setSelectedTab] = useState(t('Contacts'))
    const [listData, setlistData] = useState<[]>([]);
    const [searchListData, setsearchListData] = useState<[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<any>([])
    const [selectedProType, setSelectedProType] = useState<any>([])
    const [selectedSupplierType, setSelectedSupplierType] = useState<any>([])
    const [contactTypes, setContactTypes] = useState<any>([])
    const [specialityListData, setSpecialityListData] = useState<any>([])

    const sheetRef = useRef<any>(null)
    const contact = useSelector((state: any) => state.root.contacts)
    const searchedData = useSelector((state: any) => state.root.searchedData)

    const handleChangeRoute = (item: IData) => {
        if (selectedTab == t('Contacts')) changeRoute(navigation, 'ViewContact', item)
        else changeRoute(navigation, 'ViewCompany', item)
    }

    const dispatch: Dispatch<any> = useDispatch();

    const loadMoreData = () => {
        if (searchInput.length < 2) dispatch(ContactAction(setpageIndex, pageIndex));
    };

    const handleSearch = async (value: string) => {
        try {
            setSearchInput(value)
            if (value && value.length > 1) {
                await dispatch(SearchContactAction(value));
            }
        } catch (error) {
            console.log('error--->', error)
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    const getMoreContact = async (contact: string | any[]) => {
        if (contact.length > 0) {
            await setlistData([])
            const contactClone = await JSON.parse(JSON.stringify(contact));
            await contactClone.forEach(function (obj: any) { obj.value = obj.fullName; });
            await setlistData(contactClone)
        }
    }
    useEffect(() => {
        getMoreContact(contact)
    }, [contact]);

    useEffect(() => {
        if (searchedData.length > 0) {
            const searchContactClone = JSON.parse(JSON.stringify(searchedData));
            searchContactClone.forEach(function (obj: any) { obj.value = obj.fullName; });
            setsearchListData(searchContactClone)
        }
    }, [searchedData]);

    const contactTypesFunc = async () => {
        const response = await specialityCount()
        if (response && response.data) setContactTypes(response.data.resultData);
    }

    useEffect(() => {
        dispatch(ContactAction(setpageIndex, pageIndex));
        if (SPECIALITIES_LIST.length > 0) {
            const specialityDataClone = JSON.parse(JSON.stringify(SPECIALITIES_LIST));
            specialityDataClone.forEach(function (obj: any) { obj.value = obj.name; obj.key = obj.id; });
            setSpecialityListData(specialityDataClone)
        }
        contactTypesFunc()
    }, []);
    const proContacts = async (val: any) => {
        await setSelectedProType(val);
        const response = await getProContacts(dispatch, 2, val.id);
    };
    const SupplierContacts = async (val: any) => {
        await setSelectedSupplierType(val);
        const response = await getProContacts(dispatch, 3, val.id);
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
                            contactTypes={contactTypes}
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
                        onPress={() => {
                            sheetRef.current.open()
                        }}
                        size={RFPercentage(2.5)} name='filter-list' />
                </View>
                <View style={[listData.length ? centralStyle.XAndYStart : centralStyle.XAndYCenter, centralStyle.flex1,]}>

                    {listData.length ?
                        <View style={[centralStyle.px2, { flex: 1, width: "100%" }]}>
                            {searchInput.length > 0 ?
                                < AlphabetList
                                    data={searchListData}
                                    letterListContainerStyle={styles.listContainerStyle}
                                    showsVerticalScrollIndicator={false}
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
                                // onEndReached={loadMoreData}
                                // onEndReachedThreshold={0.1}
                                />
                                :
                                <AlphabetList
                                    data={listData}
                                    letterListContainerStyle={styles.listContainerStyle}
                                    showsVerticalScrollIndicator={false}
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
                                />}
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
                        data={specialityListData}
                        setcontactModal={setSpecialityModal} />}
            </View >
        </>

    );
};

export default Contact;
