// @app
import React, {
    useRef,
    useState
} from 'react';
import {
    Image,
    ScrollView,
    FlatList,
    View,
    SafeAreaView,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { t } from 'i18next';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import AppHeader from '../../../../core/components/app-headers';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './bidder-detail.style';
import { platform } from '../../../../utilities';
import { openSheet } from '../../../../store/action/action';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    BidderUI,
    HireInputSheet,
    Row
} from './bidder-detail-component';
import {
    INFORMATIONDATA,
} from './data';

const BidderDetail: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const [openInfo, setopenInfo] = useState(true)
    const [fullImg, setfullImg] = useState<any>('')
    const [hireEnabled, sethireEnabled] = useState<boolean>(false)
    const sheetRef = useRef<any>(null)

    const backIcon = <AntDesign onPress={() => changeRoute(navigation, 'pop')} style={centralStyle.mx2} name={'left'} color={Colors.black} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
    const crossIcon = <AntDesign onPress={() => setfullImg('')} style={centralStyle.m2} name={'close'} color={Colors.white} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
    const downIcon = <AntDesign onPress={() => { setopenInfo(!openInfo) }} name={openInfo ? 'down' : "up"} color={Colors.black} size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={[centralStyle.flex1,]}>
                    <AppHeader
                        iconL1={fullImg.length == 0 && backIcon}
                        weight='700'
                        type='Poppin-16'
                        title={t('BidderLee')} />

                    {fullImg > 0 ?
                        <View style={styles.fullImageContainer}>
                            {crossIcon}
                            <View style={[styles.fullSizeImageWrapper, centralStyle.XAndYCenter]}>
                                <Image resizeMode='contain' source={fullImg} style={styles.fullSizeImage} />
                            </View>
                        </View>
                        :
                        <>
                            <View style={[styles.jobInfoHeader, centralStyle.px2, centralStyle.row, centralStyle.alignitemCenter, centralStyle.justifyContentBetween]}>
                                <Title
                                    title={t(`JobInfo`)}
                                    type='Poppin-16'
                                    weight='600'
                                    color={Colors.black}
                                />
                                {downIcon}
                            </View>
                            <View style={centralStyle.container}>

                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View style={{ flex: 1 }}>
                                        {openInfo ?
                                            <>
                                                <FlatList
                                                    data={INFORMATIONDATA}
                                                    contentContainerStyle={centralStyle.mt1}
                                                    showsVerticalScrollIndicator={false}
                                                    renderItem={({ item }) => (<Row {...item} />)}
                                                    keyExtractor={(item, index) => index.toString()}
                                                />
                                                <View style={[centralStyle.mt2, centralStyle.my1]}>
                                                    <Title
                                                        title={t('Biddescription') + `: `}
                                                        type='Poppin-14'
                                                        weight='400'
                                                        color={Colors.gray}
                                                    />
                                                </View>
                                                <Title
                                                    title={t(`viewJobDescription`)}
                                                    type='Poppin-14'
                                                    weight='400'
                                                    color={Colors.black}
                                                />
                                                <View style={centralStyle.my1}>
                                                    <Title
                                                        title={t(`Attachments`)}
                                                        type='Poppin-14'
                                                        weight='600'
                                                        color={Colors.black}
                                                    />
                                                </View>
                                            </>
                                            : <></>
                                        }

                                        <View style={centralStyle.flex1}>
                                            <View style={{ maxHeight: !openInfo ? platform == 'ios' ? RFPercentage(70) : RFPercentage(75) : undefined }}>
                                                <FlatList
                                                    data={[0, 0, 0, 0, 0, 0, 0]}
                                                    showsVerticalScrollIndicator={false}
                                                    renderItem={({ item }) => BidderUI(setfullImg)}
                                                    keyExtractor={(item, index) => index.toString()}
                                                />
                                            </View>
                                        </View>

                                        <View style={[styles.btnContainer, centralStyle.row]}>
                                            <View style={[centralStyle.flex1, centralStyle.mx1]}>
                                                <Button
                                                    callBack={() => {
                                                        sethireEnabled(true)
                                                        openSheet(sheetRef)
                                                    }}
                                                    title={t(`Reject`)}
                                                    titleStyle={styles.titleStyle}
                                                    customStyle={[styles.rejectContainer, centralStyle.XAndYCenter]}
                                                />
                                            </View>
                                            <View style={[centralStyle.flex1, centralStyle.mx1]}>
                                                <Button
                                                    callBack={() => {
                                                        sethireEnabled(false)
                                                        openSheet(sheetRef)
                                                    }}
                                                    title={t(`Hire`)}
                                                    primary
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <RBSheet
                                        ref={sheetRef}
                                        height={RFPercentage(35)}
                                        closeOnPressMask={true}
                                        closeOnDragDown={true}
                                        openDuration={250}
                                        animationType={`slide`}
                                        customStyles={{
                                            container: { borderRadius: RFPercentage(2) },
                                            draggableIcon: styles.draggableIconstyle
                                        }}
                                    >
                                        <HireInputSheet
                                            contactInfoInputs={[]}
                                            setcontactInfoInputs={[]}
                                            sheetRef={sheetRef}
                                            placeHolder={t(`deleteEntermessageOptional`)}
                                            title={!hireEnabled ? t('Hire') : t('Reject')}
                                            btnText={t(`Submit`)}
                                        />
                                    </RBSheet>
                                </ScrollView>
                            </View>
                        </>
                    }


                </View>
            </SafeAreaView>
        </>
    );
};

export default BidderDetail;
