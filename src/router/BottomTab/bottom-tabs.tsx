// import * as React from 'react';
// import { View } from 'react-native'

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useSafeArea } from 'react-native-safe-area-context';

// import BizCard from '../../pages/app/biz-card-screens/biz-card/biz-card';
// import Contact from '../../pages/app/contact-screens/contact/contact';
// import Menu from '../../pages/app/menu-screens/menu/menu';
// import Colors from '../../styles/colors';
// import { styles } from './styles';
// import { windowHeight } from '../../styles/constant.style';
// import {
//     Briefcase,
//     MarketPlaceIcon,
//     MenuIcon,
//     Time,
// } from '../../assets/svg-icons/CustomSvgIcon';
// import TimeCard from '../../pages/app/menu-screens/time-card/home_team_card/time-card';
// import ProfilePage from '../../pages/app/menu-screens/profile/profile-page';

// const Tab = createBottomTabNavigator();

// function AppTabs() {

//     const insets = useSafeArea();

//     // `insets` object me notch aur bottom bar ki information hoti hai
//     const hasNotch = insets.top > 0;
//     const hasBottomBar = insets.bottom > 0;
//     return (
//         <Tab.Navigator
//             initialRouteName="Menu"
//             screenOptions={({ route }) => ({
//                 headerShown: false,
//                 tabBarLabelPosition: 'below-icon',
//                 tabBarActiveTintColor: Colors.black, // Active tab color
//                 tabBarInactiveTintColor: Colors.fontColor, // Inactive tab color
//                 tabBarStyle: styles.tabBarStyle(hasBottomBar),

//             })}
//         >
//             <Tab.Screen
//                 name="Menu"
//                 component={Menu}
//                 options={{
//                     tabBarIcon: ({ color, size }) => (
//                         <MenuIcon width={30} height={30} color={color} />
//                     ),
//                 }}
//             />
//             <Tab.Screen
//                 name="Timecard"
//                 component={TimeCard}
//                 options={{
//                     tabBarIcon: ({ color, size }) => (
//                         <Time width={30} height={30} color={color} />
//                     ),
//                 }}
//             />
//             <Tab.Screen
//                 name="BizCard"
//                 component={ProfilePage}
//                 options={{
//                     tabBarIcon: ({ color, size }) => (
//                         <MarketPlaceIcon width={30} height={30} color={color} />
//                     ),
//                 }}
//             />
            
//         </Tab.Navigator>
//     );
// }

// export default AppTabs;


import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeArea } from 'react-native-safe-area-context';

import BizCard from '../../pages/app/biz-card-screens/biz-card/biz-card';
import Contact from '../../pages/app/contact-screens/contact/contact';
import Menu from '../../pages/app/menu-screens/menu/menu';
import Colors from '../../styles/colors';
import { styles } from './styles';
import { windowHeight } from '../../styles/constant.style';
import {
    Briefcase,
    HomeIcon,
    MarketPlaceIcon,
    MenuIcon,
    ProfileIcon,
    Time,
} from '../../assets/svg-icons/CustomSvgIcon';
import TimeCard from '../../pages/app/menu-screens/time-card/home_team_card/time-card';
import ProfilePage from '../../pages/app/menu-screens/profile/profile-page';

const Tab = createBottomTabNavigator();

function AppTabs() {
    const insets = useSafeArea();
    const hasBottomBar = insets.bottom > 0;

    return (
        <Tab.Navigator
            initialRouteName="Menu"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarLabelPosition: 'below-icon',
                tabBarActiveTintColor: '#F78C1E', // Set active tab color to orange
                tabBarInactiveTintColor: Colors.fontColor, // Inactive tab color
                tabBarStyle: styles.tabBarStyle(hasBottomBar),
            })}
        >
            <Tab.Screen
                name="Home"
                component={Menu}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeIcon width={30} height={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Timecard"
                component={TimeCard}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Time width={30} height={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={ProfilePage}
                options={{
                    tabBarIcon: ({ color }) => (
                        <ProfileIcon width={30} height={30} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppTabs;