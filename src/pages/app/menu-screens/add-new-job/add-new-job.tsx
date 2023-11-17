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
import { styles } from './add-new-job.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { DropDownBtn, ServiceAddModal } from './add-new-job-component';

const AddNewJob: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [specialtyEnabled, setspecialityEnabled] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [industryValue, setindustryValue] = useState(t('Construction'));
    const [specialityValue, setspecialityValue] = useState(t('Selectspecialtyrequired'));

    let serviceName = route?.params?.serviceName

    const showModal = (status?: boolean) => {
        setModalVisible(true);
        setspecialityEnabled(status ? status : false)
    };

    const hideModal = () => { setModalVisible(false); };
    const obj = {
        industryValue,
        specialityValue,
        serviceName
    }
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
                        <View style={centralStyle.my1}>
                            <OutlinedTextInput val={serviceName} editable={false} title={t('Servicename')} placeHolder={t('Servicename')} />
                        </View>
                        <View style={centralStyle.my1}>
                            <DropDownBtn callBack={() => showModal()} title={t(`industry`)} value={industryValue} navigation={navigation} />
                        </View>
                        <View style={centralStyle.my1}>
                            <DropDownBtn callBack={() => showModal(true)} title={t(`Specialty`)} value={specialityValue} navigation={navigation} />
                        </View>
                        <View style={[styles.btnContainer, centralStyle.row, centralStyle.my10]}>
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
                                    callBack={() => changeRoute(navigation, 'PostAJob', { serviceDetail: obj })}
                                    primary
                                />
                            </View>
                        </View>
                    </View>
                    <ServiceAddModal
                        callBack={(val: string) => specialtyEnabled ? setspecialityValue(val) : setindustryValue(val)}
                        title={specialtyEnabled ? t(`AddNewSpecialty`) : t(`AddNewIndustry`)}
                        inputValue={specialtyEnabled ? specialityValue : industryValue}
                        inputTitle={specialtyEnabled ? t(`Enteranewspecialty`) : t('Enteranewindustry')}
                        isVisible={modalVisible}
                        onClose={hideModal} />

                </KeyboardAwareScrollView>
            </SafeAreaView >

        </>
    );
};

export default AddNewJob;
