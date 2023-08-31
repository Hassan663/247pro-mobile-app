import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { centralPosition } from '../../../styles/constant.style';
import Colors from '../../../styles/colors';

export const styles = StyleSheet.create({

    mx2: {
        marginHorizontal: RFPercentage(2)
    },
    infoRow: {
        justifyContent: centralPosition.spacebetween,
        padding: RFPercentage(1),
        marginTop: RFPercentage(.5),
        paddingHorizontal: RFPercentage(2)
    },
    contentContainerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        paddingBottom: RFPercentage(2.5)
    },
});