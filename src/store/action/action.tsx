import { CommonActions } from '@react-navigation/native';
import { postApi } from '../../core/http-services/services/services';
import { LOGIN_ENDPOINT } from '../../core/http-services/apis/apis';
import { Dispatch } from 'redux';
import { IResponse } from '../../core/modals';
import { LoginModal } from '../../core/modals/login.modal';
import { login } from '../../core/http-services/apis/identity-api/authentication.service';
import { CURRENTUSERPROFILE, ISERROR, ISUSERLOGIN } from '../constant/constant';


export const loginAction = (loginData: LoginModal) => {
    return async (dispatch: Dispatch) => {
        try {
            let userData = await login(loginData)
            dispatch({ type: CURRENTUSERPROFILE, payload: userData });
            dispatch({ type: ISUSERLOGIN, payload: true });

        } catch (error) {
            // if something is wrong error will save in store and will show the error here
            console.log(error, 'error')
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