import * as React from 'react';

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from '../BottomTab/bottom-tabs';
import Industry from '../../pages/app/industry-filter/industry';
import Speciality from '../../pages/app/speciality-filter/speciality';
import Cities from '../../pages/app/cities-filter/cities';
import JobDetail from '../../pages/app/job-detail/job-detail';

const Stack = createStackNavigator();

export default function appNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='jobDetail'
      >
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="jobDetail" component={JobDetail} />
        <Stack.Screen name="industry" component={Industry} />
        <Stack.Screen name="speciality" component={Speciality} />
        <Stack.Screen name="cities" component={Cities} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
