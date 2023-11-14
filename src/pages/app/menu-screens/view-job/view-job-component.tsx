// @app
import React, { } from 'react';
import {
    Image,
    TouchableOpacity,
    View,
} from 'react-native';

import Colors from '../../../../styles/colors';
import { styles } from './view-job.style';
import { Title } from '../../../../core/components/screen-title.component';
import { centralStyle } from '../../../../styles/constant.style';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

export const Row: React.FC<{ title: string, value: string }> = ({ title, value }) => {
    return (
        <View style={styles.rowContainer}>
            <View style={centralStyle.flex1}>
                <Title
                    title={title}
                    type='Poppin-14'
                    weight='400'
                    color={Colors.gray}
                />
            </View>
            <View style={[centralStyle.flex1]}>
                <Title
                    title={value}
                    textAlignCenter='right'
                    type='Poppin-14'
                    weight='400'
                    color={Colors.black}
                />
            </View>
        </View>
    );
};
export const BidderList = ({ navigation, dotIconWithOutCallback }: any) => {
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => changeRoute(navigation, 'BidderDetail')}
            style={styles.listContainer}>
            <View style={[centralStyle.row]}>
                <View style={[{ flex: 1.5 }, centralStyle.XAndYCenter]}>
                    <Image style={styles.bidderImgSize} source={require('../../../../assets/app-images/userImg2.png')} />
                </View>
                <View style={[{ flex: 7.5 }, centralStyle.alignitemCenter, centralStyle.justifyContentBetween, centralStyle.row]}>
                    <Title
                        title={t(`BidderLee`)}
                        type='Poppin-14'
                        weight='600'
                        color={Colors.black}
                    />
                    <View style={[styles.invitedBtnContainer, centralStyle.XAndYCenter]}>
                        <Title
                            title={t(`Invited`)}
                            type='Poppin-10'
                            weight='400'
                            color={Colors.black}
                        />
                    </View>
                </View>
                <View style={[centralStyle.flex1, centralStyle.XAndYCenter]}>
                    {dotIconWithOutCallback}
                </View>
            </View>
            <View style={[centralStyle.row, centralStyle.px2, centralStyle.alignitemCenter, centralStyle.justifyContentBetween,]}>
                <View style={[centralStyle.row]}>
                    <Title
                        title={t(`ETA`) + ':  '}
                        type='Poppin-14'
                        weight='400'
                        color={Colors.gray}
                    />
                    <Title
                        title={t(`Nov 21, 2022`)}
                        type='Poppin-14'
                        weight='400'
                        color={Colors.black}
                    />
                </View>
                <View style={[centralStyle.row]}>
                    <Title
                        title={t(`Cost`) + `:  `}
                        type='Poppin-14'
                        weight='400'
                        color={Colors.gray}
                    />
                    <Title
                        title={t(`$3500.00`)}
                        type='Poppin-14'
                        weight='400'
                        color={Colors.black}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}
