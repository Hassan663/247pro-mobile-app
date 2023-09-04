import * as React from 'react';

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from '../BottomTab/bottom-tabs';
import Industry from '../../pages/app/industry-filter/industry';
import Speciality from '../../pages/app/speciality-filter/speciality';
import Cities from '../../pages/app/market-place-screens/lead-preference/lead-preference';
import JobDetail from '../../pages/app/job-detail/job-detail';
import LeadPreference from '../../pages/app/market-place-screens/lead-preference/lead-preference';

const Stack = createStackNavigator();

export default function appNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='leadPreference'
      >
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="jobDetail" component={JobDetail} />
        <Stack.Screen name="industry" component={Industry} />
        <Stack.Screen name="speciality" component={Speciality} />
        <Stack.Screen name="cities" component={Cities} />
        <Stack.Screen name="leadPreference" component={LeadPreference} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
