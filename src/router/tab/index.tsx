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
import CompanyProfile from '../../pages/app/menu-screens/company-profile-screens/company-profile/company-profile';
import EditCompanyProfile from '../../pages/app/menu-screens/company-profile-screens/edit-company-profile/edit-company-profile';
import AccountSetting from '../../pages/app/menu-screens/account-setting/account-setting';
import AccountInformtaion from '../../pages/app/menu-screens/account-infomation/account-infomation';
import QRCode from '../../pages/app/menu-screens/qr-code/qr-code';
import AccountInformtaionCard from '../../pages/app/menu-screens/account-infomation-card/account-infomation-card';
import EditProfile from '../../pages/app/menu-screens/edit-profile/edit-profile';
import ChangePassword from '../../pages/app/menu-screens/change-password/change-password';
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
        <Stack.Screen name="ApplicationOrder" component={ApplicationOrder} />
        <Stack.Screen name="ConnectionRequests" component={ConnectionRequests} />
        <Stack.Screen name="NewContact" component={NewContact} />
        <Stack.Screen name="NewCompany" component={NewCompany} />
        <Stack.Screen name="ViewContact" component={ViewContact} />
        <Stack.Screen name="ViewCompany" component={ViewCompany} />
        <Stack.Screen name="EditCompany" component={EditCompany} />
        <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
        <Stack.Screen name="EditCompanyProfile" component={EditCompanyProfile} />
        <Stack.Screen name="AccountSetting" component={AccountSetting} />
        <Stack.Screen name="AccountInformtaion" component={AccountInformtaion} />
        <Stack.Screen name="QRCode" component={QRCode} />
        <Stack.Screen name="AccountInformtaionCard" component={AccountInformtaionCard} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
