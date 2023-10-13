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
import Button from '../../../../core/components/button.component';
import { t } from 'i18next';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './subscription-buisness-card.style';
import { centralStyle } from '../../../../styles/constant.style';
import {
    closeSheet,
    openSheet
} from '../../../../store/action/action';
import { changeRoute } from '../../../../core/helpers/async-storage';

export const Cards = ({
    item: {
        isFree,
        currentPrice,
        CurrentSubscription,
        savePrice,
        oldPrice,
        desc1,
        desc2,
        name },
    callBack }: any) => {

    const [isSelected, setIsSelected] = useState(false)

    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => {
                if (!isFree) {
                    callBack(!isSelected)
                    setIsSelected(!isSelected)
                }
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
                        title={t(`Permonthbilledyearly`)}
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
                        title={t(`CurrentSubscription`)}
                        type='Poppin-14'
                        color={Colors.black}
                        weight='600' />
                </View>
            }
        </TouchableOpacity>
    )
}
export const LicenseUI = ({ sheetRef, setsubscriptionActivatedUI }: any) => {
    const [numOfLicense, setNumOfLicense] = useState(0)
    const handleContinue = async () => {
        closeSheet(sheetRef)
        setsubscriptionActivatedUI(true)
        setTimeout(() => {
            openSheet(sheetRef)
        }, 1000);
    }
    return (
        <>
            <View style={centralStyle.mt3}>
                <Title
                    title={t(`UserLicenses`)}
                    type='Poppin-18'
                    textAlignCenter='center'
                    color={Colors.black}
                    weight='600' />
            </View>
            <View style={[{ width: '70%' }, centralStyle.selfCenter]}>
                <Title
                    title={t(`Setthenumberoflicensesfortheapplicationsorservices`)}
                    type='Poppin-16'
                    textAlignCenter='center'
                    color={Colors.fontColor}
                    weight='400' />
            </View>
            <View style={[
                centralStyle.row,
                centralStyle.width40,
                centralStyle.my3,
                centralStyle.selfCenter,
                centralStyle.alignitemCenter,
                centralStyle.justifyContentBetween]}>
                <AntDesign
                    onPress={() => { if (numOfLicense > 0) { setNumOfLicense(numOfLicense - 1) } }}
                    style={centralStyle.mr1}
                    size={RFPercentage(2)}
                    color={Colors.black}
                    name='minus' />
                <Title
                    title={t(`${numOfLicense} ${t('License')}`)}
                    type='Poppin-16'
                    textAlignCenter='center'
                    color={Colors.black}
                    weight='400' />
                <AntDesign
                    onPress={() => { if (numOfLicense < 10) { setNumOfLicense(numOfLicense + 1) } }}
                    style={centralStyle.mr1}
                    size={RFPercentage(2)}
                    color={Colors.primary}
                    name='plus' />
            </View>
            <View style={[
                centralStyle.width90,
                centralStyle.flex1,
                centralStyle.justifyContentCenter,
                centralStyle.selfCenter
            ]}>
                <Button
                    callBack={handleContinue}
                    title={t('Continue')}
                    titleStyle={[styles.btnStyle,]}
                    primary
                />
            </View>
        </>
    )
}
export const SubscriptionActivatedUI = ({ sheetRef, setcancelSubcriptionUI, navigation }: any) => {
    const handleContinue = async () => {
        closeSheet(sheetRef)
        setTimeout(() => {
            changeRoute(navigation, 'SubscriptionApplication')
        }, 1000);
    }
    return (
        <>
            <View style={centralStyle.mt3}>
                <Title
                    title={t(`SubscriptionActivated`)}
                    type='Poppin-18'
                    textAlignCenter='center'
                    color={Colors.black}
                    weight='600' />
            </View>
            <View style={[centralStyle.width90, centralStyle.selfCenter]}>
                <Title
                    title={t(`CongratulationsYouhavesuccessfullyactivatedthesubscriptionforProFinderProaddonfeature`)}
                    type='Poppin-16'
                    textAlignCenter='center'
                    color={Colors.fontColor}
                    weight='400' />
            </View>
            <View style={[
                centralStyle.width90,
                centralStyle.flex1,
                centralStyle.justifyContentCenter,
                centralStyle.selfCenter
            ]}>
                <Button
                    callBack={handleContinue}
                    title={t('Done')}
                    titleStyle={[styles.btnStyle,]}
                    primary
                />
            </View>
        </>
    )
}
export const CancelSubscriptionUI = () => {
    return (
        <>
            <View style={centralStyle.mt6}>
                <Title
                    title={t(`CancelSubscription`)}
                    type='Poppin-18'
                    textAlignCenter='center'
                    color={Colors.black}
                    weight='600' />
            </View>
            <View style={[centralStyle.width90, centralStyle.selfCenter]}>
                <Title
                    title={t(`Areyousureyourwanttocancelyourcurrentsubscriptionplan`)}
                    type='Poppin-16'
                    textAlignCenter='center'
                    color={Colors.fontColor}
                    weight='400' />
            </View>
            <View style={[
                centralStyle.width90,
                centralStyle.flex1,
                centralStyle.justifyContentCenter,
                centralStyle.selfCenter
            ]}>
                <Button
                    title={t('Cancelnow')}
                    titleStyle={[styles.btnStyle,]}
                    primary
                />
            </View>
        </>
    )
}