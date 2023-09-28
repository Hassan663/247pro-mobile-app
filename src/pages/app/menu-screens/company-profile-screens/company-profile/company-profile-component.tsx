// @app
import React, { useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';

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
import { PHOTOTABSDATA, SERVICEDATA } from './data';
import { ScrollView } from 'react-native-gesture-handler';

export const LeftIcon = (navigation?: any) => (
    <TouchableOpacity
        onPress={() => changeRoute(navigation, 'pop')}
        activeOpacity={.8}
        style={centralStyle.mx2}>
        <AntDesign name={'left'} size={RFPercentage(2)} />
    </TouchableOpacity>
)

export const RightIcon = (navigation?: any) => (
    <TouchableOpacity
        activeOpacity={.8}
        style={centralStyle.mx2}>
        <Entypo name={'dots-three-vertical'} size={RFPercentage(2)} />
    </TouchableOpacity>
)


export const MoreOptions: React.FC<{ disableModal?: any, data?: any, navigation?: any, }> = ({ disableModal, data, navigation }) => {
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
                        onPress={() => { disableModal() }}
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
        <ScrollView>
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