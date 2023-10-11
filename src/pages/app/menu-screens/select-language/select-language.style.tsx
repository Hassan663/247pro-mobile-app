import { StyleSheet } from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { platform } from '../../../../utilities';

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
    dropDownStyle: {
        borderBottomLeftRadius: 10,
        marginTop: platform !== 'ios' ? RFPercentage(-3.5) : 0,
        borderBottomRightRadius: 10
    },
});