import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    mx2: {
        marginHorizontal: RFPercentage(2)
    },
    imgContainer: {
        borderWidth: RFPercentage(.1),
        alignSelf: "center",
        margin: RFPercentage(2),
        backgroundColor: Colors.inputBgColor,
        borderColor: Colors.lightGrey
    },
    bizCartContentWrapper: {
        flex: 1,
        padding: RFPercentage(2),
    },
    rowContainerData: {
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: RFPercentage(1)
    },
    primaryCircle: {
        marginRight: RFPercentage(1.5),
        backgroundColor: `rgba(255,152,0,0.2)`
    },
    btnContainer: {
        marginTop: RFPercentage(3),
        justifyContent: 'center',
        paddingHorizontal: RFPercentage(5)
    },
    mb2: {
        marginBottom: RFPercentage(2),
    },
    socialIcons: {
        width: '70%',
        alignSelf: 'center',
        justifyContent: "space-evenly",
    },
    socialIconsStyle: {
        height: RFPercentage(4.5),
        width: RFPercentage(4.5),
        marginVertical: RFPercentage(2),
        resizeMode: 'contain'
    },
    listContainer: {
        height: RFPercentage(15),
        borderColor: Colors.lightGrey,
        borderRadius: RFPercentage(1),
        padding: RFPercentage(2),
        borderWidth: 1,
        margin: RFPercentage(2)
    },
    listBody: {
        flex: 6,
        justifyContent: "center"
    },
    listImageContainer: {
        flex: 2.5,
    },
    dotContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    createBuisnessCartContactModal: {
        height: '20%',
        width: '80%',
        borderRadius: RFPercentage(3),
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: 'space-around',
        backgroundColor: Colors.white
    },
    modalContainer: {
        position: "absolute",
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
        width: '100%'
    },

});