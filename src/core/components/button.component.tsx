// @app
import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import { styles } from './index.style';
import { centralStyle } from '../../styles/constant.style';



export type Props = {
    customStyle?: object;
    primary?: boolean;
    disable?: boolean;
    icon?: React.ReactElement<object>;
    titleStyle?: any;
    icallBackcon?: any;
    title?: string;
    callBack?: () => void;

};

const Button: React.FC<Props> = ({ customStyle, primary, icon, titleStyle, title, disable, callBack }) => {
    return (
        <TouchableOpacity
            style={[icon ? centralStyle.row : centralStyle.column, disable ? styles.disable : primary ? styles.primaryBtn : customStyle]}
            activeOpacity={0.8}
            onPress={() => callBack && callBack()}
        >
            {icon && icon}
            <Text style={primary ? styles.primaryText : titleStyle}>{title}</Text>
        </TouchableOpacity>
    );
};
export default Button;
