import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    cardContainer: {
        height: RFPercentage(45),
        borderRadius: RFPercentage(2),
        width: '90%',
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: "white"
    },
    imgContainer: {
        position: "absolute",
        zIndex: 1
    },
    qrImg: {
        height: RFPercentage(25),
        width: RFPercentage(25)
    },
    shareBtn: {
        position: "absolute",
        zIndex: 1,
        bottom: 0
    },
});