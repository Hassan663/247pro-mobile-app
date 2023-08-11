import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';

export const styles = StyleSheet.create({
 
    titleWrapper: {
        justifyContent: 'space-between',
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
        justifyContent: 'space-between',
        marginBottom: RFPercentage(2)

    },
    inputWrapper: {
        width: '100%',
        marginVertical: RFPercentage(2)
    },


});