// @app
import React, {
    useState
} from 'react';
import {
    TextInput,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { t } from 'i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './edit-job.style';
import { pickImage } from '../../contact-screens/new-contact/call-back';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { centralStyle } from '../../../../styles/constant.style';
import {
    handleBlur,
    handleFocus
} from '../../contact-screens/new-company/call-back';

const EditJob: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [about, setAbout] = useState('Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years')
    const [isCheck, setIsCheck] = useState(false)
    const [isActive, setIsActive] = useState(false);
    const [imageUriLocal, setimageUriLocal] = useState('');

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={[centralStyle.flex1,]}>
                        <AppHeader
                            iconL1={
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => changeRoute(navigation, 'pop')}
                                    style={centralStyle.ml2}>
                                    <Title
                                        title={t(`Cancel`)}
                                        type='Poppin-14'
                                        color={Colors.primary}
                                        weight='600' />
                                </TouchableOpacity>}
                            iconR1={
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => changeRoute(navigation, 'EditJobContactInfo')}
                                    style={centralStyle.mx2}>
                                    <Title
                                        title={t(`Next`)}
                                        type='Poppin-14'
                                        color={Colors.primary}
                                        weight='600' />
                                </TouchableOpacity>
                            }
                            weight='700'
                            type='Poppin-18'
                            title={t('EditJob')} />
                        <View style={centralStyle.container}>
                            <View style={[styles.tabContainer, centralStyle.my3]}>
                                <View style={styles.tabStyle(Colors.primary)}></View>
                                <View style={styles.tabStyle(Colors.lightGrey)}></View>
                            </View>

                            <Title
                                title={t(`FindlocalprosandgetbidsforKitchenRemodelforsinglefamilyhome`)}
                                type='Poppin-16'
                                color={Colors.fontColor}
                                weight='500' />
                            <View style={[styles.inputContainer(60), {}]}>
                                {
                                    about?.length && about?.length > 0 ?
                                        <Text style={styles.inputtitle(isActive)}>{t(`Description`)}</Text>
                                        : isActive &&
                                        <Text style={styles.inputtitle(isActive)}>{t(`Description`)}</Text>
                                }
                                <View style={styles.textInputContainer(isActive, about)}>
                                    <TextInput
                                        placeholder={isActive ? '' : t('Description')}
                                        value={about}
                                        onFocus={() => handleFocus(setIsActive)}
                                        multiline={true}
                                        onBlur={() => handleBlur(setIsActive)}
                                        onChangeText={(val) => setAbout(val)}
                                        style={[styles.input(false, isActive), {}]} />
                                </View>
                            </View>
                            <View style={centralStyle.my3}>
                                <OutlinedTextInput val='May 22, 2023' title={t('Duedate')} placeHolder={t('Duedate')} />
                            </View>
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
                            <OutlinedTextInput val='$42,334.00' title={t('Amount')} placeHolder={t('Amount')} />
                            <Title
                                title={t(`Attachmentsoptional`)}
                                type='Poppin-14'
                                color={Colors.black}
                                weight='600' />

                            <TouchableOpacity
                                onPress={() => { pickImage(setimageUriLocal) }}
                                style={[styles.takeImageContainer, centralStyle.my1]}>
                                <SimpleLineIcons name={'picture'} color={Colors.gray} size={RFPercentage(4)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        </>
    );
};

export default EditJob;
