
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
export function RenderItem({ info }: any) {
    const { item, onDragStart, onDragEnd, isActive } = info;
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <View
            key={item}
            style={[styles.listContainer,
            centralStyle.row,
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
                <Title title={item} type='Poppin-16' color={Colors.black} weight='400' />
            </View>
            <View style={[{ flex: 1.5 }, centralStyle.XAndYCenter]}>
                <Switch
                    trackColor={{ false: Colors.inputBgColor, true: Colors.inputBgColor }}
                    thumbColor={isEnabled ? Colors.primary : Colors.inputBgColor}
                    ios_backgroundColor={Colors.inputBgColor}
                    onValueChange={() => toggleSwitch(setIsEnabled)}
                    value={isEnabled}
                    style={{ transform: [{ scale: 0.6 }] }} // Size ko chota karne ke liye scale property ka istemal kiya gaya hai
                />
            </View>
        </View>
    );
}