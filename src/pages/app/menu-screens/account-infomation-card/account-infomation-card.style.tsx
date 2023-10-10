import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    profileImg: {
        height: '100%',
        width: "100%"
    },
    informationContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey
    },
    shareBtn: {
        position: "absolute",
        zIndex: 1,
        bottom: 0
    },
});