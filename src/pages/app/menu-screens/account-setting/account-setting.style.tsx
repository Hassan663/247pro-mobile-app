import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { platform } from '../../../../utilities';

export const styles = StyleSheet.create({
    listContainer: {
        height: platform=='android'?RFPercentage(6): RFPercentage(5.7),
        borderWidth: 1,
        borderColor: Colors.lightGrey,
    },
});