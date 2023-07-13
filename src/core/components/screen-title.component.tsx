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
