// @app
import React, {
    useState,
} from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Image,
    FlatList
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
import { centralStyle } from '../../../../styles/constant.style';
import { DropDownModal } from '../../../../core/components/drop-down-modal';
import { ListCard } from './biz-card-component';
import {
    BIZCARDDATA,
    MODALDATA,
} from './data';

const BizCard: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [modalEnabled, setmodalEnabled] = useState(false)
    const [multiCards, setmultiCards] = useState(true)

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                iconR1={
                    multiCards ?
                        <AntDesign style={styles.mx2} name={'plus'} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
                        :
                        <Entypo style={styles.mx2} onPress={() => setmodalEnabled(!modalEnabled)} name={`dots-three-vertical`} size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />
                }
                type='Poppin-18'
                weight='600'
                title={t(`BusinessCard`)} />

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
                        disableModal={() => setmodalEnabled(!modalEnabled)} />}

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={centralStyle.pb10}>
                        <View style={[centralStyle.circle(RFPercentage(22)), styles.imgContainer]}>
                            <FontAwesome name={'user'} size={RFPercentage(10)} />
                        </View>

                        <View style={styles.bizCartContentWrapper}>
                            <View style={[styles.mb2,]}>
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
                                <Title
                                    type='Poppin-14'
                                    weight='400'
                                    title={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`}
                                    color={Colors.fontColor} />
                            </View>

                            {BIZCARDDATA.map((item) => {
                                return (
                                    <View style={styles.rowContainerData}>
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
                                <Button title='Share Card' primary />
                            </View>

                        </View>
                    </ScrollView>
                </>
            }

        </SafeAreaView >

    );
};

export default BizCard;
