import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';

export const styles = StyleSheet.create({

    mr1: {
        marginRight: RFPercentage(1)
    },
    my1: {
        marginVertical: RFPercentage(1)
    },
    mx2: {
        marginHorizontal: RFPercentage(2)
    },
    inputContainer: {
        height: 40,
        borderRadius: RFPercentage(1.5),
        marginVertical: RFPercentage(3),
        backgroundColor: '#FAFAFA',
        flexDirection: 'row',
        paddingHorizontal: RFPercentage(1)
    },
    px2: {
        paddingHorizontal: RFPercentage(2)
    },
    titleContainer: {
        height: RFPercentage(5),
    },
    mt1: {
        marginTop: RFPercentage(1)
    },
    spaceBetween: {
        justifyContent: "space-between"
    },
    drop_down_button_style: {
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: RFPercentage(1),
        borderColor: Colors.lightGrey,
        borderWidth: 1
    },
});