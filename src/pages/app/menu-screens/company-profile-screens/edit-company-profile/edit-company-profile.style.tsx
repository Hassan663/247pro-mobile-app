import { StyleSheet } from 'react-native';

import Colors from '../../../../../styles/colors';

import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    centralPosition,
    centralStyle
} from '../../../../../styles/constant.style';
import { platform } from '../../../../../utilities';

export const styles: any = StyleSheet.create<any>({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    companyLogoContainer: {
        height: RFPercentage(13),
        width: RFPercentage(13),
        backgroundColor: Colors.lightGrey,
        borderRadius: RFPercentage(1),
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: Colors.lightGray,
        overflow: "hidden",

    },
    galleryImg: {
        height: RFPercentage(4),
        width: RFPercentage(4),
        tintColor: Colors.fontColor,
        margin: RFPercentage(.5)
    },
    inputWrapper2: {
        alignItems: centralPosition.center,
        ...centralStyle.row,
    },
    flagContainer: {
        width: '15%',
        height: 40,
        justifyContent: 'space-evenly',
        ...centralStyle.alignitemCenter,
        ...centralStyle.row,
    },
    phoneNumberInput: {
        width: "85%"
    },
    flagWrapper: {
        height: 30,
        width: 30
    },
    width90: {
        width: '90%'
    },
    dropDownStyle: {
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: RFPercentage(1),
        borderColor: Colors.lightGrey,
        borderWidth: 1
    },
    leftSide: {
        flex: 1,
        marginRight: RFPercentage(1)
    },
    rightSide: {
        flex: 1,
        marginLeft: RFPercentage(1)
    },
    addCustomFieldTitle: {
        color: Colors.primary,
        fontWeight: "600",
        textTransform: 'uppercase',
        fontSize: platform == 'ios' ? RFPercentage(1.5) : RFPercentage(2.1),

    },
    addCustomField: {
        borderWidth: 1,
        borderRadius: RFPercentage(1),
        padding: RFPercentage(1),
        width: '50%',
        justifyContent: "space-evenly",
        borderColor: Colors.lightGray,
    },
    companylogoImg: {
        height: RFPercentage(13),
        width: RFPercentage(13),
    },
    specialitySheetContainer: {
        borderTopRightRadius: RFPercentage(2),
        borderTopLeftRadius: RFPercentage(2)
    },
    searchInput: {
        borderWidth: 1,
        borderColor: Colors.lightGray,
        height: RFPercentage(4),
        borderRadius: RFPercentage(.5),
        ...centralStyle.px1
    },
    sheetBody: {
        height: '70%',
        backgroundColor: '#F4F5F7',
        borderRadius: RFPercentage(.3)
    },
    checkSquareContainer: {
        height: RFPercentage(2),
        width: RFPercentage(2),
        backgroundColor: `#D9D9D9`
    },
    sheetBody2: {
        height: '80%',
        borderRadius: RFPercentage(.3),
        backgroundColor: Colors.white
    },
    btnStyle: {
        color: Colors.white,
        textTransform: "uppercase",
    },
});