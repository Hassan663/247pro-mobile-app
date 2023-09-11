import * as React from 'react';

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from '../BottomTab/bottom-tabs';
import ShareQR from '../../pages/app/biz-card-screens/share-qr/share-qr';
import EditBizCard from '../../pages/app/biz-card-screens/edit-biz-card/edit-biz-card';
const Stack = createStackNavigator();

export default function appNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='AppTabs'
      >
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="ShareQR" component={ShareQR} />
        <Stack.Screen name="EditBizCard" component={EditBizCard} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
