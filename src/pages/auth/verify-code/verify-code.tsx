// @app
import React, {
    useState,
    useEffect
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
import { styles } from './verify-code.style';
import { useToast } from 'react-native-toast-notifications';
import { changeRoute } from '../../../core/helpers/async-storage';
import { verifyCodeValidation } from '../../../core/helpers/validation/validation';
import { centralStyle, windowHeight } from '../../../styles/constant.style';

const CELL_COUNT = 4;

const VerifyCode: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [value, setValue] = useState('');
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });

    const toast = useToast();

    const handleSubmit = async () => {
        if (!isToastVisible) {
            let isValid = await verifyCodeValidation(value)
            if (isValid.success) changeRoute(navigation, 'EnterNameAndEmail', { comeFromVerifyCode: true })
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
