// @app
import React from 'react';
import {
    View
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Button from '../../../../core/components/button.component';
import AppHeader from '../../../../core/components/app-headers';
import { styles } from './account-infomation-request.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { InformationRequestUI } from './account-infomation-request-component';

const AccountInformtaionRequest: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

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
                weight='700'
                title={t('AccountInformation')} />

            <View style={centralStyle.container}>

                <InformationRequestUI />

                <View style={styles.footer}>
                    <Button title={t('RequestConnect')} primary />
                </View>
            </View>
        </>
    );
};

export default AccountInformtaionRequest;
