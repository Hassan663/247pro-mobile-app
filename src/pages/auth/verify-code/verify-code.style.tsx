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

});