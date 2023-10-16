
// @app
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Colors from '../../../../styles/colors';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './account-infomation.style';
import { centralStyle } from '../../../../styles/constant.style';

export const List = ({ item, navigation }: any) => {

    return (

        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.listContainer,
                centralStyle.my05,
                centralStyle.row,
                centralStyle.alignitemCenter,
                centralStyle.justifyContentBetween,
                centralStyle.px1]}>
            <Title
                title={item.name}
                type='Poppin-16'
                color={Colors.black}
                weight='400' />
            <Title
                title={item.val}
                type='Poppin-16'
                color={Colors.gray}
                weight='400' />
        </TouchableOpacity>
    )
}