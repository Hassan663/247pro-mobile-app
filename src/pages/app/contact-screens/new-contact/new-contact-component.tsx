// @app
import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { AlphabetList } from 'react-native-section-alphabet-list';

import Colors from '../../../../styles/colors';
import { Img } from '../../../../core/components/image-component';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import { styles } from './new-contact.style';
import { Title } from '../../../../core/components/screen-title.component';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { EMAILLABELDATA, SECTIONLISTDATA } from './data';
import { centralStyle } from '../../../../styles/constant.style';
import {
    addNewContactField,
    captureImage,
    handleAttachments,
    pickImage,
    removeEmptyFields,
    removePrevField
} from './call-back';
import { CreateContactAction } from '../../../../store/action/action';
import { newContactValidation } from '../../../../core/helpers/validation/validation';
import { RenderComponentPropsModal } from '../../../../core/modals/contact.modal';


export const PicImgModal = ({ setimageUriLocal, disableModal, setInputValues, inputLabel }: any) => {
    // plpl
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => { disableModal() }}
            style={[centralStyle.alignitemCenter, styles.uploadImageModal]}>
            <View style={styles.uploadImageModalContentContainer}>
                <TouchableOpacity onPress={() => {
                    captureImage(setimageUriLocal)
                    disableModal()
                }}
                    style={styles.captureBtn}>
                    <Title
                        title='Capture new'
                        type='Poppin-12'
                        weight='400'
                        color={Colors.fontColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    pickImage(setInputValues, inputLabel)
                    disableModal()
                }}
                    style={styles.uploadBtn}>
                    <Title
                        title='Upload from gallery'
                        type='Poppin-12'
                        weight='400'
                        color={Colors.fontColor} />
                </TouchableOpacity>

            </View>
        </TouchableOpacity >
    )
}
export const LeftIcon = (navigation?: any) => (
    <TouchableOpacity
        onPress={() => changeRoute(navigation, 'pop')}
        activeOpacity={.8}
        style={styles.mx2}>
        <Title
            color={Colors.primary}
            type='Poppin-14'
            weight='600'
            title={t('Cancel')} />
    </TouchableOpacity>
)
export const RightIcon = (dispatch?: any, inputValues?: any, isToastVisible?: boolean, setIsToastVisible?: any, toast?: any, Loader?: boolean, navigation?: any) => (
    <TouchableOpacity
        disabled={Loader}
        onPress={async () => {
            try {
                if (!isToastVisible) {
                    let isValid = await newContactValidation(inputValues.firstName);
                    if (isValid.success) {
                        const contactDetails = await removeEmptyFields({ ...inputValues });
                        await dispatch(CreateContactAction(contactDetails))
                        if (!Loader) changeRoute(navigation, 'pop');
                    } else {
                        setIsToastVisible(true)
                        await toast.show(isValid.message, { type: "custom_toast" });
                        setTimeout(() => {
                            setIsToastVisible(false);
                        }, 5000);
                    }
                }
            } catch (error) {
                console.log('error--->', error)
            }
        }
        }

        activeOpacity={0.8}
        style={styles.mx2}>
        <Title
            color={inputValues.firstName.length ? Colors.primary : Colors.fontColor}
            type='Poppin-14'
            weight='600'
            title={t('Done')} />
    </TouchableOpacity>
)
export const CompanyList = ({ item, getCompany, disableSheet }: any) => {
    return (
        <TouchableOpacity onPress={() => {
            if (getCompany) { getCompany(item) }
            if (disableSheet) { disableSheet() }
        }} activeOpacity={.9} style={[centralStyle.row,]}>
            <View style={[styles.companyListContainer,]}>
                <View style={[centralStyle.row, styles.listWrapper]}>
                    <View style={[styles.flex1p2, centralStyle.justifyContentCenter]}>
                        <Img
                            source={{ uri: item.profilePicture }}
                            customStyle={styles.userImgStyle} />
                    </View>
                    <View style={[styles.flex8p8, centralStyle.justifyContentCenter]}>
                        <Title
                            color={Colors.black}
                            type='Poppin-14'
                            weight='600'
                            title={item.value} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const ContactModal = ({ anim, setanim, setcontactModal, getCompany }: any) => {
    const disableSheet = () => {
        setanim('fadeOutDownBig')
        setTimeout(() => {
            setcontactModal(false)
        }, 800)
    }
    return (
        <View style={styles.contactModalContainer}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={disableSheet}
                style={styles.disableModalContainer} />

            <Animatable.View
                duration={600}
                animation={anim}
                iterationCount={1}
                direction="alternate"
                style={styles.contactModalContentWrapper}>
                <View style={[centralStyle.row, centralStyle.px2, centralStyle.py1, styles.contactModalHeader]}>
                    <View style={[centralStyle.circle(20),]} />
                    <View style={styles.headerLine} />
                    <View style={[centralStyle.circle(20), styles.downIconWrapper]}>
                        <AntDesign onPress={disableSheet} name={`arrowdown`} size={RFPercentage(1.5)} />
                    </View>
                </View>
                <View style={[styles.inputWrapper, centralStyle.row, centralStyle.my05, centralStyle.XAndYCenter]}>
                    <AntDesign
                        style={centralStyle.mx1}
                        color={Colors.fontColor}
                        name={`search1`}
                        size={RFPercentage(2)} />
                    <TextInput placeholder={t('search')} style={styles.searchInput} />
                </View>
                <View style={[centralStyle.px2, { flex: 1, }]}>
                    <AlphabetList
                        data={SECTIONLISTDATA}
                        letterListContainerStyle={styles.listContainerStyle}
                        showsVerticalScrollIndicator={false}
                        indexContainerStyle={{ width: 20 }}
                        indexLetterStyle={styles.letterStyle}
                        renderCustomItem={(item) => <CompanyList disableSheet={disableSheet} getCompany={(val: any) => getCompany && getCompany(val)} item={item} />}
                        renderCustomSectionHeader={CustomSectionHeader}
                    />
                </View>
            </Animatable.View>
        </View>
    )
}
export const CustomSectionHeader = (section: any) => {
    return (
        <View style={styles.sectionHeaderContainer}>
            <Title
                color={Colors.black}
                type='Poppin-14'
                weight='600'
                title={section.title} />
        </View>
    )
}

export const SelectedAttachmentUI = ({ attechments, setAttechments }: any) => {
    return (
        <View style={[styles.selectedAttachmentContainer, centralStyle.XAndYCenter, centralStyle.mb2]}>
            <TouchableOpacity
                style={[centralStyle.height100, centralStyle.width100]}
                onPress={() => handleAttachments(setAttechments)}>
                <Image
                    resizeMode='contain'
                    source={attechments.type == "application/pdf" ? require('../../../../assets/app-images/pdfIcon.png') : { uri: attechments.uri }}
                    style={[centralStyle.height100, centralStyle.width100]}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => setAttechments([])}
                style={[centralStyle.circle(RFPercentage(2.5)), styles.editIconAdd2,]}>
                <AntDesign
                    name={'close'}
                    color={Colors.primary}
                    size={RFPercentage(1.5)} />
            </TouchableOpacity>
        </View>
    )
}


export const RenderItem = ({ item }: any) => {
    return (
        <View style={[centralStyle.px2, styles.titleContainer, centralStyle.py05, centralStyle.mx2]}>
            <Title
                weight='400'
                type='Poppin-12'
                color={Colors.fontColor}
                title={item} />
        </View>
    )
}





export const renderComponentOfContactEmails = ({ item, index, inputValues, handleInputChange, setInputValues }: RenderComponentPropsModal) => {
    const condition = inputValues.contactEmails.length === index + 1;
    return (
        <View key={index?.toString()} style={[centralStyle.row, centralStyle.alignitemCenter, { flex: 1 }]}>
            <View style={{ flex: 7 }}>
                <OutlinedTextInput
                    val={item.email}
                    onChange={(text) => handleInputChange('contactEmails', text, 'email', index)}
                    title={t('Email')} placeHolder={t('Email')} />
            </View>
            <View style={[{ flex: 2.5, marginHorizontal: RFPercentage(.6) }]}>
                <OutlinedDropDown
                    dropDownStyle={styles.dropdownstyle}
                    title={t('Label')}
                    color={Colors.lightGray}
                    isPrimaryBorderOnFocus={true}
                    iconsSize={RFPercentage(2)}
                    onselect={(value: string) => handleInputChange('contactEmails', value, 'label', index)}
                    DATA={EMAILLABELDATA}
                    drop_down_button_style={styles.dropDownStyle()}
                />
            </View>
            {condition ? (
                <TouchableOpacity
                    onPress={() => addNewContactField(setInputValues)}
                    style={[centralStyle.flex1, centralStyle.justifyContentCenter, centralStyle.alignitemEnd, { flex: .5 }]}>
                    <AntDesign name={`plus`} size={RFPercentage(3)} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => removePrevField(index, setInputValues, inputValues)}
                    style={[centralStyle.flex1, centralStyle.justifyContentCenter, centralStyle.alignitemEnd, { flex: .5 }]}>
                    <AntDesign name={`minus`} size={RFPercentage(3)} />
                </TouchableOpacity>
            )}
        </View>
    );
}