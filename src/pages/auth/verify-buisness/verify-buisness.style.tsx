import { StyleSheet } from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';
import { centralStyle } from '../../../styles/constant.style';

export const styles = StyleSheet.create({
    logoStyle: {
        height: RFPercentage(10),
        width: RFPercentage(22),
        resizeMode: 'contain',
        tintColor: Colors.black,
        ...centralStyle.selfCenter,
    },
    titleWrapper: {
        ...centralStyle.justifyContentCenter,
        flex: 3,
    },
    inputWrapper: {
        flex: 4,
    },
    footer: {
        flex: 3,
        ...centralStyle.justifyContentEnd,
        marginVertical: RFPercentage(2)
    },

    headerDisc: {
        width: '80%'
    },
    row: {
        ...centralStyle.row,
    },
    radioWrapper: {
        flex: 1,
        marginVertical: RFPercentage(1)
    },

    mx: {
        marginHorizontal: RFPercentage(1)
    },

});