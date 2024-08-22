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
        padding: RFValue(10, windowHeight),
        justifyContent: "space-between",
        width: "94%",
        marginHorizontal: "6%"
    },
    mapContainer: {
        height: RFValue(180),
        borderWidth: 1,
        borderRadius: 10,
        width: '94%',
        margin: '3%'
    },
});
