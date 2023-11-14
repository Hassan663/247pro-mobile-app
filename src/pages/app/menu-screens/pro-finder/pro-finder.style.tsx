import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { platform } from '../../../../utilities';

export const styles = StyleSheet.create<any>({
    inputContainer: {
        backgroundColor: Colors.inputBgColor,
        flex: 1,
        height: '80%',
        borderRadius: RFPercentage(0.5)
    },
    jobContainerHeader: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    jobContainerFooter: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listContainer: {
        height: RFPercentage(15),
        paddingHorizontal: RFPercentage(1),
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey
    },
    btnStyle: {
        fontWeight: '600',
        fontSize: RFPercentage(1.8),
        color: Colors.fontColor,
        textTransform: 'uppercase'
    },
    draggableIconstyle: {
        width: '35%',
        backgroundColor: Colors.fontColor
    },
    radioWrapper: {
        justifyContent: "center",
        alignItems: 'center'
    },
    mx: {
        marginHorizontal: RFPercentage(1)
    },
    modalContainerAbs: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "flex-end",
    },
    modalContainer: (coordinates: any) => {

        let width = platform == 'ios' ? RFPercentage(17) : RFPercentage(20)

        // const windowHeight = Dimensions.get('window').height;
        const windowHeight = Dimensions.get('window').height;

        // Calculate whether the button is in the top half or bottom half of the screen
        const isTopHalf = coordinates.y < windowHeight / 2;

        // Calculate the position based on whether the button is in the top or bottom half
        const positionStyle = !isTopHalf ? { bottom: windowHeight - coordinates.y } : { top: coordinates.y };

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
            width: width,
            justifyContent: 'space-evenly',
            left: coordinates.x - width,
            ...positionStyle
        })
    },
});