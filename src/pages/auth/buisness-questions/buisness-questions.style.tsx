import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';

export const styles = StyleSheet.create({
    logoStyle: {
        alignSelf: "center",
        height: RFPercentage(10),
        width: RFPercentage(22),
        resizeMode: 'contain',
        tintColor: Colors.black
    },
    titleWrapper: {
        justifyContent: "center",
        flex: 3,
    },
    inputWrapper: {
        flex: 6,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginVertical: RFPercentage(2)
    },
    row: {
        flexDirection: 'row',
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
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: RFPercentage(1)
    },
    flagContainer: {
        width: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        height: 40
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
        justifyContent:"center",
        alignItems:'center',
        width: '100%',
        position: 'absolute',
        zIndex: 20,
        backgroundColor: 'rgba(225,225,225,0.8)'
    }

});