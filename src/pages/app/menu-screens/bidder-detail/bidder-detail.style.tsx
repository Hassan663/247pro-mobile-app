import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
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
        minHeight: RFPercentage(15),
        justifyContent: 'space-evenly',
        width: "100%",
        borderBottomWidth: 1,
        paddingVertical: RFPercentage(1),
        borderBottomColor: Colors.lightGrey
    },
    invitedBtnContainer: {
        height: RFPercentage(3),
        borderRadius: RFPercentage(.4),
        width: RFPercentage(8),
        backgroundColor: Colors.lightGrey
    },
    titleStyle: {
        fontWeight: '600',
        fontSize: platform == 'ios' ? RFPercentage(1.7) : RFPercentage(2.1)
    },
    rejectContainer: {
        backgroundColor: Colors.lightGrey,
        borderRadius: RFPercentage(1),
        flex: 1,
    },
    tagWrapper: { flex: 8.5, paddingVertical: RFPercentage(1), flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-between" },
    tagContainer: { padding: RFPercentage(.5), paddingHorizontal: RFPercentage(1), marginTop: RFPercentage(1), backgroundColor: Colors.lightGrey, borderRadius: RFPercentage(1.5), },
    bidderImg: { height: RFPercentage(6), width: RFPercentage(6) },
    bidderListBody: { flex: 8 },
    bidderListImg: { flex: 2, },
    downIconContainer: { flex: 1.5, },


    inputContainer: (height: number) => ({
        paddingVertical: 10,
        justifyContent: "flex-end",
    }),
    textInputContainer: (isActive: boolean) => ({
        flexDirection: 'row',
        alignItems: "center",
        minHeight: platform == 'ios' ? RFPercentage(5.6) : 30,
        borderWidth: RFPercentage(.1),
        borderRadius: 5,
        borderColor: isActive ? Colors.primary : Colors.lightGrey,
        paddingHorizontal: platform == 'ios' ? RFPercentage(2) : RFPercentage(3),
        width: "100%",
        maxHeight: 100,
    }),
    inputtitle: (isActive: boolean) => ({
        position: "absolute",
        paddingHorizontal: RFPercentage(1),
        zIndex: 2,
        backgroundColor: Colors.white,
        left: '3%',
        color: isActive ? Colors.primary : Colors.fontColor,
        fontSize: 14,
        fontWeight: '400',
        top: '0%',
    }),
    input: (pass: boolean, isActive: boolean) => ({
        paddingVertical: RFPercentage(1),
    }),
});