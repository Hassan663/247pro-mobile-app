// @app
import React, {
    useRef,
} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './subscription-application.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { ApplicationCard } from './subscription-application-component';
import { CancelSubscriptionUI } from '../subscription-buisness-card/subscription-buisness-card-component';

const SubscriptionApplication: React.FC<{ navigation: any, route: any }> = ({ navigation }) => {
    const sheetRef = useRef<any>(null)
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
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                weight='600'
                title={t('Subscription')} />

            <SafeAreaView style={[centralStyle.container]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={centralStyle.container}>
                        <View style={centralStyle.my2}>
                            <Title
                                title={t(`SubscribedApplication`)}
                                type='Poppin-20'
                                color={Colors.black}
                                weight='600' />
                        </View>
                        {[0, 0, 0, 0, 0,].map((item, index) => <ApplicationCard sheetRef={sheetRef} navigation={navigation} key={index.toString()} />)}

                        <View style={centralStyle.my2}>
                            <Title
                                title={t(`AvailableApplications`)}
                                type='Poppin-20'
                                color={Colors.black}
                                weight='600' />
                        </View>
                        {[0, 0, 0, 0, 0,].map((item, index) => <ApplicationCard sheetRef={sheetRef} navigation={navigation} available key={index.toString()} />)}
                    </View>
                </ScrollView>

                <RBSheet
                    ref={sheetRef}
                    height={RFPercentage(35)}
                    closeOnPressMask={true}
                    closeOnDragDown={true}
                    openDuration={250}
                    animationType={`slide`}
                    customStyles={{
                        container: { borderRadius: RFPercentage(2) },
                        draggableIcon: styles.draggableIconstyle
                    }}
                >
                    <CancelSubscriptionUI />
                </RBSheet>
            </SafeAreaView>

        </>
    );
};

export default SubscriptionApplication;
