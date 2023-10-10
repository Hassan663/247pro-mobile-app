// @app
import React from 'react';
import { View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import AppHeader from '../../../../core/components/app-headers';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { CountryDropDown } from './select-language-component';

const SelectLanguage: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
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
                title={t('SelectLanguage')} />

            <View style={centralStyle.container}>
                <CountryDropDown />
            </View>
        </>
    );
};

export default SelectLanguage;
