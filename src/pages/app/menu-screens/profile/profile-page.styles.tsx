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
        height: 170,
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#FF9800', 
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(68, 41, 0, 0.6)', // End color with transparency to create gradient effect
    },
    welcomeContainer: {
        flexDirection: 'column',
    },
    welcomeText: {
        fontSize: RFPercentage(2),
        fontWeight: '700',
        color: Colors.white,
        fontFamily: 'Roboto',
        marginRight: 8,
    },
    subText: {
        fontSize: RFPercentage(2),
        color: Colors.white,
        fontWeight: '400',
        fontFamily: 'Roboto',
        marginTop: 8,
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