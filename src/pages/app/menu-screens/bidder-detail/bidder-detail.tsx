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

import Entypo from 'react-native-vector-icons/Entypo';
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
    const [bidderAvailable, setBidderAvailable] = useState(false)
    const [openInfo, setopenInfo] = useState(false)

    const backIcon = <AntDesign onPress={() => changeRoute(navigation, 'pop')} style={centralStyle.mx2} name={'left'} color={Colors.black} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
    const downIcon = <AntDesign onPress={() => { setopenInfo(!openInfo) }} name={openInfo ? 'down' : "up"} color={Colors.black} size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />
    const dotIcon = <Entypo onPress={() => setmodalEnabled(true)} style={platform == 'ios' ? centralStyle.mx1 : centralStyle.mx2} color={Colors.black} name={`dots-three-vertical`} size={RFPercentage(2)} />
    const dotIconWithOutCallback = <Entypo style={platform == 'ios' ? centralStyle.mx1 : centralStyle.mx2} color={Colors.black} name={`dots-three-vertical`} size={RFPercentage(2)} />
    const uploadIcon = <AntDesign style={platform == 'ios' ? centralStyle.mx02 : centralStyle.mx2} color={Colors.black} name={`upload`} size={RFPercentage(2)} />

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={[centralStyle.flex1,]}>
                    <AppHeader
                        iconL1={backIcon}
                        iconR2={dotIcon}
                        iconR1={uploadIcon}
                        weight='700'
                        type='Poppin-16'
                        title={t('Kitchenremodelforasingle')} />

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
                                        <Title
                                            title={t('Description') + `: `}
                                            type='Poppin-14'
                                            weight='400'
                                            color={Colors.gray}
                                        />
                                        <Title
                                            title={t(`viewJobDescription`)}
                                            type='Poppin-14'
                                            weight='400'
                                            color={Colors.black}
                                        />
                                        <View style={centralStyle.my1}>
                                            <Title
                                                title={t(`BiddersAndBids`)}
                                                type='Poppin-14'
                                                weight='600'
                                                color={Colors.black}
                                            />
                                        </View>
                                    </>
                                    : <></>
                                }


                                {bidderAvailable ?
                                    <View style={[centralStyle.XAndYCenter, centralStyle.flex1]}>
                                        < Title
                                            title={t(`Nobidderyet`)}
                                            type='Poppin-18'
                                            weight='600'
                                            color={Colors.gray}
                                        />
                                    </View>
                                    :
                                    <View style={centralStyle.flex1}>
                                        <View style={{ maxHeight: !openInfo ? platform == 'ios' ? RFPercentage(70) : RFPercentage(75) : undefined }}>
                                            <FlatList
                                                data={[0, 0, 0, 0, 0, 0, 0]}
                                                showsVerticalScrollIndicator={false}
                                                renderItem={({ item }) => (
                                                    <View style={styles.listContainer}>
                                                        <View style={[centralStyle.row]}>
                                                            <View style={[{ flex: 1.5 }, centralStyle.XAndYCenter]}>
                                                                <Image source={require('../../../../assets/app-images/userImg2.png')} />
                                                            </View>
                                                            <View style={[{ flex: 7.5 }, centralStyle.alignitemCenter, centralStyle.justifyContentBetween, centralStyle.row]}>
                                                                <Title
                                                                    title={t(`BidderLee`)}
                                                                    type='Poppin-14'
                                                                    weight='600'
                                                                    color={Colors.black}
                                                                />
                                                                <View style={[styles.invitedBtnContainer, centralStyle.XAndYCenter]}>
                                                                    <Title
                                                                        title={t(`Invited`)}
                                                                        type='Poppin-10'
                                                                        weight='400'
                                                                        color={Colors.black}
                                                                    />
                                                                </View>
                                                            </View>
                                                            <View style={[centralStyle.flex1, centralStyle.XAndYCenter]}>
                                                                {dotIconWithOutCallback}
                                                            </View>
                                                        </View>
                                                        <View style={[centralStyle.row, centralStyle.px2, centralStyle.alignitemCenter, centralStyle.justifyContentBetween,]}>
                                                            <View style={[centralStyle.row]}>
                                                                <Title
                                                                    title={t(`ETA`) + ':  '}
                                                                    type='Poppin-14'
                                                                    weight='400'
                                                                    color={Colors.gray}
                                                                />
                                                                <Title
                                                                    title={t(`Nov 21, 2022`)}
                                                                    type='Poppin-14'
                                                                    weight='400'
                                                                    color={Colors.black}
                                                                />
                                                            </View>
                                                            <View style={[centralStyle.row]}>
                                                                <Title
                                                                    title={t(`Cost`) + `:  `}
                                                                    type='Poppin-14'
                                                                    weight='400'
                                                                    color={Colors.gray}
                                                                />
                                                                <Title
                                                                    title={t(`$3500.00`)}
                                                                    type='Poppin-14'
                                                                    weight='400'
                                                                    color={Colors.black}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View>
                                    </View>

                                }
                                <View style={styles.btnContainer}>
                                    <Button
                                        title={t(`Inviteprostobid`)}
                                        primary
                                    />
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
