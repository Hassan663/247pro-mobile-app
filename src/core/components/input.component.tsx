import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Colors from '../../styles/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Input = ({ placeholder, value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    input: {
        height: 40,
        borderColor: Colors.lightGray,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});

export default Input;
