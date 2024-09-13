import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import AuthNavigation from './auth/index';
import AppNavigation from './tab/index';

const RootStack = createStackNavigator();

const MainNavigator = () => {
  const {currentUserProfile} = useSelector((state: any) => state.root);
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
