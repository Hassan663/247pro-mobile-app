import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';
import { platform } from '../../../utilities';
import { centralStyle } from '../../../styles/constant.style';
import { t } from 'i18next';


export const styles = StyleSheet.create<any>({
    tabContainer: (selectedTab: any) => ({
        flex: 1,
        borderBottomWidth: 1,
        borderColor: selectedTab == t('Phone') ? Colors.primary : Colors.lightGrey,
    }),
    tabContainer2: (selectedTab: any) => ({
        flex: 1,
        borderBottomWidth: 1,
        borderColor: selectedTab == t('Email') ? Colors.primary : Colors.lightGrey,
    }),
    LanguageSection: {
        ...centralStyle.justifyContentEnd,
        ...centralStyle.alignitemEnd,
        flex: .4,
    },
    LanguageButton: {
        ...centralStyle.row,
        ...centralStyle.justifyContentAround,
        width: 85,
    },
    LanguageIcon: {
      ...centralStyle.XAndYCenter
    },
    topSection: {
        flex: 3,
        ...centralStyle.justifyContentEnd,
    },
    bottomSection: {
        flex: 6.6,
    },
    logoStyle: {
        height: RFPercentage(7),
        width: RFPercentage(17),
        resizeMode: 'contain',
        tintColor: Colors.primary
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: "center"
    },
    flagContainer: {
        width: '15%',
        ...centralStyle.row,
        ...centralStyle.XAndYCenter,
    },
    phoneNumberInput: {
        width: "85%"
    },
    socialText: {
        fontSize: platform == 'ios' ? RFPercentage(1.7) : RFPercentage(2.1),
        fontFamily: "Poppins-SemiBold",
        color: Colors.fontColor,
    },
    footerTextWrapper: {
        ...centralStyle.row,
        ...centralStyle.XAndYCenter,
        ...centralStyle.my1,
    },
    flagWrapper: {
        height: 30,
        width: 30
    },
    downIcon: {
        marginHorizontal: RFPercentage(.5)
    },
    orContainer: {
        width: '40%',
        alignSelf: 'center',
        marginVertical: RFPercentage(2),
        ...centralStyle.row,
        ...centralStyle.XAndYCenter
    },
    line: {
        height: 1,
        width: '70%',
        marginHorizontal: RFPercentage(1),
        backgroundColor: Colors.lightGray
    },
    googleIcon: {
        height: RFPercentage(3.5),
        width: RFPercentage(3.5)
    },
});