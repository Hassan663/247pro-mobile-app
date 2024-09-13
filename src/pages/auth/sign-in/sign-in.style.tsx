import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../../styles/colors';
import { centralPosition, centralStyle } from '../../../styles/constant.style';
import { platform } from '../../../utilities';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      logoStyle: {
        height: RFPercentage(13.5),
        width: RFPercentage(22),
        resizeMode: 'contain',
        tintColor: Colors.primary
    },
    titleWrapper: {
        flex: 3,
     },
    //   titleWrapper: {
    //     flexDirection: 'row',
    //     flex: 2,
    //     ...centralStyle.alignitemEnd
    //     // alignItems: centralPosition.flexEnd
    // },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
      },
    // inputContainer: {
    //     flex: 3,
    //     justifyContent: centralPosition.center
    // },

    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      },

    logInBtnContainer: {
        flex: 4,
        justifyContent: centralPosition.flexEnd
    },
    disabledButton: {
        height: RFPercentage(5.6),
        width: '100%',
        borderRadius: RFPercentage(1),
        backgroundColor: '#E0E0E0'  // Disabled color
      },
    footerContainer: {
        flex: 1,
        flexDirection: "row",
        ...centralStyle.XAndYCenter,
    },
    inputError: {
        borderColor: 'red',
        color: 'red',
      },
      errorText: {
        color: 'red',
        marginBottom: 10,
      },
    forgetPassword: {
        fontSize: RFPercentage(1.7),
        fontWeight: '600',
        color: Colors.lightGray
    },
    titleContainer: {
        width: '80%'
    },
    mr1: {
        marginRight: RFPercentage(.5)
    },
    row: {
        // ...centralStyle.alignitemCenter,
        ...centralStyle.row
    },
    socialText: {
        fontSize: platform == 'ios' ? RFPercentage(1.7) : RFPercentage(2.1),
        fontFamily: "Poppins-SemiBold",
        color: Colors.fontColor,
    },
    googleIcon: {
        height: RFPercentage(3.5),
        width: RFPercentage(3.5)
    },
    orContainer: {
        paddingVertical: RFPercentage(1),
        marginVertical: RFPercentage(4),
        ...centralStyle.row,
        ...centralStyle.XAndYCenter
    },
    line: {
        height: 1,
        width: '25%',
        marginHorizontal: RFPercentage(1),
        backgroundColor: Colors.lightGray
    },
    checkBoxWrapper: {
        justifyContent: centralPosition.spacebetween,
        paddingVertical: RFPercentage(1),
        ...centralStyle.row,
    },
    yline: {
        height: '70%',
        backgroundColor: Colors.lightGrey,
        width: 1
    },
    fingerPrintImg: {
        height: RFPercentage(4),
        width: RFPercentage(4),
    },
    primaryBtnClone: {
        height: RFPercentage(5.6),
        backgroundColor: Colors.primary,
        width: '100%',
        borderRadius: RFPercentage(1)
    },
});