import { Dimensions, StyleSheet, Platform, StatusBar } from 'react-native'
import Colors from './colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { platform } from '../utilities';

export const windowWidth = Dimensions.get('window').width;

export const flex1BottomTab = Dimensions.get('window').height - (platform == 'ios' ? RFPercentage(10) : RFPercentage(8) - (StatusBar && StatusBar.currentHeight || 0));
export const windowHeight = Platform.OS === 'android' ? Dimensions.get('window').height - (StatusBar && StatusBar.currentHeight || 0) : Dimensions.get('window').height;
export const heightFlex1 = windowHeight / 10;


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
        height: RFPercentage(5.5),
        width: "100%",
        flexDirection: "row",
        marginVertical: RFPercentage(1),
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
    justifyContentAround: {
        justifyContent: 'space-around'
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
    column: {
        flexDirection: 'column'
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
    pb5: {
        paddingBottom: RFPercentage(5)
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
    mr2: {
        marginRight: RFPercentage(2)
    },
    mr3: {
        marginRight: RFPercentage(3)
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
    my10: {
        marginVertical: RFPercentage(10)
    },
    mb3: {
        marginBottom: RFPercentage(3)
    },
    mb1: {
        marginBottom: RFPercentage(1)
    },
    m1: {
        margin: RFPercentage(1)
    },
    m2: {
        margin: RFPercentage(2)
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
    mt6: {
        marginTop: RFPercentage(6)
    },
    mt7: {
        marginTop: RFPercentage(7)
    },
    mt8: {
        marginTop: RFPercentage(8)
    },
    mt10: {
        marginTop: RFPercentage(10)
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
    ml2: {
        marginLeft: RFPercentage(2)
    },
    mx02: {
        marginHorizontal: RFPercentage(.2)
    },
    mx0: {
        marginHorizontal: RFPercentage(0)
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
    px05: {
        paddingHorizontal: RFPercentage(.5)
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
    px3: {
        paddingHorizontal: RFPercentage(3)
    },
    p2: {
        padding: RFPercentage(2)
    },
    p1: {
        padding: RFPercentage(1)
    },
    p1p5: {
        padding: RFPercentage(1.5)
    },
    width100: {
        width: "100%"
    },
    width80: {
        width: "80%"
    },
    width70: {
        width: "70%"
    },
    width90: {
        width: "90%"
    },
    width60: {
        width: "60%"
    },
    width50: {
        width: "50%"
    },
    width40: {
        width: "40%"
    },
    width45: {
        width: "45%"
    },
    width48: {
        width: "48%"
    },
    width30: {
        width: "30%"
    },
    height100: {
        height: '100%'
    },
    wrap: {
        flexWrap: 'wrap'
    },
    fullHeightWithoutBottomTab: {
        marginBottom: platform == 'ios' ? RFPercentage(10) : RFPercentage(8),
        flex: 1
    },
    height7: {
        height: RFPercentage(7),
    },
    primaryBtnClone: {
        height: RFPercentage(5.6),
        backgroundColor: Colors.primary,
        width: '100%',
        borderRadius: RFPercentage(1)

    }

});