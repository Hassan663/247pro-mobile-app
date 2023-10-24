import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';
import { centralPosition } from '../../../styles/constant.style';

export const styles = StyleSheet.create({
    titleWrapper: {
        justifyContent: centralPosition.spacebetween,
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
        justifyContent: 'space-between',
        marginBottom: RFPercentage(2)

    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: centralPosition.center,
        marginVertical: RFPercentage(3)
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
    codeFieldRoot: {
        width: "80%",
        marginLeft: '10%',
        height: RFPercentage(15),
        alignItems: centralPosition.center,
        justifyContent: centralPosition.spaceEvenly,
    },


});