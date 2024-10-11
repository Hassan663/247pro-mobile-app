import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { platform } from '../../../../utilities';
import { windowHeight } from '../../../../styles/constant.style';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    itemContainer: {
        width: '24%',
        justifyContent: "space-between",
        alignItems: "center"
    },
    shareBtnTextStyle: {
        color: Colors.white,
        fontWeight: "500",
        fontSize: platform == 'ios' ? RFPercentage(1.9) : RFPercentage(2.4),
    },
    inviteContact: {
        borderWidth: 1,
        height: RFPercentage(6),
        borderRadius: RFPercentage(1),
    },
    inviteBtnTitle: {
        fontSize: platform == 'ios' ? RFPercentage(1.9) : RFPercentage(2.4),
        fontWeight: '500'
    },
    // timeCardIcon: {
    //     marginTop: RFValue(15, windowHeight),
    //     // fontWeight: "400"
    // },
});