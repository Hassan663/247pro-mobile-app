// @app
import React from 'react';
import {
    View,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';
import { Title } from '../../../core/components/screen-title.component';
import { centralStyle } from '../../../styles/constant.style';
import { styles } from './market-place.style';

export const MarketPlaceCart: React.FC<{}> = ({ }) => {
    return (
        <View style={styles.cartContainer}>
            <View style={[centralStyle.flex1, centralStyle.row]}>
                <View style={styles.cartHeader}>
                    <Title title={`Major rennovation for a single family home`}
                        color={Colors.black}
                        weight='700' type={'Poppin-16'} />
                </View>
                <View style={styles.cartHeaderIconContainer}>
                    <View style={[centralStyle.circle(RFPercentage(4.5)), styles.bw1]}>
                        <AntDesign name={`hearto`} size={RFPercentage(2.5)} />
                    </View>
                </View>

            </View>
            <View style={[centralStyle.flex1, styles.cartBody, centralStyle.XAndYCenter]}>
                <Title
                    title={`Hello all, I am looking for a contractor for my kitchen, I am looking for someone who can do my kitchen Thank you.`}
                    color={Colors.black}
                    weight='400' type={'Poppin-14'} />
            </View>
            <View style={[centralStyle.flex1, centralStyle.row, styles.cartFooter]}>

                <Title
                    title={`10/25/23`}
                    color={Colors.fontColor}
                    weight='400' type={'Poppin-14'} />
                <View style={[centralStyle.row, centralStyle.XAndYCenter]}>

                    <Title title={`Burlingame, CA`}
                        color={Colors.fontColor}
                        weight='400' type={'Poppin-14'} />
                    <Feather
                        name={`chevron-right`}
                        style={styles.cartFooterRightIcon}
                        size={RFPercentage(3.5)} />
                </View>
            </View>
        </View>
    );
};

