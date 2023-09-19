// @app
import React from 'react';
import {
    View,
} from 'react-native';

import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './contact.style';
import { centralStyle } from '../../../../styles/constant.style';
import Colors from '../../../../styles/colors';

export const RenderItem = ({ item }: any) => {
    return (
        <View style={[centralStyle.px2, centralStyle.py05, styles.titleContainer, centralStyle.mx2]}>
            <Title
                weight='400'
                type='Poppin-12'
                color={Colors.fontColor}
                title={item} />
        </View>
    )
}