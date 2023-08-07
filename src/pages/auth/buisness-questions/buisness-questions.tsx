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
import { styles } from './buisness-questions.style';
import { changeRoute } from '../../../core/helpers/async-storage';
import OutlinedDropDown from '../../../core/components/outlined-dropdown.component';

const BuisnessQuestions: React.FC<{ navigation: any }> = ({ navigation }) => {

     const [industry, setIndustry] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => changeRoute(navigation, 'pop')}>
                    <AntDesign name={`left`} size={RFPercentage(3)} />
                </TouchableOpacity>

                <Image style={styles.logoStyle} source={require('../../../assets/auth-images/splashLogo.png')} />
                <Title
                    color={Colors.black}
                    weight='600'
                    title={t(`completeQuestions`)}
                    type={`Poppin-18`} />
            </View>
            <View style={styles.inputWrapper}>
                <OutlinedDropDown
                    val={industry}
                    onChange={(val) => { setIndustry(val) }}
                />
            </View>

            <View style={styles.footer}>
                <Button title={t('Next')} primary />
            </View>

        </View>
    );
};

export default BuisnessQuestions;
