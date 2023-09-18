import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    itemContainer: {
        width: '24%',
        justifyContent: "space-between",
        alignItems: "center"
    },
    listContainer: {
        height: RFPercentage(5),
    },
});