// @app
import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import { styles } from './index.style';



export type Props = {
    customStyle?: object;
    primary?: object;
    icon?: string;
    titleStyle?: any;
    icallBackcon?: any;
    title?: string;
    callBack?: () => void;

};



const Button: React.FC<Props> = ({ customStyle, primary, icon, titleStyle, title, callBack }) => {
    return (
        <TouchableOpacity
            style={primary ? styles.primaryBtn : customStyle}
            activeOpacity={0.8}
            onPress={() => callBack && callBack()}
        >
            {icon&&icon}
            <Text style={primary ? styles.primaryText : titleStyle}>{title}</Text>
        </TouchableOpacity>
    );
};
export default Button;
