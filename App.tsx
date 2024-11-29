// import React, {
//     useEffect,
//     useState
// } from 'react';

// import { Dispatch } from 'redux';
// import { ToastProvider } from 'react-native-toast-notifications'
// import { PortalProvider } from '@gorhom/portal';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import {
//     Provider,
//     useDispatch,
//     useSelector
// } from 'react-redux';
// import {
//     LogBox,
//     SafeAreaView,
//     StatusBar,
//     StyleSheet,
//     View,
// } from 'react-native';

// import store from './src/store';
// import Colors from './src/styles/colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AppNavigation from './src/router/tab/index';
// import AuthNavigation from './src/router/auth';
// import ScreenLoader from './src/core/components/screen-loader-component';
// import { Title } from './src/core/components/screen-title.component';
// import { platform } from './src/utilities';
// import { loginAction } from './src/store/action/action';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import { I18nextProvider } from 'react-i18next';
// import i18n, {
//     fetchTranslations
// } from './src/i18n';
// import MainNavigator from './src/router';

// // Ignore warnings
// LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
// LogBox.ignoreAllLogs();

// const MainComponent: React.FC = () => {

//     const [authState, setAuthState] = useState<any>(true)
//     const { currentUserProfile, splashStatusBar, initialRoute } = useSelector((state: any) => state.root)

//     useEffect(() => {
//         console.log("hdhsdhsd")
//         if (Object.keys(currentUserProfile).length > 0) setAuthState(false)
//         else { setAuthState(true) }
//     }, [currentUserProfile])

//     const dispatch: Dispatch<any> = useDispatch();

//     // Check if user is already logged in
//     const checkLoginStatus = async () => {
       
//         let accessToken = await AsyncStorage.getItem('accessToken');
//         if (accessToken !== null) {
//             await dispatch(loginAction('', '', accessToken))
//         }
//     };

//     useEffect(() => { checkLoginStatus() }, [])

//     return (
//         <>
//             {platform == 'ios'
//                 ?
//                 authState ?
//                     <></> :
//                     <MyStatusBar backgroundColor={Colors.white} barStyle="light-content" /> :
//                 authState ?
//                     splashStatusBar === 'walkThrough' ?
//                         <StatusBar barStyle="dark-content" backgroundColor={'transparent'} hidden={false} translucent={true} />
//                         :
//                         splashStatusBar === true ?
//                             <MyStatusBar backgroundColor={Colors.primary} barStyle="light-content" /> :
//                             <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" /> :
//                     <StatusBar barStyle="dark-content" backgroundColor={'transparent'} hidden={false} translucent={true} />
//             }
//             {<MainNavigator />
//             }
//             {/* {authState ? <MainNavigator /> : <AppNavigation />
//             } */}

//         </>

//     )
// };

// const MyStatusBar = ({ backgroundColor, ...props }: any) => (
//     <View style={[styles.statusBar, { backgroundColor }]}>
//         <SafeAreaView>
//             <StatusBar translucent hidden={false} backgroundColor={backgroundColor} {...props} />
//         </SafeAreaView>
//     </View>
// );
// const App: React.FC = () => {
//     const getTranslations = async () => { return fetchTranslations(); };
//     useEffect(() => {

//         getTranslations();
//     }, []);

//     return (
//         <I18nextProvider i18n={i18n}>
//             <Provider store={store}>
//                 <SafeAreaProvider>
//                     <PortalProvider>
//                         <ToastProvider
//                             placement="bottom"
//                             renderType={{
//                                 custom_toast: (toast) => (
//                                     <View style={styles.customToastContainer} >
//                                         <Title
//                                             type='Poppin-14'
//                                             title={toast.message}
//                                             color={Colors.red}
//                                             weight='400' />
//                                     </View>
//                                 ),
//                                 custom_success_toast: (toast) => (
//                                     <View style={[styles.customToastContainer, { borderLeftColor: Colors.success }]}>
//                                         <Title
//                                             type='Poppin-14'
//                                             title={toast.message}
//                                             color={Colors.success} // Change color for success
//                                             weight='400'
//                                         />
//                                     </View>
//                                 ),
//                             }}
//                         >
//                             <ScreenLoader />
//                             <MainComponent />
//                         </ToastProvider>
//                     </PortalProvider>
//                 </SafeAreaProvider>
//             </Provider>
//         </I18nextProvider>
//     )
// };

// export default App;



// const STATUSBAR_HEIGHT = StatusBar.currentHeight;

// const styles = StyleSheet.create({
//     statusBar: {
//         height: STATUSBAR_HEIGHT,
//     },
//     customToastContainer: {
//         maxWidth: "85%",
//         paddingHorizontal: 15,
//         paddingVertical: RFPercentage(2),
//         backgroundColor: Colors.white,
//         marginVertical: 4,
//         borderRadius: 8,
//         borderLeftColor: Colors.red,
//         borderLeftWidth: 6,
//         justifyContent: "center",
//         paddingLeft: 16,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
// });

import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { ToastProvider } from 'react-native-toast-notifications';
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppState, AppStateStatus, LogBox, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import store from './src/store';
import Colors from './src/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigator from './src/router';
import { loginAction, refreshTokenAction, } from './src/store/action/action';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { I18nextProvider } from 'react-i18next';
import i18n, { fetchTranslations } from './src/i18n';
import { Title } from 'react-native-paper';

