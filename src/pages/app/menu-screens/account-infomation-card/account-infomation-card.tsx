// @app
import React from 'react';
import {
    Image,
    View
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import Button from '../../../../core/components/button.component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './account-infomation-card.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';

const AccountInformtaionCard: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <>
            <AppHeader
                iconL1={
                    <AntDesign
                        style={centralStyle.mx2}
                        name={'left'}
                        onPress={() => { changeRoute(navigation, 'pop') }}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                weight='600'
                type='Poppin-18'
                title={t('AccountInformation')} />
            <View style={[centralStyle.container]}>

                <View style={[centralStyle.circle(RFPercentage(17.5)), centralStyle.selfCenter, centralStyle.my3]}>
                    <Image
                        style={styles.profileImg}
                        source={require('../../../../assets/app-images/userImg.png')} />
                </View>

                <Title
                    title={t(`GeorgeLee`)}
                    type='Poppin-24'
                    weight='600'
                    color={Colors.black}
                />

                <View style={centralStyle.my05}>
                    <Title
                        title={t(`ID`) + `: 2356456`}
                        type='Poppin-14'
                        color={Colors.fontColor}
                        weight='400' />
                </View>

                <View style={[centralStyle.mt1, styles.informationContainer, centralStyle.py1]}>
                    <Title
                        title={t(`Industry`)}
                        type='Poppin-12'
                        color={Colors.fontColor}
                        weight='400' />
                    <Title
                        title={t(`Construction`)}
                        type='Poppin-16'
                        color={Colors.black}
                        weight='400' />
                </View>

                <View style={[styles.informationContainer, centralStyle.py1]}>
                    <Title
                        title={t(`Speciality`)}
                        type='Poppin-12'
                        color={Colors.fontColor}
                        weight='400' />
                    <Title
                        title={t(`Generalcontractor`)}
                        type='Poppin-16'
                        color={Colors.black}
                        weight='400' />
                </View>

                <View style={[
                    centralStyle.selfCenter,
                    centralStyle.my1,
                    styles.shareBtn,
                    centralStyle.width100,
                    centralStyle.mb3]}>
                    <Button
                        title={t('RequestConnect')}
                        primary />
                </View>

            </View>

        </>
    );
};

export default AccountInformtaionCard;
