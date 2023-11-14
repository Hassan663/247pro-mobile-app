// @app
import React, {
    useState
} from 'react';
import {
    Image,
    ScrollView,
    FlatList,
    View,
    SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { t } from 'i18next';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import AppHeader from '../../../../core/components/app-headers';
import { Row } from './bidder-detail-component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './bidder-detail.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { DropDownModal } from '../../../../core/components/drop-down-modal';
import { INFORMATIONDATA } from './data';

const BidderDetail: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const [modalEnabled, setmodalEnabled] = useState(false)
    const [openInfo, setopenInfo] = useState(true)

    const backIcon = <AntDesign onPress={() => changeRoute(navigation, 'pop')} style={centralStyle.mx2} name={'left'} color={Colors.black} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
    const downIcon = <AntDesign onPress={() => { setopenInfo(!openInfo) }} name={openInfo ? 'down' : "up"} color={Colors.black} size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={[centralStyle.flex1,]}>
                    <AppHeader
                        iconL1={backIcon}
                        weight='700'
                        type='Poppin-16'
                        title={t('BidderLee')} />

                    {modalEnabled && <DropDownModal
                        DATA={[t('View'), t(`Hire`), t(`Reject`)]}
                        navigation={navigation}
                        editCallback={() => { changeRoute(navigation, 'EditJob') }}
                        viewCallback={() => { changeRoute(navigation, 'ViewJob') }}
                        disableModal={() => setmodalEnabled(!modalEnabled)} />}

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
                                            renderItem={({ item }) => (
                                                <View style={[styles.listContainer, centralStyle.row, {}, centralStyle.alignitemCenter]}>
                                                    <View style={[{ flex: 2, }, centralStyle.XAndYCenter]}>
                                                        <Image style={{ height: RFPercentage(6), width: RFPercentage(6) }} source={require('../../../../assets/app-images/userImg2.png')} />
                                                    </View>
                                                    <View style={[{ flex: 8 },]}>
                                                        <View style={[centralStyle.row, centralStyle.alignitemCenter, centralStyle.justifyContentBetween]}>
                                                            <View style={{ flex: 8.5, paddingVertical: RFPercentage(1), flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-between" }} >
                                                                {[`Remodel`, 'New', 'New', 'New'].map((item) => <View style={{ padding: RFPercentage(.5), paddingHorizontal: RFPercentage(1), marginTop: RFPercentage(1), backgroundColor: Colors.lightGrey, borderRadius: RFPercentage(1.5), }}>
                                                                    <Title
                                                                        title={item}
                                                                        type='Poppin-11'
                                                                        weight='400'
                                                                        color={Colors.fontColor}
                                                                    />
                                                                </View>)}

                                                            </View>
                                                            <View style={[{ flex: 1.5, }, centralStyle.alignitemCenter]}>
                                                                <AntDesign name={'down'} color={Colors.black} size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />
                                                            </View>
                                                        </View>
                                                        <Title
                                                            title={`I likea whole house renovation (less than 10% people give description on image...`}
                                                            type='Poppin-12'
                                                            weight='400'
                                                            color={Colors.fontColor}
                                                        />
                                                    </View>
                                                </View>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                </View>

                                <View style={[styles.btnContainer, centralStyle.row]}>
                                    <View style={[centralStyle.flex1, centralStyle.mx1]}>
                                        <Button
                                            title={t(`Reject`)}
                                            titleStyle={styles.titleStyle}
                                            customStyle={[styles.rejectContainer, centralStyle.XAndYCenter]}
                                        />
                                    </View>
                                    <View style={[centralStyle.flex1, centralStyle.mx1]}>
                                        <Button
                                            title={t(`Hire`)}
                                            primary
                                        />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default BidderDetail;
