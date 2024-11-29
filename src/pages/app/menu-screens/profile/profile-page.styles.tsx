// profile-page.styles.js
import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    gradientHeader: {
        height: 110,
        justifyContent: 'center',
        backgroundColor: '#FF9800',
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 1,
    },
    rowContainer: {
        flexDirection: 'row', // Row layout
        justifyContent: 'space-between', // Space between Welcome Text and Sign Out
        alignItems: 'center', // Center vertically
        paddingHorizontal: 20,
        height: '100%', // Take the full height of the gradientHeader
    },
    welcomeContainer: {
        flex: 1, // Take available space
        justifyContent: 'center', // Vertically center the text
    },
    welcomeText: {
        fontSize: RFPercentage(2.2),
        fontWeight: '700',
        color: Colors.white,
        fontFamily: 'Roboto',
        marginBottom: 2, // Slight margin to separate from subText
    },
    subText: {
        fontSize: RFPercentage(1.8),
        color: Colors.white,
        fontWeight: '400',
        fontFamily: 'Roboto',
    },
    signOutContainer: {
        paddingTop:20,
        justifyContent: 'center', // Center align text vertically
        alignItems: 'flex-end', // Align text to the end of the row
    },
    signOutText: {
        color: 'white',
        fontSize: RFPercentage(1.7),
        fontWeight: '500',
        
    },
   
    // container: {
    //     flex: 1,
    //     backgroundColor: Colors.white,
    // },
    // gradientHeader: {
    //     height: 150,
    //     justifyContent: 'center',
    //     backgroundColor: '#FF9800',
    //     borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    //     borderBottomWidth: 1,
    // },
    // rowContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center', // Ensure vertical alignment
    //     paddingHorizontal: 20,
    //     height: '100%', // Make rowContainer span the entire height
    // },
    // welcomeContainer: {
    //     flex: 1, // Ensures it takes available space
    //     justifyContent: 'center', // Centers the text vertically
    // },
    // signOutContainer: {
    //     justifyContent: 'center', // Aligns the button vertically in the container
    //     alignItems: 'center',
    // },
    // signOutText: {
    //     color: 'white',
    //     fontSize: RFPercentage(2),
    //     fontWeight: 'bold',
    // },
    // welcomeText: {
    //     fontSize: RFPercentage(2),
    //     fontWeight: '700',
    //     color: Colors.white,
    //     fontFamily: 'Roboto',
    // },
    // subText: {
    //     fontSize: RFPercentage(2),
    //     color: Colors.white,
    //     fontWeight: '400',
    //     fontFamily: 'Roboto',
    //     marginTop: 4, // Reduced margin to prevent vertical misalignment
    // },
   
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(68, 41, 0, 0.6)', // End color with transparency to create gradient effect
    },
    
    sectionTitle: {
        fontSize: RFPercentage(2.5),
        fontWeight: '500',
        color: Colors.black,
        fontFamily: 'Roboto',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: '#999999',
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
    },

    
    title: {
        fontSize: RFPercentage(1.8),
        fontWeight: '500',
        color: Colors.black,
        fontFamily: 'Roboto',
    },
    subtitle: {
        fontSize: RFPercentage(1.6),
        color: '#666666',
        fontWeight: '400',
        marginTop: 10,
    },
});