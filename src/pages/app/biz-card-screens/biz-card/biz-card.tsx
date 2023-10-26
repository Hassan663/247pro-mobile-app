// @app
import React, {
    useState,
} from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Image,
    FlatList,
    StatusBar
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import { styles } from './biz-card.style';
import { Title } from '../../../../core/components/screen-title.component';
import { platform } from '../../../../utilities';
import { centralStyle, flex1BottomTab, windowHeight, windowHeightWithStatusBar } from '../../../../styles/constant.style';
import { DropDownModal } from '../../../../core/components/drop-down-modal';
import {
    CreateBuisnessCartModal,
    ListCard
} from './biz-card-component';
import {
    BIZCARDDATA,
    MODALDATA,
} from './data';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { useSafeArea } from 'react-native-safe-area-context';

const BizCard: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [modalEnabled, setmodalEnabled] = useState(false)
    const [multiCards, setmultiCards] = useState(false)
    const [createBuisnessCartModalEnabled, setCreateBuisnessCartModalEnabled] = useState(false)
    const [saveContact, setsaveContact] = useState(false)
    const [alreadySaveInContact, setalreadySaveInContact] = useState(false)


    const insets = useSafeArea();
    const notchSize = insets.top;
    alert(notchSize)
    return (
        <View style={[{ height: flex1BottomTab-notchSize,width:"100%", backgroundColor: 'red' }]}>
            {/* <View style={[{ height: StatusBar.currentHeight + windowHeight - (platform == 'ios' ? RFPercentage(10) : RFPercentage(8)), }]}> */}
            {/* height: platform == 'ios' ? RFPercentage(10) : RFPercentage(8), */}

            <SafeAreaView style={[styles.container,]}>
                <AppHeader
                    iconR1={
                        multiCards ?
                            <AntDesign
                                onPress={() => { changeRoute(navigation, 'EditBizCard') }}
                                style={styles.mx2} name={'plus'} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
                            :
                            <Entypo style={styles.mx2} onPress={() => setmodalEnabled(!modalEnabled)} name={`dots-three-vertical`} size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />
                    }
                    type='Poppin-18'
                    weight='600'
                    title={t(`BusinessCard`)} />

                {createBuisnessCartModalEnabled && <CreateBuisnessCartModal
                    contactSaved={saveContact}
                    disableModal={() => setCreateBuisnessCartModalEnabled(!createBuisnessCartModalEnabled)} />}

                {multiCards ?
                    <FlatList
                        data={[0, 0, 0, 0, 0, 0,]}
                        contentContainerStyle={centralStyle.pb10}
                        renderItem={({ item }) => {
                            return (
                                <ListCard navigation={navigation} />
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    :
                    <>
                        {modalEnabled && <DropDownModal
                            DATA={MODALDATA}
                            navigation={navigation}
                            editCallback={() => { changeRoute(navigation, 'EditBizCard') }}
                            disableModal={() => setmodalEnabled(!modalEnabled)} />}

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        // contentContainerStyle={centralStyle.pb15}
                        >
                            <View style={[centralStyle.circle(RFPercentage(22)), styles.imgContainer]}>
                                <FontAwesome name={'user'} color={Colors.fontColor} size={RFPercentage(10)} />
                            </View>

                            <View style={styles.bizCartContentWrapper}>
                                <View style={[styles.mb2,]}>
                                    <View style={saveContact && centralStyle.alignitemCenter}>
                                        <Title
                                            type='Poppin-24'
                                            weight='600'
                                            title={`George Lee`}
                                            color={Colors.black} />
                                        <Title
                                            type='Poppin-12'
                                            weight='400'
                                            title={`Architect `}
                                            color={Colors.fontColor} />
                                        <View style={styles.mb2}>
                                            <Title
                                                type='Poppin-14'
                                                weight='500'
                                                title={`Company Name`}
                                                color={Colors.black} />
                                        </View>
                                    </View>
                                    <Title
                                        type='Poppin-14'
                                        weight='400'
                                        title={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`}
                                        color={Colors.fontColor} />
                                </View>

                                {BIZCARDDATA.map((item, index) => {
                                    return (
                                        <View
                                            key={index.toString()}
                                            style={styles.rowContainerData}>
                                            <View style={[centralStyle.circle(RFPercentage(4.5)), styles.primaryCircle]}>
                                                <Feather
                                                    name={`smartphone`}
                                                    color={Colors.primary}
                                                    size={RFPercentage(2.5)} />
                                            </View>
                                            <Title
                                                type='Poppin-14'
                                                weight='400'
                                                title={item}
                                                color={Colors.fontColor} />
                                        </View>
                                    )
                                })}

                                <View style={[centralStyle.row, styles.socialIcons]}>

                                    <Image style={styles.socialIconsStyle} source={require('../../../../assets/app-images/facebook.png')} />
                                    <Image style={styles.socialIconsStyle} source={require('../../../../assets/app-images/twitter.png')} />
                                    <Image style={styles.socialIconsStyle} source={require('../../../../assets/app-images/instagram.png')} />
                                    <Image style={styles.socialIconsStyle} source={require('../../../../assets/app-images/linkedin.png')} />

                                </View>

                                <View style={styles.btnContainer}>
                                    <Button
                                        disable={alreadySaveInContact ? true : false}
                                        callBack={() => changeRoute(navigation, `ShareQR`)}
                                        title={
                                            alreadySaveInContact ? t('alreadysavedinyourcontacts')
                                                : saveContact ? t('SaveContact') : t('ShareCard')}
                                        primary
                                    />
                                </View>

                            </View>
                        </ScrollView>
                    </>
                }

            </SafeAreaView >
        </View>

    );
};

export default BizCard;
