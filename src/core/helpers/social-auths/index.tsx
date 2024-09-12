import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
    webClientId: '',
    iosClientId: ''

});

export const handleGoogle = async () => {
    try {
        // await GoogleSignin.revokeAccess();
        // await GoogleSignin.signOut();
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return userInfo;
    } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
        } else {
            console.log(error, 'error')
        }
    }
};