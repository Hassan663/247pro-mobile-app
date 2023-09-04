// @app
import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import Colors from '../../../styles/colors';
import { Title } from '../../../core/components/screen-title.component';
import { centralStyle } from '../../../styles/constant.style';
import { styles } from './industry.style';

export const CheckBoxRow: React.FC<{ item?: any, edit: boolean }> = ({ item, edit }) => {
    const [check, setCheck] = useState<boolean>(false)
    return (
        <View
            style={[centralStyle.row,
            centralStyle.alignitemCenter,
            styles.titleContainer,
            styles.spaceBetween
            ]}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => setCheck(!check)}
                style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer,]}>
                {check ?
                    <AntDesign
                        style={styles.mr1}
                        name={`checksquare`}
                        color={Colors.primary}
                        size={RFPercentage(2.5)} />
                    :
                    <Feather
                        style={styles.mr1}
                        name={`square`}
                        color={Colors.fontColor}
                        size={RFPercentage(2.5)} />
                }
                <Title
                    title={`${item}`}
                    weight='400'
                    color={Colors.fontColor}
                    type='Poppin-14' />
            </TouchableOpacity>
            {edit &&
                <AntDesign
                    color={Colors.fontColor}
                    name={'delete'}
                    size={RFPercentage(2)} />
            }

        </View>
    )

};

