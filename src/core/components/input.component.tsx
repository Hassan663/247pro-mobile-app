import React, { useState } from 'react';
import {
    TextInput,
    View,
    StyleSheet
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';
import Feather from "react-native-vector-icons/Feather"
import Colors from '../../styles/colors';
import { centralStyle } from '../../styles/constant.style';

interface InputProps {
    placeholder?: string;
    value?: string;
    password?: boolean;
    secureText?: boolean;
    onChangeText?: (text: string) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, secureText, password, onChangeText }) => {
    const [isShown, setIsShown] = useState(false)
    return (
        <View style={styles.container}>

            {password ?
                <View style={[styles.input, centralStyle.px2, centralStyle.row, centralStyle.XAndYCenter]}>
                    <TextInput
                        style={centralStyle.width100}
                        placeholder={placeholder}
                        value={value}
                        secureTextEntry={!isShown ? true : false}
                        onChangeText={onChangeText}
                    />
                    <Feather onPress={() => setIsShown(!isShown)} name={isShown ? 'eye' : 'eye-off'} size={RFPercentage(2.5)} />
                </View> :
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    secureTextEntry={secureText ? true : false}
                    onChangeText={onChangeText}
                />
            }
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
