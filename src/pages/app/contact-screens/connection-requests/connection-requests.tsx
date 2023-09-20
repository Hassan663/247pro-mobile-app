// @app
import React from 'react';
import {
    View,
    FlatList,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import AppHeader from '../../../../core/components/app-headers';
import { centralStyle } from '../../../../styles/constant.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { RequestList } from './connection-requests.components';
import { REQUESTCONTACTLIST } from './data';

const ConnectionRequests: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <>
            <AppHeader
                iconL1={
                    <AntDesign
                        name={`left`}
                        onPress={() => changeRoute(navigation, 'pop')}
                        style={centralStyle.mx2}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />}
                type='Poppin-18'
                weight='600'
                title={t(`ConnectionRequests`)} />

            <View style={centralStyle.container}>
                <FlatList
                    data={REQUESTCONTACTLIST}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[centralStyle.my2, centralStyle.pb3]}
                    renderItem={({ item }) => <RequestList item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        </>

    );
};

export default ConnectionRequests;
