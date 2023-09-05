import * as React from 'react';

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from '../BottomTab/bottom-tabs';
import ShareQR from '../../pages/app/biz-card-screens/share-qr/share-qr';
const Stack = createStackNavigator();

export default function appNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='ShareQR'
      >
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="ShareQR" component={ShareQR} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
