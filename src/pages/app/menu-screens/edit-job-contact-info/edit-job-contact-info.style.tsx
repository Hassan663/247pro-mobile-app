import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { platform } from '../../../../utilities';
import {
    centralPosition,
    centralStyle
} from '../../../../styles/constant.style';

export const styles = StyleSheet.create<any>({
    tabContainer: { height: RFPercentage(.5), flexDirection: "row", justifyContent: 'space-between' },
    tabStyle: (color: string) => ({ height: "100%", width: '47%', backgroundColor: color }),
    inputContainer: (height: number) => ({
        paddingVertical: 10,
        justifyContent: "flex-end",
    }),
    textInputContainer: (isActive: boolean, about: string) => ({
        flexDirection: 'row',
        alignItems: "center",
        minHeight: platform == 'ios' ? RFPercentage(5.6) : 30,
        borderWidth: RFPercentage(.1),
        borderRadius: 5,
        borderColor: isActive ? Colors.primary : about.length > 0 ? Colors.black : Colors.lightGrey,
        paddingHorizontal: platform == 'ios' ? RFPercentage(1) : RFPercentage(2),
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
    input: (pass: boolean, isActive: boolean) => ({
        paddingVertical: RFPercentage(1),
    }),
    radioWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    takeImageContainer: {
        height: RFPercentage(18),
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: RFPercentage(1),
        borderWidth: 2,
        borderColor: Colors.lightGray,
        borderStyle: 'dashed',
        width: "100%",
        backgroundColor: Colors.lightGrey
    },
    inputWrapper2: {
        alignItems: centralPosition.center,
        ...centralStyle.row,
    },
    phoneNumberInput: {
        width: "85%"
    },
    downIcon: {
        marginHorizontal: RFPercentage(.5)
    },
    flagContainer: {
        width: '15%',
        height: 40,
        ...centralStyle.XAndYCenter,
        ...centralStyle.row,
    },
    leftSide: {
        flex: 1,
        marginRight: RFPercentage(1)
    },
    rightSide: {
        flex: 1,
        marginLeft: RFPercentage(1)
    },
    dropDownStyle: (val:string) => ({
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: RFPercentage(1),
        borderColor: val.length > 0 ? Colors.black : Colors.lightGrey,
        borderWidth: 1
    }),
});