// @app
import React, {
    useEffect,
    useState
} from 'react';
import {
    View,
    Image,
    SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { styles } from './enter-name-and-email.style';
import { Title } from '../../../core/components/screen-title.component';
import { changeRoute } from '../../../core/helpers/async-storage';
import { centralStyle, windowHeight } from '../../../styles/constant.style';
import { useToast } from 'react-native-toast-notifications';
import { enterNameAndEmailValidation } from '../../../core/helpers/validation/validation';
import { signUpAction } from '../../../store/action/action';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../core/components/loader.component';

const EnterNameAndEmail: React.FC<{ navigation: any }> = ({ navigation, route }: any) => {
    const [name, setName] = useState('Ahmed shah')
    const [email, setEmail] = useState('momo19@gmail.com')
    const [password, setPassword] = useState('Karachi@123456')
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const loader = useSelector((state: any) => state.root.loader);

    const toast = useToast();
    const dispatch: Dispatch<any> = useDispatch();

    const handleSubmit = async () => {
        if (!isToastVisible) {
            let isValid = await enterNameAndEmailValidation(name, email, password, route?.params?.comeFromVerifyCode)
            if (isValid.success) {
                if (!route?.params?.comeFromVerifyCode) {
                    // console.log('EmailVerifyCode')
                    if (isValid.success) await dispatch(signUpAction(name, email, password,));
                    // changeRoute(navigation, 'EmailVerifyCode')
                }
                else changeRoute(navigation, 'VerifyBuisness')
            }
            else {
                setIsToastVisible(true);
                await toast.show(isValid.message, { type: "custom_toast", })
                setTimeout(() => {
                    setIsToastVisible(false);
                }, 5000);
            }
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => { toast.hideAll() });
        return unsubscribe;
    }, [navigation]);

    return (
        <KeyboardAwareScrollView>
            <View style={[centralStyle.container, { height: windowHeight }]}>
                <SafeAreaView style={centralStyle.flex1}>
                    <View style={styles.titleWrapper}>
                        <AntDesign
                            onPress={() => changeRoute(navigation, 'pop')}
                            color={Colors.fontColor}
                            name={`left`}
                            size={RFPercentage(2.5)} />
                        <Image style={styles.logoStyle} source={require('../../../assets/auth-images/splashLogo.png')} />
                        <Title
                            color={Colors.black}
                            weight='600'
                            title={t(`Welcome_to_247PRO`) + '!'}
                            type={`Poppin-24`} />
                        <Title
                            color={Colors.fontColor}
                            title={t(`Please_provide_your_login_information`)}
                            type={`Poppin-16`} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <OutlinedTextInput
                            val={name}
                            onChange={(val) => { setName(val) }}
                            title={t('Full_name')}
                            placeHolder={t('Full_name')}
                        />
                        {!route?.params?.comeFromVerifyCode &&
                            <OutlinedTextInput
                                val={email}
                                onChange={(val) => { setEmail(val) }}
                                title={t('Email')}
                                placeHolder={t('Email')}
                            />
                        }
                        <OutlinedTextInput
                            val={password}
                            onChange={(val) => { setPassword(val) }}
                            title={t('Password')}
                            placeHolder={t('Password')}
                        />
                    </View>
                    <View style={styles.footer}>
                        {!loader ?
                            <Button
                                title={t('Next')}
                                callBack={handleSubmit}
                                primary
                            />
                            :
                            <View style={[styles.primaryBtnClone, centralStyle.XAndYCenter]}>
                                <Loader size={'small'} color={Colors.white} />
                            </View>
                        }
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default EnterNameAndEmail;
