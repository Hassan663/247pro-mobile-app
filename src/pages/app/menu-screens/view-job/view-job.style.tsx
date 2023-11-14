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
});