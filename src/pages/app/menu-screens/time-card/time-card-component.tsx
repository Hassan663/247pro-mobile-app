
// @app
import React from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './time-card.style';
import { platform } from '../../../../utilities';
import { centralStyle, windowHeight } from '../../../../styles/constant.style';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { t } from 'i18next';
import { DATA } from './data';

export const List = ({ item, navigation }: any) => {

    console.log(item, 'item')
    const HandleRoutes = () => {
        if (item == t(`AccountInformation`)) changeRoute(navigation, 'AccountInformtaion')
        else if (item == t(`ChangePassword`)) changeRoute(navigation, 'ChangePassword')
        else if (item == t(`CountryAndLanguage`)) changeRoute(navigation, 'CountryAndLanguage')
        else if (item == t(`Subscription`)) changeRoute(navigation, 'Subscription')

    }
    return (

        <TouchableOpacity
            activeOpacity={0.8}
            onPress={HandleRoutes}
            style={[
                styles.listContainer,
                centralStyle.my05,
                centralStyle.row,
                centralStyle.alignitemCenter,
                centralStyle.justifyContentBetween,
                centralStyle.px1]}>
            <Title
                title={item}
                type='Poppin-16'
                color={Colors.fontColor}
                weight='400' />
            <AntDesign
                name={'right'}
                color={Colors.black}
                size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />

        </TouchableOpacity>
    )
}
export const Item = ({ title, index }: any) => (
    <View key={index.toString()} style={{ flexDirection: 'row' }}>
        {index !== DATA.length - 1 &&
            <View style={styles.verticalLine}></View>
        }
        <View style={styles.itemContainer}>
            <View style={[centralStyle.circle(RFValue(15, windowHeight)), styles.circle]}></View>
        </View>
        <View style={{ flex: 9, }}>
            <View style={[{ flexDirection: "row" }]}>
                <Title
                    type='Poppin-14'
                    weight='500'
                    color={Colors.black}
                    title={t('7:30 AM')} />
                <View style={[centralStyle.mx1,]}>
                    <Title
                        type='Poppin-12'
                        color={Colors.black}
                        title={t('ClockIn')} />
                </View>
            </View>
            <View style={[{ width: "80%" }, centralStyle.mb1]}>
                <Title
                    type='Poppin-12'
                    color={Colors.black}
                    title={t('533 airport, blvd, Burligame, CA 94010, USA')} />
            </View>
        </View>
    </View>
);




