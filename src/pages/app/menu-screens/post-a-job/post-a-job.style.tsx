import { StyleSheet } from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../../styles/colors';

export const styles = StyleSheet.create<any>({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    stepWrapper: {
        height: RFPercentage(10),

    },
    horizontalLine: {
        height: 1,
        flex: 1,
        backgroundColor: Colors.lightGrey,

    },
    borderWidth: {
        borderWidth: 1,
        borderColor: Colors.primary
    },
    disableCircle: { backgroundColor: Colors.lightGrey },
    inputContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        height: RFPercentage(6),
        borderRadius: RFPercentage(0.5)
    },
});