// @app
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    TouchableOpacity,
    View,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import OutlinedTextInput from '../../../../core/components/Outlined-TextInput.component';
import Slider from '@react-native-community/slider';
import Button from '../../../../core/components/Button';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './contact.style';
import { centralStyle } from '../../../../styles/constant.style';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { FILESDATA } from './call-back';

export const RenderItem = ({ item }: any) => {
    return (
        <View style={[centralStyle.px2, centralStyle.py05, styles.titleContainer, centralStyle.mx2]}>
            <Title
                weight='400'
                type='Poppin-12'
                color={Colors.fontColor}
                title={item} />
        </View>
    )
}

const handleMoreOptions = (navigation: any, name: any, disableModal: any) => {
    changeRoute(navigation, name)
    disableModal()
}

export const ImportModal: React.FC<{ disableModal?: any, navigation?: any, openfiles?: any }> = ({ disableModal, navigation, openfiles }) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            style={[styles.modalContainerAbs, centralStyle.XAndYCenter, styles.bgTransparent]}>

            <TouchableOpacity
                activeOpacity={.9}
                style={[styles.importModalContainer, centralStyle.row]}>

                <View style={[{ flex: 2.5 }, centralStyle.XAndYCenter]}>
                    <FontAwesome name={`folder-o`} size={RFPercentage(3)} />
                </View>

                <View style={[{ flex: 7.5, }, centralStyle.justifyContentCenter]}>

                    <View style={{ width: '70%' }}>
                        <Title
                            weight='400'
                            type='Poppin-12'
                            color={Colors.black}
                            title={t(`Allow247protoaccessphotosmediaandfilesonyourdevice`)} />
                    </View>

                    <View style={[centralStyle.row, centralStyle.selfEnd]}>
                        <Button
                            title={t('Deny')}
                            callBack={() => { disableModal() }}
                            customStyle={[centralStyle.XAndYCenter,]}
                            titleStyle={{ color: Colors.primary }}
                        />
                        <Button
                            title={t('Allow')}
                            callBack={() => {
                                disableModal()
                                openfiles()
                            }}
                            customStyle={[centralStyle.XAndYCenter, centralStyle.mx4]}
                            titleStyle={{ color: Colors.primary }}
                        />
                    </View>

                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export const ConnectionRequest: React.FC<{ disableModal?: any, navigation?: any, importModalEnable?: any }> = ({ disableModal, importModalEnable, navigation }) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => { disableModal() }}
            style={styles.modalContainerAbs}>
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                }}
                style={styles.modalContainer}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => { handleMoreOptions(navigation, 'ConnectionRequests', disableModal) }}>
                    <Title
                        title={t('ConnectionRequests')}
                        weight='400'
                        color={Colors.fontColor}
                        type='Poppin-12' />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={centralStyle.mt1}
                    onPress={() => { handleMoreOptions(navigation, 'NewCompany', disableModal) }}>
                    <Title
                        title={t('AddCompany')}
                        weight='400'
                        color={Colors.fontColor}
                        type='Poppin-12' />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={centralStyle.mt1}
                    onPress={() => { handleMoreOptions(navigation, 'NewContact', disableModal) }}>
                    <Title
                        title={t('AddContact')}
                        weight='400'
                        color={Colors.fontColor}
                        type='Poppin-12' />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={centralStyle.mt1}
                    onPress={() => { importModalEnable(), disableModal() }}
                >
                    <Title
                        title={t('Import')}
                        weight='400'
                        color={Colors.fontColor}
                        type='Poppin-12' />
                </TouchableOpacity>
            </TouchableOpacity>
        </TouchableOpacity >
    )
}
export const FilterCompany: React.FC<{}> = ({ }) => {

    const [miles, setMiles] = useState(0);
    const handleSliderChange = (value: any) => { setMiles(value.toFixed(0)) };

    return (
        <View
            style={[centralStyle.XAndYCenter, centralStyle.px2, centralStyle.flex1]}>
            <Title
                color={Colors.black}
                type='Poppin-18'
                weight='600'
                title={t('FilterCompany')} />
            <View style={centralStyle.my2}>
                <OutlinedTextInput
                    title={t("Address")}
                    placeHolder={t("Address")}
                />
                <View style={[centralStyle.row, centralStyle.alignitemCenter, styles.justifyContentBetween]}>
                    <Slider
                        style={styles.sliderStyle}
                        minimumValue={0}
                        maximumValue={30}
                        minimumTrackTintColor={Colors.primary}
                        maximumTrackTintColor={Colors.lightGrey}
                        thumbImage={require('../../../../assets/app-images/thumbImg.png')} // Set a custom image for the thumb
                        onValueChange={handleSliderChange} // Attach the event handler
                    />
                    <Title
                        color={Colors.black}
                        type='Poppin-12'
                        weight='400'
                        title={miles + " " + t('mile')} />
                </View>
            </View>
            <View style={centralStyle.width100}>
                <Button
                    title={t(`ApplyFilter`)}
                    primary />
                <Button
                    title={t('ClearFilters')}
                    customStyle={[centralStyle.XAndYCenter, centralStyle.p2,]}
                    titleStyle={styles.clearFiler}
                />
            </View>
        </View>
    )
}

export const FilesCompany: React.FC<{}> = ({ }) => {
    return (
        <View
            style={[centralStyle.XAndYCenter, centralStyle.px2, centralStyle.flex1, centralStyle.my2]}>
            <Title
                color={Colors.black}
                type='Poppin-18'
                weight='600'
                title={t('Files')} />
            <FlatList
                data={FILESDATA}
                numColumns={3}
                columnWrapperStyle={[styles.listContentContainerStyle, centralStyle.my1]}
                renderItem={({ item }) => (
                    <View style={styles.filesListContainer}>
                        <View style={centralStyle.width80}>
                            <Image
                                style={[centralStyle.height100, centralStyle.width100]}
                                resizeMode='contain'
                                source={require('../../../../assets/app-images/sheetIcon.png')}></Image>
                        </View>
                        <Title
                            color={Colors.black}
                            textAlignCenter='center'
                            type='Poppin-12'
                            weight='400'
                            title={t('Contacts.xlxx')} />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}


export const FilesModal = ({ anim, setanim, setcontactModal, getCompany }: any) => {
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
                    <View style={styles.headerLine} />
                </View>

                <FilesCompany />

            </Animatable.View>
        </View>
    )
}