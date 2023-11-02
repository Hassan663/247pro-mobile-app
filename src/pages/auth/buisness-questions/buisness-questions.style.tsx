import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';
import { centralPosition, centralStyle } from '../../../styles/constant.style';

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
        flex: 6,
    },
    footer: {
        flex: 1,
        justifyContent: centralPosition.flexEnd,
        marginVertical: RFPercentage(2)
    },
    row: {
        ...centralStyle.row,
    },
    radioWrapper: {
        flex: 1,
        marginVertical: RFPercentage(1)
    },

    mx: {
        marginHorizontal: RFPercentage(1)
    },
    drop_down_button_style: {
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: RFPercentage(1),
        borderColor: Colors.lightGrey,
        borderWidth: 1
    },
    inputWrapper2: {
        alignItems: centralPosition.center,
        marginVertical: RFPercentage(1),
        ...centralStyle.row,
    },
    flagContainer: {
        width: '15%',
        height: 40,
        ...centralStyle.XAndYCenter,
        ...centralStyle.row,
    },
    phoneNumberInput: {
        width: "85%"
    },
    flagWrapper: {
        height: 30,
        width: 30
    },
    downIcon: {
        marginHorizontal: RFPercentage(.5)
    },
    loadingContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 20,
        backgroundColor: 'rgba(225,225,225,0.8)',
        ...centralStyle.XAndYCenter,
    }

});