// @app
import React, {
    useEffect,
    useState
} from 'react';
import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { AlphabetList } from 'react-native-section-alphabet-list';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import AppHeader from '../../../../core/components/app-headers';
import Button from '../../../../core/components/button.component';
import Colors from '../../../../styles/colors';
import { data } from './data';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './time-card.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle, windowHeight } from '../../../../styles/constant.style';
import { ALPHABET_SIZE } from '../../../../utilities/constants';
import { formatDate, formatTime } from './call-back';
import { CompanyList, CustomSectionHeader } from '../../contact-screens/new-contact/new-contact-component';
import { useSelector } from 'react-redux';

const TimeCard: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState(t('timecard'))
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<any>(null);
    const [breakIn, setbreakIn] = useState(false);
    const currentUserProfile = useSelector((state: any) => state.root.currentUserProfile)

    useEffect(() => {
        if (isRunning) {
            const id: any = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const handleClockIn = () => {
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    const handleClockOut = () => {
        if (isRunning) {
            setIsRunning(false);
            setTime(0); // Reset timer to 00:00:00
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader
                iconL1={
                    <AntDesign
                        style={centralStyle.mx2}
                        name={'left'}
                        onPress={() => { changeRoute(navigation, 'pop') }}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                title={t('timecard')} />

            <View style={[centralStyle.row, { backgroundColor: Colors.white }]}>
                <TouchableOpacity
                    onPress={() => setSelectedTab(t('timecard'))}
                    activeOpacity={.9} style={[styles.tabContainer(selectedTab), centralStyle.XAndYCenter]}>
                    <Title
                        weight='600'
                        type='Poppin-14' color={selectedTab == t('timecard') ? Colors.primary : Colors.fontColor}
                        title={t('timecard')} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelectedTab(t('MyReport'))}
                    activeOpacity={.9} style={[styles.tabContainer2(selectedTab), centralStyle.XAndYCenter]}>
                    <Title type='Poppin-14'
                        weight='600'
                        color={selectedTab == t('MyReport') ? Colors.primary : Colors.fontColor}
                        title={t('MyReport')} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {selectedTab === t('timecard') ?
                    <>
                        <Text style={styles.date}>{formatDate()}</Text>
                        <Text style={styles.timer}>{formatTime(time)}</Text>
                        <View style={[centralStyle.my1, styles.timerButtonContainer]}>
                            <View style={centralStyle.width45}>

                                {isRunning ?

                                    breakIn ?
                                        <Button
                                            disable={false}
                                            title={t(`BreakOut`)}
                                            callBack={() => { setbreakIn(false) }}
                                            primary />
                                        :
                                        <Button
                                            disable={false}
                                            title={t(`BreakIn`)}
                                            callBack={() => { setbreakIn(true) }}
                                            primary />
                                    :
                                    <Button
                                        disable={false}
                                        title={t(`ClockIn`)}
                                        callBack={handleClockIn}
                                        primary />
                                }
                            </View>
                            <View style={centralStyle.width45}>
                                <Button
                                    disable={false}
                                    callBack={handleClockOut}
                                    title={t(`ClockOut`)}
                                    secondary

                                />
                            </View>

                        </View>
                        <View style={[centralStyle.flex1, centralStyle.width100]}>
                            <View style={centralStyle.px2}>
                                <AlphabetList
                                    data={data}
                                    letterListContainerStyle={styles.listContainerStyle}
                                    showsVerticalScrollIndicator={false}
                                    sectionHeaderHeight={ALPHABET_SIZE.HEADER_HEIGHT}
                                    getItemHeight={() => ALPHABET_SIZE.ITEM_HEIGHT}
                                    indexContainerStyle={{ width: 20 }}
                                    indexLetterStyle={styles.letterStyle}
                                    renderCustomItem={(item) => {
                                        return (
                                            <CompanyList
                                                // getCompany={() => { handleChangeRoute(item) }}
                                                item={item} />
                                        )
                                    }}
                                    renderCustomSectionHeader={CustomSectionHeader}
                                    // ListFooterComponent={() => {
                                    //     if (searchInput.length > 0) return <Loader size={'large'} />
                                    //     else { return <Loader size={'large'} /> }
                                    // }}
                                    // onEndReached={loadMoreData}
                                    onEndReachedThreshold={0.1}
                                />
                            </View>
                        </View>
                    </>
                    :
                    <View style={{ flex: 1, width: "100%", paddingHorizontal: RFValue(20, windowHeight) }}>
                        <View style={[{ height: RFValue(100, windowHeight), width: "100%", alignItems: "center", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: Colors.gray }]}>
                            <View style={[centralStyle.circle(RFValue(70, windowHeight)), centralStyle.mx1, { overflow: "hidden" }]} >
                                <Image
                                    source={{ uri: currentUserProfile?.profile ? currentUserProfile?.profile : 'https://via.placeholder.com/150' }}
                                    style={{ height: "100%", width: "100%" }}
                                />
                            </View>
                            <Title
                                type='Poppin-14'
                                weight='600'
                                color={Colors.fontColor}
                                title={currentUserProfile.name} />
                        </View>
                        <View style={{ height: RFValue(100, windowHeight), width: "100%", backgroundColor: "red" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Title
                                    type='Poppin-12'
                                    color={Colors.fontColor}
                                    title={'Total work hours'} />
                                <Title
                                    type='Poppin-12'
                                    color={Colors.fontColor}
                                    title={'Total work hours'} />
                            </View>
                        </View>
                    </View>
                }
            </View>
        </SafeAreaView >
    );
};

export default TimeCard;
