
// @app
import React from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './account-setting.style';
import { platform } from '../../../../utilities';
import { centralStyle } from '../../../../styles/constant.style';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { t } from 'i18next';

export const List = ({ item, navigation }: any) => {

    console.log(item, 'item')
    const HandleRoutes = () => {
        if (item == t(`AccountInformation`)) changeRoute(navigation, 'AccountInformtaion')
        else if (item == t(`ChangePassword`)) changeRoute(navigation, 'ChangePassword')

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
                size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />

        </TouchableOpacity>
    )
}