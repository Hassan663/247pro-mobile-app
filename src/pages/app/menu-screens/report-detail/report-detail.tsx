// @app
import React from 'react';
import {
    Image,
    View,
    SafeAreaView,
} from 'react-native';

import moment from 'moment-timezone';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './report-detail.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import {
    centralStyle,
    windowHeight,
} from '../../../../styles/constant.style';

const ReportDetail: React.FC<{ navigation: any, route: any }> = ({ navigation }) => {
    const currentUserProfile = useSelector((state: any) => state.root.currentUserProfile)
    return (
        <SafeAreaView style={styles.wrapper}>
            <AppHeader
                iconL1={
                    <AntDesign
                        style={centralStyle.mx2}
                        name={'left'}
                        onPress={() => { changeRoute(navigation, 'pop') }}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                title={t('ReportDetail')} />
            <ScrollView>
                <View style={styles.container}>
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
                            title={currentUserProfile.name ? currentUserProfile.name : t('username')} />
                    </View>
                    <View style={[styles.mapContainer, centralStyle.XAndYCenter]}>
                        <Title
                            type='Poppin-24'
                            weight='600'
                            color={Colors.fontColor}
                            title={'Map Content'} />
                    </View>
                    <View style={[styles.timeContainer, centralStyle.my1, centralStyle.row]}>
                        <View style={styles.totalHoursContainer}>
                            <View style={styles.hrContainer}>
                                <View style={styles.hr}>
                                    <Title
                                        type='Poppin-50'
                                        textTransform={'capitalize'}
                                        color={Colors.black}
                                        title={'8'} />
                                </View>
                                <View style={styles.hrWrapper}>
                                    <Title
                                        type='Poppin-12'
                                        textTransform={'capitalize'}
                                        color={Colors.gray}
                                        title={'hr'} />
                                </View>
                            </View>
                            <Title
                                type='Poppin-12'
                                textTransform={'capitalize'}
                                color={Colors.black}
                                title={t('Workhours')} />
                        </View>
                        <View style={styles.hrLine}></View>
                        <View style={styles.totalHoursContainer}>
                            <View style={styles.hrContainer}>
                                <View style={styles.hr}>
                                    <Title
                                        type='Poppin-50'
                                        textTransform={'capitalize'}
                                        color={Colors.black}
                                        title={'1.1'} />
                                </View>
                                <View style={styles.hrWrapper}>
                                    <Title
                                        type='Poppin-12'
                                        textTransform={'capitalize'}
                                        color={Colors.gray}
                                        title={'hr'} />
                                </View>
                            </View>
                            <Title
                                type='Poppin-12'
                                textTransform={'capitalize'}
                                color={Colors.black}
                                title={t('BreakHours')} />
                        </View>
                    </View>
                    <View style={styles.timeContainer}>
                        <View style={styles.reportTimeHeader}>
                            <Title
                                type='Poppin-12'
                                textTransform={'capitalize'}
                                color={Colors.gray}
                                title={t('ClockIn')} />
                            <Title
                                type='Poppin-12'
                                color={Colors.black}
                                title={moment().format('MM/DD/HH:MM A')} />
                        </View >
                        <View style={styles.reportTimeHeader}>
                            <Title
                                type='Poppin-12'
                                textTransform={'capitalize'}
                                color={Colors.gray}
                                title={t('BreakIn')} />
                            <Title
                                type='Poppin-12'
                                color={Colors.black}
                                title={moment().format('MM/DD/HH:MM A')} />
                        </View >
                        <View style={styles.reportTimeHeader}>
                            <Title
                                type='Poppin-12'
                                textTransform={'capitalize'}
                                color={Colors.gray}
                                title={t('BreakOut')} />

                            <Title
                                type='Poppin-12'
                                color={Colors.black}
                                title={moment().format('MM/DD/HH:MM A')} />
                        </View>
                        <View style={styles.reportTimeHeader}>
                            <Title
                                type='Poppin-12'
                                textTransform={'capitalize'}
                                color={Colors.gray}
                                title={t('ClockOut')} />
                            <Title
                                type='Poppin-12'
                                color={Colors.black}
                                title={moment().format('MM/DD/HH:MM A')} />
                        </View>
                    </View>
                </View>
                {/* {DATA.map((item, index) => <Item index={index} title={item.title} />)} */}
            </ScrollView>
        </SafeAreaView >
    );
};

export default ReportDetail;