// Ignore warnings
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
LogBox.ignoreAllLogs();
console.log("jjjjjj")
const MainComponent: React.FC = () => {
    const [authState, setAuthState] = useState<any>(true);
    const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

    const refreshTokenIfNeeded = async () => {
        try {
            console.log('Checking tokens and expiration...');
    
            // Retrieve values from AsyncStorage
            let expirationDate = await AsyncStorage.getItem('accessTokenExpiration'); // Expiration date
            const accessToken = await AsyncStorage.getItem('accessToken'); // Access token
            const refreshToken = await AsyncStorage.getItem('refreshToken'); // Refresh token
    
            // Logging fetched values
            console.log('Fetched expirationDate from storage:', expirationDate);
            console.log('Fetched accessToken from storage:', accessToken ? '[Token Available]' : '[No Token]');
            console.log('Fetched refreshToken from storage:', refreshToken ? refreshToken : '[No Token]');
    
            if (expirationDate && accessToken && refreshToken) {
                // Remove extra quotes or whitespace
                expirationDate = expirationDate.replace(/"/g, '').trim();
    
                // Parse the expiration date
                const expirationTime = new Date(expirationDate).getTime();
    
                if (isNaN(expirationTime)) {
                    console.error('Invalid expirationDate format after parsing:', expirationDate);
                    return;
                }
    
                const currentTime = new Date().getTime(); // Current time in milliseconds
    
                // Time remaining in milliseconds
                const timeRemaining = expirationTime - currentTime;
    
                // Logging detailed time information
                console.log('Current time (ms):', currentTime);
                console.log('Expiration time (ms):', expirationTime);
                console.log('Time remaining until expiration (ms):', timeRemaining);
                console.log('Time remaining until expiration (minutes):', Math.floor(timeRemaining / (60 * 1000)));
    
                // Check if the token is expired or about to expire
                if (currentTime >= expirationTime) {
                    console.log('Token has already expired. Refreshing token...');
                    await dispatch(refreshTokenAction());
                    console.log('Token refreshed successfully.');
                } else if (timeRemaining <= 10 * 60 * 1000) {
                    console.log('Token is about to expire in less than 10 minutes. Refreshing token...');
                    await dispatch(refreshTokenAction());
                    console.log('Token refreshed successfully.');
                } else {
                    console.log('Token is valid. No need to refresh.');
                }
            } else {
                console.error('Missing required token data. Check the following:');
                console.error('Access Token:', accessToken ? '[Available]' : '[Missing]');
                console.error('Refresh Token:', refreshToken ? '[Available]' : '[Missing]');
                console.error('Expiration Date:', expirationDate ? '[Available]' : '[Missing]');
            }
        } catch (error) {
            console.error('Error occurred during token expiration check or refresh:', error);
        }
    };

    // AppState Listener
    useEffect(() => {
        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            console.log('AppState changed to: ', nextAppState);

            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App has come to the foreground!');
                refreshTokenIfNeeded(); // Refresh token when app comes to the foreground
            }

            setAppState(nextAppState);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove(); // Clean up the listener
        };
    }, [appState]);
    const { currentUserProfile, splashStatusBar } = useSelector((state: any) => state.root);

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        if (Object.keys(currentUserProfile).length > 0) setAuthState(false);
        else setAuthState(true);
    }, [currentUserProfile]);

    // Check if user is already logged in
    const checkLoginStatus = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            await dispatch(loginAction('', '', accessToken));
        }
    };

    useEffect(() => {
        checkLoginStatus();
       
    }, []);

    

    

    return (
        <>
            {authState ? null : <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />}
            <MainNavigator />
        </>
    );
};

const App: React.FC = () => {
    const getTranslations = async () => {
        return fetchTranslations();
    };

    useEffect(() => {
        getTranslations();
    }, []);

    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <SafeAreaProvider>
                    <PortalProvider>
                        <ToastProvider
                            placement="bottom"
                            renderType={{
                                custom_toast: (toast) => (
                                    <View style={styles.customToastContainer}>
                                        <Title
                                            type="Poppin-14"
                                            title={toast.message}
                                            color={Colors.red}
                                            weight="400"
                                        />
                                    </View>
                                ),
                                custom_success_toast: (toast) => (
                                    <View
                                        style={[
                                            styles.customToastContainer,
                                            { borderLeftColor: Colors.success },
                                        ]}
                                    >
                                        <Title
                                            type="Poppin-14"
                                            title={toast.message}
                                            color={Colors.success}
                                            weight="400"
                                        />
                                    </View>
                                ),
                            }}
                        >
                            <MainComponent />
                        </ToastProvider>
                    </PortalProvider>
                </SafeAreaProvider>
            </Provider>
        </I18nextProvider>
    );
};

export default App;

const styles = StyleSheet.create({
    customToastContainer: {
        maxWidth: '85%',
        paddingHorizontal: 15,
        paddingVertical: RFPercentage(2),
        backgroundColor: Colors.white,
        marginVertical: 4,
        borderRadius: 8,
        borderLeftColor: Colors.red,
        borderLeftWidth: 6,
        justifyContent: 'center',
        paddingLeft: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});