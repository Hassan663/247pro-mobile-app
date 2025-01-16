import { StyleSheet } from 'react-native';
import Colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    iconContainer: {
        position: 'absolute',
        top: 20, // Adjust as needed
        right: 10,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    
    iconBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 8,
        padding: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    
    iconBoxRightPadding: {
        paddingRight: 20, // Additional right padding for the second box
    },
    
    iconCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FDE8D2', // Orange background
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    
    iconText: {
        fontSize: 14,
        color: Colors.gray,
        fontWeight: '500',
    },
    header: {
        height: 170,
        backgroundColor: '#FF9800',
        justifyContent: 'center',
        paddingHorizontal: 20,
        
    },
    welcomeText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '700',
        // marginBottom:20
    },
    subText: {
        color: Colors.white,
        fontSize: 16,
        marginTop: 5,
        fontWeight: '400',
    },
    featureBox: {
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        marginVertical: 20,
        marginTop: -40,
        borderRadius: 8,
        paddingTop: 20,
        paddingLeft:20,
        height: 180,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        position: 'relative',
    },

    featureSpacing: {
        marginTop: 20,
    },
    featureBox1: {
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 8,
        paddingTop: 20,
        paddingLeft: 20,
        height: 180,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        position: 'relative',
    },

    featureBox2: {
        backgroundColor: '#F5F5F5',
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 8,
        paddingTop: 20,
        paddingLeft: 20,
        height: 180,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        position: 'relative',
    },

    
    featureTitle: {
        fontSize: 16,
        fontWeight: '700',
        // marginTop: 10,
    },
    featureSubtitle: {
        fontSize: 14,
        color: '#666666',
        fontWeight: '400',
        marginVertical: 10,
    },
    featureSubtitle2: {
        fontSize: 14,
        color: '#666666',
        fontWeight: '400',
        marginBottom: 20,
    },

    cardContainer: {
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        padding: 20,
        height: 180,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        position: 'relative',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    
   
    textContent: {
        flex: 1,
        paddingRight: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.black,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.gray,
        marginVertical: 5,
    },
    secondarySubtitle: {
        fontSize: 14,
        color: Colors.gray,
    },
   
    readMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#BDBDBD',
    },
    readMoreText: {
        color: '#000000',
        
        fontWeight: '400',
        marginRight: 5,
    },
    featureImage: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 150,
        height: 170,
    },
    featureImage1: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 170,
        height: 140,
    },
    sectionTitle1: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 20,
        fontSize: 18,
        fontWeight: '500',
        color: '#000000',
    },

    sectionTitle: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        fontSize: 18,
        fontWeight: '500',
        color: '#000000',
    },
    appListContainer: {
        paddingHorizontal: 20,
    },
    appContainer: {
        alignItems: 'center',
        marginVertical: 10,
        width: '25%',
    },
    appIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1, // Add border width
        //  borderColor: '#E0E0E0', // Set border color
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: 'transparent', // Remove background color
    },

   
    appName: {
        fontSize: 12,
        color: '#E0E0E0',
        fontWeight: '400',
    },
    appName1: {
        fontSize: 12,
        color: '#666666',
        fontWeight: '400',
    },
    soonBadge: {
        position: 'absolute',
        top: -5,
        right: 20,
        backgroundColor: '#E1EFDE',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    soonTag: {
        backgroundColor: '#E1EFDE', // Green color
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginLeft: 8,
    },

    iconImage: {
        width: 15, // Adjust to match your design
        height: 20, // Adjust to match your design
        tintColor: Colors.primary, // Optional: apply a color overlay if needed
    },
    soonText: {
        fontSize: 12,
        color: '#666666',
        fontWeight: '600',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});