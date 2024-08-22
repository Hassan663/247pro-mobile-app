// @app
import React from 'react';
import {
    Image,
    SafeAreaView,
    View
} from 'react-native';

import moment from 'moment-timezone';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import { DATA } from '../time-card/data';
import { Item } from '../time-card/time-card-component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './team.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import {
    centralStyle,
    windowHeight,
} from '../../../../styles/constant.style';

const Team: React.FC<{ navigation: any, route: any }> = ({ navigation }) => {
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
                title={t('Team')} />
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
                            title={currentUserProfile.name ? currentUserProfile.name : 'user name'} />
                    </View>
                    <View style={[styles.mapContainer, centralStyle.XAndYCenter]}>
                        <Title
                            type='Poppin-24'
                            weight='600'
                            color={Colors.fontColor}
                            title={'Map Content'} />
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
                    {DATA.map((item, index) => <Item index={index} title={item.title} />)}
                </View >
            </ScrollView>
        </SafeAreaView >
    );
};

export default Team;
