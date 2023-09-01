import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';
import { centralPosition } from '../../../styles/constant.style';
import { platform } from '../../../utilities';

export const styles = StyleSheet.create({
    inputContainer: {
        height: 40,
        borderRadius: RFPercentage(1.5),
        // marginVertical: RFPercentage(3),
        marginVertical: platform == 'ios' ? RFPercentage(1.5) : RFPercentage(3),

        backgroundColor: '#FAFAFA',
        flexDirection: 'row',
        paddingHorizontal: RFPercentage(1)
    },
    cartContainer: {
        paddingHorizontal: RFPercentage(2),
        borderBottomWidth: 1,
        paddingVertical: platform == 'ios' ? RFPercentage(2) : RFPercentage(4),
        // paddingVertical: RFPercentage(4),
        borderBottomColor: Colors.lightGray,
        // height: 180
    },
    cartBody: {
        flex: 1.5,
        width: '87%',
    },
    cartFooter: {
        justifyContent: centralPosition.spacebetween,
        alignItems: centralPosition.flexEnd
    },
    cartFooterRightIcon: {
        marginHorizontal: RFPercentage(1),
        color: Colors.black
    },
    marketPlaceBody: {
        backgroundColor: Colors.white,
        flex: 1
    },
    mx2: {
        marginHorizontal: RFPercentage(2)
    },
    px2: {
        paddingHorizontal: RFPercentage(2)
    },
    bw1: {
        borderWidth: RFPercentage(.1)
    },
    cartHeader: {
        flex: 8.8
    },
    cartHeaderIconContainer: {
        flex: 1.2
    },
    sheetContainer: {
        borderTopRightRadius: RFPercentage(2),
        borderTopLeftRadius: RFPercentage(2),
        backgroundColor: Colors.white
    },
    sheetDraggableIcon: {
        backgroundColor: Colors.fontColor,
        width: '25%'
    },
    sheetLeadPreferencesContainer: {
        height: RFPercentage(7),
        borderBottomWidth: .8,
        borderBottomColor: Colors.fontColor
    },
    sheetLeadPreferencesContainer2: {
        height: RFPercentage(7),
        borderBottomWidth: 1,
        borderBottomColor: Colors.fontColor
    },
    mh3: {
        marginHorizontal: RFPercentage(3)
    },
    titleContainer: {
        justifyContent: centralPosition.spacebetween,
        paddingHorizontal: RFPercentage(2.5),
        height: RFPercentage(5),
    },
    mt1: {
        marginTop: RFPercentage(1)
    },
    btnContainer: {
        width: platform == 'ios' ? "90%" : '80%',
        alignSelf: "center",
        margin: RFPercentage(1)
    },
    modalContainerAbs: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'flex-start',
        alignItems: "flex-end",
    },
    modalContainer: {
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
        height: platform == 'ios' ? RFPercentage(10) : 75,
        width: platform == 'ios' ? RFPercentage(17) : 140,
        justifyContent: 'center',
        right: RFPercentage(2),
        top: 25

    },
});