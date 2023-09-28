// @app
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';

import { changeRoute } from '../../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../../styles/constant.style';
import { styles } from './company-profile.style';
import { Title } from '../../../../../core/components/screen-title.component';
import { t } from 'i18next';
import Colors from '../../../../../styles/colors';

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


export const ConnectionRequest: React.FC<{ disableModal?: any, data?: any, navigation?: any, }> = ({ disableModal, data, navigation }) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => { disableModal() }}
            style={styles.modalContainerAbs}>
            <TouchableOpacity
                activeOpacity={.9}
                style={styles.modalContainer}>

                {data.map((item: any, index: string) => (
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={centralStyle.my05}
                        onPress={() => { disableModal() }}
                    >
                        <Title
                            title={t(item)}
                            weight='400'
                            color={Colors.fontColor}
                            type='Poppin-12' />
                    </TouchableOpacity>
                ))}
            </TouchableOpacity>
        </TouchableOpacity >
    )
} 