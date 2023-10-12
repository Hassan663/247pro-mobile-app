import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
    LogBox,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

import AppNavigation from './src/router/tab/index';
import store from './src/store';
import AuthNavigation from './src/router/auth';

import Colors from './src/styles/colors';
import { platform } from './src/utilities';
import { I18nextProvider } from 'react-i18next';
import i18n, {
    fetchTranslations
} from './src/i18n';

// Ignore warnings
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
LogBox.ignoreAllLogs();
const auth = false;
const MainComponent: React.FC = () => (auth ? <AuthNavigation /> : <AppNavigation />);

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
                {
                    platform == 'ios'
                        ?
                        auth ?
                            <></> :
                            <MyStatusBar backgroundColor={Colors.white} barStyle="light-content" /> :
                        auth ?
                            <MyStatusBar backgroundColor={Colors.white} barStyle="light-content" /> :
                            <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
                }

                <SafeAreaProvider>
                    <PortalProvider>
                        {/* {alert(process.env.BASE_URL)} */}
                        <MainComponent />
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
});