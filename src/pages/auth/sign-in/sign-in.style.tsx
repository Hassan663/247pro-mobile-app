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
        justifyContent: 'center'
    },

    footerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
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
});