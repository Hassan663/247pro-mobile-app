import { StyleSheet } from 'react-native';

import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create<any>({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    iconStyle: {
        alignSelf: "center",
        height: RFPercentage(20),
        width: RFPercentage(20)
    },
    rejectContainer: {
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        borderRadius: RFPercentage(1),
        flex: 1,
    },
    drop_down_button_style: (primarySpecialty?: any) => ({
        backgroundColor: Colors.white,
        borderWidth: RFPercentage(.1),
        borderRadius: 5,
        borderColor: primarySpecialty.length > 0 ? Colors.fontColor : Colors.lightGrey,
        width: "100%",
        color: Colors.black,
    }),
    btnContainer: {
    },
    inputContainer: {
        height: RFPercentage(9.7),
        justifyContent: "flex-end",
    },
    inputtitle: {
        position: "absolute",
        paddingHorizontal: RFPercentage(1),
        zIndex: 2,
        backgroundColor: Colors.white,
        left: '3%',
        color: Colors.fontColor,
        fontSize: 14,
        fontWeight: '400',
        top: '0%',
    },
    textInputContainer: {
        flexDirection: 'row',
        width: "100%",
        height: "85%"
    },
    input: {
        borderWidth: RFPercentage(.1),
        borderRadius: 5,
        borderColor: Colors.fontColor,
        alignItems: "center",
        width: "100%",
        color: Colors.black,
        height: '85%',
    },
    modalContainer: {
        flex: 1,
        position: 'absolute',
        height: "100%",
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContent: {
        height: RFPercentage(35),
        width: '80%',

        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});