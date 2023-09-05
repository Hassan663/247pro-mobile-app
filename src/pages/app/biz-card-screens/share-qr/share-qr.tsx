// @app
import React, {
    useState
} from 'react';
import {
    Image,
    View,
    SafeAreaView,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import AppHeader from '../../../../core/components/app-headers';
import { platform } from '../../../../utilities';
import { centralStyle } from '../../../../styles/constant.style';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './share-qr.style';
import { CreateBuisnessCartModal } from './share-qr-component';

const ShareQR: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const [modalEnabled, setModalEnabled] = useState(true)

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                iconL1={
                    <AntDesign
                        onPress={() => changeRoute(navigation, 'pop')}
                        style={centralStyle.mx2} name={'left'}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />
                }
            />

            {modalEnabled && <CreateBuisnessCartModal />}
            <View style={[centralStyle.selfCenter, centralStyle.mb3]}>
                <View style={centralStyle.my3}>
                    <Title
                        type='Poppin-20'
                        weight='700'
                        title={`Sharing George Lee`}
                        color={Colors.black} />

                </View>
                <Image style={styles.qrStyle} source={require('../../../../assets/app-images/qr.png')} />
                <View style={styles.btnContainer}>
                    <Button title='Share Card' primary />
                </View>
            </View>
            <View style={styles.listWrapper}>
                <View style={[styles.rowContainerData, styles.removeBorder]}>
                    <Feather
                        name={`lock`}
                        color={Colors.black}
                        style={centralStyle.mx2}
                        size={RFPercentage(2.5)} />
                    <Title
                        type='Poppin-14'
                        weight='400'
                        title={t('Copycardlink')}
                        color={Colors.fontColor} />
                </View>
                <View style={styles.rowContainerData}>
                    <SimpleLineIcons
                        name={`picture`}
                        color={Colors.black}
                        style={centralStyle.mx2}
                        size={RFPercentage(2.5)} />
                    <Title
                        type='Poppin-14'
                        weight='400'
                        title={t('SaveQRtoPhotos')}
                        color={Colors.fontColor} />
                </View>
                <View style={styles.rowContainerData}>
                    <Fontisto
                        name={`email`}
                        color={Colors.black}
                        style={centralStyle.mx2}
                        size={RFPercentage(2.5)} />
                    <Title
                        type='Poppin-14'
                        weight='400'
                        title={t('ShareQRviaEmail')}
                        color={Colors.fontColor} />
                </View>
                <View style={styles.rowContainerData}>
                    <Ionicons
                        name={`chatbubble-outline`}
                        color={Colors.black}
                        style={centralStyle.mx2}
                        size={RFPercentage(2.5)} />
                    <Title
                        type='Poppin-14'
                        weight='400'
                        title={t('ShareCardviaText')}
                        color={Colors.fontColor} />
                </View>
                <View style={styles.rowContainerData}>
                    <Entypo
                        name={`dots-three-horizontal`}
                        color={Colors.black}
                        style={centralStyle.mx2}
                        size={RFPercentage(2.5)} />
                    <Title
                        type='Poppin-14'
                        weight='400'
                        title={t('Shareanotherway')}
                        color={Colors.fontColor} />
                </View>
            </View>
        </SafeAreaView >

    );
};

export default ShareQR;
