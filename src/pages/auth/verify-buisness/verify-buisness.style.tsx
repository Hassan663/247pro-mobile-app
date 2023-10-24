import { StyleSheet } from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';
import { centralPosition, centralStyle } from '../../../styles/constant.style';

export const styles = StyleSheet.create({
    
    logoStyle: {
        alignSelf: centralPosition.center,
        height: RFPercentage(10),
        width: RFPercentage(17),
        resizeMode: 'contain',
        tintColor: Colors.black
    },
    titleWrapper: {
        flex: 2.5,
    },
    inputWrapper: {
        flex: 4.5,
    },
    footer: {
        flex: 3,
        ...centralStyle.justifyContentEnd,
        marginVertical: RFPercentage(2)
    },

    row: {
        ...centralStyle.row,
    },
    radioWrapper: {
        flex: 1,
        marginVertical: RFPercentage(1),
        alignItems: 'center'
    },

    mx: {
        marginHorizontal: RFPercentage(1)
    },

});