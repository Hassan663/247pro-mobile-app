import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    infoHeaderContainer: {
        height: RFPercentage(7),
        width: `100%`
    },
    profileImg: {
        height: RFPercentage(6),
        width: RFPercentage(6),
        borderRadius: RFPercentage(3),
    },
    nameContainer: {
        flex: 3.5,
        height: RFPercentage(7),
        width: `100%`
    },
    qrContainer: {
        height: RFPercentage(5),
        width: RFPercentage(5)
    },
    listContainer: {
        height: RFPercentage(5.6),
        borderWidth: 1,
        borderColor: Colors.lightGrey,
    },
    switchContainer: {
        height: RFPercentage(6),
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        borderRadius: RFPercentage(.4)
    }
});