import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'redux';

import { loginRequestKey } from '../../utilities/constants';
import {
    ForgetModal,
    LoginModal,
    SignUpModal,
} from '../../core/modals/login.modal';
import {
    CONTACTS,
    CURRENTUSERPROFILE,
    INITIALROUTE,
    LOADER
} from '../constant/constant';
import {
    forget_password,
    login,
    logout,
    userIdentity,
    signUp
} from '../../core/http-services/apis/identity-api/authentication.service';
import { createContact, getContact } from '../../core/http-services/apis/application-api/contact/contact.service';

//  LOGIN ACTION

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
            await forget_password(forgetData)
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
            await logout()
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



export const signUpAction = (name: string, email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            const loginData: SignUpModal = {
                "key": loginRequestKey,
                "object": {
                    "name": name, // User name
                    "email": email, // User email
                    "password": password // User password
                }
            }
            let SignupResponse: any;
            SignupResponse = await signUp(loginData)
            if (Object.keys(SignupResponse).length > 0) {
                await AsyncStorage.setItem('accessToken', JSON.stringify(SignupResponse.accessToken));
                dispatch({ type: CURRENTUSERPROFILE, payload: SignupResponse });
            }
            dispatch({ type: LOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
        }
    }
}

//  LOGIN ACTION

//  APP ACTION

export const ContactAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                let contactResponse: any = await getContact(JSON.parse(accessToken), 1, 10)
                if (contactResponse?.data?.resultData?.list?.length > 0) dispatch({ type: CONTACTS, payload: contactResponse.data.resultData.list });
            }
            dispatch({ type: LOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
        }
    }
}

export const CreateContactAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            let createContactData: any = {
                "lastName": "aaaaaa",
                "contactTypeId": 2,
                "contactTypeColor": "#FBC02D",
                "firstName": "aaaaaaaaaaaaa",
                "contactEmails": [{ "visible": true, "email": "abc@gmail.com" }],
                "contactAddresses": [{
                    "label": "Home",
                    "visible": true,
                    "city": "karachi",
                    "hasState": true,
                    "zipCode": "24700",
                    "streetAddress": "R-592 sector 8 north karachi",
                    "countryId": 224,
                    "latitude": 0,
                    "longitude": 0,
                    "searchGenerated": true,
                    "countryText": "United States"
                }],
                "contactTags": []
            }
             let createContactResponse: any = await createContact(createContactData)
            console.log(createContactResponse, 'createContactResponse')
            dispatch({ type: LOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
        }
    }
}

export const openSheet = (sheetRef: any) => sheetRef.current.open()

export const closeSheet = (sheetRef: any) => sheetRef.current.close()



//  APP ACTION






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