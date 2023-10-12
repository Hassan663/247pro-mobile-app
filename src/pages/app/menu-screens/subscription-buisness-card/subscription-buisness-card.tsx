// @app
import React, {
    useState
} from 'react';
import {
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    View
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Button from '../../../../core/components/button.component';
import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './subscription-buisness-card.style';
import { Cards } from './subscription-buisness-card-component';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { SUBSCRIPTIONDATA } from './data';

const SubscriptionBuisnessCard: React.FC<{ navigation: any, route: any }> = ({ navigation }) => {

    const [selectedTab, setSelectedTab] = useState(true)
    const [primary, setPrimary] = useState(false)

    return (
        <>
            <AppHeader
                withOutBorder
                iconL1={
                    <AntDesign
                        style={centralStyle.mx2}
                        name={'left'}
                        onPress={() => { changeRoute(navigation, 'pop') }}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                iconR1={
                    <Entypo
                        style={centralStyle.mx2}
                        name={'dots-three-vertical'}
                        onPress={() => { changeRoute(navigation, 'pop') }}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                weight='600'
                title={t('BusinessCard')} />

            <SafeAreaView style={[centralStyle.container]}>
                <View style={centralStyle.container}>
                    <View style={[styles.tabWrapper, centralStyle.row]}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setSelectedTab(false)}
                            style={[styles.tabContainer(!selectedTab), centralStyle.XAndYCenter]}>
                            <Title
                                title={t(`YEARLY50off`)}
                                type='Poppin-14'
                                color={Colors.black}
                                weight='600' />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setSelectedTab(true)}
                            style={[styles.tabContainer(selectedTab), centralStyle.XAndYCenter]}>
                            <Title
                                title={t(`MONTHLY`)}
                                type='Poppin-14'
                                color={Colors.black}
                                weight='600' />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={SUBSCRIPTIONDATA}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[centralStyle.py2]}
                        renderItem={({ item, index }) => <Cards callBack={(state: boolean) => setPrimary(state)} item={item} key={index.toString()} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={[
                    styles.upgradeBtnWrapper,
                    centralStyle.px2,
                    centralStyle.justifyContentEnd]}>
                    <Button
                        title={t('Upgrade')}
                        titleStyle={[styles.btnStyle,]}
                        primary={primary}
                        disable={!primary} />
                    <View style={centralStyle.mt1}>
                        <Title
                            title={t(`ChangeimmediatelyCancelanytime`)}
                            type='Poppin-12'
                            textAlignCenter='center'
                            color={Colors.gray}
                            weight='400' />
                    </View>
                </View>
            </SafeAreaView>

        </>
    );
};

export default SubscriptionBuisnessCard;
