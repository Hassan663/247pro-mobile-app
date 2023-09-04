import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { centralPosition } from '../../../../styles/constant.style';
import Colors from '../../../../styles/colors';

export const styles: any = StyleSheet.create<any>({
    mx2: {
        marginHorizontal: RFPercentage(2)
    },
    titleContainer: {
        justifyContent: centralPosition.spacebetween,
        paddingHorizontal: RFPercentage(2.5),
        height: RFPercentage(5),
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    titleWrapper: {
        marginTop: RFPercentage(2),
        paddingHorizontal: RFPercentage(2.5),
    },
    listContentContainer: {
        marginHorizontal: RFPercentage(2),
        marginTop: RFPercentage(1),
        borderRadius: RFPercentage(1),
        overflow: 'hidden'
    },
    itemContainer: (index: number) => ({
        padding: RFPercentage(2), backgroundColor: Colors.lightGrey,
        borderTopWidth: index == 0 ? 0 : RFPercentage(.1),
        justifyContent: "space-between",
        borderTopColor: Colors.lightGray
    }),
});