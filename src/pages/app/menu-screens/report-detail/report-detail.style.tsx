import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { platform } from '../../../../utilities';
import { t } from 'i18next';
import { windowHeight } from '../../../../styles/constant.style';

export const styles: any = StyleSheet.create<any>({
    myReportProfileContainer: {
        height: RFValue(100, windowHeight),
        width: "100%",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: Colors.gray,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
        flexDirection: "row",
    },
    wrapper: {
        flex: 1,
        backgroundColor: Colors.white
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
    },

    profileImage: {
        height: "100%",
        width: "100%"
    },

    reportTimeHeader: {
        flexDirection: "row",
        // padding: RFValue(10, windowHeight),
        justifyContent: "space-between",
        // width: "100%",
        marginVertical: RFValue(2, windowHeight)
    },
    mapContainer: {
        height: RFValue(180),
        borderWidth: 1,
        borderRadius: 10,
        width: '94%',
        margin: '3%'
    },
    timeContainer: {
        backgroundColor: "white",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
        flex: 1,
        width: "95%",
        alignContent: "center",
        padding: RFValue(15, windowHeight),
        borderRadius: 10,
    },
    totalHoursContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    hrContainer: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    hr: {
        height: RFValue(55, windowHeight),
    },
    hrWrapper: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: "85%"
    },
    hrLine: {
        backgroundColor: "black",
        height: '100%',
        width: 2,
    },
});
