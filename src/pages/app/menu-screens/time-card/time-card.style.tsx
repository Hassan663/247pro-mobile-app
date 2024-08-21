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
        backgroundColor: Colors.white
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
        top:'5%'
        // marginTop:'10%',
    },
    letterStyle: {
        textAlign: 'right',
        color: Colors.fontColor,
        fontSize: platform == 'ios' ? RFPercentage(1.8) : RFPercentage(1.5),
        width: 20,
        height: platform == 'ios' ? 20 : 'auto',
    },
});