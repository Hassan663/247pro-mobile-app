import React from 'react';
import { Text } from 'react-native';
import { styles } from './index.style';
import Colors from '../../styles/colors';

interface ScreenTitleProps {
    title: string;
    color?: string;
    widthAuto?: boolean;
}

export const ScreenTitle: React.FC<ScreenTitleProps> = ({ title, color, widthAuto }) => (
    <Text style={styles.ScreenMainTitle(color && color, widthAuto && widthAuto)}>{title}</Text>
);

interface ScreenSubTitleProps {
    title: string;
    color?: string;
}

export const ScreenSubTitle: React.FC<ScreenSubTitleProps> = ({ title, color }) => (
    <Text style={styles.ScreenSubTitle(color && color)}>{title}</Text>
);

interface FooterTextProps {
    color?: string;
    title: string;
}

export const FooterText: React.FC<FooterTextProps> = ({ color, title }) => (
    <Text style={styles.footerText(color && color)}>{title}</Text>
);

interface TitleTextProps {
    title?: string;
    type?: string;
    color?: string;
    weight?: string;
    line?: string;
    textAlignCenter?: string;
}
export const Title: React.FC<TitleTextProps> = ({ title, textAlignCenter, line, type, color, weight }) => {
    if (type == 'Poppin-10') return <Text style={[{ textAlign: textAlignCenter, textDecorationLine: line, color: color, fontWeight: weight }, styles.poppin_10]} >{title}</Text>;
    if (type == 'Poppin-11') return <Text style={[{ textAlign: textAlignCenter, textDecorationLine: line, color: color, fontWeight: weight }, styles.poppin_11]} >{title}</Text>;
    if (type == 'Poppin-12') return <Text style={[{ textAlign: textAlignCenter, textDecorationLine: line, color: color, fontWeight: weight }, styles.poppin_12]} >{title}</Text>;
    if (type == 'Poppin-14') return <Text style={[{ textAlign: textAlignCenter, textDecorationLine: line, color: color, fontWeight: weight }, styles.poppin_14]} >{title}</Text>;
    if (type == 'Poppin-16') return <Text style={[{ textAlign: textAlignCenter, textDecorationLine: line, color: color, fontWeight: weight }, styles.poppin_16]} >{title}</Text>;
    if (type == 'Poppin-18') return <Text style={[{ textAlign: textAlignCenter, textDecorationLine: line, color: color, fontWeight: weight }, styles.poppin_18]} >{title}</Text>;
    if (type == 'Poppin-20') return <Text style={[{ textAlign: textAlignCenter, textDecorationLine: line, color: color, fontWeight: weight }, styles.poppin_20]} >{title}</Text>;
    if (type == 'Poppin-24') return <Text style={[{ textAlign: textAlignCenter, textDecorationLine: line, color: color, fontWeight: weight }, styles.poppin_24]} >{title}</Text>;
    if (type == 'Poppin-24-600') return <Text style={[{ textAlign: textAlignCenter, textDecorationLine: line, color: color, fontWeight: weight }, styles.poppin_24_600]} >{title}</Text>;
    if (type == 'Poppin-61') return <Text style={[{ textAlign: textAlignCenter, textDecorationLine: line, color: color, fontWeight: weight }, styles.poppin_61]} >{title}</Text>;
};