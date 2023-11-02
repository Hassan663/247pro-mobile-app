import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';
import {
    centralPosition,
    centralStyle
} from '../../../styles/constant.style';

export const styles = StyleSheet.create({
    logoStyle: {
        height: RFPercentage(10),
        width: RFPercentage(17),
        resizeMode: 'contain',
        tintColor: Colors.primary
    },
    titleWrapper: {
        flex: 3,
     },
    inputWrapper: {
        flex: 4,
    },
    footer: {
        flex: 3,
        marginVertical: RFPercentage(2),
        ...centralStyle.justifyContentEnd
    },
});