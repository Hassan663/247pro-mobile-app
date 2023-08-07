import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';

import SignUp from '../../pages/auth/sign-up/sign-up.pages';
import Splash from '../../pages/auth/splash/splash.pages';
import WalkThrough from '../../pages/auth/walk-through/walk-through.pages';
import SignIn from '../../pages/auth/sign-in/sign-in.pages';
import EnterNameAndEmail from '../../pages/auth/enter-name-and-email/enter-name-and-email';

export type RootStackParamList = {
  Splash: undefined,
  WalkThrough: undefined,
  SignUp: undefined,
  SignIn: undefined,
  EnterNameAndEmail: undefined,
  // Profile: { name: string }; 
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS, // Apply slide animation
        }}
        initialRouteName='EnterNameAndEmail'
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="WalkThrough" component={WalkThrough} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="EnterNameAndEmail" component={EnterNameAndEmail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
