// @app
import React, {
    useState
} from 'react';
import {
    Image,
    SafeAreaView,
    TouchableOpacity,
    View,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';

import AppHeader from '../../../../../core/components/app-headers';
import Colors from '../../../../../styles/colors';
import { styles } from './company-profile.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { centralStyle } from '../../../../../styles/constant.style';
import { Title } from '../../../../../core/components/screen-title.component';
import {
    ConnectionRequest,
    LeftIcon,
    RightIcon,
} from './company-profile-component';

import TabsUi from './call-back';
import { TABSDATA } from './data';

const CompanyProfile: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState(t('Overview'))
    const [modalEnabled, setmodalEnabled] = useState(false)

    return (
        <>
            <SafeAreaView style={styles.container}>

                {modalEnabled && <ConnectionRequest
                    navigation={navigation}
                    data={['Edit', "Share", "QR Code"]}
                    disableModal={() => setmodalEnabled(!modalEnabled)} />}

                <AppHeader
                    iconL1={LeftIcon(navigation)}
                    iconR1={RightIcon(navigation)}
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

                    <View style={[centralStyle.mx2, centralStyle.mt2]}>
                        <Title
                            title={`Main office`}
                            type='Poppin-12'
                            color={Colors.fontColor}
                            weight='400' />
                    </View>

                    <View style={[centralStyle.row, centralStyle.alignitemCenter, centralStyle.my05]}>
                        <FontAwesome5
                            style={centralStyle.mx2}
                            name={`phone-alt`}
                            size={RFPercentage(2)}
                            color={Colors.fontColor} />
                        <Title
                            title={`+1415713701`}
                            type='Poppin-16'
                            color={Colors.fontColor}
                            weight='400' />
                    </View>
                    <View style={[centralStyle.mx2, centralStyle.mt2]}>
                        <Title
                            title={`Headquarter`}
                            type='Poppin-12'
                            color={Colors.fontColor}
                            weight='400' />
                    </View>

                    <View style={[centralStyle.row, centralStyle.alignitemCenter, centralStyle.my05]}>
                        <Feather style={centralStyle.mx2} name={`map-pin`} size={RFPercentage(2)} color={Colors.fontColor} />
                        <Title
                            title={`Burlingame, CA 94010`}
                            type='Poppin-16'
                            color={Colors.fontColor}
                            weight='400' />
                    </View>
                    <View style={[centralStyle.flex1, centralStyle.XAndYCenter]}>
                        <Title
                            title={`map place`}
                            type='Poppin-16'
                            color={Colors.fontColor}
                            weight='400' />
                    </View>
                </View>
            </SafeAreaView >
        </>

    );
};

export default CompanyProfile;
