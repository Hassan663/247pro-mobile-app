import * as React from 'react';

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from '../BottomTab/bottom-tabs';
import ShareQR from '../../pages/app/biz-card-screens/share-qr/share-qr';
import EditBizCard from '../../pages/app/biz-card-screens/edit-biz-card/edit-biz-card';
import ApplicationOrder from '../../pages/app/menu-screens/application-order/application-order';
import ConnectionRequests from '../../pages/app/contact-screens/connection-requests/connection-requests';
import NewContact from '../../pages/app/contact-screens/new-contact/new-contact';
import NewCompany from '../../pages/app/contact-screens/new-company/new-company';
import ViewCompany from '../../pages/app/contact-screens/view-company/view-company';
import EditCompany from '../../pages/app/contact-screens/edit-company/edit-company';
import ViewContact from '../../pages/app/contact-screens/view-contact/view-contact';
const Stack = createStackNavigator();

export default function appNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='ViewContact'
      >
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="ShareQR" component={ShareQR} />
        <Stack.Screen name="EditBizCard" component={EditBizCard} />
        <Stack.Screen name="ApplicationOrder" component={ApplicationOrder} />
        <Stack.Screen name="ConnectionRequests" component={ConnectionRequests} />
        <Stack.Screen name="NewContact" component={NewContact} />
        <Stack.Screen name="NewCompany" component={NewCompany} />
        <Stack.Screen name="ViewContact" component={ViewContact} />
        <Stack.Screen name="ViewCompany" component={ViewCompany} />
        <Stack.Screen name="EditCompany" component={EditCompany} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
