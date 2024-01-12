// @app
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { t } from 'i18next';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import Slider from '@react-native-community/slider';
import Button from '../../../../core/components/button.component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './contact.style';
import { centralStyle } from '../../../../styles/constant.style';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { FILESDATA, contactTypefilter } from './call-back';
import ModalComp from '../../../../core/components/modal-component';
import { SPECIALITIES_LIST } from '../../../../utilities/contact-data';

// top: RFPercentage(10.5), left: RFPercentage(32)


export const SpecialityModal: React.FC<any> = ({ specialityModal, setSpecialityModal, position }) => {
    return (
        <>
            <TouchableOpacity style={{
                position: 'absolute',
                height: "100%",
                width: "100%",
            }} onPress={() => setSpecialityModal(!specialityModal)} />

            <View style={{ backgroundColor: "black", height: RFPercentage(20), width: RFPercentage(19.5), position: 'absolute', top: position.y- RFPercentage(6.6) , left: position.x }}>
                <Text> Heloo</Text>
            </View>
        </>
    )
}








export const RenderItem = ({ item, index, contactCategory, setContactCategory, dispatch, specialityModal, setSpecialityModal, setPosition }: any) => {


    const componentRef = useRef<View>(null);

    const getComponentDimension = () => {
        if (componentRef.current) {
            componentRef.current.measure((_x, _y, _width, _height, pageX, pageY) => {
                setPosition({ x: pageX, y: pageY });
                console.log(pageY)
            });
        }
    }

    const handlePress = () => {
        // contactTypefilter(index, dispatch);
        // setContactCategory(index);
        // getComponentDimension()


        
    };
    const numbers = 0;

    return (
        <View ref={componentRef} style={[centralStyle.py05, styles.titleContainer(contactCategory, index), centralStyle.mx2, centralStyle.row, centralStyle.XAndYCenter]}>
            <TouchableOpacity
                activeOpacity={.7}
                onPress={handlePress}
            >
                <Title
                    weight='400'
                    type='Poppin-12'
                    color={Colors.fontColor}
                    title={item}
                />
            </TouchableOpacity >
            {contactCategory === index && index !== 0 && index !== 1 && index !== 4 ? (
                    <View style={styles.renderItemSpecialityType}>
                        <Title
                            weight='400'
                            type='Poppin-12'
                            color={Colors.fontColor}
                            title={`${t('All')} (${numbers})`}
                        />
                        <Entypo onPress={() => setSpecialityModal(!specialityModal)} name='chevron-down' size={RFPercentage(2)} />
                    </View>
            ) : null}
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
            <View style={{}}>
                <OutlinedTextInput
                    height={RFValue(65)}
                    title={t("Address")}
                    placeHolder={t("Address")}
                />
                <View style={[centralStyle.row, centralStyle.alignitemCenter, styles.justifyContentBetween, centralStyle.my2]}>
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
                contentContainerStyle={centralStyle.pb5}
                columnWrapperStyle={[styles.listContentContainerStyle, centralStyle.my1,]}
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
                keyExtractor={(_item, index) => index.toString()}
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
                useNativeDriver
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