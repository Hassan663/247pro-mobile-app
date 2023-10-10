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
            rowTextForSelection={(item, index): any => {
                return (
                    <View style={[centralStyle.row, centralStyle.flex1, centralStyle.XAndYCenter]}>
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