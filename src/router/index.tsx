import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import AuthNavigation from './auth/index';
import AppNavigation from './tab/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = createStackNavigator();

const handleBusiness = async () => {
  const business = await AsyncStorage.getItem('isBusiness');
  return business
}
const MainNavigator = () => {
  const isBusiness = handleBusiness
  console.log("isBusiness main navigator", isBusiness);
  
  const {currentUserProfile} = useSelector((state: any) => state.root);
  const [businessState, setBusinessState] = useState(isBusiness)
  //const {isBusinessUser} = useSelector((state: any) => state.root.isBusinessUser);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  

    useEffect(() => {
        if (currentUserProfile && Object.keys(currentUserProfile).length > 0) {
            if(currentUserProfile.isOnboarded){
            setIsUserLoggedIn(true);
        }
        } else {
            setIsUserLoggedIn(false);
        }
    }, [currentUserProfile]);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isUserLoggedIn ? (
          // If the user is signed in, show AppNavigation
          <RootStack.Screen
            name="AppNavigation"
            component={AppNavigation}
            options={{ headerShown: false }}
          />
        ) : (
          // Otherwise, show AuthNavigation
          <RootStack.Screen
            name="AuthNavigation"
            component={AuthNavigation}
            options={{ headerShown: false }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
