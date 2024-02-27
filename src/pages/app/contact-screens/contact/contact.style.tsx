import { t } from 'i18next';
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { platform } from '../../../../utilities';
import { centralStyle, windowWidth } from '../../../../styles/constant.style';

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
    titleContainer: (contactCategory: any, index: number) => ({
        backgroundColor: Colors.inputBgColor,
        borderRadius: RFPercentage(.5),
        borderColor: contactCategory === index ? Colors.primary : Colors.inputBgColor,
        borderWidth: RFPercentage(.08),
        paddingHorizontal: platform ? RFPercentage(1) : RFPercentage(.8),
        ...centralStyle.mx2,
        ...centralStyle.mr05,
        ...centralStyle.row,
        ...centralStyle.XAndYCenter,
        ...centralStyle.py05,
    }),
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
    modalContainerSpecialAbs: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 10,
        justifyContent: 'flex-start',
        alignItems: "flex-end",
    },
    modalContainerSpecial: {
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
    specialitylistContainerStyle: {
        justifyContent: 'space-between',
        height: '90%',
        // paddingVertical: RFPercentage(1)
    },
    letterStyle: {
        textAlign: 'right',
        color: Colors.fontColor,
        fontSize: platform == 'ios' ? RFPercentage(1.8) : RFPercentage(1.5),
        width: 20,
        height: platform == 'ios' ? 20 : 'auto'
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
    specialityModalContentWrapper: {
        height: '85%',
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
    specialityModalHeader: {
        alignItems: "center",
        justifyContent: "space-between",
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
    renderItemSpecialityType: {
        ...centralStyle.justifyContentBetween,
        ...centralStyle.alignitemCenter,
        ...centralStyle.row,
        borderLeftColor: Colors.gray,
        borderLeftWidth: RFPercentage(.08),
        paddingLeft: RFPercentage(.7),
        marginLeft: RFPercentage(.7),
    },
    btnStyle: {
        textAlign: "left", color:
            Colors.fontColor,
        fontSize: 14,
    },
    downIconWrapper: {
        borderWidth: 1,
    },
    inputWrapper: {
        height: RFPercentage(4),
        backgroundColor: Colors.lightGrey,
        width: '90%',
        alignSelf: 'center',
        borderRadius: RFPercentage(.5)
    },
    searchInput: {
        flex: 1,
        padding: 0,
        height: '100%',
    },
});