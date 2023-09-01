// @app
import React, {
    useRef,
    useState
} from 'react';
import {
    View,
    KeyboardAvoidingView,
    TextInput,
    FlatList,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AppHeader from '../../../core/components/app-headers';
import RBSheet from 'react-native-raw-bottom-sheet';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import { styles } from './market-place.style';
import { platform } from '../../../utilities';
import { Title } from '../../../core/components/screen-title.component';
import { centralStyle, } from '../../../styles/constant.style';
import { handleCloseSheet } from './call-back';
import {
    MarketPlaceCart,
    MarketPlaceModal
} from './component';

const MarketPlace: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const refRBSheet = useRef<any>(null);
    const [modalEnabled, setmodalEnabled] = useState(false)
    const [check, setCheck] = useState(true)
    const leftIcon = <AntDesign name={`plus`} style={styles.mx2} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} color={Colors.black} />
    const rightIcon1 = <Entypo name={`dots-three-vertical`} style={styles.mx2} onPress={() => setmodalEnabled(!modalEnabled)} size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} color={Colors.black} />

    return (
        <>
            <SafeAreaView
                style={centralStyle.flex1}
            >
                <KeyboardAvoidingView
                    style={centralStyle.flex1}
                    behavior={platform === 'ios' ? 'padding' : 'height'}
                >
                    <AppHeader
                        iconR1={leftIcon}
                        iconR2={rightIcon1}
                        title={t(`Marketplace`)} />

                    {modalEnabled && <MarketPlaceModal disableModal={() => setmodalEnabled(!modalEnabled)} />}

                    <View style={[styles.marketPlaceBody]}>
                        <View style={[styles.mx2, styles.inputContainer, centralStyle.XAndYCenter]}>
                            <AntDesign
                                name={'search1'}
                                color={Colors.fontColor}
                                size={RFPercentage(3)} />
                            <TextInput
                                placeholder={t('SearchJobs')}
                                style={[centralStyle.flex1, styles.px2]} />
                            <Ionicons
                                onPress={() => { refRBSheet.current.open() }}
                                name={'filter'}
                                color={Colors.fontColor}
                                size={RFPercentage(3)} />
                        </View>
                        <FlatList
                            data={[0, 0, 0, 0, 0]}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <MarketPlaceCart />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={platform == 'ios' ? RFPercentage(50) : 330}
                        openDuration={200}
                        closeDuration={200}
                        closeOnPressMask={true}
                        animationType={`slide`}
                        customStyles={{
                            container: styles.sheetContainer,
                            draggableIcon: styles.sheetDraggableIcon
                        }}
                    >
                        <View style={{ flex: 1, }}>
                            <TouchableOpacity
                                onPress={() => setCheck(true)}
                                activeOpacity={.8}
                                style={[centralStyle.row, centralStyle.alignitemCenter, styles.sheetLeadPreferencesContainer]}>
                                {check ?
                                    <Fontisto
                                        style={styles.mh3}
                                        name={`radio-btn-active`}
                                        size={RFPercentage(2)}
                                        color={Colors.primary} />
                                    :
                                    <Fontisto
                                        style={styles.mh3}
                                        name={`radio-btn-passive`}
                                        size={RFPercentage(2)}
                                        color={Colors.primary} />
                                }
                                <Title
                                    title={t('UsemyProFindersavedleadpreferences')}
                                    weight='400'
                                    color={Colors.black}
                                    type='Poppin-16' />

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setCheck(false)}
                                activeOpacity={.8}
                                style={[centralStyle.row, centralStyle.alignitemCenter, styles.sheetLeadPreferencesContainer2]}>
                                {!check ?
                                    <Fontisto
                                        style={styles.mh3}
                                        name={`radio-btn-active`}
                                        size={RFPercentage(2)}
                                        color={Colors.primary} />
                                    :
                                    <Fontisto
                                        style={styles.mh3}
                                        name={`radio-btn-passive`}
                                        size={RFPercentage(2)}
                                        color={Colors.primary} />
                                }
                                <View style={centralStyle.flex1}>
                                    <Title
                                        title={t('AdHocPreferences')}
                                        weight='400'
                                        color={Colors.black}
                                        type='Poppin-16' />
                                </View>
                                <View style={{ flex: .2 }}>
                                    <Title
                                        title={t('RESET')}
                                        weight='600'
                                        color={Colors.black}
                                        type='Poppin-14' />

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { handleCloseSheet(check, refRBSheet, 'industry', navigation,) }}
                                style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer, styles.mt1]}>
                                <Title
                                    title={!check ? `${t(`Industry`)} (3)` : `${t(`Industry`)} (0)`}
                                    weight='400'
                                    color={!check ? Colors.black : Colors.fontColor}
                                    type='Poppin-14' />
                                <AntDesign
                                    name={`right`}
                                    color={check ? Colors.fontColor : Colors.black}
                                    size={RFPercentage(2.5)} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { handleCloseSheet(check, refRBSheet, '', navigation,) }}
                                style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer]}>

                                <Title
                                    title={t('Jobtype')}
                                    weight='400'
                                    color={!check ? Colors.black : Colors.fontColor}
                                    type='Poppin-14' />
                                <AntDesign
                                    name={`right`}
                                    color={check ? Colors.fontColor : Colors.black}
                                    size={RFPercentage(2.5)} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { handleCloseSheet(check, refRBSheet, 'speciality', navigation,) }}
                                style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer]}>
                                <Title
                                    title={!check ? `${t('Specialty')} (3)` : `${t('Specialty')} (0)`}
                                    weight='400'
                                    color={!check ? Colors.black : Colors.fontColor}
                                    type='Poppin-14' />
                                <AntDesign
                                    name={`right`}
                                    color={check ? Colors.fontColor : Colors.black}
                                    size={RFPercentage(2.5)} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { handleCloseSheet(check, refRBSheet, `cities`, navigation,) }}
                                style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer]}>
                                <Title
                                    title={!check ? `${t('Location')} (3)` : `${t('Location')} (0)`}
                                    weight='400'
                                    color={!check ? Colors.black : Colors.fontColor}
                                    type='Poppin-14' />
                                <AntDesign
                                    name={`right`}
                                    color={check ? Colors.fontColor : Colors.black}
                                    size={RFPercentage(2.5)} />
                            </TouchableOpacity>
                            <View style={styles.btnContainer}>
                                <Button
                                    title={t('ApplyFilter')}
                                    primary />
                            </View>
                        </View>
                    </RBSheet>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>

    );
};

export default MarketPlace;
