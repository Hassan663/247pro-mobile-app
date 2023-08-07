// @app
import React, {
    useState
} from 'react';
import {
    View,
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
import { styles } from './verify-buisness.style';
import { changeRoute } from '../../../core/helpers/async-storage';

const VerifyBuisness: React.FC<{ navigation: any }> = ({ navigation }) => {

    const [isCheck, setIsCheck] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => changeRoute(navigation, 'pop')}>
                    <AntDesign name={`left`} size={RFPercentage(3)} />
                </TouchableOpacity>

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
                    weight='700'
                    title={t(`Are_you_a_business`)}
                    type={`Poppin-18`} />
                <View style={styles.row}>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setIsCheck(false)}
                        style={[styles.row, styles.radioWrapper]}>
                        <Fontisto
                            name={isCheck ? `radio-btn-passive` : `radio-btn-active`}
                            style={styles.mx}
                            color={!isCheck ? Colors.primary : Colors.fontColor}
                            size={RFPercentage(3)}
                        />
                        <Title
                            color={Colors.fontColor}
                            weight='500'
                            title={t(`yes`)}
                            type={`Poppin-14`} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setIsCheck(true)}
                        style={[styles.row, styles.radioWrapper]}>
                        <Fontisto
                            name={!isCheck ? `radio-btn-passive` : `radio-btn-active`}
                            color={isCheck ? Colors.primary : Colors.fontColor}
                            style={styles.mx}
                            size={RFPercentage(3)} />
                        <Title
                            color={Colors.fontColor}
                            weight='500'
                            title={t(`no`)}
                            type={`Poppin-14`} />
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.footer}>
                <Button title={t('Next')} primary />
            </View>

        </View>
    );
};

export default VerifyBuisness;
