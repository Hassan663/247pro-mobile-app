import { Platform, StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../../styles/colors';
import { centralPosition, windowHeight } from '../../styles/constant.style';
import { platform } from '../../utilities';

export const styles: any = StyleSheet.create<any>({
    title: (isEdit: boolean) => ({
        color: Colors.white,
        fontSize: RFPercentage(2),
        fontWeight: '700',

        textTransform: 'capitalize',
        flex: isEdit ? 1 : 0,
        textAlign: 'center',
    }),

    HeaderContainer: (isEdit: boolean) => ({
        height: RFPercentage(12),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: !isEdit ? 'space-between' : 'center',
        padding: RFPercentage(2),
    }),

    ScreenMainTitle: (color?: string, widthAuto?: boolean) => ({
        fontSize: RFPercentage(3.5),
        fontFamily: "Poppins-SemiBold",
        width: widthAuto ? 'auto' : '60%',
        color: color ? color : Colors.black,
        fontWeight: 'bold',
    }),

    primaryBtn: {
        height: RFPercentage(5.6),
        backgroundColor: Colors.primary,
        borderRadius: RFPercentage(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryBtn: {
        height: RFPercentage(5.6),
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderRadius: RFValue(10, windowHeight),
        justifyContent: 'center',
        alignItems: 'center',
    },

    secondaryText: {
        // color: Colors.white,
        fontWeight: '600',
        fontSize: platform == 'ios' ? RFPercentage(1.5) : RFPercentage(2),
        textTransform: 'uppercase',
    },
    primaryText: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: platform == 'ios' ? RFPercentage(1.5) : RFPercentage(2),
        textTransform: 'uppercase',
    },

    footerText: (color?: string) => ({
        fontSize: Platform.OS == 'ios' ? RFPercentage(1.6) : RFValue(14, windowHeight),
        color: color ? color : Colors.black,
    }),

    ScreenSubTitle: (color?: string) => ({
        fontSize: 18,
        color: color ? color : Colors.fontColor,
        fontWeight: '600',
        marginVertical: RFPercentage(1.5),
    }),
    poppin_24: {
        fontSize: platform == 'ios' ? RFPercentage(2.8) : RFPercentage(3.3),
    },
    poppin_20: {
        fontSize: platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3),
        // fontSize: platform == 'ios' ? RFPercentage(2.5) : RFValue(20, windowHeight),
    },
    poppin_10: {
        fontSize: platform == 'ios' ? RFPercentage(1.2) : RFPercentage(1.5),
    },
    poppin_11: {
        fontSize: platform == 'ios' ? RFPercentage(1.3) : RFPercentage(1.6),
    },
    poppin_12: {
        fontSize: platform == 'ios' ? RFPercentage(1.5) : RFPercentage(1.8),
    },
    poppin_14: {
        fontSize: platform == 'ios' ? RFPercentage(1.7) : RFPercentage(2.1),
    },
    poppin_16: {
        fontSize: platform == 'ios' ? RFPercentage(1.9) : RFPercentage(2.4),
    },
    poppin_18: {
        fontSize: platform == 'ios' ? RFPercentage(2.1) : RFPercentage(2.7),
    },
    poppin_61: {
        fontSize: platform == 'ios' ? RFPercentage(7) : RFPercentage(7.5),
    },
    poppin_50: {
        fontSize: RFValue(50, windowHeight),
        
    },
    roboto_20: {
        fontSize: platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3),
    },
    input: (pass: boolean, isActive: boolean, inputVal: any) => ({
        borderWidth: pass ? 0 : RFPercentage(.1),
        borderRadius: 5,
        borderColor: isActive ? Colors.primary : inputVal.length > 0 ? Colors.fontColor : Colors.lightGrey,
        alignItems: "center",
        // paddingHorizontal: pass ? 0 : platform == 'ios' ? RFPercentage(2) : RFPercentage(3),
        paddingHorizontal: pass ? 0 : platform == 'ios' ? RFPercentage(2) : 17,
        fontSize: platform == 'ios' ? RFPercentage(1.3) : RFPercentage(1.6),

        width: "100%",
        color: Colors.black,
        height: pass ? '100%' : '85%',
    }),

    inputContainer: (height: number) => ({
        height: height ? height : 65,
        justifyContent: "flex-end",
        // backgroundColor:"red",
    }),
    inputtitle: (isActive: boolean, inputVal: any) => ({
        position: "absolute",
        paddingHorizontal: RFPercentage(1),
        zIndex: 2,
        backgroundColor: Colors.white,
        left: '3%',
        color: isActive ? Colors.primary : inputVal?.length > 0 ? Colors.fontColor : Colors.lightGray,
        fontSize: 14,
        fontWeight: '400',
        top: '0%',
    }),
    textInputContainer: () => ({
        flexDirection: 'row',
        width: "100%",
        height: "85%"
    }),

    passwordContainer: (isActive: boolean, inputVal: any) => ({
        flexDirection: 'row',
        borderWidth: RFPercentage(.1),
        borderRadius: 5,
        borderColor: isActive ? Colors.primary : inputVal.length > 0 ? Colors.fontColor : Colors.lightGrey,
        color: isActive ? Colors.primary : inputVal?.length > 0 ? Colors.fontColor : Colors.lightGray,
        paddingHorizontal: platform == 'ios' ? RFPercentage(2.5) : 17,
        width: "100%",
        height: '85%'
    }),
    eyeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    dropDownStyle: {
        borderBottomLeftRadius: 10,
        marginTop: platform !== 'ios' ? RFPercentage(-3.5) : 0,
        borderBottomRightRadius: 10
    },
    headerContainer: {
        marginTop: platform !== 'ios' ? RFPercentage(3.5) : 0,
        height: platform == 'ios' ? RFPercentage(6) : 50,
        backgroundColor: Colors.white,
        flexDirection: "row",
        borderBottomWidth: 1,
        alignItems: centralPosition.center,
        width: '100%',
        borderBottomColor: Colors.lightGrey,
    },
    modalContainerAbs: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'flex-start',
        alignItems: "flex-end",
    },
    modalContainer: {
        paddingHorizontal: RFPercentage(1.5),
        backgroundColor: Colors.white,
        borderColor: Colors.fontColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: RFPercentage(.5),
        width: platform == 'ios' ? RFPercentage(17) : RFPercentage(20),
        justifyContent: 'space-evenly',
        right: RFPercentage(2),
        top: platform == 'ios' ? RFPercentage(3) : RFPercentage(8)

    },
    disable: {
        height: RFPercentage(5.6),
        backgroundColor: Colors.lightGray,
        borderRadius: RFPercentage(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderStyle: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(10,10,10,0.4)'
    },

    spinerBox: {
        width: RFPercentage(15),
        height: RFPercentage(10),
        borderRadius: RFPercentage(1),
        justifyContent: 'center',
        // flex: 1,
        // backgroundColor:Colors.lightGrey
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
    downIconWrapper: {
        borderWidth: 1,
    },
    screenLoaderContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        position: 'absolute',
        zIndex: 10,
        height: "100%",
        width: "100%",
    }
});

