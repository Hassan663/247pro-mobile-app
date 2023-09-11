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
    SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../../core/components/app-headers';
import { styles } from './menu.style';
import { centralStyle } from '../../../../styles/constant.style';
import { platform } from '../../../../utilities';
import { Title } from '../../../../core/components/screen-title.component';
import Colors from '../../../../styles/colors';

const Menu: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                iconR1={
                    <View style={centralStyle.mx2}>
                        <Title
                            type='Poppin-16'
                            weight='700'
                            title={t('Invite')}
                            color={Colors.black} />
                    </View>
                }
                iconL1={
                    <AntDesign
                        style={centralStyle.mx2}
                        name={'setting'}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                type='Poppin-18'
                weight='600'
                title={t(`GreenMetroInc`)} />
        </SafeAreaView>

    );
};

export default Menu;
