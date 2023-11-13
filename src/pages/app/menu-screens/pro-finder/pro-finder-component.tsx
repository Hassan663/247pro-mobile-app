import React, {
    useState
} from 'react'
import {
    View,
    TouchableOpacity
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import { t } from 'i18next';
import { Title } from "../../../../core/components/screen-title.component"
import { styles } from './pro-finder.style';
import { openSheet } from '../../../../store/action/action';
import { centralStyle } from "../../../../styles/constant.style"
import { RFPercentage } from 'react-native-responsive-fontsize';

export const Status = () => {

    const [isCheck, setIsCheck] = useState(false)

    return (
        <>
            <View style={centralStyle.mt6}>
                <Title
                    title={t(`Status`)}
                    type='Poppin-18'
                    textAlignCenter='center'
                    color={Colors.black}
                    weight='600' />
            </View>
            <View style={[
                centralStyle.flex1,
                centralStyle.width50,
                centralStyle.justifyContentBetween,
                centralStyle.selfCenter,
                centralStyle.row]}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setIsCheck(false)}
                    style={[centralStyle.row, styles.radioWrapper,]}>
                    <Fontisto
                        name={isCheck ? `radio-btn-passive` : `radio-btn-active`}
                        style={styles.mx}
                        color={!isCheck ? Colors.primary : Colors.fontColor}
                        size={RFPercentage(2.5)}
                    />
                    <Title
                        color={Colors.fontColor}
                        weight='500'
                        title={t(`Open`)}
                        type={`Poppin-14`} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setIsCheck(true)}
                    style={[centralStyle.row, styles.radioWrapper,]}>
                    <Fontisto
                        name={!isCheck ? `radio-btn-passive` : `radio-btn-active`}
                        color={isCheck ? Colors.primary : Colors.fontColor}
                        style={styles.mx}
                        size={RFPercentage(2.5)}
                    />
                    <Title
                        color={Colors.fontColor}
                        weight='500'
                        title={t(`Closed`)}
                        type={`Poppin-14`} />
                </TouchableOpacity>
            </View>
            <View style={[
                centralStyle.width90,
                centralStyle.flex1,
                centralStyle.justifyContentCenter,
                centralStyle.selfCenter
            ]}>
                <Button
                    title={t('Confirm')}
                    titleStyle={[styles.btnStyle,]}
                    primary
                />
            </View>
        </>
    )
}

export const List = ({ sheetRef, callBack }: any) => {
    return (
        <TouchableOpacity
            onPress={() => { openSheet(sheetRef) }}
            style={styles.listContainer} >
            <View style={[centralStyle.row, centralStyle.flex1, styles.jobContainerHeader]}>
                <Title
                    title={t('Kitchenremodelforasinglefamilyhome')}
                    type='Poppin-14'
                    color={Colors.black}
                    weight='600' />
                <Entypo
                    size={RFPercentage(2.5)}
                    name='dots-three-vertical'
                    onPress={callBack}
                    color={Colors.fontColor} />
            </View>
            <View style={[centralStyle.row, centralStyle.flex1, styles.jobContainerFooter]}>
                <View style={centralStyle.row}>
                    <Title
                        title={t('Bidders')}
                        type='Poppin-14'
                        color={Colors.gray}
                        weight='600' />
                    <Title
                        title={t('3 ')}
                        type='Poppin-14'
                        color={Colors.black}
                        weight='600' />
                </View>
                <View style={centralStyle.row}>
                    <Title
                        title={t('Bids')}
                        type='Poppin-14'
                        color={Colors.gray}
                        weight='600' />
                    <Title
                        title={t('1 ')}
                        type='Poppin-14'
                        color={Colors.black}
                        weight='600' />
                </View>
            </View>
        </TouchableOpacity>
    )
}