import { RFPercentage } from "react-native-responsive-fontsize";

export const getSize = (label: string, focused: boolean): number => {
    if (label === 'Home' && focused) return RFPercentage(3.2);
    else if (label === 'MyCart' && focused) return RFPercentage(2.8);
    else if (label === 'Notification' && focused) return RFPercentage(2.5);
    else if (label === 'Home' && !focused) return RFPercentage(4);
    else if (label === 'MyCart' && !focused) return RFPercentage(3.5);
    else if (label === 'Notification' && !focused) return RFPercentage(3);
    else return RFPercentage(3);
};

export const getIconName = (label: string): string => {
    if (label === 'Home') return 'home';
    if (label === 'MyCart') return 'shopping-cart';
    if (label === 'Notification') return 'bell';
    else return 'user';
};

export const getLabel = (options: { tabBarLabel?: string, title?: string }, route: { name: string }): string => {
    if (options.tabBarLabel !== undefined) return options.tabBarLabel;
    else if (options.title !== undefined) return options.title;
    else return route.name;
};
