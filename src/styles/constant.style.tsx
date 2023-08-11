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
};

export const centralPosition: CentralPosition = {
    flexStart: "flex-start",
    center: 'center',
    flexEnd: "flex-end",
    left: "left",
    right: "right",
};
// export const centralPosition = {
//     flexStart: "flex-start",
//     center: 'center',
//     flexEnd: "flex-end",
//     left: "left",
//     right: "right",

// }
export const centralStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: RFPercentage(2.5),
        backgroundColor: Colors.white
    },
    selfStart: { alignSelf: 'flex-start' },
    selfCenter: { alignSelf: "center" },
    selfEnd: { alignSelf: 'flex-end' },
    XAndYCenter: { justifyContent: "center", alignItems: 'center' },
    justifyContentStart: { justifyContent: "flex-start" },
    justifyContentCenter: { justifyContent: "center" },
    justifyContentEnd: { justifyContent: "flex-end" },
    alignitemStart: { alignItems: "flex-start" },
    alignitemCenter: { alignItems: "center" },
    alignitemEnd: { alignItems: "flex-end" },
});