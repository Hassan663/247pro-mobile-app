// @app
import React from 'react';
import {
    StatusBar,
    TouchableOpacity,
    View,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { t } from 'i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import { Title } from '../../../../core/components/screen-title.component';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle, windowHeight } from '../../../../styles/constant.style';
import { platform } from '../../../../utilities';
import { RFPercentage } from 'react-native-responsive-fontsize';

const ProFinder: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <>
            <KeyboardAwareScrollView>
                <View style={{ height: windowHeight + StatusBar?.currentHeight }}>
                    <AppHeader
                        iconL1={
                            <AntDesign
                                name={`left`}
                                onPress={() => changeRoute(navigation, 'pop')}
                                color={Colors.black}
                                style={centralStyle.mx2}
                                size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />}
                        iconR1={
                            <AntDesign
                                name={`plus`}
                                onPress={() => changeRoute(navigation, 'pop')}
                                color={Colors.black}
                                style={centralStyle.mx2}
                                size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />}
                        type='Poppin-18'
                        weight='600'
                        title={t(`ProFinder`)} />

                    <View style={centralStyle.container}>
                        {/* <View style={centralStyle.my2}>
                            <Title
                                title={t(`changePassMsg`)}
                                type='Poppin-16'
                                color={Colors.fontColor}
                                weight='400' />
                        </View>

                        <OutlinedTextInput title={t('Oldpassword')} placeHolder={t('Oldpassword')} />
                        <OutlinedTextInput title={t('New_password')} placeHolder={t('New_password')} />
                        <OutlinedTextInput title={t('Confirmnewpasword')} placeHolder={t('Confirmnewpasword')} /> */}

                    </View>
                </View></KeyboardAwareScrollView>

        </>
    );
};

export default ProFinder;
