import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { RFPercentage, } from 'react-native-responsive-fontsize';

import Colors from '../../styles/colors';
import { platform } from '../../utilities';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
 
interface OutlinedDropDownProps {
  title?: string;
  DATA: string[]; // Assuming DATA is an array of strings
  drop_down_button_style?: any; // Assuming DATA is an array of strings
  onselect?: any; // onselect event handler
  fontSize?: any; // onselect event handler
  dropDownStyle?: any; // onselect event handler
  defaultValueByIndex?: any; // onselect event handler
  setSpecialities: string[];
  dropdownShow?: boolean
  setDropdownShow?: any
}

const OutlinedDropDownSpeciality: React.FC<any> = ({ title, addSpeciality, DATA, iconsSize, dropdownShow, setDropdownShow }) => {
  const [specialities, setSpecialities] = useState<[]>([])

  useEffect(() => {
    addSpeciality(specialities)
  }, [specialities])

  return (
    <MultipleSelectList
      setSelected={(val: any) => setSpecialities(val)}
      data={DATA}
      placeholder={title}
      closeicon={
        <AntDesign
          name="check"
          size={iconsSize ? iconsSize : platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} color={Colors.primary} />
      }
      save="value"
      label={title}

      boxStyles={{
        borderColor: Colors.lightGrey,
        borderWidth: RFPercentage(.1),
        borderRadius: 5,
        paddingHorizontal: RFPercentage(2.4),
        paddingRight: RFPercentage(1),
        // backgroundColor:'red',
        margin: 0,
        padding: 0
      }}
    />
  );
};

export default OutlinedDropDownSpeciality;
