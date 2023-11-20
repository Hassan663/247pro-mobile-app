// @app
import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    TextInput,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { t } from 'i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../../styles/colors';
import AppHeader from '../../../../core/components/app-headers';
import { step } from './post-a-job-component';
import { Title } from '../../../../core/components/screen-title.component';
import { search } from './call-back';
import { styles } from './post-a-job.style';
import { JOBTITLE } from './data';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';

const PostAJob: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [searchVal, setSearchVal] = useState('')
    const [jobTitleData, setjobTitleData] = useState(JOBTITLE)

    const handleOnChangeText = (text: string) => {
        setSearchVal(text)
        search(text, jobTitleData, setjobTitleData, JOBTITLE)
    }
    useEffect(() => {
        if (route?.params?.serviceDetail) {
            JOBTITLE.push({ isEditable: true, name: route?.params?.serviceDetail?.serviceName },)
            setjobTitleData(jobTitleData)
        }
    }, [route?.params?.serviceDetail])

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
                                {step(`1`, true)}
                                <View style={centralStyle.mx05}>
                                    <Title
                                        title={t(`SelectaService`)}
                                        type='Poppin-11'
                                        color={Colors.fontColor}
                                        weight='500' />
                                </View>
                                <View style={styles.horizontalLine}></View>
                                {step(`2`, false)}
                                <View style={styles.horizontalLine}></View>
                                {step(`3`, false)}
                            </View>
                            <View style={[
                                centralStyle.row,
                                centralStyle.my1,
                                centralStyle.alignitemCenter]}>
                                <Title
                                    title={t(`Findlocalprosandgetbids`)}
                                    type='Poppin-16'
                                    color={Colors.black}
                                    weight='500' />
                                <MaterialCommunityIcons
                                    style={centralStyle.mx1}
                                    name={`attachment`}
                                    color={Colors.black}
                                    size={RFPercentage(3)} />
                            </View>
                            <Title
                                title={t(`Selectaservicetostart`)}
                                type='Poppin-14'
                                color={Colors.fontColor}
                                weight='500' />
                            <View style={[
                                styles.inputContainer,
                                centralStyle.px2,
                                centralStyle.my2,
                                centralStyle.row,
                                centralStyle.XAndYCenter
                            ]}>
                                <AntDesign size={RFPercentage(3)} name='search1' color={Colors.fontColor} />
                                <TextInput
                                    style={[centralStyle.flex1, centralStyle.mx1,]}
                                    value={searchVal}
                                    onChangeText={handleOnChangeText}
                                    placeholder={t('Search')}
                                />
                                {searchVal.length > 0 && <AntDesign
                                    onPress={() => {
                                        setjobTitleData(JOBTITLE)
                                        setSearchVal('')
                                    }}
                                    size={RFPercentage(3)}
                                    name='close'
                                    color={Colors.fontColor} />}
                            </View>
                            {jobTitleData.length == 0 ?
                                <>
                                    <Title
                                        title={t(`Norecordfound`)}
                                        type='Poppin-14'
                                        color={Colors.black}
                                        weight='600' />
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => changeRoute(navigation, 'AddNewJob', { serviceName: searchVal })}>
                                        <Title
                                            title={`+ CREATE “${searchVal}” AS NEW SERVICE`}
                                            type='Poppin-14'
                                            color={Colors.primary}
                                            weight='600' />
                                    </TouchableOpacity>
                                </>
                                :
                                <FlatList
                                    data={jobTitleData}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => { changeRoute(navigation, 'PostAJobDescribeScope') }}
                                            style={[centralStyle.my1, centralStyle.row, centralStyle.justifyContentBetween, centralStyle.alignitemCenter,]}>
                                            <Title
                                                title={item.name}
                                                type='Poppin-16'
                                                color={Colors.black}
                                                weight='500' />
                                            {item.isEditable &&
                                                <AntDesign
                                                    size={RFPercentage(3)}
                                                    name='edit'
                                                    color={Colors.fontColor} />
                                            }
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            }
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>

        </>
    );
};

export default PostAJob;
