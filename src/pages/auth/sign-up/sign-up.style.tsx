import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';
import { platform } from '../../../utilities';
import { centralStyle, windowHeight } from '../../../styles/constant.style';
import { t } from 'i18next';


export const styles = StyleSheet.create<any>({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
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
        flex: .3,
    },
    LanguageButton: {
        ...centralStyle.row,
        ...centralStyle.justifyContentAround,
        width: RFPercentage(12),
    },
    LanguageIcon: {
        ...centralStyle.XAndYCenter
    },
    topSection: {
        flex: 2.6,
        ...centralStyle.justifyContentEnd,
    },
    bottomSection: {
        flex: 7.1,
    },
    logoStyle: {
        height: RFPercentage(7),
        width: RFPercentage(17),
        resizeMode: 'contain',
        tintColor: Colors.primary
    },
    inputWrapper: {
        height: '73%',
        flexDirection: 'row',
        alignItems: "center",
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        borderRadius: 5,
        ...centralStyle.px1,
        ...centralStyle.mb1,
    },
    flagContainer: {
        width: '17%',
        ...centralStyle.row,
        ...centralStyle.XAndYCenter,
        borderRightColor: Colors.lightGray,
        borderRightWidth: 1
    },
    phoneNumberInput: {
        width: "85%",
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
    downIcon: {
        marginHorizontal: RFPercentage(.5)
    },
    orContainer: {
        width: '40%',
        alignSelf: 'center',
        marginVertical: RFPercentage(.5),
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
    PolicyText: [
        centralStyle.row,
        centralStyle.flex1,
        centralStyle.mt2,
        // centralStyle.px1,
        centralStyle.wrap,
    ],
    modalContainerAbs: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'flex-start',
        alignItems: "flex-end",
    },
    modalContainer: {
        padding: RFPercentage(1.5),
        backgroundColor: Colors.white,
        borderColor: Colors.fontColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: RFPercentage(.5),
        justifyContent: 'space-evenly',
        right: RFPercentage(.5),
        top: platform == 'ios' ? RFPercentage(9) : RFPercentage(3)
    },
    phoneInput: [centralStyle.width100, { fontSize: RFValue(14, windowHeight),paddingLeft:10 }]
});