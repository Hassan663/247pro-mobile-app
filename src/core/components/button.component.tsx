
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
    secondary?: boolean;
    disable?: boolean;
    icon?: React.ReactElement<object>;
    titleStyle?: any;
    title?: string | any;
    callBack?: () => void;
    customBackgroundColor?: string; // New prop to pass custom background color
    customTextColor?: string; // New prop to pass custom text color
};

const Button: React.FC<Props> = ({
    customStyle, primary, secondary, icon, titleStyle, title, disable, callBack, customBackgroundColor, customTextColor 
}) => {
    return (
        <TouchableOpacity
            style={[
                secondary ? [styles.secondaryBtn, customStyle] : icon ? centralStyle.row : centralStyle.column, 
                disable ? styles.disable : primary ? styles.primaryBtn : customStyle,
                customBackgroundColor ? { backgroundColor: customBackgroundColor } : {}, // Apply custom background color if provided
            ]}
            activeOpacity={0.8}
            onPress={() => callBack && callBack()}
            disabled={disable}
        >
            {icon && icon}
            <Text style={[
                disable ? styles.disableText : secondary ? styles.secondaryText : primary ? styles.primaryText : titleStyle,
                customTextColor ? { color: customTextColor } : {}, // Apply custom text color if provided
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;