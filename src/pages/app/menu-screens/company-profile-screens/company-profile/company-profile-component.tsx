// @app
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    TouchableOpacity,
    View
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';


import { changeRoute } from '../../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../../styles/constant.style';
import { styles } from './company-profile.style';
import { Title } from '../../../../../core/components/screen-title.component';
import { t } from 'i18next';
import Colors from '../../../../../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { onShare } from './call-back';
import { ProgressBar } from 'react-native-paper';
import {
    PHOTOTABSDATA,
    REVIEWS,
    SERVICEDATA
} from './data';

export const LeftIcon = (navigation?: any) => (
    <TouchableOpacity
        onPress={() => changeRoute(navigation, 'pop')}
        activeOpacity={.8}
        style={centralStyle.mx2}>
        <AntDesign name={'left'} size={RFPercentage(2)} />
    </TouchableOpacity>
)

export const RightIcon = (navigation?: any, setmodalEnabled?: any) => (
    <TouchableOpacity
        activeOpacity={.8}
        onPress={() => setmodalEnabled(true)}
        style={centralStyle.mx2}>
        <Entypo name={'dots-three-vertical'} size={RFPercentage(2)} />
    </TouchableOpacity>
)

interface TabsUiProps {
    item: string;
    index: number;
    setSelectedTab: (tab: string) => void;
    selectedTab: string;
}
const TabsUi: React.FC<TabsUiProps> = ({ item, index, setSelectedTab, selectedTab }) => {

    return (

        <TouchableOpacity
            key={index.toString()}
            onPress={() => setSelectedTab(t(item))}
            activeOpacity={.9} style={[
                styles.tabsContainer(selectedTab, item),
                centralStyle.XAndYCenter]}>
            <Title
                weight='600'
                type='Poppin-14' color={selectedTab == item ? Colors.primary : Colors.fontColor}
                title={item} />
        </TouchableOpacity>
    )
}
export default TabsUi;

