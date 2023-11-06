// @app
import React, {
    useState
} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import { Title } from '../../../core/components/screen-title.component';
import { styles } from './verify-code.style';
import { platform } from '../../../utilities';
import { useToast } from 'react-native-toast-notifications';
import { changeRoute } from '../../../core/helpers/async-storage';
import { centralStyle, windowHeight } from '../../../styles/constant.style';
import { verifyCodeValidation } from '../../../core/helpers/validation/validation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CELL_COUNT = 4;

const VerifyCode: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [value, setValue] = useState('');

    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });

    const toast = useToast();

    const handleSubmit = async () => {
        let isValid = await verifyCodeValidation(value)
        if (isValid.success) changeRoute(navigation, 'EnterNameAndEmail', { comeFromVerifyCode: true })
        else await toast.show(isValid.message, { type: "custom_toast", })
    };

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
                            source={require('../../../assets/auth-images/Device.png')} />
                    </View>
                    <View style={styles.body}>
                        <Title
                            title={t('Verify_Your_Mobile')}
                            color={Colors.black}
                            weight='600'
                            type={`Poppin-18`} />
                        <Title
                            title={t('enter_Code_Text')}
                            color={Colors.fontColor}
                            weight='400'
                            type={`Poppin-16`} />
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
                            <Button
                                callBack={handleSubmit}
                                title={t('Verify')} primary />
                        </View>
                    </View>
                </SafeAreaView></View></KeyboardAwareScrollView>

    );
};

export default VerifyCode;
