// @app
import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';

import Colors from '../../../../styles/colors';
import { styles } from './new-contact.style';
import { Title } from '../../../../core/components/screen-title.component';
import { centralStyle, heightFlex1 } from '../../../../styles/constant.style';
import { changeRoute } from '../../../../core/helpers/async-storage';
import {
    captureImage,
    pickImage
} from './call-back';

import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import * as Animatable from 'react-native-animatable';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RBSheet from 'react-native-raw-bottom-sheet';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import { t } from 'i18next';
import CountryPicker, {
    Country,
} from 'react-native-country-picker-modal';

import AppHeader from '../../../../core/components/app-headers';
// import Colors from '../../../../styles/colors';
import OutlinedTextInput from '../../../../core/components/Outlined-TextInput.component';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
// import { styles } from './new-contact.style';
// import { changeRoute } from '../../../../core/helpers/async-storage';
// import { Title } from '../../../../core/components/screen-title.component';
import { CONTACTTYPEDATA, SECTIONLISTDATA } from './data';
import { platform } from '../../../../utilities';
// import { CompanyList, LeftIcon, PicImgModal, RightIcon } from './new-contact-component';
// import {
//     // centralStyle,
//     heightFlex1,
// } from '../../../../styles/constant.style';
import Input from '../../../../core/components/input.component';
import { AlphabetList } from 'react-native-section-alphabet-list';

// import { Image } from 'react-native-svg';

export const PicImgModal = ({ setimageUriLocal, disableModal }: any) => {
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
                    pickImage(setimageUriLocal)
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
export const RightIcon = (navigation?: any) => (
    <View style={styles.mx2}>
        <Title
            color={1 == 1 ? Colors.fontColor : Colors.primary}
            type='Poppin-14'
            weight='600'
            title={t('Done')} />
    </View>
)
export const CompanyList = ({ item, getCompany, disableSheet }: any) => {
    return (
        <TouchableOpacity onPress={() => {
            getCompany(item)
            disableSheet()
        }} activeOpacity={.9} style={[centralStyle.row,]}>
            <View style={[styles.companyListContainer,]}>
                <View style={[centralStyle.row, styles.listWrapper]}>
                    <View style={[styles.flex1p2, centralStyle.justifyContentCenter]}>
                        <Image
                            source={require('../../../../assets/app-images/userImg.png')}
                            style={styles.userImgStyle} />
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
                    <TextInput placeholder='Search' style={styles.searchInput} />
                </View>
                <View style={[centralStyle.px2, { height: heightFlex1 * 6 }]}>
                    <AlphabetList
                        data={SECTIONLISTDATA}
                        letterListContainerStyle={styles.listContainerStyle}
                        showsVerticalScrollIndicator={false}
                        indexContainerStyle={{ width: 20 }}
                        indexLetterStyle={styles.letterStyle}
                        renderCustomItem={(item) => <CompanyList disableSheet={disableSheet} getCompany={(val: any) => getCompany(val)} item={item} />}
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