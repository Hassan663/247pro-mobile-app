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
    Text,
    Image,
    ScrollView,
    Linking,
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
import { CommonFeatureCard, InvitePropleUI } from './menu-components';
import {
    ACCOUNTSETTINGDATA,
    APPDATA,
} from './data';
import { closeSheet, openSheet } from '../../../../store/action/action';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userIdentity } from '../../../../core/http-services/apis/identity-api/authentication.service';
import { CURRENTUSERPROFILE } from '../../../../store/constant/constant';
import InAppBrowser from 'react-native-inappbrowser-reborn';
// const Menu: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
//     const [anim, setanim] = useState<string>('fadeInUpBig');
//     const [contactModal, setcontactModal] = useState<boolean>(false);
//     const sheetRef = useRef<any>(null);
//     const dispatch = useDispatch();

//     // Get user profile from Redux store
//     const currentUserProfile = useSelector((state: any) => state.root.currentUserProfile);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 // Get access token from storage
//                 const accessToken = await AsyncStorage.getItem('accessToken');

//                 if (!accessToken) {
//                     console.error('Error: No access token found.');
//                     // Handle the error (e.g., show an alert or navigate to the login screen)
//                     return;
//                 }

//                 // Parse the access token
//                 const parsedToken = accessToken;

//                 // Fetch user profile from API
//                 const userProfile = await userIdentity(parsedToken);

//                 // Dispatch the user profile to the store
//                 dispatch({ type: CURRENTUSERPROFILE, payload: userProfile });

//                 // Log profile and permissions for debugging
//                 console.log("Current User Profile:", userProfile);
//                 console.log("User Permissions:", userProfile?.permissions);
//             } catch (error) {
//                 console.error('Error fetching user profile:', error);
//             }
//         };

//         fetchUserProfile();
//     }, [dispatch]); 

//     // Get user permissions
//     const userPermissions = currentUserProfile?.permissions || [];

//     // Additional Icons for Business Card, Contacts, and Timecard
//     const hasBusinessCardPermission = userPermissions.includes("CONTACT_GENERAL");
//     const hasContactsPermission = userPermissions.includes("CONTACT_CREATE");
//     const hasTimecardPermission = userPermissions.includes("TIMECARD_GENERAL");

//     // Filter applications based on user permissions
//     const allowedApps = APPDATA.filter(app => {
//         if (app.name === t('BizCard') && hasBusinessCardPermission) return true;
//         if (app.name === t('Contacts') && hasContactsPermission) return true;
//         if (app.name === t('timecard') && hasTimecardPermission) return true;
//         return false;
//     });

//     // Invite and QR share logic
//     const handleInviteCallBack = () => {
//         closeSheet(sheetRef);
//         setanim('fadeInUpBig');
//         setTimeout(() => { setcontactModal(true); }, 1000);
//     };

//     const handleShareQR = () => {
//         closeSheet(sheetRef);
//         changeRoute(navigation, 'QRCode', 'invitePeople');
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <AppHeader
//                 iconR1={
//                     <TouchableOpacity onPress={() => openSheet(sheetRef)} activeOpacity={0.8} style={centralStyle.mx2}>
//                         <Title
//                             type='Poppin-16'
//                             weight='700'
//                             title={t('Invite')}
//                             color={Colors.black} />
//                     </TouchableOpacity>
//                 }
//                 iconL1={
//                     <AntDesign
//                         style={centralStyle.mx2}
//                         name={'setting'}
//                         onPress={() => { changeRoute(navigation, 'ApplicationOrder'); }}
//                         size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />}
//                 title={t(`GreenMetroInc`)}
//                 weight='700'
//                 type='Roboto-20'
//             />

//             <View style={[centralStyle.mx2, centralStyle.my3]}>
//                 <Title
//                     title={t('Applications')}
//                     type='Poppin-18'
//                     color={Colors.fontColor}
//                     weight='600' />
//             </View>

//             {/* Render only the allowed apps */}
//             <View>
//                 <FlatList
//                     data={allowedApps}
//                     numColumns={4}
//                     columnWrapperStyle={[centralStyle.px2]}
//                     renderItem={({ item }) => <Item navigation={navigation} item={item} />}
//                     keyExtractor={(item, index) => index.toString()}
//                 />
//             </View>

