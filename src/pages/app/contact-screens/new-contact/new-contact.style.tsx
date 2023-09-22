import Colors from '../../../../styles/colors';
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { platform } from '../../../../utilities';
import {
    centralPosition,
    centralStyle
} from '../../../../styles/constant.style';

export const styles: any = StyleSheet.create<any>({

    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    mx2: {
        marginHorizontal: RFPercentage(2)
    },
    imgContainer: {
        borderWidth: RFPercentage(.1),
        alignSelf: "center",
        margin: RFPercentage(2),
        // overflow: "hidden",
        backgroundColor: Colors.lightGrey,
        borderColor: Colors.lightGrey
    },
    addCustomField: {
        borderWidth: 1,
        borderRadius: RFPercentage(1),
        padding: RFPercentage(1),
        width: '45%',

        justifyContent: "space-evenly",
        borderColor: Colors.lightGray,
        marginHorizontal: RFPercentage(2)
    },
    addCustomFieldTitle: {
        color: Colors.primary,
        fontWeight: "600",
        textTransform: 'uppercase',
        fontSize: platform == 'ios' ? RFPercentage(1.5) : RFPercentage(2.1),

    },
    spaceBetweenRow: {
        justifyContent: "space-between"
    },
    socialIconsStyle: {
        height: platform == 'ios' ? RFPercentage(3.5) : RFPercentage(4.5),
        width: platform == 'ios' ? RFPercentage(3.5) : RFPercentage(4.5),
        marginVertical: RFPercentage(2),
        resizeMode: 'contain'
    },
    inputContainer: (height: number) => ({
        // minHeight: height ? height : 65,
        paddingVertical: 10,
        // maxHeight:100,
        // backgroundColor: 'red',

        justifyContent: "flex-end",
    }),
    textInputContainer: () => ({
        flexDirection: 'row',
        minHeight: platform == 'ios' && 30,
        // paddingVertical: 10,

        // height:'100%'
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
        borderWidth: pass ? 0 : RFPercentage(.1),
        borderRadius: 5,
        borderColor: isActive ? Colors.primary : Colors.lightGrey,
        alignItems: "center",
        paddingHorizontal: pass ? 0 : platform == 'ios' ? RFPercentage(2) : RFPercentage(3),
        width: "100%",
        maxHeight: 100,
    }),
    socialInputContainer: {
        height: 50,
        backgroundColor: Colors.lightGrey,
        borderRadius: 5,
        paddingHorizontal: 20,
        width: '87%'
    },
    drop_down_button_style: {
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: RFPercentage(.5),
        borderColor: Colors.fontColor,
        borderWidth: 1
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    dropDownBtn: {
        width: "100%",
        borderWidth: RFPercentage(.1),
        borderColor: Colors.lightGrey,
        padding: 0,
        backgroundColor: 'white'
    },
    enabledSocialIcons: {
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '90%'
    },
    uploadImageModalContentContainer: {
        backgroundColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        top: '8%',
        left: "20%",
        elevation: 5,
    },
    uploadImageModal: {
        position: 'absolute',
        height: '100%', zIndex: 2, width: '100%',
    },

    captureBtn: {
        height: 50,
        borderBottomWidth: .5,
        borderColor: Colors.lightGrey,
        paddingHorizontal: RFPercentage(2),
        justifyContent: "center"
    },
    uploadBtn: {
        height: 50,
        paddingHorizontal: RFPercentage(2),
        justifyContent: "center"
    },
    dropDownStyle: {
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: RFPercentage(1),
        borderColor: Colors.lightGrey,
        borderWidth: 1
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
    inputWrapper2: {
        alignItems: centralPosition.center,
        ...centralStyle.row,
    },
    dropdownstyle: {
        marginTop: platform !== 'ios' ? RFPercentage(-3.5) : 0,
    },
    profileImage: {
        height: '100%',
        width: '100%',
        borderRadius: RFPercentage(8)
    },
    leftSide: {
        flex: 1,
        marginRight: RFPercentage(1)
    },
    rightSide: {
        flex: 1,
        marginLeft: RFPercentage(1)
    },
    selectCompany: {
        backgroundColor: Colors.primary,
        marginRight: RFPercentage(1)
    },
    AttechmentIcon: {
        height: RFPercentage(8),
        width: RFPercentage(8),
        backgroundColor: Colors.lightGrey,
        borderRadius: RFPercentage(1),
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: Colors.lightGray
    },
    draggableIcon: {
        backgroundColor: Colors.fontColor,
        width: '30%',
        height: 4,
        borderRadius: 2,
    },
    downIconWrapper: {
        borderWidth: 1,
    },
    sheetContainer: {
        backgroundColor: Colors.white,
        borderRadius: RFPercentage(1),
    },
    inputWrapper: {
        height: RFPercentage(4),
        backgroundColor: Colors.lightGrey,
        width: '90%',
        alignSelf: 'center',
        borderRadius: RFPercentage(.5)
    },
    sectionHeaderContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey,
        width: '95%',
        backgroundColor: Colors.white,
        paddingVertical: RFPercentage(1)
    },
    contactModalContainer: {
        position: 'absolute',
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2
    },
    disableModalContainer: {
        height: '20%',
        width: "100%"
    },
    contactModalContentWrapper: {
        height: '80%',
        width: '100%',
        backgroundColor: Colors.white,
        overflow: "hidden",
        borderRadius: RFPercentage(2),
    },
    contactModalHeader: {
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerLine: {
        height: 3,
        width: '30%',
        borderRadius: RFPercentage(2),
        backgroundColor: Colors.fontColor
    },
    searchInput: {
        flex: 1,
        height: '100%',
    },
    listContainerStyle: {
        justifyContent: 'space-between',
        paddingVertical: RFPercentage(1)
    },
    letterStyle: {
        textAlign: 'right',
        color: Colors.fontColor,
        fontSize: 15,
        width: 20,

    },
    companyListContainer: {
        flex: 9.5,
    },
    listWrapper: {
        height: RFPercentage(4),
        marginVertical: 2,
    },
    flex1p2: {
        flex: 1,
    },
    userImgStyle: {
        height: RFPercentage(3),
        width: RFPercentage(3),
        borderRadius: RFPercentage(2)
    },
    flex8p8: {
        flex: 9,
    },
    companyImg: {
        height: '100%',
        width: '100%'
    },
    editIconAdd: {
        position: "absolute",
         backgroundColor: Colors.white,
        top: 5,
        right: 5,
        zIndex: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});