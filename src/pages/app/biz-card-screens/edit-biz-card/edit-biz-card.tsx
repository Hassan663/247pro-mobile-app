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
    TextInput,
    TouchableOpacity
} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RBSheet from 'react-native-raw-bottom-sheet';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { launchImageLibrary } from 'react-native-image-picker';
import { t } from 'i18next';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import OutlinedTextInput from '../../../../core/components/Outlined-TextInput.component';
import { platform } from '../../../../utilities';
import { centralStyle } from '../../../../styles/constant.style';
import { AddInputSheet } from './edit-biz-card-component';
import { styles } from './edit-biz-card.style';
import { Title } from '../../../../core/components/screen-title.component';
import {
    CONTACTINFOINPUTS,
    SOCIALINPUTSDATA
} from './data';

const EditBizCard: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [addSocialAccountInput, setaddSocialAccountInput] = useState(false)
    const [newField, setNewField] = useState('')
    const [contactInfoInputs, setcontactInfoInputs] = useState(CONTACTINFOINPUTS)
    const [socialInputs, setsocialInputs] = useState(SOCIALINPUTSDATA)
    const [about, setAbout] = useState('')
    const [isEnabled, setIsEnabled] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [imageUriLocal, setimageUriLocal] = useState('');

    const handleFocus = () => setIsActive(true)
    const handleBlur = () => setIsActive(false)

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const sheetRef = useRef<any>(null)

    const getImg = async () => {
        try {
            let options: any = {
                title: 'Select Image',
                includeBase64: true,
                customButtons: [
                    {
                        name: 'customOptionKey',
                        title: 'Choose Photo from Custom Option'
                    }
                ],
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
            };
            launchImageLibrary(options, async (res: any) => {
                if (res.didCancel) {
                } else if (res.error) {
                } else {
                    setimageUriLocal(res.assets[0].uri);
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
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
                <TouchableOpacity
                    onPress={() => getImg()}
                    style={[centralStyle.circle(RFPercentage(16)), styles.imgContainer]}>
                    {imageUriLocal.length > 0
                        ? < Image
                            style={{ height: '100%', width: '100%' }}
                            source={{ uri: imageUriLocal }} /> :
                        <SimpleLineIcons name={'picture'} size={RFPercentage(4)} />

                    }
                </TouchableOpacity>
                <View style={styles.mx2}>
                    <Title
                        color={Colors.black}
                        type='Poppin-18'
                        weight='600'
                        title={t('Basic')} />

                    <OutlinedTextInput
                        title={t('firstname')}
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
                    <View style={styles.inputContainer(60)}>
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
                    icon={
                        <AntDesign name={'plus'}
                            size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)}
                            color={Colors.primary} />
                    }
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
                {socialInputs.map((item, index) => {
                    return (
                        <View
                            key={index.toString()}
                            style={[centralStyle.row, styles.mx2, styles.spaceBetweenRow, centralStyle.alignitemCenter]}>
                            <Image style={[styles.socialIconsStyle]} source={item?.icon} />
                            {!isEnabled ?
                                <TextInput
                                    style={styles.socialInputContainer}
                                    placeholder={item?.name}
                                /> :
                                <View
                                    style={styles.enabledSocialIcon}>
                                    <OutlinedTextInput
                                        key={index.toString()}
                                        title={item?.name}
                                        placeHolder={item?.name}
                                    />
                                </View>
                            }
                        </View>
                    )
                })}
                <Button
                    icon={
                        <AntDesign name={'plus'}
                            size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)}
                            color={Colors.primary} />
                    }
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
                        contactInfoInputs={!addSocialAccountInput ? contactInfoInputs : socialInputs}
                        setcontactInfoInputs={!addSocialAccountInput ? setcontactInfoInputs : setsocialInputs}
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
