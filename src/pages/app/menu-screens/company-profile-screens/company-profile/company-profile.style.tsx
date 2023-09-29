import { StyleSheet } from 'react-native';
import Colors from '../../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
import { platform } from '../../../../../utilities';
export const styles: any = StyleSheet.create<any>({

    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    tabsContainer: (selectedTab: any, item: any) => ({
        flex: 1,
        borderBottomWidth: 1,
        borderColor: selectedTab == item ? Colors.primary : Colors.lightGrey,
        height: RFPercentage(5),
    }),
    headerContainer: {
        height: RFPercentage(15)
    },
    bodyContainer: {
        borderTopColor: Colors.lightGrey,
        borderTopWidth: 1
    },
    imageContainer: { flex: 2.5, },
    headerBody: { flex: 7.5 },
    modalContainerAbs: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'flex-start',
        alignItems: "flex-end",
    },
    modalContainer: {
        padding: RFPercentage(1.5),
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
        justifyContent: 'space-evenly',
        right: RFPercentage(2),
        top: platform == 'ios' ? RFPercentage(3) : RFPercentage(8)
    },
    posterImg: {
        height: RFPercentage(20),
        width: RFPercentage(20),
        marginVertical: RFPercentage(1),
    },
    reviewContainer: {
        flex: 3.5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    progressContainer: {
        height: RFPercentage(1),
        borderRadius: RFPercentage(1)
    },
    reviewWrapper: {
        height: RFPercentage(15)
    },
    rangeListWrapper: {
        flex: 6.5
    },
    numberContainer: {
        width: "10%"
    },
    barContainer: {
        width: '90%',
    },
    profileHeader: {
        height: RFPercentage(7),
        width: "100%"
    },
    profileContainer: {
        flex: 1.5,
    },
    profileImg: {
        height: RFPercentage(4),
        width: RFPercentage(4)
    },
    profileBody: {
        flex: 8.5,
    },
    qr: {
        height: RFPercentage(15),
        width: RFPercentage(15)
    },
    sheetContainer: {
        borderRadius: RFPercentage(2),
    },
});