import * as React from 'react';

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from '../BottomTab/bottom-tabs';
import Industry from '../../pages/app/filter/industry';

const Stack = createStackNavigator();

export default function appNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="industry" component={Industry} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
