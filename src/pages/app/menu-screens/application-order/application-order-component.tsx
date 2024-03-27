
// @app
import React, {
    useState
} from 'react';
import {
    View,
    TouchableOpacity,
    Switch,
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { centralStyle } from '../../../../styles/constant.style';
import { Title } from '../../../../core/components/screen-title.component';
import { MenuIcon } from '../../../../assets/svg-icons/CustomSvgIcon';
import { toggleSwitch } from '../../biz-card-screens/edit-biz-card/call-back';
import { styles } from './application-order.style';
import { t } from 'i18next';
import Button from '../../../../core/components/button.component';
import { closeSheet } from '../../../../store/action/action';

export function RenderItem({ info, modalHandling }: any) {
    const { item, onDragStart, onDragEnd } = info;
    const [isEnabled, setIsEnabled] = useState(false);

    const switherHnadler = () => {
        modalHandling(!isEnabled)
        toggleSwitch(setIsEnabled)
    }
    return (
        <View
            key={item}
            style={[styles.listContainer,
            centralStyle.row,
            centralStyle.justifyContentCenter,
            centralStyle.mx2,
            ]}
        >
            <TouchableOpacity
                onPressIn={onDragStart}
                onPressOut={onDragEnd}
                style={[
                    centralStyle.flex1,
                    centralStyle.justifyContentCenter,
                ]}>
                <MenuIcon width={RFPercentage(3)} height={RFPercentage(3)} color={Colors.fontColor} />

            </TouchableOpacity>
            <View style={[{ flex: 7.5, }, centralStyle.justifyContentCenter, centralStyle.px1]}>
                <Title title={item} type='Poppin-16' color={isEnabled ? Colors.black : Colors.gray} weight='400' />
            </View>
            <View style={[{ flex: 1.5 }, centralStyle.XAndYCenter]}>
                <Switch
                    trackColor={{ false: Colors.lightGrey, true: `${Colors.primary}40` }}
                    thumbColor={isEnabled ? Colors.primary : Colors.lightGray}
                    ios_backgroundColor={Colors.lightGrey}
                    value={isEnabled}
                    onValueChange={switherHnadler}
                />
            </View>
        </View>
    );
}
export const EnableFeatureUI = ({ sheetRef }: any) => {

    return (
        <View style={[centralStyle.container]}>
            <View style={centralStyle.mt3}>
                <Title
                    color={Colors.black}
                    type='Poppin-20'
                    textAlignCenter='center'
                    weight='600'
                    title={t('Enable_Feature')} />
            </View>
            <View>
                <Title
                    color={Colors.fontColor}
                    type='Poppin-16'
                    textAlignCenter='center'
                    weight='500'
                    title={t('Enable_Feature_Admin')} />
            </View>
            <View style={centralStyle.mt3}>
                <Button
                    callBack={() => closeSheet(sheetRef)}
                    title={t(`Contact_Admin`)}
                    primary
                />
            </View >
        </View>
    )
}




