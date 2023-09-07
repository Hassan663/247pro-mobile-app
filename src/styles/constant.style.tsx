import { Dimensions, StyleSheet } from 'react-native'
import Colors from './colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const windowWidth = Dimensions.get('window').width;
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
export const centralStyle = StyleSheet.create<any>({
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
    flex1: { flex: 1 },
    circle: (size: number) => ({
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        borderRadius: size / 2
    }),
    pb10: {
        paddingBottom: RFPercentage(10)
    },
    my05: {
        marginVertical: RFPercentage(.5)
    },
    my3: {
        marginVertical: RFPercentage(3)
    },
    my2: {
        marginVertical: RFPercentage(2)
    },
    mb3: {
        marginBottom: RFPercentage(3)
    },
    mb1: {
        marginBottom: RFPercentage(1)
    },
    mb2: {
        marginBottom: RFPercentage(2)
    },
    mx2: {
        marginHorizontal: RFPercentage(2)
    },
    mx3: {
        marginHorizontal: RFPercentage(3)
    },
    px2: {
        paddingHorizontal: RFPercentage(2)
    },
    width100: {
        width: "100%"
    },

});