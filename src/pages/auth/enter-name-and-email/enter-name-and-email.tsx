// @app
import React, { } from 'react';
import {
    View,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';

import { t } from 'i18next';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import { styles } from './enter-name-and-email.style';
import {
    ScreenTitle,
    Title,
} from '../../../core/components/screen-title.component';

const windowHeight = Dimensions.get('window').height;
const heightFlex1 = windowHeight / 10;

const VerifyBuisness: React.FC<{ navigation: any }> = ({ navigation }) => {

    return (
        <ScrollView contentContainerStyle={{ height: heightFlex1 * 10 }}>
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Image style={styles.logoStyle} source={require('../../../assets/auth-images/splashLogo.png')} />
                    <View style={styles.headerDisc}>
                        <Title
                            color={Colors.fontColor}
                            weight='400'
                            title={t(`verifyBuisnessHeader`)}
                            type={`Poppin-16`} />
                    </View>
                </View>
                <View style={styles.inputWrapper}>
                    <Title
                        color={Colors.black}
                        weight='600'
                        title={t(`Are_you_a_business`)}
                        type={`Poppin-18`} />
                    <View style={styles.row}></View>
                </View>
                <View style={styles.footer}>
                    <Button title={t('Next')} primary />
                </View>
            </View>
        </ScrollView>
    );
};

export default VerifyBuisness;
