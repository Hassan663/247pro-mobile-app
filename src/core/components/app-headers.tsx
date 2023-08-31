// @app
import React, {
    useState
} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { Title } from './screen-title.component';
import { centralPosition, centralStyle } from '../../styles/constant.style';
import { styles } from './index.style';
import Colors from '../../styles/colors';
const AppHeader: React.FC<{ title?: string, iconL1?: any, iconR1?: any, iconR2?: any }> = ({ title, iconL1, iconR1, iconR2 }) => {

    return (
        <View style={styles.headerContainer}>
            <View style={[centralStyle.flex1,]}>
                {iconL1}
            </View>
            <View style={[ centralStyle.alignitemCenter, { flexGrow: 1 }]}>
                <Title title={title} color={Colors.black} weight='700' type={'Poppin-20'} />
            </View>
            <View style={[centralStyle.flex1, centralStyle.row, { justifyContent: centralPosition.flexEnd, alignItems: centralPosition.center }]}>
                {iconR1}
                {iconR2}
            </View>
        </View>

    );
};

export default AppHeader;
