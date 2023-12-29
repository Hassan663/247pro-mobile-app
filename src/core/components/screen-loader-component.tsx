import React, {
} from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';

import { useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../styles/colors';
import { centralStyle } from '../../styles/constant.style';
import { styles } from './index.style';


export type Props = {
    color?: string;
    size?: string | number;
}

const ScreenLoader: React.FC<Props> = ({ color, size }: any) => {
    const loader = useSelector((state: any) => state.root.loader);

    return (
        loader && <View style={[centralStyle.flex1, centralStyle.XAndYCenter, styles.screenLoaderContainer]}>
            <ActivityIndicator size={size ? size : RFPercentage(15)} color={color ? color : Colors.primary} />
        </View>
    );
};

export default ScreenLoader;
