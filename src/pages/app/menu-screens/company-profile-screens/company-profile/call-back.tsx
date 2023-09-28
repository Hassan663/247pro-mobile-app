import {
    Share,
    Alert
} from "react-native"

export const onShare = async () => {
    try {
        const result = await Share.share({
            message: 'Would you like to share Code Finder https://example.com',
            url: 'https://247pro.com',
            title: 'test',

        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error: any) {
        Alert.alert(error.message);
    }
};