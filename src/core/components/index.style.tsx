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
        // backgroundColor: Colors.tabBg,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: !isEdit ? 'space-between' : 'center',
        padding: RFPercentage(2),
    }),

    ScreenMainTitle: (color?: string) => ({
        fontSize: RFPercentage(3.5),
        width: '60%',
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
});
