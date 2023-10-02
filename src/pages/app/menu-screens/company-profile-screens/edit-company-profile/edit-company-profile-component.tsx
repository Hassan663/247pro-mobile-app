import { TouchableOpacity, View } from "react-native";

import AntDesign from 'react-native-vector-icons/AntDesign';
import CountryPicker from 'react-native-country-picker-modal';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { RFPercentage } from "react-native-responsive-fontsize";

import Colors from "../../../../../styles/colors";
import { Title } from "../../../../../core/components/screen-title.component";
import { centralStyle } from "../../../../../styles/constant.style";
import { INSDUSTRYTAGS } from "./data";
import { styles } from "./edit-company-profile.style";
import { handleOnSelect } from "../../../contact-screens/edit-company/call-back";
import OutlinedTextInput from "../../../../../core/components/Outlined-TextInput.component";
import { t } from "i18next";

export const IndustryTagUI = ({ item, index }: any) => {
    return (
        <>
            <View key={index.toString()} style={[{ backgroundColor: Colors.lightGrey, borderRadius: RFPercentage(.5), marginRight: RFPercentage(1) }, centralStyle.p1, centralStyle.my1, centralStyle.row, centralStyle.XAndYCenter]}>
                <View style={centralStyle.mx05}>
                    <Title
                        color={Colors.fontColor}
                        type='Poppin-10'
                        weight='400'
                        title={item} />

                </View>
                <AntDesign name={`close`} size={RFPercentage(1.5)} />
            </View>
            {index == INSDUSTRYTAGS.length - 1 &&
                <View key={index.toString()} style={centralStyle.XAndYCenter}>
                    <AntDesign color={Colors.fontColor} name={`plus`} size={RFPercentage(2)} />
                </View>
            }
        </>

    )
}
export const JobTypePreference = ({ item, index, selectedType, setSelectedType }: any) => {

    return (
        <TouchableOpacity
            onPress={() => setSelectedType(item)}
            key={index.toString()} style={[centralStyle.row, centralStyle.alignitemCenter]}>
            <Fontisto
                size={RFPercentage(1.5)}
                name={selectedType == item ? `radio-btn-active` : 'radio-btn-passive'}
                style={[
                    centralStyle.mr1,
                    centralStyle.my1,
                    { color: selectedType == item ? Colors.primary : Colors.fontColor }]} />
            <Title
                color={Colors.fontColor}
                type='Poppin-14'
                weight='400'
                title={item} />
        </TouchableOpacity>
    )
}
export const MobilePhoneUI = ({ countryCode, setIsCountryPickerVisible, isCountryPickerVisible, setCountryCode }: any) => {
    return (
        <View style={styles.inputWrapper2}>
            <TouchableOpacity
                onPress={() => setIsCountryPickerVisible(true)}
                style={styles.flagContainer}
            >
                <View style={styles.flagWrapper}>
                    <CountryPicker
                        countryCode={countryCode}
                        withCallingCode
                        withFlagButton={true}
                        onClose={() => setIsCountryPickerVisible(false)}
                        onSelect={(country) => handleOnSelect(country, setIsCountryPickerVisible, setCountryCode)}
                        visible={isCountryPickerVisible}
                    />
                </View>
                <AntDesign
                    name={`down`}
                    style={[styles.downIcon,]}
                    size={RFPercentage(2)}
                />
            </TouchableOpacity>
            <View style={styles.phoneNumberInput}>
                <OutlinedTextInput title={t('MobilePhone')} placeHolder={t('MobilePhone')} />
            </View>
        </View>
    )
}