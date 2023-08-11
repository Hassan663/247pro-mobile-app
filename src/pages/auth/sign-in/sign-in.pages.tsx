// @app
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { styles } from './sign-in.style';
import {
    ScreenTitle,
    FooterText,
    Title
} from '../../../core/components/screen-title.component';
import Colors from '../../../styles/colors';
import Input from '../../../core/components/input.component';
import Button from '../../../core/components/button.component';
import { changeRoute } from '../../../core/helpers/async-storage';
import { RootStackParamList } from '../../../router/auth';

const windowHeight = Dimensions.get('window').height;
const heightFlex1 = windowHeight / 10

type Navigation = StackNavigationProp<RootStackParamList>;

const SignIn: React.FC = () => {

    const navigation = useNavigation<Navigation>();
    const [isSelected, setisSelected] = useState<boolean>(false)

    return (
        <ScrollView contentContainerStyle={{ height: heightFlex1 * 10, }}>
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <View style={styles.titleContainer}>
                        <ScreenTitle widthAuto title={'Welcome to'} />
                        <ScreenTitle color={Colors.primary} title={'247PRO'} />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Input placeholder={`Email`} />
                    <Input secureText placeholder={`Password`} />
                    <View style={styles.checkBoxWrapper}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => setisSelected(!isSelected)}
                            style={styles.row}
                        >
                            {isSelected ?
                                <AntDesign
                                    style={styles.mr1}
                                    name={'checksquareo'}
                                    size={RFPercentage(3)} />
                                :
                                <Feather
                                    style={styles.mr1}
                                    name={'square'}
                                    size={RFPercentage(3)} />
                            }
                            <Title
                                type={'Poppin-14'}
                                color={Colors.fontColor}
                                title={'Remember me'} />

                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => changeRoute(navigation, 'ForgetPassword')}>
                            <Title
                                type={'Poppin-14'}
                                color={Colors.primary}
                                title={'Forget Password'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.logInBtnContainer, {}]}>
                    <Button title={`Login`} primary />
                    <View style={styles.orContainer}>
                        <View style={styles.line} />
                        <Title
                            type={'Poppin-14'}
                            color={Colors.lightGray}
                            title={'or'} />
                        <View style={styles.line} />
                    </View>
                    <Button
                        icon={<Image source={require('../../../assets/auth-images/googleIcon.png')} style={styles.googleIcon} />}
                        title={`Continue with google`}
                        customStyle={[styles.socialButtonContainer,]}
                        titleStyle={styles.socialText}
                    />
                    <Button
                        icon={<AntDesign name={`apple1`} size={RFPercentage(3)} />}
                        title={` Continue with Apple`}
                        customStyle={styles.socialButtonContainer}
                        titleStyle={styles.socialText}
                    />
                </View>
                <View style={styles.footerContainer}>
                    <FooterText title={'New here? '} />
                    <TouchableOpacity onPress={() => changeRoute(navigation, 'SignUp')} activeOpacity={0.8}>
                        <FooterText color={Colors.primary} title={'Create an free account '} />
                    </TouchableOpacity>
                </View>
            </View >
        </ScrollView>
    );
};
export default SignIn;
