// @app
import React from 'react';
import { View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import AppHeader from '../../../../core/components/app-headers';
import { List } from './subscription-component';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';

const Subscription: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
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
                title={t('Subscription')} />

            <View style={centralStyle.container}>
                <List
                    callBack={() => { changeRoute(navigation, 'SubscriptionBuisnessCard') }}
                    title={t(`BusinessCard`)}
                    value={t(``)} />
                <List
                    title={t(`ProFinder`)}
                    value={t(`Basic`)} />
            </View>
        </>
    );
};

export default Subscription;
