import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';

export const styles = StyleSheet.create({
     
    logoStyle: {
        alignSelf: "center",
        height: RFPercentage(10),
        width: RFPercentage(22),
        resizeMode: 'contain',
        tintColor: Colors.black
    },
    titleWrapper: {
        justifyContent: "center",
        flex: 3,
    },
    inputWrapper: {
        flex: 4,
    },
    footer: {
        flex: 3,
        justifyContent: 'flex-end',
        marginVertical: RFPercentage(2)
    },

    headerDisc: {
        width: '80%'
    },
    row: {
        flexDirection: 'row',
    },
    radioWrapper: {
        flex: 1,
        marginVertical: RFPercentage(1)
    },

    mx: {
        marginHorizontal: RFPercentage(1)
    },
    
});