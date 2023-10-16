// @app
import React from 'react';
import {
    View,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './menu.style';
import { onShare } from '../company-profile-screens/company-profile/call-back';
import { centralStyle } from '../../../../styles/constant.style';

export const InvitePropleUI = ({ inviteCallBack, shareQR, }: any) => {
    return (
        <View style={centralStyle.container}>
            <View style={centralStyle.my1}>
                <Title
                    color={Colors.black}
                    type='Poppin-18'
                    textAlignCenter='center'
                    weight='600'
                    title={t('Invitepeopletojoinyourteam')} />
            </View >
            <View style={centralStyle.my1}>
                <Button
                    callBack={onShare}
                    primary
                    icon={
                        <Feather name={`upload`}
                            style={centralStyle.mr2}
                            size={RFPercentage(2)}
                            color={Colors.white} />}
                    title={t(`ShareaLink`)}
                />
            </View>
            <View style={centralStyle.my1}>
                <Button
                    callBack={inviteCallBack}
                    titleStyle={styles.inviteBtnTitle}
                    customStyle={[styles.inviteContact, centralStyle.XAndYCenter]}
                    icon={
                        <AntDesign
                            name={`adduser`}
                            style={centralStyle.mr2}
                            size={RFPercentage(2.5)}
                            color={Colors.black} />}
                    title={t(`InvitewithContacts`)}
                />
            </View >
            <View style={centralStyle.my1}>
                <Button
                    titleStyle={styles.inviteBtnTitle}
                    callBack={shareQR}
                    customStyle={[styles.inviteContact, centralStyle.XAndYCenter]}
                    icon={
                        <AntDesign
                            name={`qrcode`}
                            style={centralStyle.mr2}
                            size={RFPercentage(2.5)}
                            color={Colors.black} />}
                    title={t(`ScanMyQRCode`)}
                />
            </View>
        </View>

    )
}