import { StyleSheet } from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';
import { platform } from '../../../../utilities';
import Colors from '../../../../styles/colors';
import { centralPosition, centralStyle } from '../../../../styles/constant.style';

export const styles = StyleSheet.create<any>({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    stepWrapper: {
        height: RFPercentage(10),

    },
    horizontalLine: {
        height: 1,
        flex: 1,
        backgroundColor: Colors.lightGrey,

    },
    disableCircle: {
        backgroundColor: Colors.lightGrey
    },
    completeCircle: {
        backgroundColor: Colors.primary
    },
    borderWidth: {
        borderWidth: 1,
        borderColor: Colors.primary
    },
    inputWrapper2: {
        alignItems: centralPosition.center,
        ...centralStyle.row,
    },

    flagWrapper: {
        height: 30,
        width: 30
    },
    flagContainer: {
        width: '15%',
        height: 40,
        ...centralStyle.XAndYCenter,
        ...centralStyle.row,
    },
    phoneNumberInput: {
        width: "85%"
    },
    dropDownStyle: (val: string) => ({
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: RFPercentage(1),
        borderColor: val?.length > 0 ? Colors.black : Colors.lightGrey,
        borderWidth: 1
    }),
    leftSide: {
        flex: 1,
        marginRight: RFPercentage(1)
    },
    rightSide: {
        flex: 1,
        marginLeft: RFPercentage(1)
    },
});