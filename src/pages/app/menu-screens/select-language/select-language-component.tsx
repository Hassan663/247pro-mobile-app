// @app
import React, {
    useState
} from 'react';
import {
    Image,
    View
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import SelectDropdown from 'react-native-select-dropdown';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './select-language.style';
import { platform } from '../../../../utilities';
import { centralStyle } from '../../../../styles/constant.style';
import { LANGUAGEDATA } from './data';

export const CountryDropDown = () => {
    const [selectedAccount, setselectedAccount] = useState(null)
    return (
        <SelectDropdown
            data={LANGUAGEDATA}
            buttonStyle={[styles.dropDownBtn, centralStyle.my1]}
            defaultValueByIndex={1}
            renderDropdownIcon={() => <AntDesign name={'down'} size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />}
            buttonTextStyle={{ textAlign: "left" }}
            dropdownStyle={styles.dropDownStyle}
            onSelect={(selectedItem, index) => { setselectedAccount(selectedItem) }}
            buttonTextAfterSelection={(selectedItem, index): any => {
                return (
                    <View style={[centralStyle.row, centralStyle.flex1, centralStyle.XAndYCenter]}>
                        <Image
                            resizeMode='contain'
                            source={selectedItem.icon}
                            style={styles.socialIcon} />
                        <Title
                            title={selectedItem.name}
                            type='Poppin-14'
                            color={Colors.fontColor}
                            weight='600' />
                    </View>
                )
            }}
            
            renderCustomizedRowChild={(item, index): any => {
                return (
                    <View style={[centralStyle.row, centralStyle.flex1,
                     centralStyle.alignitemCenter,centralStyle.px2
                     ]}>
                        <Image
                            resizeMode='contain'
                            source={item.icon}
                            style={styles.socialIcon} />
                        <Title
                            title={item.name}
                            type='Poppin-14'
                            color={Colors.fontColor}
                            weight='600' />
                    </View>
                );
            }}
        />
    )
}
{/* <SelectDropdown
data={countriesWithFlags}
// defaultValueByIndex={1}
// defaultValue={{
//   title: 'England',
//   image: require('./Images/England.jpg'),
// }}
onSelect={(selectedItem, index) => {
    console.log(selectedItem, index);
}}
buttonStyle={styles.dropdown3BtnStyle}
renderCustomizedButtonChild={(selectedItem, index) => {
    return (
        <View style={styles.dropdown3BtnChildStyle}>
            {selectedItem ? (
                <Image source={selectedItem.image} style={styles.dropdown3BtnImage} />
            ) : (
                <Ionicons name="md-earth-sharp" color={'#444'} size={32} />
            )}
            <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem.title : 'Select country'}</Text>
            <FontAwesome name="chevron-down" color={'#444'} size={18} />
        </View>
    );
}}
dropdownStyle={styles.dropdown3DropdownStyle}
rowStyle={styles.dropdown3RowStyle}
renderCustomizedRowChild={(item, index) => {
    return (
        <View style={styles.dropdown3RowChildStyle}>
            <Image source={item.image} style={styles.dropdownRowImage} />
            <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
        </View>
    );
}}
/> */}