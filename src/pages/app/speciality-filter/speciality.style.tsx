import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { centralPosition } from '../../../styles/constant.style';
import Colors from '../../../styles/colors';
import { platform } from '../../../utilities';

export const styles = StyleSheet.create({

    mr1: {
        marginRight: RFPercentage(1)
    },
    mx2: {
        marginHorizontal: RFPercentage(2)
    },
    inputContainer: {
        height: 40,
        borderRadius: RFPercentage(1.5),
        marginVertical: platform == 'ios' ? RFPercentage(1) : RFPercentage(3),
        backgroundColor: '#FAFAFA',
        flexDirection: 'row',
        paddingHorizontal: RFPercentage(1)
    },
    px2: {
        paddingHorizontal: RFPercentage(2)
    },
    titleContainer: {
        height:platform=='ios'? RFPercentage(4): RFPercentage(5),

        // height: RFPercentage(5),
    },
    mt1: {
        marginTop: RFPercentage(1)
    },
    drop_down_button_style: {
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: RFPercentage(1),
        borderColor: Colors.lightGrey,
        borderWidth: 1
    },
    categoryContainer: {
        height:platform=='ios'? RFPercentage(6): RFPercentage(7),
        justifyContent: "space-between"
    },
});