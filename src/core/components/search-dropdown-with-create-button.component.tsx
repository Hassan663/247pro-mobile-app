import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import an icon for "Create New"
import SelectDropdown from 'react-native-select-dropdown';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { styles } from './index.style';
import Colors from '../../styles/colors';
import { platform } from '../../utilities';
import { windowHeight } from '../../styles/constant.style';

interface SearchDropDownProps {
    title?: string;
    color?: string;
    height?: number;
    iconsSize?: number;
    DATA: string[]; // Assuming DATA is an array of strings
    drop_down_button_style?: any;
    onselect?: any; // onselect event handler
    fontSize?: any;
    dropDownStyle?: any;
    defaultValueByIndex?: any;
    search?: boolean;
    isPrimaryBorderOnFocus?: any;
}

const SearchDropDown: React.FC<SearchDropDownProps> = ({
    title,
    height,
    defaultValueByIndex,
    dropDownStyle,
    isPrimaryBorderOnFocus,
    color,
    DATA,
    onselect,
    fontSize,
    iconsSize,
    drop_down_button_style,
    search
}) => {
    const [isActive, setIsActive] = useState(false);
    const [dropdownVal, setdropdownVal] = useState('');

    // Add 'Create New' option dynamically
    const enhancedData = [...DATA, 'Create New'];

    useEffect(() => {
        setdropdownVal(DATA[defaultValueByIndex]);
    }, [defaultValueByIndex]);

    return (
        <>
            <View style={styles.inputContainer(height)}>
                {dropdownVal?.length && dropdownVal?.length > 0 ? (
                    <Text style={styles.inputtitle(isActive, dropdownVal)}>{title}</Text>
                ) : (
                    isActive && <Text style={styles.inputtitle(isActive, dropdownVal)}>{title}</Text>
                )}
                <View style={styles.textInputContainer(isActive)}>
                    <SelectDropdown
                        search
                        searchPlaceHolder={'Search here'}
                        searchPlaceHolderColor={Colors.black}
                        renderSearchInputLeftIcon={() => {
                            return <FontAwesome name={'search'} color={Colors.black} size={18} />;
                        }}
                        data={enhancedData} // Use enhancedData with 'Create New'
                        defaultValueByIndex={defaultValueByIndex ? defaultValueByIndex : null}
                        defaultButtonText={title}
                        onSelect={(selectedItem: string, index: number) => {
                            if (selectedItem === 'Create New') {
                                // Show alert when "Create New" is selected
                                Alert.alert('Create New', 'You have clicked on Create New');
                            } else {
                                setdropdownVal(selectedItem);
                                onselect(selectedItem, index);
                            }
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                        rowTextForSelection={(item, index) => item}
                        onBlur={() => setIsActive(false)}
                        onFocus={() => setIsActive(true)}
                        renderDropdownIcon={() => (
                            <AntDesign
                                name={'down'}
                                color={Colors.fontColor}
                                size={iconsSize ? iconsSize : platform == 'ios' ? RFPercentage(1.5) : RFPercentage(2)}
                            />
                        )}
                        buttonStyle={
                            isPrimaryBorderOnFocus
                                ? isActive
                                    ? { ...drop_down_button_style, borderColor: Colors.primary }
                                    : drop_down_button_style
                                : drop_down_button_style
                        }
                        buttonTextStyle={{
                            textAlign: 'left',
                            color:
                                defaultValueByIndex === true
                                    ? Colors.black
                                    : dropdownVal?.length && dropdownVal?.length > 0
                                        ? Colors.black
                                        : color
                                            ? color
                                            : Colors.black,
                            fontSize: fontSize ? fontSize : platform == 'ios' ? RFPercentage(1.3) : RFPercentage(1.6),
                        }}
                        dropdownStyle={dropDownStyle ? dropDownStyle : styles.dropDownStyle}
                        renderCustomizedRowChild={(item, index) => {
                            return (
                                <View style={styles.customRow}>
                                    {/* Show icon only for "Create New" */}
                                    <Text style={{
                                        color: item === 'Create New' ? Colors.primary : Colors.black,
                                        fontSize: RFValue(18, windowHeight)
                                    }}>
                                        {item}
                                    </Text>
                                    {item === 'Create New' && (
                                        <MaterialIcons
                                            name="add-circle"
                                            size={RFValue(25, windowHeight)}
                                            color={Colors.primary}
                                            style={{ marginLeft: 10 }}
                                        />
                                    )}
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        </>
    );
};

export default SearchDropDown;
