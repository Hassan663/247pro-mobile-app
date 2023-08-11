import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';
import { centralPosition, centralStyle } from '../../../styles/constant.style';


export const styles = StyleSheet.create({
    titleWrapper: {
        flex: 2,
        ...centralStyle.row,
        ...centralStyle.alignitemEnd,
    },

    inputContainer: {
        flex: 3,
        ...centralStyle.justifyContentCenter
    },

    logInBtnContainer: {
        flex: 4,
        justifyContent: centralPosition.spacebetween,
    },
    footerContainer: {
        flex: 1,
        ...centralStyle.XAndYCenter
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: "center"
    },
    flagContainer: {
        width: '15%',
        ...centralStyle.row,
        ...centralStyle.XAndYCenter,
        height: 40
    },
    phoneNumberInput: {
        width: "85%"
    },
    socialText: {
        fontSize: RFPercentage(2),
        letterSpacing: RFPercentage(.2),
        fontWeight: '700',
    },
    footerTextWrapper: {
        ...centralStyle.row,
        ...centralStyle.XAndYCenter,
    },
    flagWrapper: {
        height: 30,
        width: 30
    },
    downIcon: {
        marginHorizontal: RFPercentage(.5)
    },
    orContainer: {
        flex: 1,
    },
    googleIcon: {
        height: RFPercentage(4.5),
        width: RFPercentage(4.5)
    },
});