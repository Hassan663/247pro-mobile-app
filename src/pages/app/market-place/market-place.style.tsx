import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    inputContainer: {
        height: 40,
        borderRadius: RFPercentage(1.5),
        marginVertical: RFPercentage(3),
        backgroundColor: '#FAFAFA',
        flexDirection: 'row',
        paddingHorizontal: RFPercentage(1)
    },

});