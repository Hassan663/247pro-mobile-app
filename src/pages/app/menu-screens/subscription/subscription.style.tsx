import { StyleSheet } from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
    listContainer: {
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        height: RFPercentage(6)
    },

});