// @app
import React, {
    useState,
} from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Text,
    TextInput,
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import { styles } from './view-company.style';
import { Title } from '../../../../core/components/screen-title.component';
import { platform } from '../../../../utilities';
import { centralStyle, } from '../../../../styles/constant.style';
import {
    handleBlur,
    handleFocus
} from '../../biz-card-screens/edit-biz-card/call-back';
import {
    LeftIcon,
    PicImgModal,
    RightIcon,
} from './view-company-component';

const ViewCompany: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [openPicker, setOpenPicker] = useState(false);
    const [imageUriLocal, setimageUriLocal] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [about, setAbout] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ')

    return (
        <>
            <KeyboardAvoidingView
                style={[centralStyle.flex1]}
                behavior={platform === 'ios' ? 'padding' : 'height'}
            >
                <SafeAreaView style={styles.container}>
                    <AppHeader
                        iconL1={LeftIcon(navigation)}
                        iconR1={RightIcon(navigation)}
                        type='Poppin-18'
                        weight='600'
                        title={t(`company`)} />

                    <ScrollView
                        showsVerticalScrollIndicator={false}>
                        <View
                            style={[centralStyle.circle(RFPercentage(16)), styles.imgContainer]}>
                            <Image
                                style={styles.profileImage}
                                source={require('../../../../assets/app-images/userImg.png')} />
                        </View>
                        <View style={[centralStyle.XAndYCenter, centralStyle.mb2]}>
                            <Title
                                color={Colors.black}
                                type='Poppin-24'
                                weight='600'
                                title={'George Lee'} />
                            <Title
                                color={Colors.fontColor}
                                type='Poppin-12'
                                weight='400'
                                title={t('Contacttype')} />
                        </View>
                        {openPicker && <PicImgModal disableModal={() => setOpenPicker(false)} setimageUriLocal={setimageUriLocal} />}

                        <View style={styles.mx2}>
                            <OutlinedTextInput editable={false} val='247 pro' title={t('Companyname')} placeHolder={t('Companyname')} />
                            <OutlinedTextInput editable={false} val='George Lee' title={t('Contactperson')} placeHolder={t('Contactperson')} />
                            <OutlinedTextInput editable={false} val='Marketing lead' title={t('jobTitle')} placeHolder={t('jobTitle')} />
                            <OutlinedTextInput editable={false} val='+1-5436748758' title={t('MobilePhone')} placeHolder={t('MobilePhone')} />
                            <OutlinedTextInput editable={false} val='abc123@gmail.com' title={t('Email')} placeHolder={t('Email')} />
                            <OutlinedTextInput editable={false} val='abc123@gmail.com' title={t('Email')} placeHolder={t('Email')} />
                            <OutlinedTextInput editable={false} val='htttps://www.247pro.com' title={t('Websiteurl')} placeHolder={t('Websiteurl')} />
                            <OutlinedTextInput editable={false} val='Business' title={t('Industry')} placeHolder={t('Industry')} />
                            <OutlinedTextInput editable={false} val='Marketing' title={t('Speciality')} placeHolder={t('Speciality')} />
                            <OutlinedTextInput editable={false} val='Contractor' title={t('JobType')} placeHolder={t('JobType')} />
                            <View style={[styles.inputContainer(60), {}]}>
                                {
                                    about?.length && about?.length > 0 ?
                                        <Text style={styles.inputtitle(isActive)}>{t(`Notes`)}</Text>
                                        : isActive &&
                                        <Text style={styles.inputtitle(isActive)}>{t(`Notes`)}</Text>
                                }
                                <View style={styles.textInputContainer(isActive)}>
                                    <TextInput
                                        placeholder={isActive ? '' : t('Notes')}
                                        value={about}
                                        onFocus={() => handleFocus(setIsActive)}
                                        multiline={true}
                                        editable={false}
                                        onBlur={() => handleBlur(setIsActive)}
                                        onChangeText={(val) => setAbout(val)}
                                        style={styles.input(false, isActive)} />
                                </View>
                            </View>

                            <OutlinedTextInput editable={false} val='Sole ownership' title={t('Entitytype')} placeHolder={t('Entitytype')} />
                            <OutlinedTextInput editable={false} val='2715 Ash Dr. San Jose, South Dakota 83475' title={t('Address')} placeHolder={t('Address')} />
                            <OutlinedTextInput editable={false} val='New York' title={t('State')} placeHolder={t('State')} />
                            <OutlinedTextInput editable={false} val='123456' title={t('ZipCode')} placeHolder={t('ZipCode')} />
                            <OutlinedTextInput editable={false} val='200' title={t('Staff')} placeHolder={t('Staff')} />
                            <OutlinedTextInput editable={false} val='$2,00,000,000.00' title={t('Revenue')} placeHolder={t('Revenue')} />

                            <View
                                style={[centralStyle.my1]}>
                                <Title
                                    color={Colors.black}
                                    type='Poppin-18'
                                    weight='600'
                                    title={t('Attachment')} />
                            </View>

                            <View style={[styles.selectedAttachmentContainer, centralStyle.XAndYCenter, centralStyle.mb2]}>
                                <View
                                    style={[centralStyle.height100, centralStyle.width100]}>
                                    <Image
                                        resizeMode='contain'
                                        source={require('../../../../assets/app-images/pdfIcon.png')}
                                        style={[centralStyle.height100, centralStyle.width100]}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView >
                </SafeAreaView >
            </KeyboardAvoidingView >
        </>

    );
};

export default ViewCompany;
