import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { platform } from '../../../../utilities';

export const styles = StyleSheet.create<any>({
    jobInfoHeader: {
        height: RFPercentage(5),
        width: '100%',
        backgroundColor: Colors.lightGrey
    },
    btnContainer: {
        justifyContent: 'center',
        marginVertical: RFPercentage(2),

        flex: 0.2,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginVertical: RFPercentage(.5)
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    listContainer: {
        minHeight: RFPercentage(15),
        justifyContent: 'space-evenly',
        width: "100%",
        borderBottomWidth: 1,
        paddingVertical: RFPercentage(1),
        borderBottomColor: Colors.lightGrey
    },
    invitedBtnContainer: {
        height: RFPercentage(3),
        borderRadius: RFPercentage(.4),
        width: RFPercentage(8),
        backgroundColor: Colors.lightGrey
    },
    titleStyle: {
        fontWeight: '600',
        fontSize: platform == 'ios' ? RFPercentage(1.7) : RFPercentage(2.1)
    },
    rejectContainer: {
        backgroundColor: Colors.lightGrey,
        borderRadius: RFPercentage(1),
        flex: 1,
    },
});