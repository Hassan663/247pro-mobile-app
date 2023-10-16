// @app
import React from 'react';
import {
    Image,
    View
} from 'react-native';

import { t } from 'i18next';

import Colors from '../../../../styles/colors';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './account-infomation-request.style';
import { centralStyle } from '../../../../styles/constant.style';

export const InformationRequestUI = () => {
    return (
        <View style={[styles.requestContainer, centralStyle.my1, centralStyle.row]}>

            <View style={[styles.imgContainer, centralStyle.alignitemCenter]}>
                <Image style={styles.profileImg} source={require('../../../../assets/app-images/userImg.png')} />
            </View>
            <View style={styles.requestBody}>

                <View style={centralStyle.mt2}>
                    <Title
                        type='Poppin-18'
                        weight='600'
                        title={t('GeorgeLee')}
                        color={Colors.black} />
                </View>

                <View style={centralStyle.mt2}>
                    <Title
                        type='Poppin-16'
                        weight='400'
                        title={t('247PRO ID:  2342343')}
                        color={Colors.gray} />
                </View>

                <View style={centralStyle.mt2}>
                    <Title
                        type='Poppin-16'
                        weight='400'
                        title={t('Generalcontractor')}
                        color={Colors.gray} />
                </View>
            </View>
        </View>
    )
}