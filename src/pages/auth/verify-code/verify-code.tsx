// @app
import React, {
    useState
} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import { Title } from '../../../core/components/screen-title.component';
import { styles } from './verify-code.style';
import { changeRoute } from '../../../core/helpers/async-storage';

const VerifyCode: React.FC<{ navigation: any }> = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <AntDesign size={RFPercentage(3)} name={'left'} />
            <View style={{ flex: 3.5, justifyContent: "flex-end" }}>
                <Image style={{ alignSelf: "center", margin: RFPercentage(2), height: '70%', width: "70%" }} resizeMode='contain' source={require('../../../assets/auth-images/Device.png')} />
            </View>
            <View style={{ flex: 6.5, }}>
                <Title
                    title={t('Verify_Your_Mobile') }
                    color={Colors.black}
                    weight='600'
                    type={`Poppin-18`} />
                <Title
                    title={t('enter_Code_Text')}
                    color={Colors.fontColor}
                    weight='400'
                    type={`Poppin-16`} />
                <View style={{ height: RFPercentage(15), backgroundColor: "red" }}></View>
                <Title
                    title={t('resentText')}
                    color={Colors.fontColor}
                    weight='400'
                    type={`Poppin-16`} />
                <Title
                    title={t('RESEND_CODE')}
                    color={Colors.primary}
                    weight='600'
                    type={`Poppin-14`} />

                <View style={styles.footer}>
                    <Button title={t('Verify')} primary />
                </View>
            </View>

        </View>
    );
};

export default VerifyCode;
