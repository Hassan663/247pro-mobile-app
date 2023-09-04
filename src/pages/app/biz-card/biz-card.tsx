// @app
import React from 'react';
import {
    View,
    SafeAreaView,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import AppHeader from '../../../core/components/app-headers';
import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import { styles } from './biz-card.style';
import { Title } from '../../../core/components/screen-title.component';
import { changeRoute } from '../../../core/helpers/async-storage';
import { platform } from '../../../utilities';
import { centralStyle } from '../../../styles/constant.style';

const BizCard: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                iconL1={
                    <AntDesign
                        onPress={() => changeRoute(navigation, 'pop')}
                        style={styles.mx2}
                        name={'left'}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)}
                    />
                }
                iconR1={
                    <Entypo
                        style={styles.mx2}
                        name={`dots-three-vertical`}
                        size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)}
                    />
                }
                type='Poppin-18'
                weight='600'
                title={t(`BusinessCard`)} />

            <View style={[centralStyle.circle(RFPercentage(22)), styles.imgContainer]}>
                <FontAwesome name={'user'} size={RFPercentage(3)} />
            </View>

            <View style={styles.bizCartContentWrapper}>
                <View style={styles.mb2}>
                    <Title
                        type='Poppin-24'
                        weight='600'
                        title={`George Lee`}
                        color={Colors.black} />
                </View>

                {['+1 (415) 713-7168', '+92 347 2322535', 'abc123@gmail.com'].map((item) => {
                    return (
                        <View style={styles.rowContainerData}>
                            <View style={[centralStyle.circle(RFPercentage(4.5)), styles.primaryCircle]}>
                                <Feather
                                    name={`smartphone`}
                                    color={Colors.primary}
                                    size={RFPercentage(2.5)} />
                            </View>
                            <Title
                                type='Poppin-14'
                                weight='400'
                                title={item}
                                color={Colors.fontColor} />
                        </View>
                    )
                })}

                <View style={styles.btnContainer}>
                    <Button title='Share Card' primary />
                </View>

            </View>

        </SafeAreaView>

    );
};

export default BizCard;
