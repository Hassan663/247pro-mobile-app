import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';
import {
    centralPosition,
    centralStyle
} from '../../../styles/constant.style';

export const styles = StyleSheet.create({
    logoStyle: {
        alignSelf: centralPosition.center,
        height: RFPercentage(10),
        width: RFPercentage(17),
        resizeMode: 'contain',
        tintColor: Colors.black
    },
    titleWrapper: {
        flex: 3,
        ...centralStyle.justifyContentCenter,
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