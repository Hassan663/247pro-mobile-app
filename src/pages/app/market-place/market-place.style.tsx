import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';
import { centralPosition } from '../../../styles/constant.style';

export const styles = StyleSheet.create({
    inputContainer: {
        height: 40,
        borderRadius: RFPercentage(1.5),
        marginVertical: RFPercentage(3),
        backgroundColor: '#FAFAFA',
        flexDirection: 'row',
        paddingHorizontal: RFPercentage(1)
    },
    cartContainer: {
        paddingHorizontal: RFPercentage(2),
        borderBottomWidth: 1,
        paddingVertical: RFPercentage(4),
        borderBottomColor: Colors.lightGray,
        height: 180
    },
    cartBody: {
        flex: 1.5,
        width: '87%',
    },
    cartFooter: {
        justifyContent: centralPosition.spacebetween,
        alignItems: centralPosition.flexEnd
    },
    cartFooterRightIcon: {
        marginHorizontal: RFPercentage(1),
        color: Colors.black
    },
    marketPlaceBody: {
        backgroundColor: Colors.white,
        flex: 1
    },
    mx2: { marginHorizontal: RFPercentage(2) },
    px2: { paddingHorizontal: RFPercentage(2) },
    bw1: { borderWidth: RFPercentage(.1) },
    cartHeader: { flex: 8.8 },
    cartHeaderIconContainer: { flex: 1.2 },
});