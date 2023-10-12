// @app
import React, {
    useState
} from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { t } from 'i18next';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './subscription-buisness-card.style';
import { centralStyle } from '../../../../styles/constant.style';

export const Cards = ({ item: { isFree, currentPrice, CurrentSubscription, savePrice, oldPrice, desc1, desc2, name }, callBack }: any) => {

    const [isSelected, setIsSelected] = useState(false)

    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => {
                callBack(!isSelected)
                setIsSelected(!isSelected)
            }}
            style={[
                styles.cardContainer,
                centralStyle.my1,
                centralStyle.px2,
                centralStyle.py1
            ]}>
            <View style={[
                centralStyle.row,
                centralStyle.justifyContentBetween,
                centralStyle.my1
            ]}>
                <Title
                    title={name}
                    type='Poppin-16'
                    color={Colors.gray}
                    weight='400' />
                {isFree == true ?
                    <AntDesign
                        size={RFPercentage(2.5)}
                        color={Colors.gray}
                        name='checkcircle' /> :
                    isSelected ?
                        <AntDesign
                            size={RFPercentage(2.5)}
                            color={Colors.primary}
                            name='checkcircle' /> :
                        <Feather
                            size={RFPercentage(2.5)}
                            color={Colors.gray}
                            name='circle' />
                }
            </View>
            {isFree ?
                <Title
                    title={t(`Free`)}
                    type='Poppin-18'
                    color={Colors.black}
                    weight='600' />
                :
                <>
                    <View style={[centralStyle.my1, centralStyle.mt1, centralStyle.row]}>
                        <Title
                            title={oldPrice + 'USD '}
                            type='Poppin-14'
                            color={Colors.black}
                            line={'line-through'}
                            weight='600' />
                        <Title
                            title={' ( Save ' + savePrice + ' / year )'}
                            type='Poppin-14'
                            color={Colors.black}
                            weight='600' />
                    </View>
                    <Title
                        title={currentPrice + " USD"}
                        type='Poppin-18'
                        color={Colors.black}
                        weight='600' />
                    <Title
                        title={t(`Per month, billed yearly`)}
                        type='Poppin-14'
                        color={Colors.fontColor}
                        weight='400' />
                </>
            }

            <View style={[centralStyle.row, centralStyle.my1, centralStyle.mt2]}>
                <AntDesign
                    style={centralStyle.mr1}
                    size={RFPercentage(2)}
                    color={Colors.primary}
                    name='checkcircleo' />
                <Title
                    title={desc1}
                    type='Poppin-16'
                    color={Colors.fontColor}
                    weight='400' />
            </View>
            <View style={[centralStyle.row, centralStyle.my1]}>
                <AntDesign
                    style={centralStyle.mr1}
                    size={RFPercentage(2)}
                    color={Colors.primary}
                    name='checkcircleo' />
                <Title
                    title={desc2}
                    type='Poppin-16'
                    color={Colors.fontColor}
                    weight='400' />
            </View>
            {CurrentSubscription &&
                <View style={centralStyle.my1}>
                    <Title
                        title={t(`Current Subscription`)}
                        type='Poppin-14'
                        color={Colors.black}
                        weight='600' />
                </View>
            }
        </TouchableOpacity>
    )
}