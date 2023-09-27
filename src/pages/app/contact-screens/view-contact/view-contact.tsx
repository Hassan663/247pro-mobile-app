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
import OutlinedTextInput from '../../../../core/components/Outlined-TextInput.component';
import { styles } from './view-contact.style';
import { Title } from '../../../../core/components/screen-title.component';
import { centralStyle, } from '../../../../styles/constant.style';
import {
    handleBlur,
    handleFocus
} from '../../biz-card-screens/edit-biz-card/call-back';
import {
    LeftIcon,
    RightIcon,
} from './view-contact-component';

const ViewContact: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [openPicker, setOpenPicker] = useState(false);
    const [imageUriLocal, setimageUriLocal] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [about, setAbout] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ')

    return (
        <>

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
                            title={t('George Lee')} />
                        <Title
                            color={Colors.fontColor}
                            type='Poppin-12'
                            weight='400'
                            title={t('Client')} />
                    </View>

                    <View style={styles.mx2}>
                        <OutlinedTextInput editable={false} val='+1-5436748758' title={t('MobilePhone')} placeHolder={t('MobilePhone')} />
                        <OutlinedTextInput editable={false} val='abc123@gmail.com' title={t('Emailaddress')} placeHolder={t('Emailaddress')} />
                        <OutlinedTextInput editable={false} val='abc123@gmail.com' title={t('Emailaddress')} placeHolder={t('Emailaddress')} />
                        <OutlinedTextInput editable={false} val='2715 Ash Dr. San Jose, South Dakota 83475' title={t('Address')} placeHolder={t('Address')} />
                        <OutlinedTextInput editable={false} val='247 pro' title={t('company')} placeHolder={t('company')} />
                        <OutlinedTextInput editable={false} val='Business' title={t('Industry')} placeHolder={t('Industry')} />
                        <OutlinedTextInput editable={false} val='Marketing' title={t('Speciality')} placeHolder={t('Speciality')} />
                        <OutlinedTextInput editable={false} val='Contractor' title={t('jobTitle')} placeHolder={t('jobTitle')} />
                        <OutlinedTextInput editable={false} val='htttps://www.247pro.com' title={t('Websiteurl')} placeHolder={t('Websiteurl')} />
                        <OutlinedTextInput editable={false} val='New York' title={t('State')} placeHolder={t('State')} />
                        <OutlinedTextInput editable={false} val='123456' title={t('ZipCode')} placeHolder={t('ZipCode')} />

                        <View style={[centralStyle.my1]}>
                            <Title
                                color={Colors.black}
                                type='Poppin-18'
                                weight='600'
                                title={t('Link to company')} />
                        </View>
                        <View style={[]}>
                            <Title
                                color={Colors.fontColor}
                                type='Poppin-16'
                                weight='400'
                                title={t('No company linked')} />
                        </View>
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
        </>

    );
};

export default ViewContact;
