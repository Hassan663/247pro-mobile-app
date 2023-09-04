// @app
import React, {
    useState
} from 'react';
import {
    View,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
import AppHeader from '../../../../core/components/app-headers';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { styles } from './lead-preference.style';
import { platform } from '../../../../utilities';
import Colors from '../../../../styles/colors';
import { Title } from '../../../../core/components/screen-title.component';
import { centralStyle } from '../../../../styles/constant.style';

const LeadPreference: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <AppHeader
                iconL1={
                    <AntDesign
                        onPress={() => changeRoute(navigation, 'pop')}
                        style={styles.mx2}
                        name={`left`} size={platform == 'ios' ? RFPercentage(2) : RFPercentage(3)} />
                }
                iconR1={
                    <Entypo
                        style={styles.mx2}
                        name={`dots-three-vertical`}
                        size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)}
                    />
                }
                title={t(`LeadPreference`)} />
            <Title
                weight='400'
                type='Poppin-16'
                title={t(`Setmatchingcriteriasforjobopportunities`)} />
 
            <TouchableOpacity
                activeOpacity={.8}
                style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer]}>
                <Title
                    title={`${t('Specialty')} (3)`}
                    weight='400'
                    color={Colors.black}
                    type='Poppin-14' />
                <AntDesign
                    name={`right`}
                    color={Colors.fontColor}
                    size={RFPercentage(2.5)} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={.8}
                style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer]}>
                <Title
                    title={t('Jobtype')}
                    weight='400'
                    color={Colors.black}
                    type='Poppin-14' />
                <AntDesign
                    name={`right`}
                    color={Colors.fontColor}
                    size={RFPercentage(2.5)} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={.8}
                style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer]}>
                <Title
                    title={`${t('Specialty')} (3)`}
                    weight='400'
                    color={Colors.black}
                    type='Poppin-14' />
                <AntDesign
                    name={`right`}
                    color={Colors.fontColor}
                    size={RFPercentage(2.5)} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={.8}
                style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer]}>
                <Title
                    title={`${t('Location')} (3)`}
                    weight='400'
                    color={Colors.black}
                    type='Poppin-14' />
                <AntDesign
                    name={`right`}
                    color={Colors.fontColor}
                    size={RFPercentage(2.5)} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default LeadPreference;
