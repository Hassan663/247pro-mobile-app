// @app
import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Colors from '../../../../styles/colors';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './contact.style';
import { centralStyle, windowWidth } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
import { changeRoute } from '../../../../core/helpers/async-storage';
import OutlinedTextInput from '../../../../core/components/Outlined-TextInput.component';
import Slider from '@react-native-community/slider';
import Button from '../../../../core/components/Button';
import { platform } from '../../../../utilities';

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
export const FilterCompany: React.FC<{}> = ({ }) => {

    const [miles, setMiles] = useState(0);
    const handleSliderChange = (value: any) => { setMiles(value.toFixed(0)) };

    return (
        <View
            style={[centralStyle.XAndYCenter, centralStyle.px2, centralStyle.flex1]}>
            <Title
                color={Colors.black}
                type='Poppin-18'
                weight='600'
                title={t('FilterCompany')} />
            <View style={centralStyle.my2}>
                <OutlinedTextInput
                    title={t("Address")}
                    placeHolder={t("Address")}
                />
                <View style={[centralStyle.row, centralStyle.alignitemCenter, styles.justifyContentBetween]}>
                    <Slider
                        style={styles.sliderStyle}
                        minimumValue={0}
                        maximumValue={30}
                        minimumTrackTintColor={Colors.primary}
                        maximumTrackTintColor={Colors.lightGrey}
                        thumbImage={require('../../../../assets/app-images/thumbImg.png')} // Set a custom image for the thumb
                        onValueChange={handleSliderChange} // Attach the event handler
                    />
                    <Title
                        color={Colors.black}
                        type='Poppin-12'
                        weight='400'
                        title={miles + " " + t('mile')} />
                </View>
            </View>
            <View style={centralStyle.width100}>
                <Button
                    title={t(`ApplyFilter`)}
                    primary />
                <Button
                    title={t('ClearFilters')}
                    customStyle={[centralStyle.XAndYCenter, centralStyle.p2,]}
                    titleStyle={styles.clearFiler}
                />
            </View>
        </View>
    )
}