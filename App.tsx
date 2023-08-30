import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalProvider } from '@gorhom/portal';
import { Provider } from 'react-redux';
import {
    LogBox,
    StatusBar,
} from 'react-native';

import AppNavigation from './src/router/tab/index';
import store from './src/store';
import AuthNavigation from './src/router/auth';

import { I18nextProvider } from 'react-i18next';
import i18n, { fetchTranslations } from './src/i18n';

// Ignore warnings
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
LogBox.ignoreAllLogs();

const MainComponent: React.FC = () => (1 !== 1 ? <AuthNavigation /> : <AppNavigation />);

const App: React.FC = () => {

    const getTranslations = async () => { return fetchTranslations(); };

    useEffect(() => { getTranslations(); }, []);

    return (
        <I18nextProvider i18n={i18n}>

            <Provider store={store}>
                {/* <StatusBar hidden={true} /> */}
                {/* <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} /> */}

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