export const MoreOptions: React.FC<{ disableModal?: any, sheetRef?: any, data?: any, navigation?: any, }> = ({ disableModal, data, navigation, sheetRef }) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => { disableModal() }}
            style={styles.modalContainerAbs}>
            <TouchableOpacity
                activeOpacity={.9}
                style={styles.modalContainer}>

                {data.map((item: any, index: string) => (
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={centralStyle.my05}
                        onPress={() => {
                            if (item == t("Share")) { onShare() }
                            else if (item == t("QRCode")) { sheetRef?.current?.open() }
                            else if (item == t("Edit")) { changeRoute(navigation, 'EditCompanyProfile') }
                            disableModal()
                        }}
                    >
                        <Title
                            title={t(item)}
                            weight='400'
                            color={Colors.fontColor}
                            type='Poppin-12' />
                    </TouchableOpacity>
                ))}
            </TouchableOpacity>
        </TouchableOpacity >
    )
}
export const OverView = () => {
    return (
        <>
            <View style={[centralStyle.row, centralStyle.mt2, centralStyle.alignitemCenter,]}>
                <Fontisto
                    style={centralStyle.mx2}
                    name={`world-o`}
                    size={RFPercentage(2)}
                    color={Colors.black} />
                <Title
                    title={`www.greenmetronic.com`}
                    type='Poppin-16'
                    color={Colors.blue}
                    weight='400' />
            </View>
            <View style={[centralStyle.row, centralStyle.mt2, centralStyle.alignitemCenter,]}>
                <FontAwesome5
                    style={centralStyle.mx2}
                    name={`phone-alt`}
                    size={RFPercentage(2)}
                    color={Colors.fontColor} />
                <Title
                    title={`+1415713701`}
                    type='Poppin-16'
                    color={Colors.fontColor}
                    weight='400' />
            </View>
            <View style={[centralStyle.row, centralStyle.mt2, centralStyle.alignitemCenter,]}>
                <Feather style={centralStyle.mx2} name={`map-pin`} size={RFPercentage(2)} color={Colors.fontColor} />
                <Title
                    title={`Burlingame, CA 94010`}
                    type='Poppin-16'
                    color={Colors.fontColor}
                    weight='400' />
            </View>
            <View style={[centralStyle.flex1, centralStyle.XAndYCenter, centralStyle.mt2, { borderWidth: 1 }]}>
                <Title
                    title={`map place`}
                    type='Poppin-16'
                    color={Colors.fontColor}
                    weight='400' />
            </View>
            <View style={[centralStyle.flex1, centralStyle.px2,]}>
                <View style={centralStyle.my1}>
                    <Title
                        title={t(`FromGreenMetroInc`)}
                        type='Poppin-18'
                        color={Colors.black}
                        weight='600' />
                </View>
                <Title
                    title={t(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. cillum dolore eu fugiat nulla pariatur  dads asdasfds asdfasdfa asdfasdfa asdfasdfa adsfasad...`)}
                    type='Poppin-16'
                    color={Colors.fontColor}
                    weight='400' />
            </View>
        </>
    )
}
export const Service = () => {
    return (
        <View style={[centralStyle.mx2, centralStyle.my2]}>
            <Title
                title={t(`Incididunt ut labore et dolore magna aliqua. cillum dolore eu fugiat nulla pariaturasf aodf aldjfaldjfaljd jsad... `)}
                type='Poppin-16'
                color={Colors.fontColor}
                weight='400' />
            <View style={centralStyle.mt2}>
                <Title
                    title={t(`Services`)}
                    type='Poppin-18'
                    color={Colors.black}
                    weight='600' />
            </View>

            {SERVICEDATA.map((item, index) => (
                <View key={index.toString()} style={centralStyle.my1}>
                    <Title
                        title={t(item)}
                        type='Poppin-16'
                        color={Colors.fontColor}
                        weight='400' />
                </View>

            ))}
        </View>
    )
}
export const Photos = () => {
    const [seletedTab, setSeletedTab] = useState('All')
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[centralStyle.px2, centralStyle.XAndYCenter, centralStyle.my1]}
                data={PHOTOTABSDATA}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => { setSeletedTab(item) }}
                        activeOpacity={.9}
                        style={[{ borderRadius: RFPercentage(3), backgroundColor: seletedTab == item ? Colors.fontColor : Colors.lightGrey }, centralStyle.px2, centralStyle.mx05, centralStyle.XAndYCenter, centralStyle.py05]}  >
                        <Title
                            title={item}
                            type='Poppin-14'
                            color={seletedTab == item ? Colors.white : Colors.fontColor}
                            weight='600' />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={[centralStyle.justifyContentBetween, centralStyle.px2,]}
                contentContainerStyle={[centralStyle.my1]}
                data={[0, 0, 0, 0, 0,]}
                renderItem={({ item }) => <Image style={styles.posterImg} source={require('../../../../../assets/app-images/companyprofilephotos.png')} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </ScrollView>
    )
}
export const QRCode = () => {
    return (

        <View style={[centralStyle.flex1, centralStyle.XAndYCenter,]}>
            <Title
                title={t(`CompanyQRCode`)}
                type='Poppin-18'
                color={Colors.black}
                weight='600' />
            <Image
                style={[styles.qr, centralStyle.my2]}
                source={require('../../../../../assets/app-images/qr.png')} />
            <Title
                title={t(`CopyQrCode`)}
                type='Poppin-14'
                color={Colors.primary}
                weight='600' />
        </View>


    )
}
export const Reviews = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={centralStyle.p2}>
                <Title
                    title={t(`Reviews`)}
                    type='Poppin-20'
                    color={Colors.fontColor}
                    weight='700' />
                <View style={[centralStyle.row, styles.reviewWrapper]}>
                    <View style={styles.rangeListWrapper}>
                        {REVIEWS.map((item, index) => (
                            <View key={index.toString()} style={[centralStyle.row, centralStyle.flex1]}>
                                <View style={[styles.numberContainer, centralStyle.XAndYCenter]}>
                                    <Title
                                        title={item.toString()}
                                        type='Poppin-14'
                                        color={Colors.fontColor}
                                        weight='400' />
                                </View>
                                <View style={[styles.barContainer, centralStyle.justifyContentCenter]}>
                                    <ProgressBar
                                        progress={item / 5}
                                        style={styles.progressContainer}
                                        color={Colors.primary} />
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={[styles.reviewContainer]}>
                        <Title
                            title={'5.0'}
                            type='Poppin-61'
                            color={Colors.fontColor}
                            weight='400' />
                        <View style={[centralStyle.mx1, centralStyle.row,]}>
                            {REVIEWS.map(() => <AntDesign
                                name={`star`}
                                style={centralStyle.mx02}
                                size={RFPercentage(1.7)}
                                color={Colors.yellow} />)}
                        </View>
                        <Title
                            title={t('twentyFiveReviews')}
                            type='Poppin-14'
                            color={Colors.blue}
                            weight='400' />
                    </View>
                </View>
                <FlatList
                    data={[0, 0, 0, 0,]}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={centralStyle.my1}
                    renderItem={({ item }) => (
                        <View style={centralStyle.my3}>
                            <View style={[styles.profileHeader, centralStyle.row]}>

                                <View style={[styles.profileContainer, centralStyle.justifyContentCenter]}>
                                    <Image style={styles.profileImg} source={require('../../../../../assets/app-images/userImg.png')} />
                                </View>

                                <View style={[styles.profileBody, centralStyle.justifyContentCenter]}>
                                    <Title
                                        title={t(`Syed Ali Shahid`)}
                                        type='Poppin-14'
                                        color={Colors.black}
                                        weight='400' />
                                    <Title
                                        title={t(`Local guide 34 reviews`)}
                                        type='Poppin-14'
                                        color={Colors.fontColor}
                                        weight='400' />
                                </View>
                            </View>
                            <View style={[centralStyle.row, centralStyle.alignitemCenter, centralStyle.my1]}>
                                {REVIEWS.map(() => <AntDesign
                                    name={`star`}
                                    style={centralStyle.mr05}
                                    size={RFPercentage(1.7)}
                                    color={Colors.yellow} />)}
                                <Title
                                    title={" " + t(`ayearago`)}
                                    type='Poppin-14'
                                    color={Colors.fontColor}
                                    weight='400' />
                            </View>
                            <Title
                                title={t(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum has been the industry's standard dummy text ever since the 1500s`)}
                                type='Poppin-14'
                                color={Colors.fontColor}
                                weight='400' />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </ScrollView>
    )
}