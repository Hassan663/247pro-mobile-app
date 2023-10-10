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
    XAndYStart: {
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    XAndYCenter: {
        justifyContent: "center",
        alignItems: 'center'
    },
    justifyContentStart: {
        justifyContent: "flex-start"
    },
    justifyContentEvenly: {
        justifyContent: "space-evenly"
    },
    justifyContentCenter: {
        justifyContent: "center"
    },
    justifyContentEnd: {
        justifyContent: "flex-end"
    },
    justifyContentBetween: {
        justifyContent: 'space-between'
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
    pb15: {
        paddingBottom: RFPercentage(15)
    },
    my01: {
        marginVertical: RFPercentage(.1)
    },
    my02: {
        marginVertical: RFPercentage(.2)
    },
    my05: {
        marginVertical: RFPercentage(.5)
    },
    mr05: {
        marginRight: RFPercentage(0.5)
    },
    mr1: {
        marginRight: RFPercentage(1)
    },
    my1: {
        marginVertical: RFPercentage(1)
    },
    my3: {
        marginVertical: RFPercentage(3)
    },
    my2: {
        marginVertical: RFPercentage(2)
    },
    my4: {
        marginVertical: RFPercentage(4)
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
    mt3: {
        marginTop: RFPercentage(3)
    },
    mt4: {
        marginTop: RFPercentage(4)
    },
    mt5: {
        marginTop: RFPercentage(5)
    },
    mt2: {
        marginTop: RFPercentage(2)
    },
    mt1: {
        marginTop: RFPercentage(1)
    },
    ml1: {
        marginLeft: RFPercentage(1)
    },
    mx02: {
        marginHorizontal: RFPercentage(.2)
    },
    mx05: {
        marginHorizontal: RFPercentage(.5)
    },
    mx1: {
        marginHorizontal: RFPercentage(1)
    },
    mx2: {
        marginHorizontal: RFPercentage(2)
    },
    mx3: {
        marginHorizontal: RFPercentage(3)
    },
    mx4: {
        marginHorizontal: RFPercentage(4)
    },
    px1: {
        paddingHorizontal: RFPercentage(1)
    },
    py2: {
        paddingVertical: RFPercentage(2)
    },
    py1: {
        paddingVertical: RFPercentage(1)
    },
    pb3: {
        paddingBottom: RFPercentage(3)
    },
    py05: {
        paddingVertical: RFPercentage(.5)
    },
    px2: {
        paddingHorizontal: RFPercentage(2)
    },
    p2: {
        padding: RFPercentage(2)
    },
    p1: {
        padding: RFPercentage(1)
    },
    width100: {
        width: "100%"
    },
    width80: {
        width: "80%"
    },
    width90: {
        width: "90%"
    },
    height100: {
        height: '100%'
    },
    wrap: {
        flexWrap: 'wrap'
    },
});