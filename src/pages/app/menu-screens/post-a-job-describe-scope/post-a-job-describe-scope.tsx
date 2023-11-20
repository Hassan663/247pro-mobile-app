// @app
import React, { useState } from 'react';
import {
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Text
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { t } from 'i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import AppHeader from '../../../../core/components/app-headers';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import { step } from './post-a-job-describe-scope-component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './post-a-job-describe-scope.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { RADIOBTNDATA } from '../company-profile-screens/edit-company-profile/data';
import { centralStyle } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { AMOUTDATA, DATEDATA } from './data';
import { handleBlur, handleFocus } from '../../biz-card-screens/edit-biz-card/call-back';

const PostAJobDescribeScope: React.FC<{ navigation: any, }> = ({ navigation, }) => {
    const [isActive, setIsActive] = useState(false);
    const [about, setAbout] = useState('')
    const [selectedIndustry, setselectedIndustry] = useState<string>('');
    const [isCheck, setIsCheck] = useState(false)

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={[centralStyle.flex1,]}>
                        <AppHeader
                            iconL1={
                                <AntDesign
                                    name={`left`}
                                    onPress={() => changeRoute(navigation, 'pop')}
                                    color={Colors.black}
                                    style={centralStyle.mx2}
                                    size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />}
                            title={t(`PostaJob`)} />

                        <View style={[centralStyle.container, { backgroundColor: Colors.white }]}>
                            <View style={[styles.stepWrapper, centralStyle.alignitemCenter, centralStyle.row]}>
                                {step(`1`, true, true)}
                                <View style={styles.horizontalLine}></View>
                                {step(`2`, true)}
                                <View style={centralStyle.mx05}>
                                    <Title
                                        title={t(`DescribeScope`)}
                                        type='Poppin-11'
                                        color={Colors.fontColor}
                                        weight='500' />
                                </View>
                                <View style={styles.horizontalLine}></View>
                                {step(`3`, false)}
                            </View>
                            <View style={[
                                centralStyle.row,
                                centralStyle.my1,
                                centralStyle.alignitemCenter]}>
                                <Text style={{ fontSize: platform == 'ios' ? RFPercentage(1.9) : RFPercentage(2.4), }}>
                                    {t(`FindlocalprosandgetbidsforKitchenremodelforasinglefamilyhome`) + "  "}
                                    <MaterialCommunityIcons
                                        name={`attachment`}
                                        color={Colors.black}
                                        size={platform == 'ios' ? RFPercentage(1.9) : RFPercentage(2.4)} />
                                </Text>
                            </View>
                            <View style={styles.inputContainer(60)}>
                                {
                                    about?.length && about?.length > 0 ?
                                        <Text style={styles.inputtitle(isActive)}>{t(`Description`)}</Text>
                                        : isActive &&
                                        <Text style={styles.inputtitle(isActive)}>{t(`Description`)}</Text>
                                }
                                <View style={styles.textInputContainer(isActive)}>
                                    <TextInput
                                        placeholder={isActive ? '' : t('Enterjobdescription')}
                                        value={about}
                                        onFocus={() => handleFocus(setIsActive)}
                                        multiline={true}
                                        onBlur={() => handleBlur(setIsActive)}
                                        onChangeText={(val) => setAbout(val)}
                                        style={styles.input(false, isActive)} />
                                </View>
                            </View>
                            <OutlinedDropDown
                                dropDownStyle={styles.dropdownstyle}
                                title={t('JobType')}
                                defaultValueByIndex={1}
                                color={Colors.lightGray}
                                iconsSize={RFPercentage(2)}
                                onselect={(value: string) => { setselectedIndustry(value) }}
                                DATA={RADIOBTNDATA}
                                drop_down_button_style={[styles.dropDownStyle,]}
                            />
                            <OutlinedDropDown
                                dropDownStyle={styles.dropdownstyle}
                                title={t('Completiondate')}
                                defaultValueByIndex={1}
                                color={Colors.lightGray}
                                iconsSize={RFPercentage(2)}
                                onselect={(value: string) => { setselectedIndustry(value) }}
                                DATA={DATEDATA}
                                drop_down_button_style={[styles.dropDownStyle,]}
                            />
                            <View style={centralStyle.my1}>
                                <Title
                                    title={t(`Budget`)}
                                    type='Poppin-14'
                                    color={Colors.black}
                                    weight='600' />
                                <View style={[
                                    centralStyle.justifyContentBetween,
                                    centralStyle.my1,
                                    centralStyle.row]}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => setIsCheck(false)}
                                        style={[centralStyle.row, styles.radioWrapper,]}>
                                        <Fontisto
                                            name={isCheck ? `radio-btn-passive` : `radio-btn-active`}
                                            style={centralStyle.mx1}
                                            color={!isCheck ? Colors.primary : Colors.fontColor}
                                            size={RFPercentage(2.5)}
                                        />
                                        <Title
                                            color={Colors.fontColor}
                                            weight='500'
                                            title={t(`HourlyRate`)}
                                            type={`Poppin-14`} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => setIsCheck(true)}
                                        style={[centralStyle.row, styles.radioWrapper,]}>
                                        <Fontisto
                                            name={!isCheck ? `radio-btn-passive` : `radio-btn-active`}
                                            color={isCheck ? Colors.primary : Colors.fontColor}
                                            style={centralStyle.mx1}
                                            size={RFPercentage(2.5)}
                                        />
                                        <Title
                                            color={Colors.fontColor}
                                            weight='500'
                                            title={t(`FixedBudget`)}
                                            type={`Poppin-14`} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <OutlinedDropDown
                                dropDownStyle={styles.dropdownstyle}
                                title={t('Amount')}
                                defaultValueByIndex={1}
                                color={Colors.lightGray}
                                iconsSize={RFPercentage(2)}
                                onselect={(value: string) => { setselectedIndustry(value) }}
                                DATA={AMOUTDATA}
                                drop_down_button_style={[styles.dropDownStyle,]}
                            />
                            <View style={centralStyle.my2}>
                                <Title
                                    title={t(`Attachmentsoptional`)}
                                    type='Poppin-14'
                                    color={Colors.black}
                                    weight='600' />
                                <Title
                                    title={t(`Pdfwordexceljpgandpngimagefilesallowedmax50MB`)}
                                    type='Poppin-11'
                                    color={Colors.fontColor}
                                    weight='400' />
                            </View>
                            <View style={[centralStyle.row, styles.browsContainer, centralStyle.p1p5, centralStyle.width80]}>
                                <Title
                                    title={t(`Browse`) + " "}
                                    type='Poppin-12'
                                    color={Colors.blue}
                                    weight='400' />
                                <Title
                                    title={t(`fromdevice`)}
                                    type='Poppin-12'
                                    color={Colors.fontColor}
                                    weight='400' />
                            </View>
                            <View style={[centralStyle.my2, centralStyle.mt10]}>
                                <Button
                                    callBack={() => changeRoute(navigation, 'PostAJobMatchPro')}
                                    title={t('Continue')}
                                    primary />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </>
    );
};

export default PostAJobDescribeScope;
