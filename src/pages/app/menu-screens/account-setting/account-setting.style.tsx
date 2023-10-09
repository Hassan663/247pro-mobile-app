import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    listContainer: {
        height: RFPercentage(5.6),
        borderWidth: 1,
        borderColor: Colors.lightGrey,
    },
});