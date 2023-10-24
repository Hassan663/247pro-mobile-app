import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';
import { centralPosition, centralStyle } from '../../../styles/constant.style';


export const styles = StyleSheet.create({
    titleWrapper: {
        flex: 3,

    },
    logoStyle: {
        alignSelf: centralPosition.center,
        height: RFPercentage(10),
        width: RFPercentage(17),
        resizeMode: 'contain',
        tintColor: Colors.black
    },
    inputContainer: {
        flex: 3,
        paddingVertical: RFPercentage(1),
    },

    logInBtnContainer: {
        flex: 4,
        justifyContent: centralPosition.spacebetween

    },
    footerContainer: {
        flex: 1,
        ...centralStyle.XAndYCenter
    },
    inputWrapper: {
        ...centralStyle.row,
        ...centralStyle.alignitemCenter,
        marginVertical: RFPercentage(3)
    },
    footerTextWrapper: {
        flexDirection: "row",
        ...centralStyle.XAndYCenter
    },

});