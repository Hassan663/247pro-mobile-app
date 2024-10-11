import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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

const SearchDropDown = ({
    title,
    height,
    defaultValueByIndex,
    dropDownStyle,
    isPrimaryBorderOnFocus,
    color,
    DATA,
    onselect,
    onCreateNew,
    disableCreateButton,
    fontSize,
    value,
    iconsSize,
    drop_down_button_style,
    search,
    disableValidation,
    errorMsg,
    errorTitle
}) => {
    const [isActive, setIsActive] = useState(false);
    const [dropdownVal, setDropdownVal] = useState(value || null); 
    const [newItem, setNewItem] = useState<string>('');
    const [filteredData, setFilteredData] = useState<any[]>(DATA);
    const [isShowCreateNew, setIsShowCreateNew] = useState<boolean>(false);

    useEffect(() => {
        setFilteredData(DATA);  // Update filtered data whenever DATA changes
        if (!value) {
            setDropdownVal(null); // Reset dropdownVal when value is reset
        }
    }, [DATA, value]); // Watch for changes in DATA and value props

    const errorMsgFromRedux = useSelector((state: any) => state.root.errorMsg);
    const errorTitleFromRedux = useSelector((state: any) => state.root.errorTitle);

    const handleSearchChange = (searchText: string) => {
        const filtered = DATA.filter(item => item.name?.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredData(filtered.length ? filtered : disableCreateButton ? [] : [{ name: searchText }]);
        setNewItem(filtered.length ? '' : searchText);
        setIsShowCreateNew(filtered.length === 0 && !disableCreateButton);
    };

    const handleCreateNewItem = (newItem: string) => {
        if (onCreateNew) {
            onCreateNew(newItem, (result) => {
                const updatedData = [...DATA, result];
                setFilteredData(updatedData);
                setDropdownVal(result); // Set the selected value when new item is created
                onselect?.(result, updatedData.length);
                setNewItem('');
                setIsShowCreateNew(false);
            });
        }
    };

    const getButtonStyle = () => ({
        ...drop_down_button_style,
        borderColor: errorTitleFromRedux === 'all'
            ? Colors.red
            : errorTitleFromRedux?.toLowerCase() === title?.toLowerCase()
                ? Colors.red
                : isActive
                    ? Colors.primary
                    : dropdownVal?.length > 0
                        ? Colors.fontColor
                        : Colors.lightGrey,
    });

    return (
        <>
            <View style={styles.inputContainer(height)}>
                {(dropdownVal?.length > 0 || isActive) && (
                    <Text style={[styles.inputtitle(false, dropdownVal), { color: Colors.black }]}>{title}</Text>
                )}
                <View style={styles.textInputContainer(isActive)}>
                    <SelectDropdown
                        search
                        searchPlaceHolder='Search or create new'
                        searchPlaceHolderColor={Colors.black}
                        renderSearchInputLeftIcon={() => <FontAwesome name='search' color={Colors.black} size={18} />}
                        data={filteredData}
                        defaultValueByIndex={defaultValueByIndex}
                        defaultButtonText={title}
                        onChangeSearchInputText={handleSearchChange}
                        defaultValue={value !== null ? value : ""}  // Bind value here to reset when needed
                        onSelect={(selectedItem) => {
                            if (isShowCreateNew) {
                                handleCreateNewItem(newItem);
                            } else if (selectedItem.name !== 'No Record found') {
                                setDropdownVal(selectedItem); // Set selected value
                                onselect?.(selectedItem, selectedItem.index);
                            }
                        }}
                        buttonTextAfterSelection={(selectedItem) => selectedItem.name}
                        rowTextForSelection={(item) => item.name}
                        onBlur={() => {
                            setFilteredData(DATA.length > 0 ? DATA : [{ name: 'No Record found' }]);
                            setIsActive(false);
                        }}
                        onFocus={() => {
                            setFilteredData(DATA.length > 0 ? DATA : [{ name: 'No Record found' }]);
                            setIsActive(true);
                        }}
                        renderDropdownIcon={() => (
                            <AntDesign
                                name='down'
                                color={Colors.fontColor}
                                size={iconsSize || (platform === 'ios' ? RFPercentage(1.5) : RFPercentage(2))}
                            />
                        )}
                        buttonStyle={getButtonStyle()}
                        buttonTextStyle={{
                            textAlign: 'left',
                            color: dropdownVal?.length ? Colors.black : color || Colors.black,
                            fontSize: fontSize || (platform === 'ios' ? RFPercentage(1.3) : RFPercentage(1.6)),
                        }}
                        dropdownStyle={dropDownStyle || styles.dropDownStyle}
                        dropdownOverlayColor='transparent'
                        rowStyle={styles.rowStyle}
                        searchInputStyle={styles.searchInputStyle}
                        renderCustomizedRowChild={(item) => {
                            const isSelected = value?.name === item?.name || dropdownVal?.name === item?.name;
                        
                            if (item.name === 'No Record found') {
                                return (
                                    <View style={[styles.customRow, styles.rowChildContainer]}>
                                        <View style={[styles.rowWrapper, { justifyContent: "center" }]}>
                                            <Text style={{
                                                color: Colors.black,
                                                fontSize: RFValue(18, windowHeight),
                                                textAlign: "center",
                                            }}>
                                                No Record found
                                            </Text>
                                        </View>
                                    </View>
                                );
                            }
                        
                            return (
                                <View style={[styles.customRow, styles.rowChildContainer]}>
                                    <View style={[styles.rowWrapper, {
                                        backgroundColor: item.name === newItem ? Colors.primary : '#ededed',
                                        justifyContent: item.name === newItem ? 'center' : 'flex-start', // Center the "Create New" button
                                        alignItems: 'center', // Ensure proper vertical alignment
                                        paddingVertical: RFValue(10, windowHeight), // Add some padding for a better appearance
                                    }]}>
                                        {/* Move the check circle to the left */}
                                        {item.name !== newItem && (
                                            isSelected ?
                                                <FontAwesome name="check-circle" size={RFValue(20, windowHeight)} color={Colors.black} style={{ marginRight: 10 }} /> :
                                                <FontAwesome name="circle-thin" size={RFValue(20, windowHeight)} color={Colors.black} style={{ marginRight: 10 }} />
                                        )}
                        
                                        {/* Show the 'add-circle' icon for the 'Create' option */}
                                        {item.name === newItem && (
                                            <MaterialIcons
                                                name="add-circle"
                                                size={RFValue(25, windowHeight)}
                                                color={Colors.white}
                                                style={{ marginRight: 10 }}
                                            />
                                        )}
                        
                                        <Text style={{
                                            color: item.name === newItem ? Colors.white : Colors.black,
                                            fontSize: RFValue(18, windowHeight),
                                            textAlign: item.name === newItem ? 'center' : 'left',
                                        }}>
                                            {item.name === newItem ? `Create "${item.name}"` : item.name}
                                        </Text>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>

            {(!disableValidation && errorMsg && (
                <Text style={{ color: 'red', marginBottom: RFValue(10, windowHeight), marginLeft: 5 }}>
                    {errorMsg}
                </Text>
            )) || (errorTitleFromRedux?.toLowerCase() === title?.toLowerCase() && (
                <Text style={{ color: 'red', marginBottom: RFValue(10, windowHeight), marginLeft: 5 }}>
                    {errorMsg}
                </Text>
            ))
            }
        </>
    );
};

export default SearchDropDown;
