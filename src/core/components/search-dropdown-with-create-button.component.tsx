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
    // value:{};
    DATA: any[]; // Assuming DATA is an array of objects with `name` and `id`
    drop_down_button_style?: any;
    onselect?: (item: any, index: number) => void; // Specify the types for better clarity
    fontSize?: any;
    dropDownStyle?: any;
    defaultValueByIndex?: number;
    search?: boolean;
    isPrimaryBorderOnFocus?: boolean;
    disableCreateButton?: boolean;
    onCreateNew?: (newItem: string, callback: (addItem: any) => void) => void;
    disableValidation?: boolean;
    errorMsg?: string;
    errorTitle?: string;
}

const SearchDropDown: React.FC<SearchDropDownProps> = ({
    title,
    height,
    defaultValueByIndex,
    dropDownStyle,
    isPrimaryBorderOnFocus,
    color,
    value,
    DATA,
    onselect,
    onCreateNew,
    disableCreateButton,
    fontSize,
    iconsSize,
    drop_down_button_style,
    search,
    disableValidation,
    errorMsg,
    errorTitle
}) => {
    const [isActive, setIsActive] = useState(false);
    const [dropdownVal, setDropdownVal] = useState<any>(DATA[defaultValueByIndex] || []);
    const [newItem, setNewItem] = useState<string>('');
    const [filteredData, setFilteredData] = useState<any[]>(DATA);
    const [newData, setNewdata] = useState<any[]>(DATA);
    const [isShowCreateNew, setIsShowCreateNew] = useState<boolean>(false);

    const errorMsgFromRedux = useSelector((state: any) => state.root.errorMsg);
    const errorTitleFromRedux = useSelector((state: any) => state.root.errorTitle);

    // useEffect(() => {
    //     setFilteredData(DATA);
    //     if (defaultValueByIndex != null) {
    //         setDropdownVal(DATA[defaultValueByIndex]);
    //     }
    // }, [DATA, defaultValueByIndex, dropdownVal]);

    const handleSearchChange = (searchText: string) => {
        const filtered = DATA.filter(item =>
            item.name?.toLowerCase().includes(searchText.toLowerCase())
        );
        if (filtered.length === 0) {
            setNewItem(searchText);
            setIsShowCreateNew(true);
           setFilteredData([{ name: 'Create New'}]); // Show only 'Create New' if no match found
        } else {
            setFilteredData(filtered);
        }
    };

    const handleCreateNewItem = (newItem: string) => {
        // Ensure onCreateNew is defined
        if (onCreateNew) {
          onCreateNew(newItem, (result) => {
            setIsShowCreateNew(false)
            // Update the dropdown with the newly created item
            console.log("setDropDown: ", result?.name);
      
            // Add the new item to the DATA array
            const updatedData = [...DATA, result];
            
            
            console.log("newData===: ", updatedData); // Should include the new item
            // Update the state to reflect the new data
            setNewdata(updatedData); // This adds the new item to the full data set
            setFilteredData([]);
            // Set the filtered data to include all items (including the new one)
            setFilteredData(updatedData);
            console.log("filteredData: ", filteredData); // Should match newData
            
            console.log("filteredData after adding new item: ", updatedData);
            
            // Set the dropdown value to the newly created item
            setDropdownVal(result);
            console.log("dropdownVal====", dropdownVal); // Should be the newly created item
      
            // Notify parent about the new selection
            onselect?.(result, updatedData.length); // The new item is at the end of the array
          });
        }
      };
      

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
                        searchPlaceHolder={'Search or create new'}
                        searchPlaceHolderColor={Colors.black}
                        renderSearchInputLeftIcon={() => (
                            <FontAwesome name={'search'} color={Colors.black} size={18} />
                        )}
                        data={filteredData}
                        defaultValueByIndex={defaultValueByIndex}
                        defaultButtonText={title}
                        onChangeSearchInputText={handleSearchChange}
                        onSelect={(selectedItem, index) => {
                            setFilteredData(DATA);
                            if(isShowCreateNew){
                                handleCreateNewItem(newItem);
                            }
                            else{
                                setDropdownVal(selectedItem);
                                onselect?.(selectedItem, index);
                            }
                            // if (selectedItem.name === 'Create New') {
                            //     handleCreateNewItem(newItem);
                            // } else {
                            //     setDropdownVal(selectedItem);
                            //     onselect?.(selectedItem, index);
                            // }
                        }}
                        buttonTextAfterSelection={(selectedItem) => selectedItem.name}
                        rowTextForSelection={(item) => item.name}
                        onBlur={() => {
                            setFilteredData(DATA);
                            setIsActive(false);
                        }}
                        onFocus={() => setIsActive(true)}
                        renderDropdownIcon={() => (
                            <AntDesign
                                name={'down'}
                                color={Colors.fontColor}
                                size={iconsSize ? iconsSize : platform == 'ios' ? RFPercentage(1.5) : RFPercentage(2)}
                            />
                        )}
                        buttonStyle={{
                            ...drop_down_button_style,
                            borderColor: errorTitleFromRedux === 'all' ? Colors.red : errorTitleFromRedux?.toLocaleLowerCase() === title?.toLocaleLowerCase() ? Colors.red : isActive ? Colors.primary : dropdownVal?.length > 0 ? Colors.fontColor : Colors.lightGrey,
                        }}
                        buttonTextStyle={{
                            textAlign: 'left',
                            color: defaultValueByIndex === true
                                ? Colors.black
                                : dropdownVal?.length && dropdownVal?.length > 0
                                    ? Colors.black
                                    : color || Colors.black,
                            fontSize: fontSize || (platform == 'ios' ? RFPercentage(1.3) : RFPercentage(1.6)),
                        }}
                        dropdownStyle={dropDownStyle || styles.dropDownStyle}
                        dropdownOverlayColor={'transparent'}
                        rowStyle={styles.rowStyle}
                        searchInputStyle={styles.searchInputStyle}
                        renderCustomizedRowChild={(item, index) => {
                            const isSelected = dropdownVal === item;
                            return (
                                <View style={[styles.customRow, styles.rowChildContainer]}>
                                    <View style={[styles.rowWrapper, {
                                        backgroundColor: item.name === 'Create New' ? Colors.primary : '#ededed',
                                        justifyContent: item.name === 'Create New' ? "center" : 'space-between',
                                    }]}>
                                        <Text style={{
                                            color: item.name === 'Create New' ? Colors.white : Colors.black,
                                            fontSize: RFValue(18, windowHeight),
                                            textAlign: "center",
                                        }}>
                                            {item.name}
                                        </Text>
                                        {item.name === 'Create New' && (
                                            <MaterialIcons
                                                name="add-circle"
                                                size={RFValue(25, windowHeight)}
                                                color={Colors.white}
                                                style={{ marginLeft: 10 }}
                                            />
                                        )}
                                        {item.name !== 'Create New' && isSelected ?
                                            <FontAwesome
                                                name="check-circle"
                                                size={RFValue(20, windowHeight)}
                                                color={Colors.black}
                                                style={{ marginLeft: 10 }}
                                            />
                                            :
                                            item.name !== 'Create New' && <FontAwesome
                                                name="circle-thin"
                                                size={RFValue(20, windowHeight)}
                                                color={Colors.black}
                                                style={{ marginLeft: 10 }}
                                            />
                                        }
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>

            {!disableValidation && errorMsg &&
                errorTitleFromRedux === 'all' ?
                <Text style={{
                    color: 'red',
                    marginBottom: RFValue(10, windowHeight),
                    marginLeft: 5
                }}>{errorMsg}</Text>
                :
                errorTitleFromRedux?.toLocaleLowerCase() === title?.toLocaleLowerCase() &&
                <Text style={{
                    color: 'red',
                    marginBottom: RFValue(10, windowHeight),
                    marginLeft: 5,
                }}>{errorMsg}</Text>
            }
        </>
    );
};

export default SearchDropDown;
