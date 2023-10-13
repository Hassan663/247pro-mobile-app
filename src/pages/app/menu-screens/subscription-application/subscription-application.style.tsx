import { StyleSheet } from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { platform } from '../../../../utilities';

export const styles = StyleSheet.create<any>({
    applicationContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        borderRadius: RFPercentage(1)
    },
    modalContainerAbs: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'flex-start',
        alignItems: "flex-end",
    },
    modalContainer: {
        paddingVertical: RFPercentage(1),
        paddingHorizontal: RFPercentage(1.5),
        backgroundColor: Colors.white,
        borderColor: Colors.fontColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: RFPercentage(.5),
        justifyContent: 'space-evenly',
        right: RFPercentage(0),
        top: platform == 'ios' ? RFPercentage(3) : RFPercentage(8)

    },
});