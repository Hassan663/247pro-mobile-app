import React, {
    useEffect
    , useState
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
import { platform } from '../../utilities/constants';


export type Props = {
    color?: string;
    size?: string | number;
}

const ScreenLoader: React.FC<Props> = ({ color, size }: any) => {
    const [isLoading, setisLoading] = useState<Boolean>(false);
    const screenLoader = useSelector((state: any) => state.root.screenLoader);

    useEffect(() => {
        setisLoading(screenLoader);
    }, [screenLoader]);

    return (
        isLoading && (<View style={[centralStyle.XAndYCenter, styles.screenLoaderContainer]}>
            <ActivityIndicator size={platform === 'ios' ? 'large' : RFPercentage(15)} color={color ? color : Colors.primary} />
        </View >)
    );
};

export default ScreenLoader;