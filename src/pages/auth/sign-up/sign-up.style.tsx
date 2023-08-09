import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';


export const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: RFPercentage(2.5),
        backgroundColor: Colors.white
    },

    titleWrapper: {
        flexDirection: 'row',
        flex: 2,
        alignItems: 'flex-end'
    },

    inputContainer: {
        flex: 3,

        justifyContent: "center"
    },

    logInBtnContainer: {
        flex: 4,
        justifyContent: 'space-between'

    },
    footerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: "center"
    },
    flagContainer: {
        width: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        height: 40
    },
    phoneNumberInput: {
        width: "85%"
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
    footerTextWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    flagWrapper: {
        height: 30,
        width: 30
    },
    downIcon: { marginHorizontal: RFPercentage(.5) },
    orContainer: {
        flexDirection: 'row',
        height: 20,
        marginVertical: RFPercentage(3),
        justifyContent: 'center',
        alignItems: "center"
    },
    googleIcon: {
        height: RFPercentage(4.5),
        width: RFPercentage(4.5)
    },
});