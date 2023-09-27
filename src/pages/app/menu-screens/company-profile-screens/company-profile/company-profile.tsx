// @app
import React from 'react';
import { SafeAreaView, } from 'react-native';

import { t } from 'i18next';

import AppHeader from '../../../../../core/components/app-headers';
import { styles } from './company-profile.style';
import {
    LeftIcon,
    RightIcon,
} from './company-profile-component';

const CompanyProfile: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <>

            <SafeAreaView style={styles.container}>
                <AppHeader
                    iconL1={LeftIcon(navigation)}
                    iconR1={RightIcon(navigation)}
                    type='Poppin-18'
                    weight='600'
                    title={t(`Contacts`)} />

            </SafeAreaView >
        </>

    );
};

export default CompanyProfile;
