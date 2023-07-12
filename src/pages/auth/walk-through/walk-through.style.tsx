import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';

export const styles: any = StyleSheet.create({
    wrapper: {},
    titleStyle: {
        color: Colors.black,
        fontWeight: 'bold'
    },
    imgWrapper: {
        flex: 3.5,
        alignItems: 'center',
        padding: RFPercentage(1.5)
    },
    WalkThroughTitle: {
        color: Colors.white,
        fontSize: RFPercentage(2.8),
        textAlign: 'center',
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
        justifyContent: 'space-between',
        flexDirection: "row",
        width: '100%',
        flex: 1,
    },
    pagination: (isSelected) => ({
        height: RFPercentage(1),
        marginHorizontal: RFPercentage(.5),
        borderRadius: RFPercentage(.5),
        width: isSelected ? RFPercentage(4) : RFPercentage(1),
        backgroundColor: isSelected ? Colors.white : 'rgba(0,0,0,0.3)',
    }),
    paginationWrapper: { flexDirection: "row" },
    image: {
        height: "100%",
        width: '100%'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    skipBtnWrapper: {
        flex: 6.5,
        alignItems: 'flex-end'
    },
});