import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { platform } from '../../../../utilities';
import { t } from 'i18next';
import { windowHeight } from '../../../../styles/constant.style';

export const styles: any = StyleSheet.create<any>({
    tabContainer: (selectedTab: any) => ({
        flex: 1,
        borderBottomWidth: 1,
        borderColor: selectedTab == t('timecard') ? Colors.primary : Colors.lightGrey,
        height: RFPercentage(5),
    }),
    tabContainer2: (selectedTab: any) => ({
        flex: 1, height: RFPercentage(5),
        borderBottomWidth: 1,
        borderColor: selectedTab == t('MyReport') ? Colors.primary : Colors.lightGrey,
    }),

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
        // marginv
    },
    timer: {
        fontSize: RFValue(48, windowHeight),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    date: {
        textAlign: "center",
        marginVertical: RFValue(10, windowHeight),
        fontSize: RFValue(18, windowHeight),
    },
    timerButtonContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    listContainerStyle: {
        justifyContent: 'space-between',
        height: '90%',
        top: '5%'
        // marginTop:'10%',
    },
    letterStyle: {
        textAlign: 'right',
        color: Colors.fontColor,
        fontSize: platform == 'ios' ? RFPercentage(1.8) : RFPercentage(1.5),
        width: 20,
        height: platform == 'ios' ? 20 : 'auto',
    },
    myreportContainer: {
        flex: 1,
        width: "100%",
        paddingHorizontal: RFValue(20, windowHeight)
    },
    myReportProfileContainer: {
        height: RFValue(100, windowHeight),
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
    },
    profileImage: {
        height: "100%",
        width: "100%"
    },
    reportTitle: {
        height: RFValue(80, windowHeight),
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
        borderTopWidth: 1,
        borderTopColor: Colors.gray,
        justifyContent: "space-between",
        padding: RFValue(10, windowHeight),
        width: "100%",
    },

    topRowContainer: {
        paddingTop: 40,  // Padding of 40 from the top
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',  // Horizontal alignment
        justifyContent: 'space-between',  // Space between Today and Teams
        alignItems: 'center',  // Center the content vertically
    },
    leadingText: {
        fontSize: 24,
        fontWeight: '400',
        color: Colors.black,  // Customize the color as needed
    },
    trailingText: {
        fontSize: 16,
        fontWeight: '400',
        
        color: Colors.gray,  // Customize the color as needed
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginTop: 8,
        marginBottom: 8,
    },
    reportHeader: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    totalHours: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    reportTimeHeader: {
        flexDirection: "row",
        padding: RFValue(10, windowHeight),
        justifyContent: "space-between"
    },
    verticalLine: {
        height: '100%',
        width: 2,
        backgroundColor: Colors.gray,
        top: RFValue(5, windowHeight),
        left: RFValue(20, windowHeight),
        position: "absolute"
    },
    circle: {
        marginTop: RFValue(5, windowHeight),
        backgroundColor: Colors.primary
    },
    itemContainer: {
        flex: 1,
        alignItems: "center",
    },

    
    
});
