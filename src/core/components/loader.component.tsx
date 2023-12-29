import React, {
    useState,
    useEffect
} from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';

import Colors from '../../styles/colors';
import { styles } from './index.style';
import { useSelector } from 'react-redux';


export type Props = {
    color?: string;
    size?: string | number;
}

const Loader: React.FC<Props> = ({ color, size }: any) => {
    const loader = useSelector((state: any) => state.root.loader);

    return (

        loader && (
            // <View style={styles.loaderStyle}>
            // {/* <View style={styles.spinerBox}> */}
            <ActivityIndicator color={color ? color : Colors.primary} size={size ? size : "small"} />
            // {/* </View> */}
            // {/* </View> */}
        )
    );
};

export default Loader;
