import { StyleSheet } from 'react-native';
import Colors from '../../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
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
});