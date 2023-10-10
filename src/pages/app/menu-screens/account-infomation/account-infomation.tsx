// @app
import React, {
    useState
} from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    Switch,
    TouchableOpacity,
    View
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import AppHeader from '../../../../core/components/app-headers';
import { List } from './account-infomation-component';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './account-infomation.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { toggleSwitch } from '../../contact-screens/new-contact/call-back';
import {
    ACCOUNGINFORMATION,
    LOGININFORMATION
} from './data';

const AccountInformtaion: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <>
            <AppHeader
                withOutBorder
                iconL1={
                    <AntDesign
                        style={centralStyle.mx2}
                        name={'left'}
                        onPress={() => { changeRoute(navigation, 'pop') }}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                iconR1={
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() =>changeRoute(navigation,'EditProfile')}
                        style={centralStyle.mx2}>
                        <Title
                            title={t(`Edit`)}
                            type='Poppin-14'
                            color={Colors.primary}
                            weight='600' />
                    </TouchableOpacity>
                }
                weight='600'
                type='Poppin-18'
                title={t('AccountInformation')} />
            <ScrollView contentContainerStyle={{ backgroundColor: Colors.white }}>
                <View style={[centralStyle.container]}>
                    <View style={[centralStyle.row, centralStyle.my1]}>

                        <View style={[centralStyle.flex1, styles.infoHeaderContainer, centralStyle.justifyContentCenter]}>
                            <Image style={styles.profileImg} source={require('../../../../assets/app-images/userImg.png')} />
                        </View>
                        <View style={[centralStyle.flex1, styles.nameContainer, centralStyle.justifyContentCenter]}>
                            <Title
                                title={`George Lee`}
                                type='Poppin-18'
                                color={Colors.black}
                                weight='600' />
                        </View>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => changeRoute(navigation, 'QRCode')}
                            style={[centralStyle.flex1, styles.infoHeaderContainer, centralStyle.XAndYCenter]}>
                            <Image style={styles.qrContainer} source={require('../../../../assets/app-images/qr.png')} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={ACCOUNGINFORMATION}
                            contentContainerStyle={[centralStyle.my2]}
                            renderItem={({ item }) => <List navigation={navigation} item={item} />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <Title
                        title={t(`About`)}
                        type='Poppin-16'
                        color={Colors.black}
                        weight='400' />
                    <Title
                        title={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.`}
                        type='Poppin-14'
                        color={Colors.gray}
                        weight='400' />
                    <View style={centralStyle.mt3}>
                        <Title
                            title={t(`LoginInformation`)}
                            type='Poppin-20'
                            color={Colors.black}
                            weight='700' />
                    </View>
                    {LOGININFORMATION.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.switchContainer,
                                centralStyle.mb1,
                                centralStyle.row,
                                centralStyle.mt1,
                                centralStyle.px1,
                                centralStyle.justifyContentBetween,
                                centralStyle.alignitemCenter]}>
                            <Title
                                color={Colors.black}
                                type='Poppin-16'
                                weight='400'
                                title={item} />
                            <Switch
                                trackColor={{ false: Colors.lightGrey, true: 'rgba(255, 241, 221,1)' }}
                                thumbColor={isEnabled ? Colors.primary : Colors.lightGray}
                                ios_backgroundColor={Colors.lightGrey}
                                onValueChange={() => toggleSwitch(setIsEnabled)}
                                value={isEnabled}
                            />
                        </View>
                    ))}

                    <View style={[
                        centralStyle.selfCenter,
                        centralStyle.my1,
                        centralStyle.width100,
                        centralStyle.mb3]}>
                        <Button
                            callBack={() => changeRoute(navigation, 'AccountInformtaionCard')}
                            title={t('CreateyourDigitalbusinesscard')}
                            primary />
                    </View>
                </View>

            </ScrollView >
        </>
    );
};

export default AccountInformtaion;
