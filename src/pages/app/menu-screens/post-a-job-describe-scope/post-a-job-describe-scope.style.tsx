import { StyleSheet } from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';
import { platform } from '../../../../utilities';
import Colors from '../../../../styles/colors';

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
    borderWidth: {
        borderWidth: 1,
        borderColor: Colors.primary
    },
    disableCircle: { backgroundColor: Colors.lightGrey },
    completeCircle: { backgroundColor: Colors.primary },
    textInputContainer: (isActive: boolean) => ({
        borderWidth: RFPercentage(.1),
        borderRadius: 5,
        borderColor: isActive ? Colors.primary : Colors.lightGrey,
        paddingHorizontal: platform == 'ios' ? RFPercentage(1) : RFPercentage(2),
        width: "100%",
        height: RFPercentage(12),
    }),
    input: (pass: boolean, isActive: boolean) => ({
        height: "100%",
        textAlignVertical: 'top'
    }),
    inputContainer: (height: number) => ({
        paddingVertical: 10,
        justifyContent: "flex-end",
    }),
    inputtitle: (isActive: boolean) => ({
        position: "absolute",
        paddingHorizontal: RFPercentage(1),
        zIndex: 2,
        backgroundColor: Colors.white,
        left: '3%',
        color: isActive ? Colors.primary : Colors.fontColor,
        fontSize: 14,
        fontWeight: '400',
        top: '0%',
    }),
    dropDownStyle: {
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: RFPercentage(1),
        borderColor: Colors.lightGrey,
        borderWidth: 1
    },
    radioWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    browsContainer: {
        backgroundColor: Colors.inputBgColor,
        borderRadius: RFPercentage(.5)
    },
});