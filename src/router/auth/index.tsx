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
import VerifyBuisness from '../../pages/auth/verify-buisness/verify-buisness';
import BuisnessQuestions from '../../pages/auth/buisness-questions/buisness-questions';
import VerifyCode from '../../pages/auth/verify-code/verify-code';
import ForgetPassword from '../../pages/auth/forget-password/forget-password.pages';
import ForgetVerifyCode from '../../pages/auth/forget-verify-code/forget-verify-code';
import SetNewPassword from '../../pages/auth/set-new-password/set-new-password';

export type RootStackParamList = {
  Splash: undefined,
  WalkThrough: undefined,
  SignUp: undefined,
  SignIn: undefined,
  EnterNameAndEmail: undefined,
  VerifyBuisness: undefined,
  BuisnessQuestions: undefined,
  VerifyCode: undefined,
  ForgetVerifyCode: undefined,
  ForgetPassword: undefined,
  SetNewPassword: undefined,
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
        initialRouteName='BuisnessQuestions'
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="WalkThrough" component={WalkThrough} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="EnterNameAndEmail" component={EnterNameAndEmail} />
        <Stack.Screen name="VerifyBuisness" component={VerifyBuisness} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
        <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
        <Stack.Screen name="ForgetVerifyCode" component={ForgetVerifyCode} />
        <Stack.Screen name="BuisnessQuestions" component={BuisnessQuestions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
