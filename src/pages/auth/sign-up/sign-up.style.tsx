import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';
import { centralPosition, centralStyle } from '../../../styles/constant.style';
import { platform } from '../../../utilities';


export const styles = StyleSheet.create({
    titleWrapper: {
        flex: 2,
        ...centralStyle.row,
        ...centralStyle.alignitemEnd,
    },

    inputContainer: {
        flex: 2,
        justifyContent: "space-evenly"
    },

    logInBtnContainer: {
        flex: 5,
        justifyContent: 'space-between',
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
        fontSize: platform == 'ios' ? RFPercentage(1.7) : RFPercentage(2.1),
        fontFamily: "Poppins-SemiBold",
        color: Colors.fontColor,
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