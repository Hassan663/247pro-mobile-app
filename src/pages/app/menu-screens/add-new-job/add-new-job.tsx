// @app
import React, { useState } from 'react';
import {
    View,
    Image,
    SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { t } from 'i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import AppHeader from '../../../../core/components/app-headers';
import OutlinedTextInput from '../../../../core/components/outlined-textInput.component';
import OutlinedDropDown from '../../../../core/components/outlined-dropdown.component';
import { styles } from './add-new-jobstyle';
import { platform } from '../../../../utilities';
import { INDUSTRIES } from '../../../auth/buisness-questions/data';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';

const AddNewJob: React.FC<{ navigation: any, route: any }> = ({ navigation, }) => {
    const [selectedIndustry, setselectedIndustry] = useState<string>('');
    const [primarySpecialty, setprimarySpecialty] = useState<string>('');

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <AppHeader
                        iconL1={
                            <AntDesign
                                name={`left`}
                                onPress={() => changeRoute(navigation, 'pop')}
                                color={Colors.black}
                                style={centralStyle.mx2}
                                size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />}
                        title={t(`DefineANewService`)} />

                    <View style={centralStyle.container}>
                        <Image
                            resizeMode='contain'
                            style={[styles.iconStyle, centralStyle.my3]}
                            source={require('../../../../assets/app-images/addNewJobIcon.png')} />
                        <OutlinedTextInput val='ABCDE' title={t('Service name')} placeHolder={t('Service name')} />

                        <OutlinedDropDown
                            title={t('Industry')}
                            onselect={(value: string) => { setselectedIndustry(value) }}
                            defaultValueByIndex={2}
                            DATA={INDUSTRIES}
                            drop_down_button_style={styles.drop_down_button_style}
                        />
                        <OutlinedDropDown
                            title={t('Specialty')}
                            defaultValueByIndex={1}
                            onselect={(value: string) => { setprimarySpecialty(value) }}
                            DATA={INDUSTRIES}
                            drop_down_button_style={styles.drop_down_button_style}
                        />

                        <View style={[styles.btnContainer, centralStyle.row, centralStyle.mt10]}>
                            <View style={[centralStyle.flex1, centralStyle.mx1]}>
                                <Button
                                    title={t(`Cancel`)}
                                    titleStyle={styles.titleStyle}
                                    customStyle={[styles.rejectContainer, centralStyle.XAndYCenter]}
                                />
                            </View>
                            <View style={[centralStyle.flex1, centralStyle.mx1]}>
                                <Button
                                    title={t(`Add`)}
                                    primary
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        </>
    );
};

export default AddNewJob;
