import { StyleSheet, Dimensions } from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { platform } from '../../../../utilities';

export const styles = StyleSheet.create<any>({
    jobInfoHeader: {
        height: RFPercentage(5),
        width: '100%',
        backgroundColor: Colors.lightGrey
    },
    btnContainer: {
        justifyContent: 'center',
        marginVertical: RFPercentage(2),
        flex: 0.2,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginVertical: RFPercentage(.5)
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    listContainer: {
        height: RFPercentage(15),
        justifyContent: 'space-evenly',
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey
    },
    invitedBtnContainer: {
        height: RFPercentage(3),
        borderRadius: RFPercentage(.4),
        width: RFPercentage(8),
        backgroundColor: Colors.lightGrey
    },
    bidderImgSize: {
        height: RFPercentage(3.5),
        width: RFPercentage(3.5)
    },
    modalContainer: (coordinates: any) => {

        let width = platform == 'ios' ? RFPercentage(17) : RFPercentage(20)
        const windowHeight = Dimensions.get('window').height;

        // Calculate whether the button is in the top half or bottom half of the screen
        const isTopHalf = coordinates.y < windowHeight / 2;

        // Calculate the position based on whether the button is in the top or bottom half
        const positionStyle = !isTopHalf ? { bottom: windowHeight - coordinates.y } : { top: coordinates.y - RFPercentage(5) };

        return ({
            position: 'absolute',
            paddingHorizontal: RFPercentage(1.5),
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
            left: coordinates.x - (width - RFPercentage(9.5)),
            ...positionStyle
        })
    },
    modalContainerAbs: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "flex-end",
    },
});