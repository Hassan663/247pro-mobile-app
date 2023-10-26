// @app
import React from 'react';
import {
    StatusBar,
    TouchableOpacity,
    View,
} from 'react-native';

import { t } from 'i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import { Title } from '../../../../core/components/screen-title.component';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle, windowHeight } from '../../../../styles/constant.style';

const ChangePassword: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <>
            <KeyboardAwareScrollView>
                <View style={{ height: windowHeight + StatusBar.currentHeight }}>
                    <AppHeader
                        withOutBorder
                        iconL1={
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => changeRoute(navigation, 'pop')}
                                style={centralStyle.ml2}>
                                <Title
                                    title={t(`Cancel`)}
                                    type='Poppin-14'
                                    color={Colors.primary}
                                    weight='600' />
                            </TouchableOpacity>}
                        iconR1={
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => changeRoute(navigation, 'pop')}
                                style={centralStyle.mx2}>
                                <Title
                                    title={t(`Done`)}
                                    type='Poppin-14'
                                    color={Colors.primary}
                                    weight='600' />
                            </TouchableOpacity>
                        }
                        weight='700'
                        type='Poppin-20'
                        title={t('ChangePassword')} />

                    <View style={centralStyle.container}>
                        <View style={centralStyle.my2}>
                            <Title
                                title={t(`changePassMsg`)}
                                type='Poppin-16'
                                color={Colors.fontColor}
                                weight='400' />
                        </View>

                        <OutlinedTextInput title={t('Oldpassword')} placeHolder={t('Oldpassword')} />
                        <OutlinedTextInput title={t('New_password')} placeHolder={t('New_password')} />
                        <OutlinedTextInput title={t('Confirmnewpasword')} placeHolder={t('Confirmnewpasword')} />

                    </View>
                </View></KeyboardAwareScrollView>

        </>
    );
};

export default ChangePassword;
