import { StyleSheet } from 'react-native';

import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create<any>({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    iconStyle: {
        alignSelf: "center",
        height: RFPercentage(20),
        width: RFPercentage(20)
    },
    rejectContainer: {
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        borderRadius: RFPercentage(1),
        flex: 1,
    },
    drop_down_button_style: {
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: RFPercentage(1),
        borderColor: Colors.lightGrey,
        borderWidth: 1
    },
    btnContainer: {
        // position: "absolute",
        // bottom: RFPercentage(2),
    },
});