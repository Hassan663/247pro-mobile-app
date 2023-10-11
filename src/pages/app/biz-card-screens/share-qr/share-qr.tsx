// @app
import React, {
    useState
} from 'react';
import {
    Image,
    View,
    SafeAreaView,
    ScrollView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import AppHeader from '../../../../core/components/app-headers';
import { platform } from '../../../../utilities';
import { centralStyle } from '../../../../styles/constant.style';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './share-qr.style';
import { SHARELISTDATA } from './data';

const ShareQR: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                iconL1={
                    <AntDesign
                        onPress={() => changeRoute(navigation, 'pop')}
                        style={centralStyle.mx2} name={'left'}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
                }
            />
            <ScrollView>
                <View style={[centralStyle.selfCenter, centralStyle.mb3]}>
                    <View style={centralStyle.my3}>
                        <Title
                            type='Poppin-20'
                            weight='700'
                            title={`Sharing George Lee`}
                            color={Colors.black} />

                    </View>
                    <Image style={styles.qrStyle} source={require('../../../../assets/app-images/qr.png')} />
                    <View style={styles.btnContainer}>
                        <Button title='Share Card' primary />
                    </View>
                </View>
                <View style={styles.listWrapper}>
                    {SHARELISTDATA.map((item, index) => {
                         return (
                            <View key={index.toString()}
                                style={[styles.rowContainerData, index == 0 && styles.removeBorder]}>
                                {item.icon}
                                <Title
                                    type='Poppin-14'
                                    weight='400'
                                    title={item.title}
                                    color={Colors.fontColor} />
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView >

    );
};

export default ShareQR;
