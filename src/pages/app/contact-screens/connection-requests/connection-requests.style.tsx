import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles: any = StyleSheet.create<any>({
    markContainer: {
        flex: 2,
        justifyContent: 'space-between'
    },
    listBody: { flex: 6.5, },
    listProfile: { flex: 1.5 },
    listContainer: {
        height: RFPercentage(7),
        width: '100%'
    },
    profileImg: {
        height: RFPercentage(5.2),
        width: RFPercentage(5.2)
    },
});