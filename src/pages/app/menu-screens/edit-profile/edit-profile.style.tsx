import { StatusBar, StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { centralPosition, centralStyle, windowHeight } from '../../../../styles/constant.style';
import { platform } from '../../../../utilities';

export const styles = StyleSheet.create<any>({
    editIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 2,
        backgroundColor: Colors.white
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
    drop_down_button_style: {
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: RFPercentage(1),
        borderColor: Colors.lightGrey,
        borderWidth: 1
    },
    textInputContainer: () => ({
        flexDirection: 'row',
        minHeight: platform == 'ios' ? 30 : 30,
    }),
    input: (pass: boolean, isActive: boolean) => ({
        borderWidth: pass ? 0 : RFPercentage(.1),
        borderRadius: 5,
        borderColor: isActive ? Colors.primary : Colors.lightGrey,
        alignItems: "center",
        paddingHorizontal: pass ? 0 : platform == 'ios' ? RFPercentage(2) : RFPercentage(3),
        width: "100%",
        maxHeight: 100,
    }),
    inputtitle: (isActive: boolean) => ({
        position: "absolute",
        paddingHorizontal: RFPercentage(1),
        zIndex: 2,
        backgroundColor: Colors.white,
        left: '3%',
        color: isActive ? Colors.primary : Colors.fontColor,
        fontSize: 14,
        fontWeight: '400',
        top: '0%',
    }),
    inputContainer: () => ({
        paddingVertical: 10,
        justifyContent: "flex-end",
    }),
    imgContainer: {
        backgroundColor: Colors.lightGrey,
    },
    editProfileWrapperContainer: {
        backgroundColor: Colors.white
        , height: windowHeight + StatusBar?.currentHeight
    },
});