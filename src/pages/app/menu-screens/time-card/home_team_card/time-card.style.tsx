
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { windowHeight } from '../../../../../styles/constant.style';
import { platform } from '../../../../../utilities';

export const styles: any = StyleSheet.create<any>({
    tabContainer: (selectedTab: any) => ({
        flex: 1,
        borderBottomWidth: 1,
        borderColor: selectedTab == 'timecard' ? Colors.primary : Colors.lightGrey,
        height: RFPercentage(5),
    }),
    tabContainer2: (selectedTab: any) => ({
        flex: 1, 
        height: RFPercentage(5),
        borderBottomWidth: 1,
        borderColor: selectedTab == 'MyReport' ? Colors.primary : Colors.lightGrey,
    }),

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    // timer: {
    //     fontSize: RFValue(48, windowHeight),
        
    // },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    date: {
        textAlign: "left",
        marginVertical: RFValue(16, windowHeight),
        fontSize: RFValue(18, windowHeight),
        color: '#9E9E9E'
    },
    
    dateContainer: {
        width: '100%',
        paddingHorizontal: 20, 
        alignItems: 'flex-start', 
    },
    
    timerContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    timer: {
        fontSize: RFValue(48, windowHeight),
        color: Colors.black,
    },
    // buttonRowContainer: {
    //     flexDirection: 'row', // Align buttons horizontally
    //     justifyContent: 'space-between', // Space buttons evenly across the container
    //     width: '100%', // Ensure it spans the full width of the screen
    //     paddingHorizontal: 20, // Optional padding for the buttons
    //     marginTop: 10, // Optional margin to give space above the button row
    // },
    timerButtonContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "flex-end", // Align buttons to the right
        paddingRight: 20, // Add padding to the right for spacing from the edge
    },
    buttonRowContainer: {
        flexDirection: 'row', // Align buttons horizontally
        justifyContent: 'flex-end', // Align buttons to the right
        width: '100%', // Ensure it spans the full width of the screen
        paddingHorizontal: 20, // Optional padding for the buttons
        marginTop: 10, // Optional margin to give space above the button row
    },

    buttonFullWidth: {
        flex: 1, 
        marginHorizontal: 10, 
    },

    listContainerStyle: {
        justifyContent: 'space-between',
        height: '90%',
        top: '5%'
    },
    letterStyle: {
        textAlign: 'right',
        color: Colors.fontColor,
        fontSize: platform == 'ios' ? RFPercentage(1.8) : RFPercentage(1.5),
        width: 20,
        height: platform == 'ios' ? 20 : 'auto',
    },
    myreportContainer: {
        flex: 1,
        width: "100%",
        paddingHorizontal: RFValue(20, windowHeight)
    },
    myReportProfileContainer: {
        height: RFValue(100, windowHeight),
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
    },
    profileImage: {
        height: "100%",
        width: "100%"
    },
    reportTitle: {
        height: RFValue(80, windowHeight),
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
        borderTopWidth: 1,
        borderTopColor: Colors.gray,
        justifyContent: "space-between",
        padding: RFValue(10, windowHeight),
        width: "100%",
    },

    topRowContainer: {
        paddingTop: 40,  
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',  
        justifyContent: 'space-between',  
        alignItems: 'center',  
    },
    leadingText: {
        fontSize: 24,
        fontWeight: '400',
        color: Colors.black,  
    },
    trailingText: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.gray,  
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        // marginTop: 8,
        //marginBottom: 8,
    },
    reportHeader: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    totalHours: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    reportTimeHeader: {
        flexDirection: "row",
        padding: RFValue(10, windowHeight),
        justifyContent: "space-between"
    },
    verticalLine: {
        height: '100%',
        width: 2,
        backgroundColor: Colors.gray,
        top: RFValue(5, windowHeight),
        left: RFValue(20, windowHeight),
        position: "absolute"
    },
    circle: {
        marginTop: RFValue(5, windowHeight),
        backgroundColor: Colors.primary
    },
    itemContainer: {
        flex: 1,
        alignItems: "center",
    },

    // Dropdown Modal Styles
    dropdown: {
        position: 'absolute',
        top: 60,
        right: 10,
        backgroundColor: Colors.white,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    dropdownItem: {
        padding: 10,
    },
    dropdownText: {
        fontSize: 16,
        color: Colors.black,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    noDataText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: '50%',  // Center the text vertically on the screen
        color: Colors.gray,
    },


    dropdownMenu: {
        position: 'absolute',
        // top: RFPercentage(7),
        right: RFPercentage(2),
        backgroundColor: Colors.white,
        borderRadius: RFPercentage(1),
        elevation: 5, // For shadow on Android
        shadowColor: '#666', // For shadow on iOS
        shadowOffset: { width: 0, height: 2 }, // For shadow on iOS
        shadowOpacity: 0.25, // For shadow on iOS
        shadowRadius: 3.84, // For shadow on iOS
      },

      fullWidthButtonContainer: {
        width: '100%',
        // paddingHorizontal: 20, // Padding on the sides of the container to avoid touching edges
        flexDirection: 'row',
        justifyContent: 'space-between', // Spread the buttons evenly
    },
    
    primaryBtn: {
        backgroundColor: 'green', // Example color, adjust based on your needs
    },
    secondaryBtn: {
        backgroundColor: 'gray',
    },
    disable: {
        backgroundColor: '#d3d3d3',
    },
    disableText: {
        color: '#a1a1a1',
    },
    buttonText: {
        textAlign: 'center', // Ensure text is centered inside the button
        fontWeight: 'bold',
        fontSize: RFPercentage(2.2),
    },
     
});