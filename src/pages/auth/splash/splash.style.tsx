import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
        padding: RFPercentage(2)
    },
    titleStyle: {
        color: Colors.black,
        fontWeight: 'bold'
    },
    imgWrapper: {
        height: "95%",
        marginTop: '10%',
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    customStyle: {
        alignSelf: "flex-end"
    }
});