import * as React from 'react';
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import BizCard from '../../pages/app/biz-card/biz-card';
import Contact from '../../pages/app/contact/contact';
import Menu from '../../pages/app/menu/menu';
import Colors from '../../styles/colors';
import { styles } from './styles';
import { windowHeight } from '../../styles/constant.style';
import {
    Briefcase,
    MarketPlaceIcon,
    MenuIcon,
} from '../../assets/svg-icons/CustomSvgIcon';

const Tab = createBottomTabNavigator();

function AppTabs() {
    return (
        <View style={{ height: windowHeight }}>
            <Tab.Navigator
                initialRouteName="BizCard"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarLabelPosition: 'below-icon',
                    tabBarActiveTintColor: Colors.black, // Active tab color
                    tabBarInactiveTintColor: Colors.fontColor, // Inactive tab color
                    tabBarStyle: styles.tabBarStyle,

                })}
            >

                <Tab.Screen
                    name="Contact"
                    component={Contact}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Briefcase width={30} height={30} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="BizCard"
                    component={BizCard}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MarketPlaceIcon width={30} height={30} color={color} />
                        ),
                    }}
                />
                {/* <Tab.Screen
                    name="Tasks"
                    component={Tasks}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <TasksIcon width={30} height={30} color={color} />
                        ),
                    }}
                /> */}
                <Tab.Screen
                    name="Menu"
                    component={Menu}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MenuIcon width={30} height={30} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}

export default AppTabs;
