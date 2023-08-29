// @app
import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    TextInput,
    FlatList
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AppHeader from '../../../core/components/app-headers';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';
import { centralStyle, } from '../../../styles/constant.style';
import { styles } from './market-place.style';
import { MarketPlaceCart } from './component';
import { platform } from '../../../utilities';

const MarketPlace: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={platform === 'ios' ? 'padding' : 'height'}
            >
                <AppHeader
                    iconR1={
                        <AntDesign
                            name={`plus`}
                            style={styles.mx2}
                            size={RFPercentage(3)}
                            color={Colors.black} />
                    }
                    iconR2={
                        <Entypo
                            name={`dots-three-vertical`}
                            style={styles.mx2}
                            size={RFPercentage(2.5)}
                            color={Colors.black} />
                    }
                    title={`Marketplace`} />

                <View style={[styles.marketPlaceBody]}>
                    <View style={[styles.mx2, styles.inputContainer, centralStyle.XAndYCenter]}>
                        <AntDesign
                            name={'search1'}
                            color={Colors.fontColor}
                            size={RFPercentage(3)} />
                        <TextInput
                            placeholder='Search jobs'
                            style={[centralStyle.flex1, styles.px2]} />
                        <Ionicons
                            name={'filter'}
                            color={Colors.fontColor}
                            size={RFPercentage(3)} />
                    </View>
                    <FlatList
                        data={[0, 0, 0, 0, 0]}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <MarketPlaceCart />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </KeyboardAvoidingView>
        </>

    );
};

export default MarketPlace;
