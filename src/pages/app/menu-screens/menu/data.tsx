import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
    AccountSetting,
    ApplicationSetting,
    BizCard,
    Briefcase,
    CompanyProfile,
    Contact,
    Help,
    RoleAndPermissions,
    Task,
    UserGrpIcon
} from "../../../../assets/svg-icons/CustomSvgIcon";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Colors from "../../../../styles/colors";
import { centralStyle, windowHeight } from "../../../../styles/constant.style";
import { t } from "i18next";
import { View } from "react-native";
import { platform } from "../../../../utilities";
import { styles } from "./menu.style";

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
    // { icon: <Briefcase width={35} height={35} color="#FF9800" />, name: t('ProFinder') },
    { icon: <BizCard width={30} height={30} color="#FF9800" />, name: t('BizCard') },
    // { icon: <View style={centralStyle.mt1}><Task width={30} height={30} color="#FF9800" /></View>, name: t('Tasks') },
    { icon: <Contact width={30} height={30} color="#FF9800" />, name: t('Contacts') }
]

export const ACCOUNTSETTINGDATA = [
    { icon: <CompanyProfile width={30} height={30} color="#FF9800" />, name: t('CompanyProfile') },
    { icon: <AccountSetting width={30} height={30} color="#FF9800" />, name: t('AccountSettings') },
    { icon: <ApplicationSetting width={25} height={44} color="#FF9800" />, name: t('ApplicaionSettings') },
    // { icon: <MaterialCommunityIcons style={centralStyle.my1} name={`tablet-mobile-combo`} color={Colors.primary} size={RFPercentage(3)} />, name: t('ApplicaionSettings') },
    // { icon: <Help width={30} height={30} color="#FF9800" />, name: 'Help' }
    { icon: <View style={centralStyle.my1}><RoleAndPermissions width={platform == 'ios' ? 40 : RFPercentage(4.5)} height={platform == 'ios' ? 40 : RFPercentage(4.5)} color="#FF9800" /></View>, name: t('RolesAndPermissions') },
    { icon: <View style={centralStyle.my1}><UserGrpIcon width={platform == 'ios' ? 40 : RFPercentage(4.5)} height={platform == 'ios' ? 40 : RFPercentage(4.5)} color="#FF9800" /></View>, name: t('UserAdmin') },
    { icon: <MaterialCommunityIcons name={'clock-time-eight-outline'} style={styles.timeCardIcon} size={RFValue(35, windowHeight)} color={Colors.primary} />, name: t('timecard') },
]