//             <View style={[centralStyle.mx2, centralStyle.my3]}>
//                 <Title title={t('AccountAndSettings')} type='Poppin-18' color={Colors.fontColor} weight='600' />
//             </View>

//             <View>
//                 <FlatList
//                     data={ACCOUNTSETTINGDATA}
//                     numColumns={4}
//                     columnWrapperStyle={[centralStyle.px2]}
//                     renderItem={({ item }) => <Item navigation={navigation} item={item} />}
//                     keyExtractor={(item, index) => index.toString()}
//                 />
//             </View>

//             <RBSheet
//                 ref={sheetRef}
//                 height={RFPercentage(50)}
//                 closeOnPressMask={true}
//                 closeOnDragDown={true}
//                 openDuration={250}
//                 animationType={'slide'}
//                 customStyles={{ container: { borderTopLeftRadius: RFPercentage(2), borderTopRightRadius: RFPercentage(2) } }}
//             >
//                 <InvitePropleUI
//                     shareQR={handleShareQR}
//                     inviteCallBack={handleInviteCallBack} />
//             </RBSheet>

//             {contactModal &&
//                 <ContactModal
//                     anim={anim}
//                     invitePeopleModal={true}
//                     setanim={setanim}
//                     setcontactModal={setcontactModal} />}
//         </SafeAreaView>
//     );
// };

// export default Menu;







const Menu = ({ navigation }) => {
    const sheetRef = useRef(null);
    const dispatch = useDispatch();
    const currentUserProfile = useSelector((state) => state.root.currentUserProfile);

    useEffect(() => {
        const fetchUserProfile = async () => {
            // Fetch user profile logic
        };
        fetchUserProfile();
    }, [dispatch]);

    const allowedApps = [
        { name: 'Timecard', icon: <AntDesign name="clockcircleo" size={24} color={Colors.primary} /> },
        { name: 'Pro Finder', icon: <AntDesign name="search1" size={24} color={Colors.gray} />, soon: true },
        { name: 'Biz Card', icon: <AntDesign name="idcard" size={24} color={Colors.gray} />, soon: true },
        { name: 'Contact', icon: <AntDesign name="contacts" size={24} color={Colors.gray} />, soon: true },
    ];

    const openLink = async (url) => {
        if (await InAppBrowser.isAvailable()) {
            await InAppBrowser.open(url, {
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: '#FB9411',
                preferredControlTintColor: 'white',
            });
        } else {
            Linking.openURL(url);
        }
    };

    // const renderAppIcon = ({ item }) => (
    //     <View style={styles.appContainer}>
    //         <TouchableOpacity 
    //             disabled={item.soon && item.name !== 'Contact'} // Only disable if 'soon' and not 'Contact'
    //             onPress={() => {
    //                 console.log("Navigating to:", item.name); // Log the item name on press
    //                 if (item.name === 'Timecard') {
    //                     navigation.navigate('Timecard');
    //                 } else if (item.name === 'Contact') {
    //                     navigation.navigate('Contact');
    //                 } else {
    //                     console.log("No navigation set for:", item.name);
    //                 }
    //             }}
    //         >
    //             <View style={styles.appIconContainer}>
    //                 {item.icon}
    //             </View>
    //         </TouchableOpacity>
    //         <Text style={styles.appName}>{item.name}</Text>
    //         {item.soon && <View style={styles.soonBadge}><Text style={styles.soonText}>soon</Text></View>}
    //     </View>
    // );

    const renderAppIcon = ({ item }) => {
        const isTimecard = item.name === 'Timecard';
    
        return (
            <View style={styles.appContainer}>
                <TouchableOpacity
                    disabled={item.soon && item.name !== 'Contact'}
                    onPress={() => {
                        console.log("Navigating to:", item.name);
                        if (item.name === 'Timecard') {
                            navigation.navigate('Timecard');
                        } else if (item.name === 'Contact') {
                            // navigation.navigate('Contact');
                        } else {
                            console.log("No navigation set for:", item.name);
                        }
                    }}
                >
                    <View
                        style={[
                            styles.appIconContainer,
                            { borderColor: isTimecard ? Colors.primary : '#E0E0E0' }, // Dynamic border color
                        ]}
                    >
                       {React.cloneElement(item.icon, { color: isTimecard ? Colors.primary : '#E0E0E0' })}
                    </View>
                </TouchableOpacity>
                <Text style={isTimecard ? styles.appName1:styles.appName}>{item.name}</Text>
                {item.soon && (
                    <View style={styles.soonBadge}>
                        <Text style={styles.soonText}>soon</Text>
                    </View>
                )}
            </View>
        );
    };
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
            <Text style={styles.welcomeText}>
    Hello {currentUserProfile?.name?.split(' ')[0] || 'User'}
</Text>
    <Text style={styles.subText}>Welcome back!</Text>
</View>

            {/* Feature Box */}
            <View style={styles.featureBox}>
                <Text style={styles.featureTitle}>247PRO Estimator</Text>
                <Text style={styles.featureSubtitle}>Create estimate & </Text>
                <Text style={styles.featureSubtitle2}>proposal in minutes</Text>
                <TouchableOpacity
                    style={styles.readMoreButton}
                    onPress={() => openLink('https://www.247pro.com/estimator')}
                >
                    <Text style={styles.readMoreText}>Read more</Text>
                    <AntDesign name="arrowright" size={16} color={Colors.black} />
                </TouchableOpacity>
                <Image source={require('/Users/mac/Desktop/Muzammil/247pro-mobile-app/src/assets/app-images/estimator.png')} style={styles.featureImage1} />
            </View>

            {/* Applications Section */}
            <Text style={styles.sectionTitle}>Applications</Text>
            <FlatList
                data={allowedApps}
                numColumns={4}
                renderItem={renderAppIcon}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.appListContainer}
            />

            {/* Top Features Section */}
            <Text style={styles.sectionTitle1}>Top features</Text>

            {/* Pro Finder Feature Box */}
            <View style={[styles.featureBox1, ]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.featureTitle}>Pro Finder</Text>
                    <View style={styles.soonTag}>
                        <Text style={styles.soonText}>soon</Text>
                    </View>
                </View>
                <Text style={styles.featureSubtitle}>Connecting GCs, Subs</Text>
                <Text style={styles.featureSubtitle2}>and homeowners.</Text>
                <TouchableOpacity
                    style={styles.readMoreButton}
                    onPress={() => openLink('https://www.247pro.com/profinder')}
                >
                    <Text style={styles.readMoreText}>Read more</Text>
                    <AntDesign name="arrowright" size={16} color={Colors.black} />
                </TouchableOpacity>
                <Image source={require('/Users/mac/Desktop/Muzammil/247pro-mobile-app/src/assets/app-images/pro_finder.png')} style={styles.featureImage} />
            </View>

            

            {/* Additional Feature Boxes with Spacing */}
