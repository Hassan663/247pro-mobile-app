// @app
import React from 'react';
import { View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { Title } from '../../../../core/components/screen-title.component';
import { platform } from '../../../../utilities';
import { centralStyle } from '../../../../styles/constant.style';
import { styles } from './country-and-language.style';

export const List = ({ title, value }: any) => {
    return (
        <View style={[centralStyle.row,
        centralStyle.my1,
        centralStyle.alignitemCenter,
        centralStyle.justifyContentBetween,
        centralStyle.px1,
        styles.listContainer]}>

            <Title
                title={title}
                type='Poppin-16'
                color={Colors.black}
                weight='400' />
            <View style={[centralStyle.row, centralStyle.XAndYCenter]}>
                <Title
                    title={value}
                    type='Poppin-16'
                    color={Colors.fontColor}
                    weight='400' />
                <AntDesign
                    style={centralStyle.ml1}
                    name={'right'}
                    size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />
            </View>
        </View>
    )
}