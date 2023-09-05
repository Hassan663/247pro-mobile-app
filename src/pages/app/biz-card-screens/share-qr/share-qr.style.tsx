import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    qrStyle: {
        height: RFPercentage(30),
        width: RFPercentage(30),
        resizeMode: 'contain',
        marginVertical: RFPercentage(2)
    },
    btnContainer: {
        marginTop: RFPercentage(1),
        justifyContent: 'center',
        paddingHorizontal: RFPercentage(3)
    },
    rowContainerData: {
        borderTopWidth: RFPercentage(.1),
        borderTopColor: Colors.lightGray,
        flexDirection: 'row',
        height: RFPercentage(7),
        alignItems: "center",
        backgroundColor: Colors.lightGrey,
        width: "100%",
    },
    primaryCircle: {
        marginRight: RFPercentage(1.5),
        backgroundColor: `rgba(255,152,0,0.2)`
    },
    listWrapper: {
        borderRadius: RFPercentage(1),
        overflow: 'hidden',
        width: "90%",
        alignSelf: 'center',
    },
    removeBorder: {
        borderTopWidth: 0
    },
    createBuisnessCartContactModal: {
        height: '20%',
        width: '80%',
        borderRadius: RFPercentage(3),
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: 'space-around',
        backgroundColor: Colors.white
    },
    modalContainer: {
        position: "absolute",
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
        width: '100%'
    },
});