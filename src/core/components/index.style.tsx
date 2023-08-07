import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../styles/colors';

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
        fontSize: RFPercentage(2),
        textTransform: 'uppercase',
    },

    footerText: (color?: string) => ({
        fontSize: RFPercentage(2),
        color: color ? color : Colors.black,
    }),

    ScreenSubTitle: (color?: string) => ({
        fontSize: 18,
        color: color ? color : Colors.fontColor,
        fontWeight: '600',
        marginVertical: RFPercentage(1.5),
    }),
    poppin_20: {
        fontSize: 20,
    },
    poppin_12: {
        fontSize: 12,
    },
    poppin_14: {
        fontSize: 14,
    },
    poppin_16: {
        fontSize: 16,
    },
    input: (pass: boolean, isActive: boolean) => ({
        borderWidth: pass ? 0 : RFPercentage(.1),
        borderRadius: 5,
        borderColor: isActive ? Colors.primary : Colors.lightGrey,
        alignItems: "center",
        paddingHorizontal: pass ? 0 : RFPercentage(3),
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
        color: isActive && Colors.primary,
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
});
