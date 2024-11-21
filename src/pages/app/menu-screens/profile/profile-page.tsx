// ProfilePage.js
import React, { useEffect } from 'react';
import { View, Text, FlatList, Alert, Linking, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userIdentity } from '../../../../core/http-services/apis/identity-api/authentication.service';
import { CURRENTUSERPROFILE } from '../../../../store/constant/constant';
import { styles } from './profile-page.styles';
import { ACCOUNTSETTINGDATA } from '../menu/data';
import ProfileOption from './profile-component';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const ProfilePage = ({ navigation }) => {
    const dispatch = useDispatch();
    const currentUserProfile = useSelector((state) => state.root.currentUserProfile);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (!accessToken) return;

                const parsedToken = JSON.parse(accessToken);
                const userProfile = await userIdentity(parsedToken);
                dispatch({ type: CURRENTUSERPROFILE, payload: userProfile });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [dispatch]);
    const openLink = async (url) => {
        if (await InAppBrowser.isAvailable()) {
            await InAppBrowser.open(url, {
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: '#FB9411',
                preferredControlTintColor: 'white',
            });
        } else {
            Linking.openURL(url);
        }
    };

    // Handle option press with conditions for navigation
    const handleOptionPress = (itemName) => {
        if (itemName === 'Company Profile') {
            openLink('https://app.247pro.com/account-settings/company')
            // navigation.navigate('CompanyProfile');
        } else if (itemName === 'Account Setting') {
            openLink('https://app.247pro.com/account-settings/profile')
            
            // navigation.navigate('AccountSetting');
        } else if (itemName === 'Application Settings') {
            openLink('https://app.247pro.com/application-settings')
            // navigation.navigate('ApplicationOrder'); 
        } else if(itemName === 'Roles And Permissions'){
            openLink('https://app.247pro.com/account-settings/role-and-permission')
        }
        else{
            openLink('https://app.247pro.com/account-settings/user-management')
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FF9800' }}>
        <View style={styles.container}>
            <View style={styles.gradientHeader}>
               
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>Hello {currentUserProfile?.name || 'User'}</Text>
                    <Text style={styles.subText}>Welcome back</Text>
                </View>
            </View>
            
            <Text style={styles.sectionTitle}>Account</Text>
            
            <FlatList
                data={ACCOUNTSETTINGDATA}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ProfileOption
                        icon={item.icon}
                        title={item.name}
                        subtitle={item.subtitle || ''}
                        onPress={() => handleOptionPress(item.name)}
                    />
                )}
            />
        </View>
        </SafeAreaView>
    );
};

export default ProfilePage;