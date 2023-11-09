import { RFPercentage } from "react-native-responsive-fontsize";
import {
    AccountSetting,
    BizCard,
    CompanyProfile,
    Contact,
    Help,
    RoleAndPermissions,
    Task,
    TasksIcon,
    UserGrpIcon
} from "../../../../assets/svg-icons/CustomSvgIcon";

import Entypo from 'react-native-vector-icons/Entypo'

import Colors from "../../../../styles/colors";
import { centralStyle } from "../../../../styles/constant.style";
import { t } from "i18next";
import { View } from "react-native";
import { platform } from "../../../../utilities";

export const MENUDATA: any = [
    {
        title: "Applications", data: [
            { icon: <BizCard width={30} height={30} color="#FF9800" />, name: t('BizCard') },
            { icon: <Contact width={30} height={30} color="#FF9800" />, name: t('Contacts') }]
    },
    {
        title: "Account & Settings", data: [
            { icon: <CompanyProfile width={30} height={30} color="#FF9800" />, name: t('CompanyProfile') },
            { icon: <AccountSetting width={30} height={30} color="#FF9800" />, name: t('AccountSettings') },
            { icon: <></>, name: t('ApplicaionSettings') },
            { icon: <Help width={30} height={30} color="#FF9800" />, name: 'Help' }]
    }
]
export const APPDATA = [
    { icon: <BizCard width={30} height={30} color="#FF9800" />, name: t('ProFinder') },
    { icon: <BizCard width={30} height={30} color="#FF9800" />, name: t('BizCard') },
    { icon: <View style={centralStyle.mt1}><Task width={30} height={30} color="#FF9800" /></View>, name: t('Tasks') },
    { icon: <Contact width={30} height={30} color="#FF9800" />, name: t('Contacts') }
]

export const ACCOUNTSETTINGDATA = [
    { icon: <CompanyProfile width={30} height={30} color="#FF9800" />, name: t('CompanyProfile') },
    { icon: <AccountSetting width={30} height={30} color="#FF9800" />, name: t('AccountSettings') },
    { icon: <Entypo style={centralStyle.my1} name={`tablet-mobile-combo`} color={Colors.primary} size={RFPercentage(3)} />, name: t('ApplicaionSettings') },
    // { icon: <Help width={30} height={30} color="#FF9800" />, name: 'Help' }
    { icon: <View style={centralStyle.my1}><RoleAndPermissions width={platform == 'ios' ? 40 : RFPercentage(4.5)} height={platform == 'ios' ? 40 : RFPercentage(4.5)} color="#FF9800" /></View>, name: t('RolesAndPermissions') },
    { icon: <View style={centralStyle.my1}><UserGrpIcon width={platform == 'ios' ? 40 : RFPercentage(4.5)} height={platform == 'ios' ? 40 : RFPercentage(4.5)} color="#FF9800" /></View>, name: t('UserAdmin') },
]