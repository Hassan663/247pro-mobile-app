// @app
import React, {
    useState,
    useRef
} from 'react';
import {
    View,
    FlatList,
    Image,
    Text,
    ScrollView,
    SafeAreaView
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';

import AppHeader from '../../../core/components/app-headers';
import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import { styles } from './job-detail.style';
import { Title } from '../../../core/components/screen-title.component';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { centralStyle } from '../../../styles/constant.style';
import { Attachments } from './component';
import {
    ATTACHMENTSDATA,
    JOBINFODATA
} from './data';

const JobDetail: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const [isInfoOpened, setIsInfoOpened] = useState(false)
    const refRBSheet = useRef<any>(null);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <AppHeader
                    iconL1={
                        <AntDesign
                            style={styles.mx2}
                            name={`left`} size={RFPercentage(3)} />
                    }
                    iconR1={
                        <Entypo
                            style={styles.mx2}
                            name={`dots-three-vertical`} size={RFPercentage(3)} />
                    }
                    title={t(`Majorrennovationforasinglefamilyhome`).substring(0, 27) + ' ...'} />
                <View style={[centralStyle.row, centralStyle.alignitemCenter, styles.infoRow, { backgroundColor: Colors.lightGrey, }]}>
                    <Title
                        weight='500'
                        title={`Info`}
                        color={Colors.black}
                        type={`Poppin-18`} />
                    <AntDesign
                        name={isInfoOpened ? 'down' : `up`}
                        onPress={() => setIsInfoOpened(!isInfoOpened)}
                        color={Colors.black}
                        size={RFPercentage(2.5)} />
                </View >
                <View>

                    {isInfoOpened &&
                        <FlatList
                            data={JOBINFODATA}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.contentContainerStyle}
                            renderItem={({ item }) => {
                                return (
                                    <View style={[centralStyle.row, centralStyle.alignitemCenter, styles.infoRow]}>
                                        <Title
                                            weight='400'
                                            title={item?.name}
                                            color={Colors.fontColor}
                                            type={`Poppin-16`} />
                                        <Title
                                            weight='500'
                                            title={item?.value}
                                            color={Colors.black}
                                            type={`Poppin-16`} />
                                    </View >
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }
                </View>
                <View style={{ padding: RFPercentage(2) }}>
                    <Title
                        weight='400'
                        title={t(`JobDescription`)}
                        color={Colors.fontColor}
                        type={`Poppin-16`} />
                    <View style={styles.description}>
                        <Title
                            weight='400'
                            title={t(`JobDescriptionMsg`).substring(0, 200) + ' ...'}
                            color={Colors.black}
                            type={`Poppin-16`} />
                    </View>
                    <Title
                        weight='500'
                        title={t(`Attachments`)}
                        color={Colors.black}
                        type={`Poppin-18`} />


                    <FlatList
                        data={ATTACHMENTSDATA}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.attachmentContainer}
                        renderItem={({ item }) => <Attachments item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={styles.btnContainer}>
                        <Button
                            callBack={() => refRBSheet.current.open()}
                            title={t('ACCEPTTOBID')}
                            primary />
                    </View>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={330}
                        openDuration={200}
                        closeDuration={200}
                        animationType={'slide'}
                        closeOnPressMask={true}
                        customStyles={{
                            container: styles.sheetContainer,
                            draggableIcon: styles.sheetDraggableIcon
                        }}
                    >
                        <View style={styles.sheetContentContainer}>
                            <Image source={require('../../../assets/app-images/bidImage.png')} />
                            <Text style={styles.bidMsg}>
                                {t(`Congratulationsandgoodluckonyourbidding`)}
                            </Text>
                            <View style={[centralStyle.row, styles.bidBtnWrapper]}>
                                <View style={styles.btnContainer2}>
                                    <Button
                                        callBack={() => refRBSheet.current.open()}
                                        title={t('Createbidlater')}
                                        titleStyle={styles.createBidLater}
                                        customStyle={[styles.createBidLaterCustomStyle, centralStyle.XAndYCenter]}
                                    />
                                </View>
                                <View style={styles.btnContainer2}>
                                    <Button
                                        callBack={() => refRBSheet.current.open()}
                                        title={t('ACCEPTTOBID')}
                                        primary
                                    />
                                </View>
                            </View>
                        </View>
                    </RBSheet>
                </View>

            </ScrollView>
        </SafeAreaView >
    );
};

export default JobDetail;
