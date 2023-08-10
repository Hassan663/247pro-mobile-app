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
        justifyContent: "flex-end",
        flex: 3,
    },
    logoStyle: {
        alignSelf: "center",
        height: RFPercentage(10),
        width: RFPercentage(20),
        resizeMode: 'contain',
        tintColor: Colors.black
    },
    inputContainer: {
        flex: 3,
        paddingVertical: RFPercentage(1),
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
        alignItems: "center",
        marginVertical: RFPercentage(3)
    },
    footerTextWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },

});