import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../../styles/colors';
import { platform } from '../../../../utilities';

export const styles: any = StyleSheet.create<any>({

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
        overflow: "hidden",
        backgroundColor: Colors.lightGray,
        borderColor: Colors.lightGrey
    },
    addCustomField: {
        borderWidth: 1,
        borderRadius: RFPercentage(1),
        padding: RFPercentage(1),
        width: '45%',

        justifyContent: "space-evenly",
        borderColor: Colors.lightGray,
        marginHorizontal: RFPercentage(2)
    },
    addCustomFieldTitle: {
        color: Colors.primary,
        fontWeight: "600",
        textTransform: 'uppercase',
        fontSize: platform == 'ios' ? RFPercentage(1.5) : RFPercentage(2.1),

    },
    spaceBetweenRow: {
        justifyContent: "space-between"
    },
    socialIconsStyle: {
        height: platform == 'ios' ? RFPercentage(3.5) : RFPercentage(4.5),
        width: platform == 'ios' ? RFPercentage(3.5) : RFPercentage(4.5),
        marginVertical: RFPercentage(2),
        resizeMode: 'contain'
    },
    inputContainer: (height: number) => ({
         paddingVertical: 10,
        justifyContent: "flex-end",
    }),
    textInputContainer: () => ({
        flexDirection: 'row',
        minHeight: platform == 'ios' ? 30 : 30,
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
        borderWidth: pass ? 0 : RFPercentage(.1),
        borderRadius: 5,
        borderColor: isActive ? Colors.primary : Colors.lightGrey,
        alignItems: "center",
        paddingHorizontal: pass ? 0 : platform == 'ios' ? RFPercentage(2) : RFPercentage(3),
        width: "100%",
        maxHeight: 100,
    }),
    socialInputContainer: {
        height: 50,
        backgroundColor: Colors.lightGrey,
        borderRadius: 5,
        paddingHorizontal: 20,
        width: '87%'
    },
    drop_down_button_style: {
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: RFPercentage(.5),
        borderColor: Colors.fontColor,
        borderWidth: 1
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    dropDownBtn: {
        width: "100%",
        borderWidth: RFPercentage(.1),
        borderColor: Colors.lightGrey,
        padding: 0,
        backgroundColor: 'white'
    },
    enabledSocialIcons: {
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '90%'
    },
    uploadImageModalContentContainer: {
        backgroundColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        top: '8%',
        left: "20%",
        elevation: 5,
    },
    uploadImageModal: {
        position: 'absolute',
        height: '100%', zIndex: 2, width: '100%',
    },

    captureBtn: {
        height: 50,
        borderBottomWidth: .5,
        borderColor: Colors.lightGrey,
        paddingHorizontal: RFPercentage(2),
        justifyContent: "center"
    },
    uploadBtn:{
        height: 50,
        paddingHorizontal: RFPercentage(2),
        justifyContent: "center"
    }
});