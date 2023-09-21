import { t } from 'i18next';
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../../styles/colors';
import { platform } from '../../../../utilities';

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
        fontSize: 15,
        width: 20,
    },
   
});