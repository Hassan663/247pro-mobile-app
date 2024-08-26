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

import moment from 'moment-timezone';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ScrollView } from 'react-native-gesture-handler';
import { t } from 'i18next';
import { AlphabetList } from 'react-native-section-alphabet-list';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import AppHeader from '../../../../core/components/app-headers';
import Button from '../../../../core/components/button.component';
import Colors from '../../../../styles/colors';
import { Item } from './time-card-component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './time-card.style';
import { platform } from '../../../../utilities';
import { DATA, data } from './data';
import { useSelector } from 'react-redux';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { ALPHABET_SIZE } from '../../../../utilities/constants';
import {
    centralStyle,
    windowHeight,
} from '../../../../styles/constant.style';
import {
    formatDate,
    formatTime
} from './call-back';
import {
    CompanyList,
    CustomSectionHeader
} from '../../contact-screens/new-contact/new-contact-component';

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
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
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
                                            <CompanyList callBack={() => changeRoute(navigation, 'Team')} item={item} />
                                        )
                                    }}
                                    renderCustomSectionHeader={CustomSectionHeader}
                                    onEndReachedThreshold={0.1}
                                />
                            </View>
                        </View>
                    </>
                    :
                    <View style={styles.myreportContainer}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: "100%", }}>
                            <View style={styles.myReportProfileContainer}>
                                <View style={[centralStyle.circle(RFValue(70, windowHeight)), centralStyle.mx1, { overflow: "hidden" }]} >
                                    <Image
                                        source={{ uri: currentUserProfile?.profile ? currentUserProfile?.profile : 'https://via.placeholder.com/150' }}
                                        style={styles.profileImage}
                                    />
                                </View>
                                <Title
                                    type='Poppin-14'
                                    weight='600'
                                    color={Colors.fontColor}
                                    title={currentUserProfile.name} />
                            </View>
                            <View style={styles.reportTitle}>
                                <View style={styles.reportHeader}>
                                    <Title
                                        type='Poppin-12'
                                        textTransform={'capitalize'}
                                        color={Colors.fontColor}
                                        title={t('Totalworkhours')} />
                                    <Title
                                        type='Poppin-12'
                                        color={Colors.fontColor}
                                        title={moment().format('DD/MM/YYYY') + " - " + moment().format('DD/MM/YYYY')} />
                                </View>
                                <View style={styles.totalHours}>
                                    <Title
                                        type='Poppin-18'
                                        textTransform={'capitalize'}
                                        weight='600'
                                        color={Colors.black}
                                        title={'12 Hr'} />
                                    <Entypo
                                        name={'dots-three-vertical'}
                                        color={Colors.fontColor}
                                        size={RFValue(20, windowHeight)} />
                                </View>

                            </View>
                            <View style={styles.reportTimeHeader}>
                                <Title
                                    type='Poppin-16'
                                    weight='500'
                                    color={Colors.black}
                                    title={moment().format('DD/MM/YYYY')} />
                                <Title
                                    type='Poppin-14'
                                    textTransform={'capitalize'}
                                    weight='600'
                                    color={Colors.black}
                                    title={'4 Hr'} />
                            </View>
                            {DATA.map((item, index) => <Item callBack={() => { changeRoute(navigation, 'ReportDetail') }} index={index} title={item.title} />)}
                            <View style={styles.reportTimeHeader}>
                                <Title
                                    type='Poppin-16'
                                    weight='500'
                                    color={Colors.black}
                                    title={moment().format('DD/MM/YYYY')} />
                                <Title
                                    type='Poppin-14'
                                    textTransform={'capitalize'}
                                    weight='600'
                                    color={Colors.black}
                                    title={'4 Hr'} />
                            </View>
                            {DATA.map((item, index) => <Item index={index} title={item.title} />)}
                        </ScrollView>
                    </View>

                }
            </View >
        </SafeAreaView >
    );
};

export default TimeCard;
