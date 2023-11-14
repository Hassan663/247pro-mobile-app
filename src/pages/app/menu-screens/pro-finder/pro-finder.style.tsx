import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: Colors.inputBgColor,
        flex: 1,
        height: '80%',
        borderRadius: RFPercentage(0.5)
    },
    jobContainerHeader: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    jobContainerFooter: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listContainer: {
        height: RFPercentage(15),
        paddingHorizontal: RFPercentage(1),
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey
    },
    btnStyle: {
        fontWeight: '600',
        fontSize: RFPercentage(1.8),
        color: Colors.fontColor,
        textTransform: 'uppercase'
    },
    draggableIconstyle: {
        width: '35%',
        backgroundColor: Colors.fontColor
    },
    radioWrapper: {
        justifyContent: "center",
        alignItems: 'center'
    },
    mx: {
        marginHorizontal: RFPercentage(1)
    },
});