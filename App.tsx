import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { ToastProvider } from 'react-native-toast-notifications'
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
    LogBox,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import AppNavigation from './src/router/tab/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import store from './src/store';
import AuthNavigation from './src/router/auth';

import Colors from './src/styles/colors';
import { platform } from './src/utilities';
import { I18nextProvider } from 'react-i18next';
import i18n, {
    fetchTranslations
} from './src/i18n';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Title } from './src/core/components/screen-title.component';

// Ignore warnings
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
LogBox.ignoreAllLogs();
var auth = true;
const MainComponent: React.FC = () => {

    const [authState, setAuthState] = useState<any>(true)
    const { isUserLogin, splashStatusBar } = useSelector((state: any) => state.root)
    useEffect(() => {
        auth = !isUserLogin
        setAuthState(!isUserLogin)
    }, [isUserLogin])
    return (
        <>
            {platform == 'ios'
                ?
                authState ?
                    <></> :
                    <MyStatusBar backgroundColor={Colors.white} barStyle="light-content" /> :
                authState ?
                    splashStatusBar ?
                        <MyStatusBar backgroundColor={Colors.primary} barStyle="light-content" /> :
                        <MyStatusBar backgroundColor={Colors.white} barStyle="light-content" /> :
                    <StatusBar barStyle="dark-content" hidden={false} translucent={true} />}
            {authState ? <AuthNavigation /> : <AppNavigation />}

        </>

    )
};

const MyStatusBar = ({ backgroundColor, ...props }: any) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <SafeAreaView>
            <StatusBar translucent hidden={false} backgroundColor={backgroundColor} {...props} />
        </SafeAreaView>
    </View>
);
const App: React.FC = () => {
    const getTranslations = async () => { return fetchTranslations(); };
    useEffect(() => { getTranslations(); }, []);

    return (
        <I18nextProvider i18n={i18n}>

            <Provider store={store}>
                {/* {
                    platform == 'ios'
                        ?
                        auth ?
                            <></> :
                            <MyStatusBar backgroundColor={Colors.white} barStyle="light-content" /> :
                        !auth ?
                            <MyStatusBar backgroundColor={Colors.white} barStyle="light-content" /> :
                            <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
                } */}

                <SafeAreaProvider>
                    <PortalProvider>
                        {/* {alert(process.env.BASE_URL)} */}

                        <ToastProvider
                            placement="bottom"
                            offset={10}
                            // Custom type example
                            renderType={{
                                custom_toast: (toast) => (
                                    <View
                                        style={styles.customToastContainer}
                                    >
                                        <Title
                                            type='Poppin-14'
                                            title={toast.message}
                                            color={Colors.red}
                                            weight='600' />
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
    )
};

export default App;



const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    customToastContainer: {
        maxWidth: "85%",
        paddingHorizontal: 15,
        paddingVertical: RFPercentage(2),
        backgroundColor: Colors.white,
        marginVertical: 4,
        borderRadius: 8,
        borderLeftColor: Colors.primary,
        borderLeftWidth: 6,
        justifyContent: "center",
        paddingLeft: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});