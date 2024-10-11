import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Image,
    SafeAreaView,
    TextInput,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useToast } from 'react-native-toast-notifications';
import Colors from '../../../styles/colors';
import Button from '../../../core/components/button.component';
import OutlinedTextInput from '../../../core/components/outlined-textInput.component';
import { styles } from './sign-up.style';
import { enterNameAndEmailValidation, passwordValidation, emailValidation } from '../../../core/helpers/validation/validation';
import { centralStyle, windowHeight } from '../../../styles/constant.style';
import { changeRoute } from '../../../core/helpers/async-storage';
import { Title, FooterText } from '../../../core/components/screen-title.component';
import ModalComp from '../../../core/components/modal-component';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAction, showError, socialLoginAction } from '../../../store/action/action';
import Loader from '../../../core/components/loader.component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LanguageDropDown } from './sign-up.components';
import InAppBrowser from 'react-native-inappbrowser-reborn';
const SignUp: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<any>({
        nameError: '',
        emailError: '',
        passwordError: '',
    });
    const [isValid, setIsValid] = useState<boolean>(false);
    const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false); // Control language modal
    const [selectedLanguage, setSelectedLanguage] = useState<string>('English'); // Store selected language
    const toast = useToast();
    const loader = useSelector((state: any) => state.root.loader);
    const dispatch = useDispatch();

    // Validation logic
    useEffect(() => {
        const validateForm = () => {
            const result = enterNameAndEmailValidation(name, email, password, false);
            setIsValid(result.success);
        };
        validateForm();
    }, [name, email, password]);

    const firstNameInputRef = useRef<TextInput>(null);

    // Focus the first name input field when the screen loads
    useEffect(() => {
        firstNameInputRef.current?.focus();
    }, []);

    // Language modal handling
    const toggleLanguageModal = () => {
        setShowLanguageModal(!showLanguageModal);
    };

    const handleLanguageChange = (newLanguage: string) => {
        setSelectedLanguage(newLanguage);
        toggleLanguageModal(); // Close modal after selection
    };
    const openLink = async (url: string) => {
        if (await InAppBrowser.isAvailable()) {
            await InAppBrowser.open(url, {
                // Additional options can be set here
                dismissButtonStyle: 'cancel',
                
                preferredBarTintColor: Colors.primary,
                preferredControlTintColor: 'white',
            });
        } else {
            // Fallback to linking if InAppBrowser is not available
            Linking.openURL(url);
        }
    };

    // Real-time validation for name
    const handleNameChange = useCallback((val: string) => {
        setName(val);
        const result = enterNameAndEmailValidation(val, email, password, false);
        if (!result.success && !val) {
            setErrors({ ...errors, nameError: 'Name is required' });
        } else {
            setErrors({ ...errors, nameError: '' });
        }
    }, [name, email, password]);

    // Real-time validation for email
    const handleEmailChange = useCallback((val: string) => {
        setEmail(val);
        const result = emailValidation(val);
        if (!result.success) {
            setErrors({ ...errors, emailError: result.message });
        } else {
            setErrors({ ...errors, emailError: '' });
        }
    }, [email]);

    // Real-time validation for password
    const handlePasswordChange = useCallback((val: string) => {
        setPassword(val);
        const result = passwordValidation(val);
        if (!result.success) {
            setErrors({ ...errors, passwordError: result.message });
        } else {
            setErrors({ ...errors, passwordError: '' });
        }
    }, [password]);

    const handleSubmit = async () => {
        if (isValid) {
            const result = enterNameAndEmailValidation(name, email, password, false);
            if (result.success) {
                
                await dispatch(signUpAction(name, email, password));
            } else {
                dispatch(showError(result.message, result.type));
                toast.show(result.message, { type: "custom_toast" });
            }
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.innerContainer}>
                    {/* Language selection button at the top right */}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
                        <TouchableOpacity
                            onPress={toggleLanguageModal}
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Ionicons name="earth-outline" size={20} color={Colors.gray} />
                            <Text style={{ marginLeft: 5, color: Colors.gray, fontSize: RFValue(16) }}>
                                {selectedLanguage}
                            </Text>
                            <AntDesign name="down" size={15} color={Colors.gray} style={{ marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>

                    {/* Rest of your signup form */}
                    <View style={[centralStyle.container, { height: windowHeight }]}>
                        <View>
                            <View style={[centralStyle.width70, centralStyle.mb3]}>
                                <Image
                                    style={styles.logoStyle}
                                    resizeMode='contain'
                                    source={require('../../../assets/auth-images/splashLogo.png')}
                                />
                                <Title
                                    type='Poppin-24'
                                    color={Colors.black}
                                    textTransform='capitalize'
                                    title={`Join us today`}
                                    weight='600'
                                />
                                <Title
                                    type='Roboto-16'
                                    color={Colors.fontColor}
                                    weight='400'
                                    title={`Enjoy lifetime access at no cost`}
                                />
                            </View>

                            <Button
                                icon={<Image source={require('../../../assets/auth-images/googleIcon.png')} style={styles.googleIcon} />}
                                title={' ' + `Continue with Google`}
                                customStyle={[centralStyle.socialButtonContainer]}
                                titleStyle={styles.socialText}
                            />

                            <View style={[styles.orContainer, { paddingVertical: 10 }]}>
                                <Text
                                    style={{
                                        fontFamily: "Poppins-Regular",
                                        fontSize: RFValue(14, windowHeight),
                                        fontWeight: "400",
                                        color: Colors.fontColor,
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    or
                                </Text>
                            </View>
                        </View>

                        <View style={styles.bottomSection}>
                            <OutlinedTextInput
                                ref={firstNameInputRef}
                                val={name}
                                onChange={(val) => setName(val)}
                                title={'Full Name'}
                                placeHolder={'Full Name'}
                                errorLine={errors.nameError ? true : false}
                            />
                            {errors.nameError && (
                                <Text style={[styles.errorText, { color: 'red' }]}>{errors.nameError}</Text>
                            )}

                            <OutlinedTextInput
                                val={email}
                                onChange={(val) => setEmail(val)}
                                title={'Email'}
                                placeHolder={'Email'}
                                errorLine={errors.emailError ? true : false}
                            />
                            {errors.emailError && (
                                <Text style={[styles.errorText, { color: 'red' }]}>{errors.emailError}</Text>
                            )}

                            <OutlinedTextInput
                                val={password}
                                onChange={(val) => setPassword(val)}
                                title={'Set a Password'}
                                Password
                                placeHolder={'Set a Password'}
                                errorLine={errors.passwordError ? true : false}
                            />
                            {errors.passwordError && (
                                <Text style={[styles.errorText, { color: 'red' }]}>{errors.passwordError}</Text>
                            )}

                            <View style={{ paddingTop: 10, paddingBottom: 30, paddingLeft: 5 }}>
                                <Text
                                    style={{
                                        fontFamily: "Roboto",
                                        fontSize: RFValue(12, windowHeight),
                                        fontWeight: "400",
                                        lineHeight: RFValue(16, windowHeight),
                                        letterSpacing: 0.4,
                                        color: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                >
                                    Must be at least 6 characters
                                </Text>
                            </View>
                            <View style={[centralStyle.row, centralStyle.mt1, centralStyle.XAndYCenter]}>
                                    <Text style={{
                                        fontFamily: "Poppins-Regular",   // Font: Poppins
                                        fontWeight: "400",               // Weight: 400
                                        fontSize: RFValue(14, windowHeight), // Size: 14px
                                        lineHeight: RFValue(20, windowHeight), // Line Height: 20px
                                        color: Colors.black // Assuming you want the main text in black color
                                    }}>
                                        By clicking "Next" or "Continue with google", you agree to the {' '}
                                        <Text style={{
                                            fontFamily: "Poppins-Regular",
                                            fontWeight: "400",
                                            fontSize: RFValue(14, windowHeight),
                                            lineHeight: RFValue(20, windowHeight),
                                            
                                            color: Colors.primary, // Apply primary color to the "terms" and "privacy policy"
                                        }}onPress={() => openLink("https://247pro.com/terms")}
>
                                            Terms
                                        </Text> and {' '}
                                        <Text style={{
                                            fontFamily: "Poppins-Regular",
                                            fontWeight: "400",
                                            fontSize: RFValue(14, windowHeight),
                                            lineHeight: RFValue(20, windowHeight),
                                            color: Colors.primary,
                                        }}onPress={() => openLink("https://247pro.com/terms")}
>
                                            Privacy Policy
                                        </Text>
                                    </Text>
                                </View>

                            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                                <View style={[centralStyle.mt3, centralStyle.my1]}>
                                    {isValid ? (
                                        <Button
                                            callBack={() => handleSubmit()}
                                            title={loader ? <ActivityIndicator color={'white'} /> : 'Next'}
                                            primary
                                        />
                                    ) : (
                                        <Button
                                            disable
                                            title={'Next'}
                                            primary
                                        />
                                    )}
                                </View>
                                <View style={styles.footerTextWrapper}>
                                    <FooterText color={Colors.fontColor} title={`Already have an account?`} />
                                    <TouchableOpacity onPress={() => changeRoute(navigation, 'SignIn')} activeOpacity={0.8}>
                                        <FooterText color={Colors.primary} title={`Log in`} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Modal for language selection */}
                    {showLanguageModal && (
                        <LanguageDropDown
                            disableModal={toggleLanguageModal}
                            setSelectedTab={handleLanguageChange}
                            selectedTab={selectedLanguage}
                        />
                    )}

                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default SignUp;