// @app
import React from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import { styles } from './menu.style';
import { centralStyle } from '../../../../styles/constant.style';
import { platform } from '../../../../utilities';
import { Title } from '../../../../core/components/screen-title.component';
import {
    ACCOUNTSETTINGDATA,
    APPDATA,
} from './data';
import { Item } from './call-back';
import { changeRoute } from '../../../../core/helpers/async-storage';

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
                        onPress={() => { changeRoute(navigation, 'ApplicationOrder') }}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                title={t(`GreenMetroInc`)} />

            <View style={[centralStyle.mx2, centralStyle.my3]}>
                <Title
                    title={t('Applications')}
                    type='Poppin-18'
                    color={Colors.fontColor}
                    weight='600' />
            </View>

            <View>
                <FlatList
                    data={APPDATA}
                    numColumns={4}
                    columnWrapperStyle={[centralStyle.px2]}
                    renderItem={({ item }) => <Item navigation={navigation} item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <View style={[centralStyle.mx2, centralStyle.my3]}>
                <Title title={t('AccountAndSettings')} type='Poppin-18' color={Colors.fontColor} weight='600' />
            </View>

            <View>
                <FlatList
                    data={ACCOUNTSETTINGDATA}
                    numColumns={4}
                    columnWrapperStyle={[centralStyle.px2]}
                    renderItem={({ item }) => <Item navigation={navigation} item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        </SafeAreaView>
    );
};

export default Menu;
