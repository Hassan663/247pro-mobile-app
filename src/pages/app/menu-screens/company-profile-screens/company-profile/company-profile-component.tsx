// @app
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';

import { changeRoute } from '../../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../../styles/constant.style';

export const LeftIcon = (navigation?: any) => (
    <TouchableOpacity
        onPress={() => changeRoute(navigation, 'pop')}
        activeOpacity={.8}
        style={centralStyle.mx2}>
        <AntDesign name={'left'} size={RFPercentage(2)} />
    </TouchableOpacity>
)

export const RightIcon = (navigation?: any) => (
    <TouchableOpacity
        activeOpacity={.8}
        style={centralStyle.mx2}>
        <Entypo name={'dots-three-vertical'} size={RFPercentage(2)} />
    </TouchableOpacity>
) 