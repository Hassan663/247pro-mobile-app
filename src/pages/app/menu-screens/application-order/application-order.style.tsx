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
        height: RFPercentage(6),
    },
    btnContainer: {
        marginVertical: RFPercentage(2),
        justifyContent: 'flex-end',
        paddingHorizontal: RFPercentage(5),
        flex: 1,
    },
    primaryBtnClone: {
        height: RFPercentage(5.6),
        backgroundColor: Colors.primary,
        width: '100%',
        borderRadius: RFPercentage(1)
    },
});