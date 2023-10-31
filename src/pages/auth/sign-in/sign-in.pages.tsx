// @app
import React, { useState } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Colors from '../../../styles/colors';
import Input from '../../../core/components/input.component';
import Button from '../../../core/components/button.component';
import { styles } from './sign-in.style';
import { changeRoute } from '../../../core/helpers/async-storage';
import { ISUSERLOGIN } from '../../../store/constant/constant';
import { RootStackParamList } from '../../../router/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    centralStyle,
    windowHeight
} from '../../../styles/constant.style';
import {
    FooterText,
    Title
} from '../../../core/components/screen-title.component';
import { FaceIdLogo } from '../../../assets/svg-icons/CustomSvgIcon';

type Navigation = StackNavigationProp<RootStackParamList>;

const SignIn: React.FC = () => {

    const navigation = useNavigation<Navigation>();
    const [isSelected, setisSelected] = useState<boolean>(false)
    const dispatch = useDispatch()
    return (
        <KeyboardAwareScrollView>
            <View style={[centralStyle.container, { height: windowHeight }]}>
                <View style={styles.titleWrapper}>
                    <View style={styles.titleContainer}>

                        <Title
                            type='Poppin-24'
                            title={t(`Welcome_To`)}
                            weight='600' />
                        <Title
                            type='Poppin-24'
                            title={t(`247PRO`)}
                            color={Colors.primary}
                            weight='600' />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={centralStyle.my05}>
                        <Input placeholder={t('Phone_or_email')} />
                    </View>
                    <View style={centralStyle.my05}>
                        <Input password secureText placeholder={t('Password')} />
                    </View>
                    <View style={styles.checkBoxWrapper}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => setisSelected(!isSelected)}
                            style={[styles.row, { alignItems: "center", height: RFPercentage(3) }]}
                        >
                            {isSelected ?
                                <AntDesign
                                    style={styles.mr1}
                                    color={Colors.fontColor}
                                    name={'checksquareo'}
                                    size={RFPercentage(2.5)} />
                                :
                                <Feather
                                    style={styles.mr1}
                                    color={Colors.gray}
                                    name={'square'}
                                    size={RFPercentage(2.5)} />
                            }
                            <Title
                                type={'Poppin-14'}
                                color={Colors.fontColor}
                                title={t('Remember_me')} />

                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => changeRoute(navigation, 'ForgetPassword')}>
                            <Title
                                type={'Poppin-14'}
                                color={Colors.primary}
                                title={t('Forget_Password')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.logInBtnContainer, {}]}>
                    <Button
                        title={t('logintText')}
                        callBack={() => {
                            dispatch({
                                type: ISUSERLOGIN,
                                payload: true
                            });
                        }}
                        primary />

                    <View style={[
                        centralStyle.row,
                        centralStyle.justifyContentBetween,
                        centralStyle.alignitemCenter,
                        centralStyle.width30,
                        centralStyle.selfCenter,
                        centralStyle.mt2]}>
                        <TouchableOpacity activeOpacity={.8}>
                            <FaceIdLogo
                                width={RFPercentage(4)}
                                height={RFPercentage(4)}
                                color={Colors.black} />
                        </TouchableOpacity>
                        <View style={styles.yline}></View>
                        <TouchableOpacity activeOpacity={.8}>
                            <Image
                                style={styles.fingerPrintImg}
                                source={require('../../../assets/app-images/fingerprint.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.orContainer}>
                        <View style={styles.line} />
                        <Title
                            type={'Poppin-14'}
                            color={Colors.lightGray}
                            title={t('or')} />
                        <View style={styles.line} />
                    </View>
                    <Button
                        icon={<Image source={require('../../../assets/auth-images/googleIcon.png')} style={[styles.googleIcon, centralStyle.mr1]} />}
                        title={t('Continue_with_google')}
                        customStyle={[centralStyle.socialButtonContainer,]}
                        titleStyle={styles.socialText}
                    />
                    <Button
                        icon={<AntDesign name={`apple1`} size={RFPercentage(2.5)} style={centralStyle.mr1} />}
                        title={" " + t('Continue_with_Apple')}
                        customStyle={centralStyle.socialButtonContainer}
                        titleStyle={styles.socialText}
                    />
                </View>
                <View style={styles.footerContainer}>
                    <FooterText title={t('New_here') + " "} />
                    <TouchableOpacity onPress={() => changeRoute(navigation, 'SignUp')} activeOpacity={0.8}>
                        <FooterText color={Colors.primary} title={t('Create_an_free_account') + ' '} />
                    </TouchableOpacity>
                </View>
            </View >
        </KeyboardAwareScrollView>
    );
};
export default SignIn;
