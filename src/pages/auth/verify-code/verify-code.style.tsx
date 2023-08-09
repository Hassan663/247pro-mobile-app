import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: RFPercentage(2.5),
        backgroundColor: Colors.white
    },
    footer: {
        flex: 3,
        justifyContent: 'flex-end',
        marginVertical: RFPercentage(2)
    },

    root: {
        flex: 1,
        padding: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 30
    },
    codeFieldRoot: {
        alignSelf: 'center',
        width: "80%",
        height: RFPercentage(15),
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1,
        textAlign: 'center',
        borderColor: Colors.lightGray,
        borderRadius: RFPercentage(.5)
    },
    focusCell: {
        borderColor: '#000',
    },
    mobileImg: {
        alignSelf: "center",
        margin: RFPercentage(2),
        height: '70%',
        width: "70%"
    },
    deviceContainer: {
        flex: 3.5,
        justifyContent: "flex-end"
    },
    body: {
        flex: 6.5,
    },

});