// @app
import React, {
    useRef, useState
} from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import RBSheet from 'react-native-raw-bottom-sheet';
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import { Item } from './call-back';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './menu.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { ContactModal } from '../../contact-screens/new-contact/new-contact-component';
import { InvitePropleUI } from './menu-components';
import {
    ACCOUNTSETTINGDATA,
    APPDATA,
} from './data';
import { closeSheet, openSheet } from '../../../../store/action/action';

const Menu: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const [anim, setanim] = useState<string>('fadeInUpBig');
    const [contactModal, setcontactModal] = useState<boolean>(false);

    const sheetRef = useRef<any>(null)

    const handleInviteCallBack = () => {
        closeSheet(sheetRef)
        setanim('fadeInUpBig')
        setTimeout(() => { setcontactModal(true) }, 1000)
    }
    const handleShareQR = () => {
        closeSheet(sheetRef)
        changeRoute(navigation, 'QRCode', 'invitePeople')
    }

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                iconR1={
                    <TouchableOpacity onPress={() => openSheet(sheetRef)} activeOpacity={0.8} style={centralStyle.mx2}>
                        <Title
                            type='Poppin-16'
                            weight='700'
                            title={t('Invite')}
                            color={Colors.black} />
                    </TouchableOpacity>
                }
                iconL1={
                    <AntDesign
                        style={centralStyle.mx2}
                        name={'setting'}
                        onPress={() => { changeRoute(navigation, 'ApplicationOrder') }}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
                title={t(`GreenMetroInc`)}
                weight='700'
                type='Roboto-20'
            />

            <View style={[centralStyle.mx2, centralStyle.my3]}>
                <Title
                    title={t('Applications')}
                    type='Poppin-18'
                    color={Colors.fontColor}
                    weight='600' />
            </View>

            <View>
                <FlatList
                    data={APPDATA}
                    numColumns={4}
                    columnWrapperStyle={[centralStyle.px2]}
                    renderItem={({ item }) => <Item navigation={navigation} item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <View style={[centralStyle.mx2, centralStyle.my3]}>
                <Title title={t('AccountAndSettings')} type='Poppin-18' color={Colors.fontColor} weight='600' />
            </View>

            <View>
                <FlatList
                    data={ACCOUNTSETTINGDATA}
                    numColumns={4}
                    columnWrapperStyle={[centralStyle.px2]}
                    renderItem={({ item }) => <Item navigation={navigation} item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <RBSheet
                ref={sheetRef}
                height={RFPercentage(50)}
                closeOnPressMask={true}
                closeOnDragDown={true}
                openDuration={250}
                animationType={'slide'}
                customStyles={{ container: { borderTopLeftRadius: RFPercentage(2), borderTopRightRadius: RFPercentage(2) } }}
            >
                <InvitePropleUI
                    shareQR={handleShareQR}
                    inviteCallBack={handleInviteCallBack} />
            </RBSheet>

            {contactModal &&
                <ContactModal
                    anim={anim}
                    setanim={setanim}
                    setcontactModal={setcontactModal} />}
        </SafeAreaView>
    );
};

export default Menu;
