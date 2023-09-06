// @app
import React, {
    useState,
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

const EditBizCard: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [about, setAbout] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [streetAddress, setStreetAddress] = useState('')



    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isActive, setIsActive] = useState(false);

    const handleFocus = () => setIsActive(true)

    const handleBlur = () => setIsActive(false)
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
                    {CONTACTINFOINPUTS.map((item, index) => {
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
                    title={t('AddSocialAccount')}
                    titleStyle={styles.addCustomFieldTitle} />
            </ScrollView>

        </SafeAreaView >

    );
};

export default EditBizCard;
