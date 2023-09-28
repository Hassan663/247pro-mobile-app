// @app
import React, {
    useState
} from 'react';
import {
    Image,
    SafeAreaView,
    View,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';

import AppHeader from '../../../../../core/components/app-headers';
import Colors from '../../../../../styles/colors';
import { TABSDATA } from './data';
import { styles } from './company-profile.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { centralStyle } from '../../../../../styles/constant.style';
import { Title } from '../../../../../core/components/screen-title.component';
import TabsUi, {
    LeftIcon,
    MoreOptions,
    OverView,
    Photos,
    Reviews,
    RightIcon,
    Service,
} from './company-profile-component';
import { ProgressBar } from 'react-native-paper';

const CompanyProfile: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState(t('Overview'))
    const [modalEnabled, setmodalEnabled] = useState(false)

    return (
        <>
            <SafeAreaView style={styles.container}>

                {modalEnabled && <MoreOptions
                    navigation={navigation}
                    data={[t('Edit'), t('Share'), t('QRCode')]}
                    disableModal={() => setmodalEnabled(!modalEnabled)} />}

                <AppHeader
                    iconL1={LeftIcon(navigation)}
                    iconR1={RightIcon(navigation, setmodalEnabled)}
                    type='Poppin-18'
                    weight='600'
                    title={t(`CompanyProfile`)} />

                <View style={[styles.headerContainer, centralStyle.mx2, centralStyle.row]}>
                    <View style={[styles.imageContainer, centralStyle.XAndYCenter]}>
                        <Image source={require('../../../../../assets/app-images/companyIcon.png')}></Image>
                    </View>

                    <View style={[styles.headerBody, centralStyle.justifyContentCenter]}>

                        <Title title={t(`NoCompanyName`)} type='Poppin-18' color={Colors.black} weight='600' />
                        <View style={[centralStyle.row, centralStyle.alignitemCenter]}>

                            <Title title={t(`5.0`)} type='Poppin-16' color={Colors.fontColor} weight='400' />
                            <View style={[centralStyle.mx1, centralStyle.row,]}>
                                {[0, 0, 0, 0, 0].map(() => <AntDesign name={`star`} size={RFPercentage(1.5)} color={Colors.yellow} />)}
                            </View>
                            <Title title={t(`(22)`)} type='Poppin-16' color={Colors.blue} weight='400' />

                        </View>
                        <Title title={t(`Generalcontractor`)} type='Poppin-16' color={Colors.fontColor} weight='400' />

                    </View>
                </View>

                <View style={[centralStyle.flex1, styles.bodyContainer]}>
                    <View style={centralStyle.row}>
                        {TABSDATA.map((item, index) => (
                            <TabsUi
                                item={item}
                                index={index}
                                setSelectedTab={setSelectedTab}
                                selectedTab={selectedTab} />
                        ))}
                    </View>
                    {
                        selectedTab == t('Overview') ? <OverView /> :
                            selectedTab == t('Services') ? <Service /> :
                                selectedTab == t('Photos') ? <Photos /> :
                                    selectedTab == t('Reviews') && <Reviews />
                    }

                </View>
            </SafeAreaView >
        </>

    );
};

export default CompanyProfile;
