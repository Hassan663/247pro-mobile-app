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
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import AppHeader from '../../../../core/components/app-headers';
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
    EmailContainer,
    LeftIcon,
    RightIcon,
    SpecialityTags,
    ViewContainer,
} from './view-contact-component';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import OutlinedTextInputComponent from '../../../../core/components/outlined-textInput.component';

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
                        {contactDetails?.contactPhones?.length > 0 ?
                            contactDetails?.contactPhones?.map((item: { phone: string }, index: number) =>
                                <ViewContainer key={index.toString()} title={'MobilePhone'} content={item.phone} />) : <></>}


                        {contactDetails?.contactEmails?.length > 0 ?
                            <View style={contactDetails?.contactEmails?.length > 1 && styles.viewContainer}>
                                {contactDetails.contactEmails.map((item: { email: string }, index: number) =>
                                    <EmailContainer
                                        key={index.toString()}
                                        item={item}
                                        index={index}
                                        data={contactDetails.contactEmails} />)}
                            </View>
                            : <></>}

                        {contactDetails?.preferredAddress ? <View style={styles.customInputContainer}>
                            <ViewContainer title={'Address'} content={contactDetails?.preferredAddress} />
                        </View> : <></>}
                        {contactDetails?.companyName ?
                            <ViewContainer title={'company'} content={contactDetails?.companyName} />
                            : <></>}
                        {contactDetails?.contactSpecialities?.length > 0 ?
                            <View style={[styles.viewContainer]}>
                                <Text style={{ fontSize: 12, color: Colors.gray }}>{t('Speciality')}</Text>
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
                            : <></>}

                        {contactDetails?.jobTitle ? <ViewContainer title={'jobTitle'} content={contactDetails.jobTitle} /> : <></>}
                        {contactDetails?.contactOthers?.length > 0 ? <FlatList
                            data={contactDetails.contactOthers}
                            renderItem={({ item, index }) => {
                                if (item.contactOtherTypeId === 2) {
                                    return <ViewContainer key={index.toString()} title={'Websiteurl'} content={item.value} />
                                } else { return <></> }
                            }}
                        /> : <></>}
                        {contactDetails?.contactAddresses?.stateText ? <ViewContainer title={'State'} content={contactDetails.contactAddresses.stateText} />
                            : <></>}
                        {contactDetails?.contactAddresses?.zipCode ? <ViewContainer title={'ZipCode'} content={contactDetails.contactAddresses.zipCode} />
                            : <></>}

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
                                < View>
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
