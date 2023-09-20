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
export const ConnectionRequest: React.FC<{ disableModal?: any, }> = ({ disableModal, }) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => { disableModal() }}
            style={styles.modalContainerAbs}>
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                    disableModal()
                }}
                style={styles.modalContainer}>

                <Title
                    title={t('Connection Requests')}
                    weight='400'
                    color={Colors.fontColor}
                    type='Poppin-12' />
            </TouchableOpacity>
        </TouchableOpacity >
    )
}