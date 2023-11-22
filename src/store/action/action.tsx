import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'redux';

import { loginRequestKey } from '../../utilities/constants';
import {
    ForgetModal,
    LoginModal,
} from '../../core/modals/login.modal';
import {
    CURRENTUSERPROFILE,
    INITIALROUTE,
    LOADER
} from '../constant/constant';
import {
    forget_password,
    login,
    logout,
    userIdentity
} from '../../core/http-services/apis/identity-api/authentication.service';

export const loginAction = (inputValue: string, password: string, directLoginToken?: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            const loginData: LoginModal = {
                "key": loginRequestKey,
                "object": { "email": inputValue, "password": password }
            };
            let userData: any;
            if (directLoginToken) userData = await userIdentity(directLoginToken)
            else userData = await login(loginData)
            if (Object.keys(userData).length > 0) {
                await AsyncStorage.setItem('accessToken', JSON.stringify(userData.accessToken));
                dispatch({ type: CURRENTUSERPROFILE, payload: userData });
            }
            dispatch({ type: LOADER, payload: false });
        } catch (error: any) {
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
            await AsyncStorage.removeItem('accessToken');
            dispatch({ type: CURRENTUSERPROFILE, payload: {} });
            dispatch({ type: INITIALROUTE, payload: 'SignIn' });
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