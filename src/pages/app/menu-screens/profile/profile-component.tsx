// ProfileOption.js
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './profile-page.styles';

const ProfileOption = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
        <View style={styles.iconContainer}>
            {React.cloneElement(icon, { style: styles.icon })}
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
    </TouchableOpacity>
);

export default ProfileOption;