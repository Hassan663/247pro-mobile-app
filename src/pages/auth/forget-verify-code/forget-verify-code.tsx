// @app
import React, {
    useState
} from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    Text,
    SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';

import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import { changeRoute } from '../../../core/helpers/async-storage';
import { styles } from './forget-verify-code.style';
import {
    ScreenTitle,
    Title,
} from '../../../core/components/screen-title.component';
import { centralStyle, heightFlex1 } from '../../../styles/constant.style';

const CELL_COUNT = 4;

const ForgetVerifyCode: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });

    return (

        <View style={centralStyle.container}>
            <SafeAreaView style={centralStyle.container}>
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
                    <Button callBack={() => changeRoute(navigation, 'SetNewPassword')} title={t(`Verify_Proceed`)} primary />
                </View>

            </SafeAreaView>
        </View>
    );
};

export default ForgetVerifyCode;
