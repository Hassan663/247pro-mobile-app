// @app
import React, { } from 'react';
import {
    View,
} from 'react-native';

import Colors from '../../styles/colors';
import { Title } from './screen-title.component';
import { styles } from './index.style';
import { platform } from '../../utilities';
import {
    centralPosition,
    centralStyle
} from '../../styles/constant.style';

const AppHeader: React.FC<{
    withOutBorder?: boolean,
    title?: string,
    iconL1?: any,
    iconR1?: any,
    color?: string,
    weight?: string,
    type?: string,
    iconR2?: any
}> = ({ title, color, iconL1, iconR1, iconR2, weight, type, withOutBorder }) => {

    return (
        <View style={[styles.headerContainer, { borderBottomWidth: withOutBorder ? 0 : 1 }]}>
            <View style={[centralStyle.flex1,]}>
                {iconL1}
            </View>
            <View style={[centralStyle.alignitemCenter, { flexGrow: platform == 'ios' ? 0 : 1 }]}>
                <Title title={title} color={color ? color : Colors.black} weight={weight ? weight : '700'} type={type ? type : 'Poppin-20'} />
            </View>
            <View style={[centralStyle.flex1, centralStyle.row, { justifyContent: centralPosition.flexEnd, alignItems: centralPosition.center }]}>
                {iconR1}
                {iconR2}
            </View>
        </View>

    );
};

export default AppHeader;
