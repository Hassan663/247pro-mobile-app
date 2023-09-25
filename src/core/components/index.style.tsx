import { Platform, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../styles/colors';
import { centralPosition } from '../../styles/constant.style';
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
        width: widthAuto ? 'auto' : '60%',
        color: color ? color : Colors.black,
        fontWeight: 'bold',
    }),

    primaryBtn: {
        height: 48,
        backgroundColor: Colors.primary,
        borderRadius: RFPercentage(1),
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryText: {
        color: Colors.white,
        fontWeight: '600',

        fontSize: platform == 'ios' ? RFPercentage(1.5) : RFPercentage(2),
        textTransform: 'uppercase',
    },

    footerText: (color?: string) => ({
        fontSize: Platform.OS == 'ios' ? RFPercentage(1.6) : RFPercentage(2),
        color: color ? color : Colors.black,
    }),

    ScreenSubTitle: (color?: string) => ({
        fontSize: 18,
        color: color ? color : Colors.fontColor,
        fontWeight: '600',
        marginVertical: RFPercentage(1.5),
    }),
    poppin_24: {
        fontSize: platform == 'ios' ? RFPercentage(3.1) : RFPercentage(3.6),
    },
    poppin_20: {
        fontSize: platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3),
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
    input: (pass: boolean, isActive: boolean) => ({
        borderWidth: pass ? 0 : RFPercentage(.1),
        borderRadius: 5,
        borderColor: isActive ? Colors.primary : Colors.lightGrey,
        alignItems: "center",
        paddingHorizontal: pass ? 0 : platform == 'ios' ? RFPercentage(2) : RFPercentage(3),
        width: "100%",
        height: pass ? '100%' : '85%',
    }),

    inputContainer: (height: number) => ({
        height: height ? height : 65,
        justifyContent: "flex-end",
    }),
    inputtitle: (isActive: boolean) => ({
        position: "absolute",
        paddingHorizontal: RFPercentage(1),
        zIndex: 2,
        backgroundColor: Colors.white,
        left: '3%',
        color: isActive ? Colors.primary : Colors.lightGray,
        fontSize: 14,
        fontWeight: '400',
        top: '0%',
    }),
    textInputContainer: () => ({
        flexDirection: 'row',
        width: "100%",
        height: "85%"
    }),

    passwordContainer: (isActive: boolean) => ({
        flexDirection: 'row',
        borderWidth: RFPercentage(.1),
        borderRadius: 5,
        borderColor: isActive ? Colors.primary : Colors.lightGrey,
        paddingHorizontal: RFPercentage(3),
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
        height: 48,
        backgroundColor: Colors.lightGray,
        borderRadius: RFPercentage(1),
        justifyContent: 'center',
        alignItems: 'center',

    }
});
