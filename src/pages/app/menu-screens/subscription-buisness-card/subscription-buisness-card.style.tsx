import { StyleSheet } from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';

export const styles = StyleSheet.create<any>({
    tabContainer: (selectedTab: boolean) => ({
        flex: 1,
        backgroundColor: selectedTab ? Colors.white : Colors.lightGrey,
        borderRadius: RFPercentage(.5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: selectedTab ? 0.25 : 0,
        shadowRadius: 3.84,
        elevation: 5,
    }),
    tabWrapper: {
        height: RFPercentage(4.5),
        borderRadius: RFPercentage(.5),
        backgroundColor: Colors.lightGrey
    },
    cardContainer: {
        borderWidth: 1,
        borderRadius: RFPercentage(1),
        borderColor: Colors.lightGray
    },
    btnStyle: {
        fontWeight: '600',
        fontSize: RFPercentage(1.8),
        color: Colors.fontColor,
        textTransform: 'uppercase'
    },
    upgradeBtnWrapper: {
        height: RFPercentage(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.1,
        elevation: 2,
        backgroundColor: "white"
    },
    draggableIconstyle: {
        width: '35%',
        backgroundColor: Colors.fontColor
    }

});