import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';
import { centralPosition, centralStyle } from '../../../styles/constant.style';

export const styles: any = StyleSheet.create({
    wrapper: {},
    titleStyle: {
        color: Colors.black,
        fontWeight: 'bold'
    },
    imgWrapper: {
        flex: 3.5,
        padding: RFPercentage(1.5),
        ...centralStyle.alignitemCenter
    },
    WalkThroughTitle: {
        color: Colors.white,
        fontSize: RFPercentage(2.8),
        textAlign: centralPosition.center,
        width: '75%'
    },
    slidesLogo: {
        height: '30%',
        width: '35%'
    },
    slideFooterContainer: {
        height: RFPercentage(5),
        padding: RFPercentage(2),
        alignItems: 'center',
        justifyContent: centralPosition.spacebetween,
        width: '100%',
        flex: 1,
        ...centralStyle.row,
    },
    pagination: (isSelected: boolean): any => ({
        height: RFPercentage(1),
        marginHorizontal: RFPercentage(0.5),
        borderRadius: RFPercentage(0.5),
        width: isSelected ? RFPercentage(4) : RFPercentage(1),
        backgroundColor: isSelected ? 'white' : 'rgba(0,0,0,0.3)',
    }),

    paginationWrapper: {
        ...centralStyle.row,
    },
    image: {
        height: "100%",
        width: '100%'
    },
    slide: {
        flex: 1,
        ...centralStyle.XAndYCenter,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    skipBtnWrapper: {
        flex: 6.5,
        ...centralStyle.alignitemEnd,

    },
});