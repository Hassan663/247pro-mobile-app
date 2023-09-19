import { t } from 'i18next';
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../../styles/colors';

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
        borderRadius: RFPercentage(1), justifyContent: 'space-evenly'
    },
    titleContainer: {
        backgroundColor: Colors.inputBgColor,
        borderRadius: RFPercentage(.5)
    },
    listWrapper: { height: RFPercentage(6), borderBottomWidth: 1, borderBottomColor: Colors.lightGrey },

});