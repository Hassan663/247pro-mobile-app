import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { centralPosition } from '../../../styles/constant.style';
import Colors from '../../../styles/colors';
import { platform } from '../../../utilities';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    mx2: {
        marginHorizontal: RFPercentage(2)
    },
    infoRow: {
        justifyContent: centralPosition.spacebetween,
        padding: RFPercentage(1),
        marginTop: RFPercentage(.5),
        paddingHorizontal: RFPercentage(2)
    },
    contentContainerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        paddingBottom: RFPercentage(2.5)
    },
    btnContainer: {
        width: '80%',
        alignSelf: "center",
        margin: RFPercentage(1)
    },
    btnContainer2: {
        width: '40%',
        alignSelf: "center",
        margin: RFPercentage(1)
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
    description: {
        marginVertical: RFPercentage(.5),
        marginBottom: RFPercentage(2)
    },
    attachmentContainer: {
        borderWidth: 1,
        width: '100%',
        borderColor: Colors.lightGray,
        padding: RFPercentage(1),
        marginVertical: RFPercentage(2)
    },
    sheetContentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    bidMsg: {
        fontSize: 16,
        paddingVertical: RFPercentage(2),
        fontWeight: '400',
        textAlign: "center",
        width: '55%',
        color: Colors.fontColor
    },
    bidBtnWrapper: {
        width: '100%',
        justifyContent: "space-evenly",
    },
    createBidLater: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black
    },
    createBidLaterCustomStyle: {
        backgroundColor: Colors.lightGrey,
        borderRadius: RFPercentage(1),
        height: 50,
    },
    itemImg: {
        height:platform=='ios'?RFPercentage(7): RFPercentage(8),
        width:platform=='ios'?RFPercentage(7): RFPercentage(8),
    },
    tagsWrapper: {
        flexWrap: 'wrap',
        alignItems: "center"
    },
    my1: {
        marginVertical: platform == 'ios' ? 0 : RFPercentage(1)
    },
    itemImgContainer: {
        flex: 1.5,
        marginVertical: RFPercentage(2),
    },
    itemBody: {
        flex: 8,
        paddingVertical: RFPercentage(1),
        paddingHorizontal: platform == 'ios' ? RFPercentage(1) : 0
    },
    tagContainer: {
        margin: RFPercentage(1),
        backgroundColor: Colors.lightGrey,
        paddingHorizontal: RFPercentage(1.5),
        paddingVertical: RFPercentage(.5),
        borderRadius: RFPercentage(1),
    },
    itemDescription: {
        fontSize: 12,
        color: Colors.fontColor
    },
    arrowIcon: {
        flex: platform == 'ios' ? .7 : .5,
        marginVertical: RFPercentage(2),
    },
});