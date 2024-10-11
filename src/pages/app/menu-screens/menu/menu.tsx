// @app
import React, {
    useEffect,
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
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userIdentity } from '../../../../core/http-services/apis/identity-api/authentication.service';
import { CURRENTUSERPROFILE } from '../../../../store/constant/constant';
const Menu: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [anim, setanim] = useState<string>('fadeInUpBig');
    const [contactModal, setcontactModal] = useState<boolean>(false);
    const sheetRef = useRef<any>(null);
    const dispatch = useDispatch();

    // Get user profile from Redux store
    const currentUserProfile = useSelector((state: any) => state.root.currentUserProfile);
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Get access token from storage
                const accessToken = await AsyncStorage.getItem('accessToken');

                if (!accessToken) {
                    console.error('Error: No access token found.');
                    // Handle the error (e.g., show an alert or navigate to the login screen)
                    return;
                }

                // Parse the access token
                const parsedToken = JSON.parse(accessToken);

                // Fetch user profile from API
                const userProfile = await userIdentity(parsedToken);
                
                // Dispatch the user profile to the store
                dispatch({ type: CURRENTUSERPROFILE, payload: userProfile });
                
                // Log profile and permissions for debugging
                console.log("Current User Profile:", userProfile);
                console.log("User Permissions:", userProfile?.permissions);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [dispatch]); 

    // Get user permissions
    const userPermissions = currentUserProfile?.permissions || [];

    // Additional Icons for Business Card, Contacts, and Timecard
    const hasBusinessCardPermission = userPermissions.includes("CONTACT_GENERAL");
    const hasContactsPermission = userPermissions.includes("CONTACT_CREATE");
    const hasTimecardPermission = userPermissions.includes("TIMECARD_GENERAL");

    // Filter applications based on user permissions
    const allowedApps = APPDATA.filter(app => {
        if (app.name === t('BizCard') && hasBusinessCardPermission) return true;
        if (app.name === t('Contacts') && hasContactsPermission) return true;
        if (app.name === t('timecard') && hasTimecardPermission) return true;
        return false;
    });

    // Invite and QR share logic
    const handleInviteCallBack = () => {
        closeSheet(sheetRef);
        setanim('fadeInUpBig');
        setTimeout(() => { setcontactModal(true); }, 1000);
    };

    const handleShareQR = () => {
        closeSheet(sheetRef);
        changeRoute(navigation, 'QRCode', 'invitePeople');
    };

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
                        onPress={() => { changeRoute(navigation, 'ApplicationOrder'); }}
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

            {/* Render only the allowed apps */}
            <View>
                <FlatList
                    data={allowedApps}
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
                    invitePeopleModal={true}
                    setanim={setanim}
                    setcontactModal={setcontactModal} />}
        </SafeAreaView>
    );
};

export default Menu;
