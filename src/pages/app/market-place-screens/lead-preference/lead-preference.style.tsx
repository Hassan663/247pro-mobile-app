import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { centralPosition } from '../../../../styles/constant.style';
import Colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
    mx2: {
        marginHorizontal: RFPercentage(2)
    },
    titleContainer: {
        justifyContent: centralPosition.spacebetween,
        paddingHorizontal: RFPercentage(2.5),
        height: RFPercentage(5),
    },
});