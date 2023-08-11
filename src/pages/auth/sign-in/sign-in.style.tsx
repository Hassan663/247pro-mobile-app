import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';
import { centralPosition, centralStyle } from '../../../styles/constant.style';

export const styles = StyleSheet.create({
    titleWrapper: {
        flexDirection: 'row',
        flex: 2,
        ...centralStyle.alignitemEnd
        // alignItems: centralPosition.flexEnd
    },

    inputContainer: {
        flex: 3,
        justifyContent: centralPosition.center
    },

    logInBtnContainer: {
        flex: 4,
        justifyContent: centralPosition.flexEnd

    },

    footerContainer: {
        flex: 1,
        flexDirection: "row",
        ...centralStyle.XAndYCenter
    },

    forgetPassword: {
        fontSize: RFPercentage(1.7),
        fontWeight: '600',
        color: Colors.lightGray
    },

    customStyle: {
        width: RFPercentage(15),
        alignSelf: "flex-end",
    },
    titleContainer: {
        width: '80%'
    },
    mr1: {
        marginRight: RFPercentage(.5)
    },
    row: {
        flexDirection: 'row',
    },
    socialButtonContainer: {
        height: 48,
        width: "100%",
        flexDirection: "row",
        marginVertical: RFPercentage(1.5),
        borderWidth: 1,
        borderRadius: RFPercentage(1),
        borderColor: Colors.lightGray,
        justifyContent: "center",
        alignItems: 'center'
    },
    socialText: {
        fontSize: RFPercentage(2),
        letterSpacing: RFPercentage(.2),
        fontWeight: '700',
    },
    googleIcon: {
        height: RFPercentage(4.5),
        width: RFPercentage(4.5)
    },
    orContainer: {
        flexDirection: "row",
        marginVertical: RFPercentage(2),
        justifyContent: "center",
        alignItems: "center"
    },
    line: {
        height: 1,
        width: '25%',
        marginHorizontal: RFPercentage(1),
        backgroundColor: Colors.fontColor
    },
    checkBoxWrapper: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: RFPercentage(1),
        alignItems: 'center'
    },
});