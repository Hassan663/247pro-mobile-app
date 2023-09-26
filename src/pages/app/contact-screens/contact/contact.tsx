// @app
import React, {
    useRef,
    useState
} from 'react';
import {
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/Button';
import { platform } from '../../../../utilities';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './contact.style';
import { CONTACTLIST } from './data';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { AlphabetList } from 'react-native-section-alphabet-list';
import { SECTIONLISTDATA } from '../new-contact/data';
import {
    centralStyle,
    heightFlex1,
} from '../../../../styles/constant.style';
import {
    CompanyList,
    ContactModal,
    CustomSectionHeader,
    // FilesModal
} from '../new-contact/new-contact-component';
import {
    ConnectionRequest,
    FilesCompany,
    FilesModal,
    FilterCompany,
    ImportModal,
    RenderItem
} from './contact.components';

const Contact: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState(t('Contacts'))
    const [modalEnabled, setmodalEnabled] = useState(false)
    const [importModal, setImportModal] = useState(false)
    const [contacts, setContacts] = useState(true)
    const [contactModal, setcontactModal] = useState<boolean>(false);
    const [selectedCompany, setSelectedCompany] = useState<any>([])
    const [anim, setanim] = useState<string>('fadeInUpBig');

    const sheetRef = useRef<any>(null)
    const filesSheetRef = useRef<any>(null)

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, }}
            >
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
                    title={t(`Contacts`)} />

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

                <View style={[centralStyle.flex1, { backgroundColor: 'white' }]}>
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
                            renderItem={({ item }) => <RenderItem item={item} />}
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
                            style={[centralStyle.flex1, centralStyle.height100, centralStyle.mx1,]}
                            placeholder={t('search')}
                        />
                        <MaterialIcons
                            onPress={() => setcontactModal(true)}
                            size={RFPercentage(2.5)} name='filter-list' />
                    </View>
                    <View style={[contacts ? centralStyle.XAndYStart : centralStyle.XAndYCenter, centralStyle.pb10, centralStyle.flex1]}>
                        {contacts ?
                            <View style={[centralStyle.px2, { height: heightFlex1 * 6, width: "100%" }]}>
                                <AlphabetList
                                    data={SECTIONLISTDATA}
                                    letterListContainerStyle={styles.listContainerStyle}
                                    showsVerticalScrollIndicator={false}
                                    indexContainerStyle={{ width: 20 }}
                                    indexLetterStyle={styles.letterStyle}
                                    renderCustomItem={(item) => <CompanyList
                                        getCompany={() => { changeRoute(navigation, 'ViewCompany') }}
                                        item={item} />}
                                    renderCustomSectionHeader={CustomSectionHeader}
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
                                    callBack={() => { if (selectedTab == t('Company')) { changeRoute(navigation, 'NewCompany') } }}
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
                </View >
            </KeyboardAvoidingView>

        </>

    );
};

export default Contact;
