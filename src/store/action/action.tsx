import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch, } from 'redux';

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
    LOADER,
    SCREENLOADER,
    SEARCHEDDATA
} from '../constant/constant';
import {
    forget_password,
    login,
    logout,
    userIdentity,
    signUp
} from '../../core/http-services/apis/identity-api/authentication.service';
import {
    TypeContact,
    createContact,
    deleteContact,
    editContact,
    getContact,
    searchContact
} from '../../core/http-services/apis/application-api/contact/contact.service';
import {
    ContactModel,
    IContactCreateModel
} from '../../core/modals/contact.modal';

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
            dispatch({ type: CONTACTS, payload: [] });
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

export const ContactAction = (setpageIndex: any, pageIndex: number) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            dispatch({ type: LOADER, payload: true });
            dispatch({ type: SCREENLOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                let contactResponse: any = await getContact(JSON.parse(accessToken), pageIndex, 15);
                if (contactResponse.data.resultData.list.length > 0) setpageIndex(pageIndex + 1)
                const currentState = getState();
                let contactClone = JSON.parse(JSON.stringify(currentState.root.contacts));
                let mergeResponse = [...contactClone, ...contactResponse.data.resultData.list];
                if (contactResponse?.data?.resultData?.list?.length > 0) dispatch({ type: CONTACTS, payload: mergeResponse });
            }
            dispatch({ type: SCREENLOADER, payload: false });
            dispatch({ type: LOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: SCREENLOADER, payload: false });
            dispatch({ type: LOADER, payload: false });
        }
    }
}

export const CreateContactAction = (inputValues: IContactCreateModel) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            dispatch({ type: SCREENLOADER, payload: true });
            dispatch({ type: LOADER, payload: true });
            let createContactResponse: any = await createContact(inputValues)
            const currentState = getState();
            let creatInputValClone = JSON.parse(JSON.stringify(inputValues));
            creatInputValClone.fullName = inputValues?.firstName + " " + inputValues?.lastName
            let contactClone = JSON.parse(JSON.stringify(currentState.root.contacts));
            contactClone.push(createContactResponse.data.resultData)
            dispatch({ type: CONTACTS, payload: contactClone });
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        }
    }
}

export const EditContactAction = (inputValues: IContactCreateModel) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            dispatch({ type: SCREENLOADER, payload: true });
            dispatch({ type: LOADER, payload: true });
            let editContactResponse: any = await editContact(inputValues);
            const currentState = getState();
            let contactClone = JSON.parse(JSON.stringify(currentState.root.contacts));
            let removeContactIndex = contactClone.findIndex((i: any) => i.id == editContactResponse.data.resultData.id);
            if (removeContactIndex !== -1) contactClone.splice(removeContactIndex, 1, editContactResponse.data.resultData);
            dispatch({ type: CONTACTS, payload: contactClone });
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        }
    }
}

export const DeleteContactAction = (id: number) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            dispatch({ type: SCREENLOADER, payload: true });
            dispatch({ type: LOADER, payload: true });
            let deleteContactResponse: any = await deleteContact(id);
            const currentState = getState();
            let contactClone = JSON.parse(JSON.stringify(currentState.root.contacts));
            let removeContactIndex = contactClone.findIndex((i: any) => i.id === id)
            contactClone.splice(removeContactIndex, 1)
            dispatch({ type: CONTACTS, payload: contactClone });
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        }
    }
}


export const SearchContactAction = (keyword: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: SCREENLOADER, payload: true });
            dispatch({ type: LOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                const searchContactResponse: any = await searchContact(JSON.parse(accessToken), keyword);
                dispatch({ type: SEARCHEDDATA, payload: searchContactResponse.data.resultData.list });
            }
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        }
    }
}

export const TypeContactAction = (id: number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: SCREENLOADER, payload: true });
            dispatch({ type: LOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                const TypeContactResponse: any = await TypeContact(JSON.parse(accessToken), id);
                // console.log(TypeContactResponse.data.resultData.list, 'contactTypeContactResponsecontactTypeContactResponse')
                dispatch({ type: CONTACTS, payload: TypeContactResponse.data.resultData.list });
            }
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        }
    }
}

export const openSheet = (sheetRef: any) => sheetRef.current.open()

export const closeSheet = (sheetRef: any) => sheetRef.current.close()




// function searchContact(accessToken: any, keyword: string): any {
//     throw new Error('Function not implemented.');
// }
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