import { forget_password, login, logout } from '../../core/http-services/apis/identity-api/authentication.service';
import { Dispatch } from 'redux';
import { ForgetModal, LoginModal, } from '../../core/modals/login.modal';
import { loginRequestKey } from '../../utilities/constants';
import {
    CURRENTUSERPROFILE,
    ISUSERLOGIN,
    LOADER
} from '../constant/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginAction = (inputValue: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            const loginData: LoginModal = {
                "key": loginRequestKey,
                "object": { "email": inputValue, "password": password }
            };
            let userData = await login(loginData)

            // If login successful, store user credentials in local storage
            await AsyncStorage.setItem('isLoggedIn', 'true');

            dispatch({ type: CURRENTUSERPROFILE, payload: userData });
            dispatch({ type: ISUSERLOGIN, payload: true });
            dispatch({ type: LOADER, payload: false });
        } catch (error: any) {
            // if something is wrong error will save in store and will show the error here
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
        }
    }
}
export const forgetAction = (email: any) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            const forgetData: ForgetModal = {
                "email": email,
            };
            let userData = await forget_password(forgetData)
            dispatch({ type: LOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
        }
    }
}
export const logoutAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            let userData = await logout()
            await AsyncStorage.setItem('isLoggedIn', 'false'); // this is for logout
            dispatch({ type: CURRENTUSERPROFILE, payload: {} });
            dispatch({ type: ISUSERLOGIN, payload: false });
            dispatch({ type: LOADER, payload: false });

        } catch (error: any) {
            // if something is wrong error will save in store and will show the error here
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
        }
    }
}

export const openSheet = (sheetRef: any) => sheetRef.current.open()

export const closeSheet = (sheetRef: any) => sheetRef.current.close()

// export function _error(err?: string, time?: number) {
//     return (dispatch?: any) => {
//         dispatch({ type: ISERROR, payload: err });

//         setTimeout(
//             () => {
//                 dispatch({ type: ISERROR, payload: '' });
//             },
//             time ? time : 5000,
//         );
//     };
// }


// export const _error = (err?: string, time?: number) => {
//     return async (dispatch: Dispatch) => {
//         try {
//             dispatch({ type: ISERROR, payload: err });
//             setTimeout(
//                 () => {
//                     dispatch({ type: ISERROR, payload: '' });
//                 },
//                 time ? time : 5000,
//             );
//         } catch (error) {
//             // if something is wrong error will save in store and will show the error here
//             console.log(error)
//         }
//     }
// }