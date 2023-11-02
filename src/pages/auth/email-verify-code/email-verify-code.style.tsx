import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';
import { centralPosition, centralStyle } from '../../../styles/constant.style';
import { platform } from '../../../utilities';

export const styles = StyleSheet.create({

    footer: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: RFPercentage(2)
    },

    root: {
        flex: 1,
        padding: 20
    },
    title: {
        textAlign: centralPosition.center,
        fontSize: 30
    },
    codeFieldRoot: {
        alignSelf: centralPosition.center,
        width: "80%",
        height: RFPercentage(15),
        alignItems: centralPosition.center,
        justifyContent: centralPosition.spacebetween,
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1,
        textAlign: centralPosition.center,
        borderColor: Colors.lightGray,
        borderRadius: RFPercentage(.5)
    },
    focusCell: {
        borderColor: '#000',
    },
    mobileImg: {
        alignSelf: centralPosition.center,
        margin: RFPercentage(2),
        height: '50%',
        width: "50%"
    },
    deviceContainer: {
        flex: 3,
        justifyContent: centralPosition.flexEnd,
    },
    body: {
        flex: 6.5,
    },
    verifyLaterBtn: {
        borderWidth: 1,
        height: RFPercentage(5.6),
        borderColor: Colors.fontColor,
        borderRadius: RFPercentage(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifyLaterBtnTitle: {
        fontSize: platform == 'ios' ? RFPercentage(1.7) : RFPercentage(2.1),
        fontFamily: 'Poppins-Medium'
    },
});