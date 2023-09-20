// @app
import React from 'react';
import {
    TouchableOpacity,
    View,
} from 'react-native';

import Colors from '../../../../styles/colors';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './contact.style';
import { centralStyle } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
import { changeRoute } from '../../../../core/helpers/async-storage';

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
export const ConnectionRequest: React.FC<{ disableModal?: any, navigation?: any }> = ({ disableModal, navigation }) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => { disableModal() }}
            style={styles.modalContainerAbs}>
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                    changeRoute(navigation, 'ConnectionRequests')
                    disableModal()
                }}
                style={styles.modalContainer}>

                <Title
                    title={t('ConnectionRequests')}
                    weight='400'
                    color={Colors.fontColor}
                    type='Poppin-12' />
            </TouchableOpacity>
        </TouchableOpacity >
    )
}