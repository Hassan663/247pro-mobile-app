import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { styles } from './index.style';
import Colors from '../../styles/colors';
import { platform } from '../../utilities';
import { windowHeight } from '../../styles/constant.style';
import { useSelector } from 'react-redux';

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
    disableCreateButton?: boolean;

    disableValidation?: any,
    errorMsg?: any,
    errorTitle?: any
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
    disableCreateButton,
    fontSize,
    iconsSize,
    drop_down_button_style,
    search,
    disableValidation,
}) => {
    const [isActive, setIsActive] = useState(false);
    const [dropdownVal, setdropdownVal] = useState('');

    // Add 'Create New' option dynamically
    const enhancedData = [...DATA, 'Create New'];
    const errorMsg = useSelector((state: any) => state.root.errorMsg);
    const errorTitle = useSelector((state: any) => state.root.errorTitle);

    useEffect(() => {
        if (!disableCreateButton) {
            setdropdownVal(DATA[defaultValueByIndex]);
        }
    }, [defaultValueByIndex]);
    return (
        <>
            <View style={styles.inputContainer(height)}>
                {dropdownVal?.length && dropdownVal?.length > 0 ? (
                    <Text style={[styles.inputtitle(false, dropdownVal), { color: Colors.black }]}>{title}</Text>
                ) : (
                    isActive && <Text style={[styles.inputtitle(false, dropdownVal), { color: Colors.black }]}>{title}</Text>
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

                            isActive
                                ? {
                                    ...drop_down_button_style,
                                    borderColor: errorTitle == 'all' ? Colors.red : errorTitle?.toLocaleLowerCase() == title?.toLocaleLowerCase() ? Colors.red : isActive ? Colors.primary : dropdownVal?.length > 0 ? Colors.fontColor : Colors.lightGrey,
                                }
                                : {
                                    ...drop_down_button_style,
                                    borderColor: errorTitle == 'all' ? Colors.red : errorTitle?.toLocaleLowerCase() == title?.toLocaleLowerCase() ? Colors.red : isActive ? Colors.primary : dropdownVal?.length > 0 ? Colors.fontColor : Colors.lightGrey,
                                }
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
                        dropdownOverlayColor={'transparent'}
                        rowStyle={styles.rowStyle}
                        searchInputStyle={styles.searchInputStyle}
                        renderCustomizedRowChild={(item, index) => {
                            const isSelected = dropdownVal === item; // Check if the item is selected

                            return (
                                <>
                                    <View style={[styles.customRow, styles.rowChildContainer]}>
                                        <View style={[styles.rowWrapper, {
                                            backgroundColor: item === 'Create New' ? Colors.primary : '#ededed',
                                            justifyContent: item === 'Create New' ? "center" : 'space-between',
                                        }]}>
                                            <Text style={{
                                                color: item === 'Create New' ? Colors.white : Colors.black,
                                                fontSize: RFValue(18, windowHeight),
                                                textAlign: "center",
                                            }}>
                                                {item}
                                            </Text>
                                            {item === 'Create New' && (
                                                <MaterialIcons
                                                    name="add-circle"
                                                    size={RFValue(25, windowHeight)}
                                                    color={Colors.white}
                                                    style={{ marginLeft: 10 }}
                                                />
                                            )}
                                            {/* Add a checkmark icon next to the selected item */}
                                            {item !== 'Create New' && isSelected ?
                                                <FontAwesome
                                                    name="check-circle"
                                                    size={RFValue(20, windowHeight)}
                                                    color={Colors.black}
                                                    style={{ marginLeft: 10 }}
                                                />
                                                :
                                                item !== 'Create New' && <FontAwesome
                                                    name="circle-thin"
                                                    size={RFValue(20, windowHeight)}
                                                    color={Colors.black}
                                                    style={{ marginLeft: 10 }}
                                                />
                                            }
                                        </View>
                                    </View>
                                </>
                            );
                        }}
                    />
                </View>
            </View>

            {!disableValidation && errorMsg &&
                errorTitle == 'all' ?
                <Text style={[{
                    color: 'red',
                    marginBottom: RFValue(10, windowHeight),
                    marginLeft: 5
                },]}>{errorMsg}</Text>
                :
                errorTitle?.toLocaleLowerCase() == title?.toLocaleLowerCase() &&
                <Text style={[{
                    color: 'red',
                    marginBottom: RFValue(10, windowHeight),
                    marginLeft: 5,
                },]}>{errorMsg}</Text>
            }

        </>
    );
};

export default SearchDropDown;
