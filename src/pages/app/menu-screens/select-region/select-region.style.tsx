import { StyleSheet } from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
    dropDownBtn: {
        width: "100%",
        borderWidth: RFPercentage(.1),
        borderColor: Colors.lightGrey,
        padding: 0,
        backgroundColor: 'white'
    },
    socialIcon: {
        width: RFPercentage(4),
        height: RFPercentage(4),
        marginRight: 10
    },
    selectRegionContainer: {
        minHeight: RFPercentage(5),
        borderWidth: 1,
        borderColor: Colors.lightGrey
    },

});