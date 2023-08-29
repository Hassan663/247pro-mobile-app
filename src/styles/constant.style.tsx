import { Dimensions, StyleSheet } from 'react-native'
import Colors from './colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const windowHeight = Dimensions.get('window').height;
export const heightFlex1 = windowHeight / 10
type CentralPosition = {
    flexStart: any,
    center: any,
    flexEnd: any,
    left: any,
    right: any,
    spacebetween: any,
    spaceEvenly: any,
};

export const centralPosition: CentralPosition = {
    flexStart: "flex-start",
    center: 'center',
    spacebetween: "space-between",
    spaceEvenly: "space-evenly",
    flexEnd: "flex-end",
    left: "left",
    right: "right",
};
export const centralStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: RFPercentage(2.5),
        backgroundColor: Colors.white
    },
    socialButtonContainer: {
        height: 48,
        width: "100%",
        flexDirection: "row",
        marginVertical: RFPercentage(1.5),
        borderWidth: 1,
        borderRadius: RFPercentage(1),
        borderColor: Colors.lightGray,
        justifyContent: "center",
        alignItems: 'center'
    },
    selfStart: {
        alignSelf: 'flex-start'
    },
    selfCenter: {
        alignSelf: "center"
    },
    selfEnd: {
        alignSelf: 'flex-end'
    },
    XAndYCenter: {
        justifyContent: "center",
        alignItems: 'center'
    },
    justifyContentStart: {
        justifyContent: "flex-start"
    },
    justifyContentCenter: {
        justifyContent: "center"
    },
    justifyContentEnd: {
        justifyContent: "flex-end"
    },
    alignitemStart: {
        alignItems: "flex-start"
    },
    alignitemCenter: {
        alignItems: "center"
    },
    alignitemEnd: {
        alignItems: "flex-end"
    },
    row: {
        flexDirection: "row"
    },
    flex1: { flex: 1 }
});