import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalProvider } from '@gorhom/portal';
import { Provider } from 'react-redux';
import { LogBox, StatusBar } from 'react-native';

import AppNavigation from './src/router/tab/index';
import store from './src/store';
import AuthNavigation from './src/router/auth';
import { LOGIN_ENDPOINT } from './src/core/http-services/apis/apis';

// Ignore warnings
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
LogBox.ignoreAllLogs();

const MainComponent: React.FC = () => (1 === 1 ? <AuthNavigation /> : <AppNavigation />);

const App: React.FC = () => (
    <Provider store={store}>
        <StatusBar hidden={true} />
        <SafeAreaProvider>
            <PortalProvider>
            {alert(process.env.BASE_URL)}
                <MainComponent />
            </PortalProvider>
        </SafeAreaProvider>
    </Provider>
);

export default App;