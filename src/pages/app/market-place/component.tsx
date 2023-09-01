// @app
import React from 'react';
import {
    TouchableOpacity,
    View,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';
import { Title } from '../../../core/components/screen-title.component';
import { centralStyle } from '../../../styles/constant.style';
import { styles } from './market-place.style';
import { t } from 'i18next';
import { changeRoute } from '../../../core/helpers/async-storage';
import { useNavigation } from '@react-navigation/native';

export const MarketPlaceCart: React.FC<{}> = ({ }) => {
    const navigation=useNavigation()
    return (
        <TouchableOpacity onPress={()=>changeRoute(navigation,'jobDetail')} style={styles.cartContainer}>
            <View style={[centralStyle.flex1, centralStyle.row]}>
                <View style={styles.cartHeader}>
                    <Title title={t('Majorrennovationforasinglefamilyhome')}
                        color={Colors.black}
                        weight='700'
                        type={'Poppin-16'} />
                </View>
                <View style={styles.cartHeaderIconContainer}>
                    <View style={[centralStyle.circle(RFPercentage(4.5)), styles.bw1]}>
                        <AntDesign
                            name={`hearto`}
                            size={RFPercentage(2.5)} />
                    </View>
                </View>

            </View>
            <View style={[centralStyle.flex1, styles.cartBody, centralStyle.justifyContentCenter]}>
                <Title
                    title={t(`marketPlaceMsg`)}
                    color={Colors.black}
                    weight='400'
                    type={'Poppin-14'} />
            </View>
            <View style={[centralStyle.flex1, centralStyle.row, styles.cartFooter]}>

                <Title
                    title={`10/25/23`}
                    color={Colors.fontColor}
                    weight='400'
                    type={'Poppin-14'} />
                <View style={[centralStyle.row, centralStyle.XAndYCenter]}>

                    <Title title={t('BurlingameCA')}
                        color={Colors.fontColor}
                        weight='400'
                        type={'Poppin-14'} />
                    <Feather
                        name={`chevron-right`}
                        style={styles.cartFooterRightIcon}
                        size={RFPercentage(3.5)} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const MarketPlaceModal: React.FC<{ disableModal?: any }> = ({ disableModal }) => {
    return (
        
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => { disableModal() }}
            style={styles.modalContainerAbs}>
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => { disableModal() }}
                style={styles.modalContainer}>
                <Title
                    title={t('PostaJob')}
                    weight='400'
                    color={Colors.fontColor}
                    type='Poppin-14' />
                <Title
                    title={t('LeadPreference')}
                    weight='400'
                    color={Colors.fontColor}
                    type='Poppin-14' />
                <Title
                    title={t('MyFavorJobs')}
                    weight='400'
                    color={Colors.fontColor}
                    type='Poppin-14' />
            </TouchableOpacity>
        </TouchableOpacity >
    );
};

