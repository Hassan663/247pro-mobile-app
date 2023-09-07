// @app
import React, {
    useState,
    useRef
} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    ScrollView,
    Switch,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput
} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import { styles } from './edit-biz-card.style';
import { Title } from '../../../../core/components/screen-title.component';
import { centralStyle } from '../../../../styles/constant.style';
import { CONTACTINFOINPUTS, SOCIALINPUTSDATA } from './data';
import OutlinedTextInput from '../../../../core/components/Outlined-TextInput.component';
import RBSheet from 'react-native-raw-bottom-sheet';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import SelectDropdown from 'react-native-select-dropdown'
import { platform } from '../../../../utilities';


const AddInputSheet = ({ contactInfoInputs, addSocialAccountInput, placeHolder, btnText, title, setcontactInfoInputs, sheetRef, newField, setNewField }: any) => {
    const [socialAccount, setSocialAccount] = useState('')
    return (
        <View
            style={[centralStyle.XAndYCenter, centralStyle.px2, centralStyle.flex1]}>
            <Title
                color={Colors.black}
                type='Poppin-18'
                weight='600'
                title={title} />
            <View style={centralStyle.my2}>
                {!addSocialAccountInput ?
                    <OutlinedTextInput
                        onChange={(val) => setNewField(val)}
                        title={"Title"}
                        val={newField}
                        placeHolder={placeHolder}
                    />
                    :
                    <SelectDropdown
                        data={["Egypt", "Canada", "Australia", "Ireland"]}
                        dropdownStyle={{
                            // borderBottomLeftRadius: 10,
                            // marginTop: platform !== 'ios' ? RFPercentage(-3.5) : 0,
                            // borderBottomRightRadius: 10
                        }}
                        buttonStyle={{
                            width: "100%",
                            borderWidth: RFPercentage(.1),
                            borderColor: Colors.lightGrey,
                            backgroundColor: 'white'
                        }}
                        renderDropdownIcon={() => <AntDesign name={'down'} size={RFPercentage(3)} />}
                        buttonTextStyle={{ textAlign: "left" }}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                    // <OutlinedDropDown
                    //     title={t('Industry')}
                    //     onselect={(value: string) => { setSocialAccount(value) }}
                    //     DATA={["Construction", "Food", "Oil", "Electronics"]}
                    //     drop_down_button_style={styles.drop_down_button_style}
                    // />
                }
            </View>
            <View style={centralStyle.width100}>
                <Button
                    callBack={() => {
                        if (newField?.length > 0) {
                            let inputsCopy = JSON.parse(JSON.stringify(contactInfoInputs));
                            inputsCopy.push(newField)
                            setcontactInfoInputs(inputsCopy)
                            sheetRef?.current?.close()
                            setNewField('')
                        }
                    }}
                    title={btnText} primary />
            </View>
        </View>
    )
}
const EditBizCard: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [firstName, setFirstName] = useState('')
    const [addSocialAccountInput, setaddSocialAccountInput] = useState(false)
    const [lastName, setLastName] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [newField, setNewField] = useState('')

    const [companyName, setCompanyName] = useState('')
    const [contactInfoInputs, setcontactInfoInputs] = useState(CONTACTINFOINPUTS)
    const [socialInputs, setsocialInputs] = useState(SOCIALINPUTSDATA)

    const [about, setAbout] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [streetAddress, setStreetAddress] = useState('')



    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isActive, setIsActive] = useState(false);

    const handleFocus = () => setIsActive(true)

    const handleBlur = () => setIsActive(false)

    const sheetRef = useRef<any>(null)

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                iconL1={
                    <View style={styles.mx2}>
                        <Title
                            color={Colors.primary}
                            type='Poppin-14'
                            weight='600'
                            title={t('Cancel')} />
                    </View>
                }
                iconR1={
                    <View style={styles.mx2}>
                        <Title
                            color={1 == 1 ? Colors.fontColor : Colors.primary}
                            type='Poppin-14'
                            weight='600'
                            title={t('Done')} />
                    </View>
                }

                type='Poppin-18'
                weight='600'
                title={t(`NewBusinessCard`)} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[centralStyle.circle(RFPercentage(16)), styles.imgContainer]}>
                    <SimpleLineIcons name={'picture'} size={RFPercentage(4)} />
                </View>
                <View style={styles.mx2}>
                    <Title
                        color={Colors.black}
                        type='Poppin-18'
                        weight='600'
                        title={t('Basic')} />

                    <OutlinedTextInput
                        title={t('firstname')}
                        val={firstName}
                        onChange={(val) => setFirstName(val)}
                        placeHolder={t('firstname')}
                    />
                    <OutlinedTextInput
                        title={t('lastName')}
                        placeHolder={t('lastName')}
                    />
                    <OutlinedTextInput
                        title={t('Job title')}
                        placeHolder={t('Job title')}
                    />
                    <OutlinedTextInput
                        title={t('Company name')}
                        placeHolder={t('Company name')}
                    />

                    <View style={styles.inputContainer()}>
                        {
                            about?.length && about?.length > 0 ?
                                <Text style={styles.inputtitle(isActive)}>{t(`about`)}</Text>
                                : isActive &&
                                <Text style={styles.inputtitle(isActive)}>{t(`about`)}</Text>
                        }
                        <View style={styles.textInputContainer(isActive)}>
                            <TextInput
                                placeholder={isActive ? '' : t('about')}
                                value={about}
                                onFocus={handleFocus}
                                multiline={true}
                                onBlur={handleBlur}
                                onChangeText={(val) => setAbout(val)}
                                style={styles.input(false, isActive)} />
                        </View>
                    </View>
                </View>
                <View style={[styles.mx2, centralStyle.my3, centralStyle.mb1]}>
                    <Title
                        color={Colors.black}
                        type='Poppin-18'
                        weight='600'
                        title={t('ContactInfo')} />
                    {contactInfoInputs?.map((item, index) => {
                        return (
                            <OutlinedTextInput
                                key={index.toString()}
                                title={item}
                                placeHolder={item}
                            />
                        )
                    })}
                </View>
                <Button
                    callBack={() => {
                        sheetRef?.current?.open()
                        setaddSocialAccountInput(false)
                    }}
                    icon={<AntDesign name={'plus'}
                        size={RFPercentage(3)}
                        color={Colors.primary} />}
                    customStyle={[centralStyle.row, centralStyle.alignitemCenter, styles.addCustomField]}
                    title={t('AddCustomField')}
                    titleStyle={styles.addCustomFieldTitle} />
                <View style={[centralStyle.my3, centralStyle.mb1, centralStyle.row, styles.mx2, styles.spaceBetweenRow]}>
                    <Title
                        color={Colors.black}
                        type='Poppin-18'
                        weight='600'
                        title={t('SocialProfile')} />
                    <Switch
                        trackColor={{ false: Colors.lightGrey, true: Colors.lightGrey }}
                        thumbColor={isEnabled ? Colors.primary : Colors.lightGray}
                        ios_backgroundColor={Colors.lightGrey}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                {SOCIALINPUTSDATA.map((item, index) => {
                    return (
                        <View
                            key={index.toString()}
                            style={[centralStyle.row, styles.mx2, styles.spaceBetweenRow, centralStyle.alignitemCenter]}>
                            <Image style={[styles.socialIconsStyle]} source={item?.icon} />
                            <TextInput
                                style={styles.socialInputContainer}
                                placeholder={item?.title}
                            />
                        </View>
                    )
                })}
                <Button
                    icon={
                        <AntDesign name={'plus'}
                            size={RFPercentage(3)}
                            color={Colors.primary} />}
                    customStyle={[
                        centralStyle.row,
                        centralStyle.my3,
                        centralStyle.alignitemCenter,
                        styles.addCustomField,
                        { width: "50%" }]}
                    callBack={() => {
                        sheetRef?.current?.open()
                        setaddSocialAccountInput(true)
                    }}
                    title={t('AddSocialAccount')}
                    titleStyle={styles.addCustomFieldTitle} />
                <RBSheet
                    ref={sheetRef}
                    height={RFPercentage(40)}
                    closeOnPressMask={true}
                    closeOnDragDown={true}
                    openDuration={250}
                    animationType={`slide`}
                    customStyles={{}}
                >
                    <AddInputSheet
                        contactInfoInputs={contactInfoInputs}
                        setcontactInfoInputs={setcontactInfoInputs}
                        sheetRef={sheetRef}
                        placeHolder={!addSocialAccountInput ? `Enter custom field label` : `Select social acount`}
                        newField={newField}
                        addSocialAccountInput={addSocialAccountInput}
                        title={!addSocialAccountInput ? t('AddCustomField') : `Add Social Account`}
                        btnText={!addSocialAccountInput ? `Save Field` : `Add Account`}
                        setNewField={setNewField}
                    />
                </RBSheet>
            </ScrollView>

        </SafeAreaView >

    );
};

export default EditBizCard;
