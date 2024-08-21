// @app
import React, { useState } from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import CountryPicker from 'react-native-country-picker-modal';
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import AppHeader from '../../../../core/components/app-headers';
import { styles } from './select-region.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { handleOnSelect } from '../../contact-screens/edit-company/call-back';

const SelectRegion: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<any>('PK');

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
                title={t('SelectRegion')} />

            <View style={centralStyle.container}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => { setIsCountryPickerVisible(true) }}
                    style={[
                        centralStyle.row,
                        styles.selectRegionContainer,
                        centralStyle.px2,
                        centralStyle.my1,
                        centralStyle.justifyContentBetween,
                        centralStyle.alignitemCenter]}>
                    <CountryPicker
                        countryCode={countryCode}
                        withFlagButton
                        withFilter
                        withCountryNameButton
                        withCurrencyButton
                        onClose={() => setIsCountryPickerVisible(false)}
                        onSelect={(country) => handleOnSelect(country, setIsCountryPickerVisible, setCountryCode)}
                        visible={isCountryPickerVisible}
                    />
                    <AntDesign name={'down'} size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />
                </TouchableOpacity>
            </View >
        </>
    );
};

export default SelectRegion;
