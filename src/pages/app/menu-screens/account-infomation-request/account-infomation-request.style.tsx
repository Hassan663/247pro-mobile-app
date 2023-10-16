import { StyleSheet } from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';
import { centralStyle } from '../../../../styles/constant.style';

export const styles = StyleSheet.create({
    requestContainer: {
    },
    footer: {
        flex: 3,
        ...centralStyle.justifyContentEnd,
        marginVertical: RFPercentage(2)
    },
    imgContainer: { flex: 2 },
    requestBody: { flex: 8 },
    profileImg: {
        height: RFPercentage(6),
        width: RFPercentage(6)
    },

});