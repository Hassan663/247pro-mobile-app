import React, {
  useState
} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { styles } from './index.style';
import Colors from '../../styles/colors';

interface OutlinedTextInputProps {
  title?: string;
  val?: string;
  height?: number;
  placeHolder?: string;
  Password?: boolean;
  onChange: (val: string) => void;
}

const OutlinedTextInput: React.FC<OutlinedTextInputProps> = ({ title, height, val, placeHolder, Password, onChange }) => {

  const [open, setOpen] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => setIsActive(true)

  const handleBlur = () => setIsActive(false)
  return (
    <View style={styles.inputContainer(height)}>
      {isActive &&
        <Text style={styles.inputtitle(isActive)}>{title}</Text>
      }
      <View style={styles.textInputContainer(isActive)}>
        {!Password ?
          <TextInput
            placeholder={isActive ? '' : placeHolder}
            value={val}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={(val) => onChange(val)}
            secureTextEntry={Password ? true : false}
            style={styles.input(false, isActive)} />
          :
          <>
            <View style={styles.passwordContainer(isActive)}>
              <View style={{ flex: 9 }}>
                <TextInput
                  placeholder={isActive ? '' : placeHolder}
                  value={val}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChangeText={(val) => onChange(val)}
                  secureTextEntry={Password ? true : false}
                  style={styles.input(true, isActive)} />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setOpen(!open)}
                style={styles.eyeContainer}>
                <Feather
                  color={Colors.black}
                  size={RFPercentage(3)}
                  name={open ? 'eye-off' : `eye`}
                />
              </TouchableOpacity>
            </View>
          </>
        }
      </View>
    </View>
  );
};

export default OutlinedTextInput;
