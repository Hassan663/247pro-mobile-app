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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SelectDropdown from 'react-native-select-dropdown'


import { styles } from './index.style';
import Colors from '../../styles/colors';

interface OutlinedDropDownProps {
  title?: string;
  height?: number;
  DATA: string[]; // Assuming DATA is an array of strings
  drop_down_button_style?: any; // Assuming DATA is an array of strings
  onselect?: any; // onselect event handler
}

const OutlinedDropDown: React.FC<OutlinedDropDownProps> = ({ title, height, DATA, onselect, drop_down_button_style }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <View style={styles.inputContainer(height)}>
      {isActive &&
        <Text style={styles.inputtitle(isActive)}>{title}</Text>
      }
      <View style={styles.textInputContainer(isActive)}>
        <SelectDropdown
          data={DATA}
          defaultButtonText={title}
          onSelect={(selectedItem: string) => onselect(selectedItem)}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
          onBlur={() => setIsActive(false)}
          onFocus={() => setIsActive(true)}
          renderDropdownIcon={() => <AntDesign name={'down'} size={RFPercentage(3)} />}
          buttonStyle={drop_down_button_style}
          buttonTextStyle={{ textAlign: "left" }}
          dropdownStyle={{ marginTop: RFPercentage(-3) ,borderBottomLeftRadius:10,borderBottomRightRadius:10}}
        />
      </View>
    </View>
  );
};

export default OutlinedDropDown;
