// @app
import React from 'react';
import {
    Image,
    View
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Button from '../../../../core/components/button.component';
import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './qr-code.style';
import { onShare } from '../company-profile-screens/company-profile/call-back';
import { platform } from '../../../../utilities';
import { UploadIcon } from '../../../../assets/svg-icons/CustomSvgIcon';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';

const QRCode: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    return (
        <>
            <AppHeader
                iconL1={
                    <AntDesign
                        style={centralStyle.mx2}
                        name={'left'}
                        onPress={() => { changeRoute(navigation, 'pop') }}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                iconR1={
                    <UploadIcon
                        width={RFPercentage(4)}
                        height={RFPercentage(4)}
                        color={Colors.fontColor} />
                }
                weight='600'
                type='Poppin-18'
                title={t('QRCode')} />

            <View style={centralStyle.container}>

                <View style={[centralStyle.mt4]}>

                    <View style={[
                        centralStyle.circle(RFPercentage(9)),
                        centralStyle.selfCenter,
                        styles.imgContainer]}>
                        <Image style={[centralStyle.width100, centralStyle.height100]} source={require('../../../../assets/app-images/userImg.png')}></Image>
                    </View>

                    <View style={[
                        styles.cardContainer,
                        centralStyle.alignitemCenter,
                        centralStyle.justifyContentEvenly,
                        centralStyle.mt5]}>
                        <Title
                            title={`George Lee`}
                            type='Poppin-18'
                            color={Colors.fontColor}
                            weight='400' />
                        <Image style={styles.qrImg} source={require('../../../../assets/app-images/qr.png')} />
                    </View>
                    <View style={centralStyle.my2}>
                        <Title
                            title={t(`qrDexcription`)}
                            type='Poppin-16'
                            textAlignCenter={`center`}
                            color={Colors.fontColor}
                            weight='400' />
                    </View>
                </View>
                <View style={[
                    centralStyle.selfCenter,
                    centralStyle.my1,
                    styles.shareBtn,
                    centralStyle.width100,
                    centralStyle.mb3]}>
                    <Button
                        callBack={() => {
                            if (route.params == 'invitePeople') changeRoute(navigation, 'AccountInformtaionRequest')
                            else onShare()
                        }}
                        title={t('Share')}
                        primary />
                </View>

            </View >

        </>
    );
};

export default QRCode;
