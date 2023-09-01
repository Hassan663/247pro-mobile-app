import * as React from 'react';
import { StatusBar, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Projects from '../../pages/app/projects/projects';
import Leads from '../../pages/app/leads/leads';
import MarketPlace from '../../pages/app/market-place/market-place';
import Tasks from '../../pages/app/tasks/tasks';
import Menu from '../../pages/app/menu/menu';
import Colors from '../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { windowHeight } from '../../styles/constant.style';
import {
    Briefcase,
    MarketPlaceIcon,
    MenuIcon,
    ProjectsIcon,
    TasksIcon
} from '../../assets/svg-icons/CustomSvgIcon';
import { platform } from '../../utilities';
import { styles } from './styles';

const Tab = createBottomTabNavigator();

function AppTabs() {
    return (
        <View style={{ height: windowHeight }}>
            <Tab.Navigator
                initialRouteName="MarketPlace"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarLabelPosition: 'below-icon',
                    tabBarActiveTintColor: Colors.black, // Active tab color
                    tabBarInactiveTintColor: Colors.fontColor, // Inactive tab color
                    tabBarStyle: styles.tabBarStyle,
                 
                })}
            >
                <Tab.Screen
                    name="Projects"
                    component={Projects}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <ProjectsIcon width={30} height={30} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Leads"
                    component={Leads}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Briefcase width={30} height={30} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="MarketPlace"
                    component={MarketPlace}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MarketPlaceIcon width={30} height={30} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Tasks"
                    component={Tasks}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <TasksIcon width={30} height={30} color={color} />
                        ),
                    }}
                />
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
