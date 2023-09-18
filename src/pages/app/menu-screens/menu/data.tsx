import { RFPercentage } from "react-native-responsive-fontsize";
import {
    AccountSetting,
    BizCard,
    CompanyProfile,
    Contact,
    Help
} from "../../../../assets/svg-icons/CustomSvgIcon";

import Entypo from 'react-native-vector-icons/Entypo'

import Colors from "../../../../styles/colors";
import { centralStyle } from "../../../../styles/constant.style";
import { t } from "i18next";

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
    { icon: <BizCard width={30} height={30} color="#FF9800" />, name: t('BizCard') },
    { icon: <Contact width={30} height={30} color="#FF9800" />, name: t('Contacts') }
]

export const ACCOUNTSETTINGDATA = [
    { icon: <CompanyProfile width={30} height={30} color="#FF9800" />, name: t('CompanyProfile') },
    { icon: <AccountSetting width={30} height={30} color="#FF9800" />, name: t('AccountSettings') },
    { icon: <Entypo style={centralStyle.my1} name={`tablet-mobile-combo`} color={Colors.primary} size={RFPercentage(3)} />, name: t('ApplicaionSettings') },
    { icon: <Help width={30} height={30} color="#FF9800" />, name: 'Help' }
]