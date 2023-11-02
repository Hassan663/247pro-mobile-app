// @app
import React, {
    useState
} from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import { Title } from '../../../core/components/screen-title.component';
import { styles } from './email-verify-code.style';
import { changeRoute } from '../../../core/helpers/async-storage';
import {
    centralStyle,
    windowHeight
} from '../../../styles/constant.style';

const CELL_COUNT = 4;

const EmailVerifyCode: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });

    return (
        <KeyboardAwareScrollView>
            <View style={[centralStyle.container, { height: windowHeight }]}>
                <SafeAreaView style={[centralStyle.flex1,]}>

                    <AntDesign
                        onPress={() => changeRoute(navigation, 'pop')}
                        color={Colors.fontColor}
                        name={`left`}
                        size={RFPercentage(2.5)} />
                    <View style={styles.deviceContainer}>
                        <Image
                            style={styles.mobileImg}
                            resizeMode='contain'
                            source={require('../../../assets/app-images/device.png')} />
                    </View>
                    <View style={styles.body}>
                        <View style={centralStyle.flex1}>
                            <Title
                                title={t('Verify_Your_Email')}
                                color={Colors.black}
                                weight='600'
                                type={`Poppin-18`} />
                            <Title
                                title={t('emailVerifyMsg')}
                                color={Colors.fontColor}
                                weight='400'
                                type={`Poppin-16`} />
                            <CodeField
                                ref={ref}
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

                        </View>

                        <View style={[styles.footer,]}>
                            <View style={[centralStyle.flex1, centralStyle.mx1]}>

                                <Button
                                    callBack={() => changeRoute(navigation, 'EnterNameAndEmail', { comeFromVerifyCode: true })}
                                    title={t('Verify')}
                                    primary />
                            </View>
                            <View style={[centralStyle.flex1, centralStyle.mx1]}>
                                <Button
                                    callBack={() => changeRoute(navigation, 'EnterNameAndEmail', { comeFromVerifyCode: true })}
                                    customStyle={styles.verifyLaterBtn}
                                    titleStyle={styles.verifyLaterBtnTitle}
                                    title={t('VerifyLater')} />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView >
    );
};

export default EmailVerifyCode;
