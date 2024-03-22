// @app
import React, { useState } from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './subscription-application.style';
import { openSheet } from '../../../../store/action/action';
import { OPTIONSDATA } from './data';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';

export const ApplicationCard = ({ available, sheetRef, navigation }: any) => {

    const [modalEnabled, setmodalEnabled] = useState(false)

    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => setmodalEnabled(false)}
            style={[
                centralStyle.mb2, styles.applicationContainer, centralStyle.p2]}>
            <View style={[centralStyle.row, centralStyle.justifyContentBetween, centralStyle.alignitemCenter,]}>
                <View style={[centralStyle.row, centralStyle.alignitemCenter]}>
                    <Title
                        title={t(`ProFinderPriority`)}
                        type='Poppin-14'
                        color={Colors.black}
                        weight='600' />
                    <AntDesign style={centralStyle.mx1} name={`infocirlceo`} size={RFPercentage(2)} />
                </View>
                <Entypo
                    onPress={() => setmodalEnabled(!modalEnabled)}
                    name={`dots-three-vertical`} size={RFPercentage(2)} />
            </View>
            <View style={centralStyle.my1}>
                <Title
                    title={t(`Receivejobleadsinyourareas`)}
                    type='Poppin-14'
                    color={Colors.fontColor}
                    weight='600' />
            </View>
            <View style={[centralStyle.row, centralStyle.mt1]}>

                <Title
                    title={`$49.00 - 199.00`}
                    type='Poppin-18'
                    color={Colors.black}
                    weight='600' />
                <Title
                    title={` / ${t(`mo`)}`}
                    type='Poppin-14'
                    color={Colors.black}
                    weight='400' />
            </View>
            {!available &&
                <View style={[centralStyle.row, centralStyle.mt1]}>
                    <Title
                        title={t(`Renewon`) + ` July 23, 2024`}
                        type='Poppin-14'
                        color={Colors.fontColor}
                        weight='400' />
                </View>
            }
            {modalEnabled &&
                <TouchableOpacity
                    activeOpacity={.9}
                    onPress={() => { setmodalEnabled(!modalEnabled) }}
                    style={styles.modalContainerAbs}>
                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={() => { changeRoute(navigation, 'leadPreference') }}
                        style={styles.modalContainer}>
                        {OPTIONSDATA.map((item: string, index: number) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    onPress={() => {
                                        if (item == t(`CancelSubscription`)) {
                                            setmodalEnabled(!modalEnabled)
                                            openSheet(sheetRef)
                                        }
                                    }}
                                    activeOpacity={.8}
                                    style={[centralStyle.my05,]}>
                                    <Title
                                        title={item}
                                        weight='400'
                                        color={Colors.fontColor}
                                        type='Poppin-14' />
                                </TouchableOpacity>
                            )
                        })
                        }
                    </TouchableOpacity>
                </TouchableOpacity>
            }
        </TouchableOpacity >
    )
}