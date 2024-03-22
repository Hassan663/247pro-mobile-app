// @app
import React, {
    Dispatch,
    useEffect,
    useState,
} from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    Text,
    TextInput,
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import AppHeader from '../../../../core/components/app-headers';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import { Img } from '../../../../core/components/image-component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './view-contact.style';
import { centralStyle } from '../../../../styles/constant.style';
import { SCREENLOADER } from '../../../../store/constant/constant';
import {
    deleteContact,
    fetchingDetails
} from './call-back';
import {
    LeftIcon,
    RightIcon,
    SpecialityTags,
} from './view-contact-component';
import {
    useDispatch,
    useSelector
} from 'react-redux';

const ViewContact: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [companyLinked, setcompanyLinked] = useState(false)
    const [contactDetails, setContactDetails] = useState<any>([]);
    const dispatch: Dispatch<any> = useDispatch();
    const Loader = useSelector((state: any) => state.root.loader);
    const contact = useSelector((state: any) => state.root.contacts);

    const contactDetailing = async () => {
        const response = await fetchingDetails(route.params.item.id, dispatch)
        setContactDetails(response?.data?.resultData);
        dispatch({ type: SCREENLOADER, payload: false })
    }

    useEffect(() => {
        contactDetailing()
    }, [contact])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <AppHeader
                    iconL1={LeftIcon(navigation)}
                    iconR1={RightIcon(navigation, contactDetails)}
                    type='Poppin-18'
                    weight='600'
                    title={t(`Contacts`)} />
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    {contactDetails?.profilePicture?.length > 0 ?
                        <View
                            style={[centralStyle.circle(RFPercentage(16)), styles.imgContainer]}>
                            <Img
                                customStyle={styles.profileImage}
                                source={{ uri: contactDetails.profilePicture }} />
                        </View> :
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={[centralStyle.circle(RFPercentage(16)), styles.imgContainer]}>
                            <Title
                                color={Colors.black}
                                type='Poppin-61'
                                title={contactDetails?.fullName?.slice(0, 1)?.toUpperCase()} />
                        </TouchableOpacity>
                    }
                    <View style={[centralStyle.XAndYCenter, centralStyle.mb2]}>
                        <Title
                            color={Colors.black}
                            type='Poppin-24'
                            weight='600'
                            title={contactDetails?.fullName?.length > 16 ? contactDetails?.fullName?.slice(0, 16) + "..." : contactDetails?.fullName} />
                        <Title
                            color={Colors.fontColor}
                            type='Poppin-12'
                            weight='400'
                            title={contactDetails?.contactTypeName} />
                    </View>

                    <View style={styles.mx2}>

                        {contactDetails?.contactPhones?.length > 0 ? <FlatList
                            data={contactDetails.contactPhones}
                            renderItem={({ item, index }) => <OutlinedTextInput key={index.toString()} editable={false} val={item.phone} title={t('MobilePhone')} placeHolder={t('MobilePhone')} />}
                        /> : <></>}

                        {contactDetails?.contactEmails?.length > 0 ? <FlatList
                            data={contactDetails.contactEmails}
                            renderItem={({ item, index }) => (
                                <View key={index?.toString()} style={[centralStyle.row, centralStyle.alignitemCenter, { flex: 1 }]}>
                                    <View style={{ flex: 7 }}>
                                        <OutlinedTextInput
                                            key={index.toString()}
                                            editable={false}
                                            val={item.email}
                                            title={t('Emailaddress')}
                                            placeHolder={t('Emailaddress')} />

                                    </View>
                                    {item?.label?.length > 0
                                        &&
                                        <View style={[styles.labelWrapper]}>
                                            <OutlinedTextInput
                                                key={index.toString()}
                                                editable={false}
                                                val={item.label}
                                                title={t('label')}
                                                placeHolder={t('label')} />
                                        </View>
                                    }
                                </View>
                            )
                            }
                        /> : <></>}
                        {contactDetails?.preferredAddress ? <View style={styles.customInputContainer}>
                            <Text style={styles.inputtitle()}>{t(`Address`)}</Text>
                            <View style={styles.customTextInputContainer}>
                                <TextInput
                                    editable={false}
                                    placeholder={t('Address')}
                                    value={contactDetails?.preferredAddress}
                                    multiline={true}
                                />
                            </View>
                        </View> : <></>}
                        {contactDetails?.companyName ? <OutlinedTextInput editable={false} val={contactDetails.companyName} title={t('company')} placeHolder={t('company')} /> : <></>}
                        {contactDetails?.contactSpecialities?.length > 0 ?
                            <View style={{
                                paddingVertical: 10,
                                justifyContent: "flex-end"
                            }}>
                                <Text style={styles.inputtitle()}>Speciality</Text>
                                <View style={styles.specialityTextInputContainer}>
                                    <FlatList
                                        data={contactDetails.contactSpecialities}
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={styles.flatListContainer}
                                        renderItem={({ item, index }) => <SpecialityTags
                                            key={index.toString()}
                                            item={item}
                                            index={index}
                                        />}
                                    />

                                </View>
                            </View>
                            : <></>}

                        {contactDetails?.jobTitle ? <OutlinedTextInput editable={false} val={contactDetails.jobTitle} title={t('jobTitle')} placeHolder={t('jobTitle')} /> : <></>}
                        {contactDetails?.contactOthers?.length > 0 ? <FlatList
                            data={contactDetails.contactOthers}
                            renderItem={({ item, index }) => {
                                if (item.contactOtherTypeId === 2) {
                                    return <OutlinedTextInput key={index.toString()} editable={false} val={item.value} title={t('Websiteurl')} placeHolder={t('Websiteurl')} />
                                } else { return <></> }
                            }}
                        /> : <></>}
                        {contactDetails?.contactAddresses?.stateText ? <OutlinedTextInput editable={false} val={contactDetails.contactAddresses.stateText} title={t('State')} placeHolder={t('State')} /> : <></>}
                        {contactDetails?.contactAddresses?.zipCode ? <OutlinedTextInput editable={false} val={contactDetails.contactAddresses.zipCode} title={t('ZipCode')} placeHolder={t('ZipCode')} /> : <></>}

                        <View style={[centralStyle.my1]}>
                            <Title
                                color={Colors.black}
                                type='Poppin-18'
                                weight='600'
                                title={t('Linktocompany')} />
                        </View>
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={[centralStyle.row, centralStyle.my1, centralStyle.alignitemCenter]}>
                            {companyLinked ?
                                < View style={[]}>
                                    <Title
                                        color={Colors.fontColor}
                                        type='Poppin-16'
                                        weight='400'
                                        title={t('Nocompanylinked')} />
                                </View>
                                :
                                <>
                                    <View style={[centralStyle.circle(RFPercentage(4)), styles.selectCompany,]}>
                                        <Image style={styles.companyImg} source={require('../../../../assets/app-images/userImg.png')}></Image>
                                    </View>
                                    <Title
                                        color={Colors.fontColor}
                                        type='Poppin-16'
                                        weight='400'
                                        title={`Company 14`} />
                                </>}
                        </TouchableOpacity>
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
                        <Button
                            callBack={() => deleteContact(contactDetails.id, navigation, Loader, dispatch, route?.params?.contactCategory, contactDetails.contactTypeId)}
                            customStyle={[
                                centralStyle.my2,
                                centralStyle.XAndYCenter
                            ]}
                            title={t('DeleteContact')}
                            titleStyle={styles.deleteBtn}
                        />
                    </View>
                </ScrollView >
            </SafeAreaView >
        </>

    );
};

export default ViewContact;
