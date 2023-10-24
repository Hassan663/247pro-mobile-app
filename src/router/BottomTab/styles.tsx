import { StyleSheet, ViewStyle } from 'react-native';
import Colors from '../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { platform } from '../../utilities';

export const styles = StyleSheet.create<any>({
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(243, 244, 245, 0.5)',
        borderTopLeftRadius: RFPercentage(5),
        borderTopRightRadius: RFPercentage(5),
        position: 'absolute',
        bottom: 0,
        justifyContent: "center",
        alignItems: 'flex-end',
        overflow: 'hidden',
        width: "100%"
    },
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        height: "96%",
        width: "100%",
        alignItems: 'center',
        padding: RFPercentage(3),
        borderTopLeftRadius: RFPercentage(5),
        borderTopRightRadius: RFPercentage(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,
    },
    title: {
        color: Colors.primary,
        flex: 1,
        fontWeight: "700",
        textAlign: "center"
    },
    iconContainer: (isFocused: boolean): ViewStyle => ({
        height: RFPercentage(5),
        width: RFPercentage(5),
        borderRadius: RFPercentage(3),
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: isFocused ? Colors.primary : undefined
    }),
    buttonContainer: (isFocused: boolean): ViewStyle => ({
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: RFPercentage(3),
        width: "100%",
        overflow: 'hidden',
        backgroundColor: isFocused ?
            Colors.lightGray
            :
            undefined
    }),
    tabBarStyle: (hasBottomBar: any) => ({
        height: platform == 'ios' ? RFPercentage(10) : RFPercentage(8),
        marginBottom: platform == 'ios' ? hasBottomBar ? "12%" : RFPercentage(3) : '0%',
        // marginBottom: platform == 'ios' ? '12%' : '0%',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        position: "absolute",
        backgroundColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    }),
});
