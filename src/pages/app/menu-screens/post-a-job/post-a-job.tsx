// @app
import React, {
    useRef,
    useState
} from 'react';
import {
    TextInput,
    View,
    FlatList,
    GestureResponderEvent,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { t } from 'i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';

const PostAJob: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <>
            <KeyboardAwareScrollView>
                <View style={{}}>
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
                                color={Colors.black}
                                style={centralStyle.mx2}
                                size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />}
                        type='Poppin-18'
                        weight='600'
                        title={t(`ProFinder`)} />

                    <View style={[centralStyle.container]}>

                    </View>
                </View>
            </KeyboardAwareScrollView >

        </>
    );
};

export default PostAJob;
