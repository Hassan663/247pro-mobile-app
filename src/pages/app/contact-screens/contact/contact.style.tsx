import { t } from 'i18next';
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../../styles/colors';
import { platform } from '../../../../utilities';
import { windowWidth } from '../../../../styles/constant.style';

export const styles: any = StyleSheet.create<any>({

    tabContainer: (selectedTab: any) => ({
        flex: 1,
        borderBottomWidth: 1,
        borderColor: selectedTab == t('Contacts') ? Colors.primary : Colors.lightGrey,
        height: RFPercentage(5),
    }),
    tabContainer2: (selectedTab: any) => ({
        flex: 1, height: RFPercentage(5),
        borderBottomWidth: 1,
        borderColor: selectedTab == t('Company (200)') ? Colors.primary : Colors.lightGrey,
    }),
    height7: {
        height: RFPercentage(7),
    },
    addContactContaienr: {
        borderWidth: .3,
        height: RFPercentage(4),
        width: RFPercentage(20),
        borderRadius: RFPercentage(1),
        justifyContent: 'space-evenly'
    },
    titleContainer: {
        backgroundColor: Colors.inputBgColor,
        borderRadius: RFPercentage(.5)
    },
    listWrapper: {
        height: RFPercentage(6),
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey
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
    listContainerStyle: {
        justifyContent: 'space-between',
        height: '90%',
    },
    letterStyle: {
        textAlign: 'right',
        color: Colors.fontColor,
        fontSize: RFPercentage(1.8),
        width: 20,
    },
    justifyContentBetween: {
        justifyContent: 'space-between'
    },
    sliderStyle: {
        width: windowWidth / 1.3,
        height: 40
    },
    clearFiler: {
        fontSize: platform == 'ios' ? RFPercentage(1.7) : RFPercentage(2.1),
        color: Colors.fontColor,
        fontWeight: '600', textTransform: 'uppercase'
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
        height: '40%',
        width: "100%"
    },
    contactModalContentWrapper: {
        height: '60%',
        width: '100%',
        backgroundColor: Colors.white,
        overflow: "hidden",
        borderTopRightRadius: RFPercentage(2),
        borderTopLeftRadius: RFPercentage(2),
    },
    contactModalHeader: {
        alignItems: "center",
        justifyContent: "center",
    },
    headerLine: {
        height: 3,
        width: '30%',
        borderRadius: RFPercentage(2),
        backgroundColor: Colors.fontColor
    },
    importModalContainer: {
        height: 150,
        width: '80%',
        borderRadius: RFPercentage(2),
        backgroundColor: Colors.white
    },
    bgTransparent: {
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    filesListContainer: {
        height: 100,
        width: '30%',
    },
    listContentContainerStyle: {
        justifyContent: 'space-between'
    },
});