import React, {
    useEffect,
    useState
} from 'react';

import { Dispatch } from 'redux';
import { ToastProvider } from 'react-native-toast-notifications'
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
    Provider,
    useDispatch,
    useSelector
} from 'react-redux';
import {
    LogBox,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

import store from './src/store';
import Colors from './src/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigation from './src/router/tab/index';
import AuthNavigation from './src/router/auth';
import ScreenLoader from './src/core/components/screen-loader-component';
import { Title } from './src/core/components/screen-title.component';
import { platform } from './src/utilities';
import { loginAction } from './src/store/action/action';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { I18nextProvider } from 'react-i18next';
import i18n, {
    fetchTranslations
} from './src/i18n';
import MainNavigator from './src/router';

// Ignore warnings
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
LogBox.ignoreAllLogs();

const MainComponent: React.FC = () => {

    const [authState, setAuthState] = useState<any>(true)
    const { currentUserProfile, splashStatusBar, initialRoute } = useSelector((state: any) => state.root)

    useEffect(() => {
        if (Object.keys(currentUserProfile).length > 0) setAuthState(false)
        else { setAuthState(true) }
    }, [currentUserProfile])

    const dispatch: Dispatch<any> = useDispatch();

    // Check if user is already logged in
    const checkLoginStatus = async () => {
        let accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken !== null) {
            await dispatch(loginAction('', '', JSON.parse(accessToken)))
        }
    };

    useEffect(() => { checkLoginStatus() }, [])

    return (
        <>
            {platform == 'ios'
                ?
                authState ?
                    <></> :
                    <MyStatusBar backgroundColor={Colors.white} barStyle="light-content" /> :
                authState ?
                    splashStatusBar === 'walkThrough' ?
                        <StatusBar barStyle="dark-content" backgroundColor={'transparent'} hidden={false} translucent={true} />
                        :
                        splashStatusBar === true ?
                            <MyStatusBar backgroundColor={Colors.primary} barStyle="light-content" /> :
                            <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" /> :
                    <StatusBar barStyle="dark-content" backgroundColor={'transparent'} hidden={false} translucent={true} />
            }
            {<MainNavigator />
            }
            {/* {authState ? <MainNavigator /> : <AppNavigation />
            } */}

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
                                    <View style={styles.customToastContainer} >
                                        <Title
                                            type='Poppin-14'
                                            title={toast.message}
                                            color={Colors.red}
                                            weight='400' />
                                    </View>
                                ),
                                custom_success_toast: (toast) => (
                                    <View style={[styles.customToastContainer, { borderLeftColor: Colors.success }]}>
                                        <Title
                                            type='Poppin-14'
                                            title={toast.message}
                                            color={Colors.success} // Change color for success
                                            weight='400'
                                        />
                                    </View>
                                ),
                            }}
                        >
                            <ScreenLoader />
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
        borderLeftColor: Colors.red,
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