// @app
import React from 'react';
import { Text, } from 'react-native';
import { styles } from './index.style';
import Colors from '../../styles/colors';

export const ScreenTitle = ({ title, color }) => <Text style={styles.ScreenMainTitle(color && color)}>{title}</Text>

export const ScreenSubTitle = ({ title, color }) => <Text style={styles.ScreenSubTitle(color && color)}>{title}</Text>

export const FooterText = ({ color, title }) => <Text style={styles.footerText(color && color)}>{title}</Text>
