// @app
import React from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AntDesign from 'react-native-vector-icons/AntDesign'
import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { styles } from './lead-preference.style';
import { platform } from '../../../../utilities';
import { Title } from '../../../../core/components/screen-title.component';
import { centralStyle } from '../../../../styles/constant.style';
import { PREFERENCEDATA } from './data';

const LeadPreference: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <SafeAreaView style={styles.container}>
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
            <View style={styles.titleWrapper}>
                <Title
                    weight='400'
                    type='Poppin-16'
                    title={t(`Setmatchingcriteriasforjobopportunities`)} />
            </View>
            {PREFERENCEDATA.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index.toString()}
                        activeOpacity={.8}
                        onPress={() => {
                            if (item == `${t(`Industry`)} (1)`) {
                                changeRoute(navigation, 'leadPreferenceIndustry')
                            }
                        }}
                        style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer]}>
                        <Title
                            title={item}
                            weight='400'
                            color={item == t('Jobtype') ? Colors.lightGray : Colors.black}
                            type='Poppin-14' />
                        <AntDesign
                            name={`right`}
                            color={item == t('Jobtype') ? Colors.lightGray : Colors.black}
                            size={RFPercentage(2.5)} />
                    </TouchableOpacity>
                )
            })}
        </SafeAreaView>
    );
};

export default LeadPreference;
