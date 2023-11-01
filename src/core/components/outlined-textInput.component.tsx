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
import { platform } from '../../utilities';

interface OutlinedTextInputProps {
  title?: string;
  val?: string;
  lines?: number;
  height?: number;
  placeHolder?: string;
  Password?: boolean;
  multiLine?: boolean;
  editable?: boolean;
  onChange?: (val: string) => void;
}

const OutlinedTextInput: React.FC<OutlinedTextInputProps> = ({ title, height, editable, val, placeHolder, lines, multiLine, Password, onChange }) => {

  const [open, setOpen] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [inputVal, setInputVal] = useState(val ? val : '')
  const handleFocus = () => {
    // if (editable == true)
    setIsActive(true)
  }

  const handleBlur = () => {
    // if (editable == true)
    setIsActive(false)
  }
  return (
    <View style={styles.inputContainer(height)}>
      {/* {isActive &&
          <Text style={styles.inputtitle(isActive)}>{title}</Text>
        } */}
      {inputVal?.length && inputVal?.length > 0 ?
        <Text style={styles.inputtitle(isActive, inputVal)}>{title}</Text>
        : isActive &&
        <Text style={styles.inputtitle(isActive, inputVal)}>{title}</Text>
      }
      <View style={styles.textInputContainer(isActive)}>
        {!Password ?
          <TextInput
            placeholder={isActive ? '' : placeHolder}
            value={inputVal}
            // value={val ? val : inputVal}
            onFocus={handleFocus}
            editable={editable == false ? editable : true}
            multiline={multiLine || false}
            numberOfLines={lines}
            onBlur={handleBlur}
            onChangeText={(text) => {
              setInputVal(text)
              if (onChange) { onChange(text) }
            }}
            // secureTextEntry={open ? true : false}
            style={styles.input(false, isActive, inputVal)} />
          :
          <>

            <View style={styles.passwordContainer(isActive, inputVal)}>
              <View style={{ flex: 9 }}>
                <TextInput
                  placeholder={isActive ? '' : placeHolder}
                  value={inputVal}
                  editable={editable == false ? editable : true}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  // onChangeText={(val) => onChange && onChange(val)}
                  onChangeText={(text) => {
                    setInputVal(text)
                    if (onChange) { onChange(text) }
                  }}
                  secureTextEntry={open ? true : false}
                  style={styles.input(true, isActive, inputVal)} />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setOpen(!open)}
                style={styles.eyeContainer}>
                <Feather
                  color={isActive ? Colors.black : inputVal.length > 0 ? Colors.black : Colors.lightGrey}
                  size={platform == 'ios' ? RFPercentage(2.2) : RFPercentage(3)}
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
