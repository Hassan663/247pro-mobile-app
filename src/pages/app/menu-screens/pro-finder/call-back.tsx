import { NavigationProp } from '@react-navigation/native';
import { changeRoute } from '../../../../core/helpers/async-storage';

// Assuming your navigator has a type like RootStackParamList
type RootStackParamList = {
    Home: undefined;
    OtherScreen: { param: string };
    // ... other screen definitions
};

// Define the type for the navigation prop
type AppNavigationProp = NavigationProp<RootStackParamList>;

// Now you can use AppNavigationProp as the type for the navigation parameter
export const dropDownCallBack = (routeName: string, navigation: AppNavigationProp) => {
    changeRoute(navigation, routeName);
}