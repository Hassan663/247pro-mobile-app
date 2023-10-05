// @app
import React, {
    useState
} from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    View,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';

import { t } from 'i18next';

import Colors from '../../../../../styles/colors';
import TabsUi from '../company-profile/company-profile-component';
import AppHeader from '../../../../../core/components/app-headers';
import { Title } from '../../../../../core/components/screen-title.component';
import { styles } from './edit-company-profile.style';
import { platform } from '../../../../../utilities';
import { changeRoute } from '../../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../../styles/constant.style';
import {
    TABSDATA
} from './data';
import {
    EditOverView,
    EdtiPhotos,
    ServiceUi
} from './edit-company-profile-component';
import { PHOTOTABSDATA } from '../company-profile/data';

const EditCompanyProfile: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState(t('Overview'))

    return (
        <KeyboardAvoidingView
            style={[centralStyle.flex1]}
            behavior={platform === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView style={styles.container}>

                <AppHeader
                    iconL1={
                        <TouchableOpacity
                            onPress={() => changeRoute(navigation, 'pop')}
                            activeOpacity={.8}
                            style={centralStyle.mx2}>
                            <Title
                                color={Colors.primary}
                                type='Poppin-14'
                                weight='600'
                                title={t('Cancel')} />
                        </TouchableOpacity>
                    }
                    iconR1={
                        <View style={centralStyle.mx2}>
                            <Title
                                color={Colors.primary}
                                type='Poppin-14'
                                weight='600'
                                title={t('Done')} />
                        </View>
                    }
                    type='Poppin-18'
                    weight='600'
                    title={t(`EditCompanyProfile`)} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={centralStyle.row}>
                        {TABSDATA.map((item, index) => (
                            <TabsUi
                                item={item}
                                index={index}
                                setSelectedTab={setSelectedTab}
                                selectedTab={selectedTab} />
                        ))}
                    </View>
                    {selectedTab == t('Overview') ? <EditOverView /> :
                        selectedTab == t('Services') ? <ServiceUi /> :
                            selectedTab == t('Photos') && <EdtiPhotos />
                    }
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default EditCompanyProfile;
