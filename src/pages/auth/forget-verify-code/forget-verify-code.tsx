// @app
import React, {
    useState
} from 'react';
import {
    View,
    ScrollView,
    Image,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import { Title } from '../../../core/components/screen-title.component';
import { styles } from './forget-verify-code.style';
import { changeRoute } from '../../../core/helpers/async-storage';
import { centralStyle, windowHeight } from '../../../styles/constant.style';
import { useToast } from 'react-native-toast-notifications';
import { verifyCodeValidation } from '../../../core/helpers/validation/validation';

const CELL_COUNT = 4;

const ForgetVerifyCode: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [value, setValue] = useState('');
    // const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT, callback: value.length == 4 && handleSubmit() });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });

    const toast = useToast();

    // async function handleSubmit() {
    //     let isValid = await verifyCodeValidation(value)
    //     if (isValid.success) changeRoute(navigation, 'SetNewPassword')
    //     else await toast.show(isValid.message, { type: "custom_toast", })
    // }

    const handleSubmit = async () => {
        let isValid = await verifyCodeValidation(value)
        if (isValid.success) changeRoute(navigation, 'SetNewPassword')
        else await toast.show(isValid.message, { type: "custom_toast", })
    };

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
                        <View style={{ width: '60%' }}>
                            <Title
                                color={Colors.black}
                                weight='600'
                                title={t(`Get_your_code`)}
                                type={`Poppin-24`} />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        {!'email' ?
                            <Title
                                type={`Poppin-16`}
                                color={Colors.fontColor}
                                weight='400' title={t(`Code_has_been_sent_to_your_phone_number`)} />
                            :
                            <Title
                                type={`Poppin-16`}
                                color={Colors.fontColor}
                                weight='400' title={t(`Code_has_been_sent_to_your_EmailAddress`)} />
                        }
                        {!'email' ?
                            <Title
                                type={`Poppin-16`}
                                color={Colors.primary}
                                weight='400' title={'(415) 713-7168'} />
                            :
                            <Title
                                type={`Poppin-16`}
                                color={Colors.primary}
                                weight='400' title={'geolee@247pro.com'} />
                        }
                        <View style={styles.inputWrapper}>
                            <CodeField
                                // ref={ref}
                                {...props}
                                value={value}
                                onChangeText={setValue}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Text
                                        key={index}
                                        style={[styles.cell, isFocused && styles.focusCell]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                        </View>
                        <Title
                            type={`Poppin-14`}
                            color={Colors.fontColor}
                            weight='400' title={t(`resentText`)} />
                        <Title
                            type={`Poppin-12`}
                            color={Colors.primary}
                            weight='600' title={t(`RESEND_CODE`)} />
                    </View>

                    <View style={[styles.logInBtnContainer,]}>
                        <View />
                        <Button
                            callBack={handleSubmit}
                            title={t(`Verify_Proceed`)} primary />
                    </View>

                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default ForgetVerifyCode;