<View style={[styles.featureBox2, styles.featureSpacing]}>
    <Text style={styles.featureTitle}>Project management</Text>
    <Text style={styles.featureSubtitle}>Manage projects from</Text>
    <Text style={styles.featureSubtitle2}>start to finish.</Text>
    
    <TouchableOpacity
                    style={styles.readMoreButton}
                    onPress={() => openLink('https://www.247pro.com/project-management')}
                >
                    <Text style={styles.readMoreText}>Read more</Text>
                    <AntDesign name="arrowright" size={16} color={Colors.black} />
                </TouchableOpacity>
    
                <Image source={require('/Users/mac/Desktop/Muzammil/247pro-mobile-app/src/assets/app-images/project.png')} style={[styles.featureImage1, { marginBottom: 20 }]} />
   
</View>

            <View style={[styles.featureBox1, styles.featureSpacing, { marginBottom: 130 }]}>
                <Text style={styles.featureTitle}>Task management</Text>
                <Text style={styles.featureSubtitle}>To-dos at your</Text>
                <Text style={styles.featureSubtitle2}>fingertips.</Text>
                <TouchableOpacity
                    style={styles.readMoreButton}
                    onPress={() => openLink('https://www.247pro.com/tasks')}
                >
                    <Text style={styles.readMoreText}>Read more</Text>
                    <AntDesign name="arrowright" size={16} color={Colors.black} />
                </TouchableOpacity>
                <Image source={require('/Users/mac/Desktop/Muzammil/247pro-mobile-app/src/assets/app-images/task_managment.png')} style={styles.featureImage1} />
            </View>
        </ScrollView>
    );
};

export default Menu;