// @app
import React, { } from 'react';
import {
    View,
    TextInput
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AppHeader from '../../../core/components/app-headers';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { centralStyle } from '../../../styles/constant.style';
import Colors from '../../../styles/colors';
import { styles } from './market-place.style';

const MarketPlace: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <>
            <AppHeader
                iconR1={<AntDesign name={`plus`} style={{ marginHorizontal: RFPercentage(2) }} size={RFPercentage(3)} color={Colors.black} />}
                iconR2={<Entypo name={`dots-three-vertical`} style={{ marginHorizontal: RFPercentage(2) }} size={RFPercentage(2.5)} color={Colors.black} />}
                title={`Marketplace`} />
            {/* <View style={styles}></View> */}
            <View style={[centralStyle.container, { backgroundColor: Colors.white }]}>
                {/* <View style={{ flex: 1, backgroundColor: 'pink' }}></View> */}
                <View style={[styles.inputContainer, centralStyle.XAndYCenter]}>
                    <AntDesign name={'search1'} color={Colors.fontColor} size={RFPercentage(3)} />
                    {/* <View style={centralStyle.flex1}>
                    </View> */}
                    <TextInput placeholder='Search jobs' style={[centralStyle.flex1, { paddingHorizontal: RFPercentage(2) }]} />
                    <Ionicons name={'filter'} color={Colors.fontColor} size={RFPercentage(3)} />
                </View>
            </View>

        </>

    );
};

export default MarketPlace;
