import {
    StyleSheet,
    TextStyle,
    ViewStyle,
    StyleProp
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';
import {
    centralPosition,
    centralStyle
} from '../../../styles/constant.style';
import { platform } from '../../../utilities';

interface Styles {
    wrapper: ViewStyle;
    titleStyle: TextStyle;
    imgWrapper: ViewStyle;
    WalkThroughTitle: TextStyle;
    slidesLogo: any;
    slideFooterContainer: ViewStyle;
    pagination: (isSelected: boolean) => StyleProp<ViewStyle>;
    paginationWrapper: ViewStyle;
    image: ViewStyle;
    slide: ViewStyle;
    text: TextStyle;
    skipBtnWrapper: ViewStyle;
}

export const styles: Styles = StyleSheet.create<any>({
    wrapper: {},
    titleStyle: {
        color: Colors.black,
        fontWeight: 'bold',
        marginTop: platform == 'android' ? RFPercentage(2) : RFPercentage(0)
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
    pagination: (isSelected: boolean) => ({
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
