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
    CONTACTTYPESCOUNT,
    CURRENTUSERPROFILE,
    INITIALROUTE,
    LOADER,
    SCREENLOADER,
    SEARCHEDDATA,
    TOTALCONTACTS
} from '../constant/constant';
import {
    forget_password,
    login,
    logout,
    userIdentity,
    signUp
} from '../../core/http-services/apis/identity-api/authentication.service';
import {
    typeContact,
    createContact,
    deleteContact,
    editContact,
    getContact,
    searchContact,
    getTypeContacts,
    contactTypeCount
} from '../../core/http-services/apis/application-api/contact/contact.service';
import {
    IContactCreateModel,
    SpecialityModal
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
                if (contactResponse.data.resultData.list.length > 0) {
                    await setpageIndex(pageIndex + 1)
                    const currentState = getState();
                    let contactClone = JSON.parse(JSON.stringify(currentState.root.contacts));
                    let mergeResponse;
                    if (contactClone?.length > 0) {
                        mergeResponse = [...contactClone[0]?.contacts, ...contactResponse.data.resultData.list];
                    } else {
                        mergeResponse = [...contactClone, ...contactResponse.data.resultData.list];
                    }
                    mergeResponse.forEach(function (obj: any) {
                        obj.value = obj.fullName;
                        obj.key = obj.id;
                    });
                    let createDataForTab = [{ id: 0, contacts: mergeResponse }]
                    if (contactResponse?.data?.resultData?.list?.length > 0) dispatch({ type: CONTACTS, payload: createDataForTab });
                    if (contactResponse?.data?.resultData?.totalRecords) dispatch({ type: TOTALCONTACTS, payload: [{ totalRecords: contactResponse.data.resultData.totalRecords, id: 0 }] });
                }
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
            const createContactResponse: any = await createContact(inputValues);
            createContactResponse.data.resultData.value = createContactResponse.data.resultData.fullName;
            createContactResponse.data.resultData.key = createContactResponse.data.resultData.id;
            const currentState = getState();
            const contactClone = JSON.parse(JSON.stringify(currentState.root.contacts));
            const contactTypeCounts = JSON.parse(JSON.stringify(currentState.root.contactTypesCount));
            const alreadyHave = contactClone.findIndex((obj: any) => obj.id === inputValues.contactTypeId);
            if (alreadyHave === -1) contactClone[0].contacts.push(createContactResponse.data.resultData)
            else {
                contactClone[0].contacts.push(createContactResponse.data.resultData)
                contactClone[alreadyHave].contacts.push(createContactResponse.data.resultData)
            }
            const filterCounts = contactTypeCounts.filter((obj: { contactTypeId: number, count: number; }) => obj.contactTypeId === inputValues.contactTypeId)
            filterCounts[0].count = filterCounts[0].count + 1;
            dispatch({ type: CONTACTTYPESCOUNT, payload: contactTypeCounts });
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });

        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        }
    }
}
const handleEditContactCount = (isAdd: boolean, selectedTabId?: number, getState?: any) => {
    const currentState = getState();
    const contactTypeCounts = currentState.root.contactTypesCount;
    const filterCounts = contactTypeCounts.filter((obj: { contactTypeId: number, count: number; }) => obj.contactTypeId === selectedTabId)
    if (isAdd) { filterCounts[0].count = filterCounts[0].count + 1; }
    else { filterCounts[0].count = filterCounts[0].count - 1; }
}

export const EditContactAction = (inputValues: IContactCreateModel, id?: number) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            dispatch({ type: SCREENLOADER, payload: true });
            dispatch({ type: LOADER, payload: true });
            let editContactResponse: any = await editContact(inputValues);
            editContactResponse.data.resultData.value = editContactResponse.data.resultData.fullName;
            editContactResponse.data.resultData.key = editContactResponse.data.resultData.id;
            const currentState = getState();
            let contactClone = JSON.parse(JSON.stringify(currentState.root.contacts));
            let findId = contactClone.findIndex((i: { id: number }) => i.id == inputValues.contactTypeId);
            let previousList = contactClone.findIndex((i: { id: number }) => i.id == id);
            let contactIndexInALL = contactClone[0].contacts.findIndex((i: { id: number }) => i.id == editContactResponse.data.resultData.id);
            if (contactIndexInALL !== -1) contactClone[0].contacts.splice(contactIndexInALL, 1, editContactResponse.data.resultData);
            let editContactIndex = contactClone[previousList].contacts.findIndex((i: { id: number }) => i.id == editContactResponse.data.resultData.id);
            if (findId === -1) {
                handleEditContactCount(false, id, getState)
                handleEditContactCount(true, editContactResponse.data.resultData.contactTypeId, getState)
                contactClone[previousList].contacts.splice(editContactIndex, 1);
            } else {
                if (id !== inputValues.contactTypeId) {
                    if (editContactIndex !== -1) {
                        handleEditContactCount(false, id, getState)
                        handleEditContactCount(true, editContactResponse.data.resultData.contactTypeId, getState)
                        contactClone[previousList].contacts.splice(editContactIndex, 1);
                        contactClone[findId].contacts.splice(editContactIndex, 0, editContactResponse.data.resultData);
                    }
                } else {
                    contactClone[findId].contacts.splice(editContactIndex, 1, editContactResponse.data.resultData);
                }
            }
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

export const TotalCounts = (accessToken: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: SCREENLOADER, payload: true });
            dispatch({ type: LOADER, payload: true });
            let response: any = await contactTypeCount(accessToken);
            dispatch({ type: CONTACTTYPESCOUNT, payload: response.data.resultData });
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


export const SearchContactAction = (keyword: string, type: number) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            dispatch({ type: SCREENLOADER, payload: true });
            dispatch({ type: LOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                const searchContactResponse: any = await searchContact(JSON.parse(accessToken), keyword, type);
                if (searchContactResponse.data.resultData.list?.length > 0) {
                    searchContactResponse.data.resultData.list.forEach(function (obj: any) {
                        obj.value = obj.fullName;
                        obj.key = obj.id;
                    });
                };
                const currentState = getState();
                let contactClone = JSON.parse(JSON.stringify(currentState.root.searchedData));
                let createDataForTab = [...contactClone, { id: type, contacts: searchContactResponse.data.resultData.list }];
                if (type === 1) dispatch({ type: SEARCHEDDATA, payload: createDataForTab })
                else if (type === 0) dispatch({ type: SEARCHEDDATA, payload: createDataForTab })
                else if (type === 2) dispatch({ type: SEARCHEDDATA, payload: createDataForTab })
                else if (type === 3) dispatch({ type: SEARCHEDDATA, payload: createDataForTab })
                else if (type === 4) dispatch({ type: SEARCHEDDATA, payload: createDataForTab })
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

export const TypeContactAction = (id: number, setpageIndex?: any, pageIndex?: number) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            const currentState = getState();
            let totalContactsClone = JSON.parse(JSON.stringify(currentState.root.totalContacts));
            dispatch({ type: SCREENLOADER, payload: true });
            dispatch({ type: LOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                const typeContactResponse: any = await typeContact(JSON.parse(accessToken), id, pageIndex ? pageIndex : 1, 15);
                if (setpageIndex && pageIndex) { await setpageIndex(pageIndex + 1) };
                const currentState = getState();
                let contactClone = JSON.parse(JSON.stringify(currentState.root.contacts));
                let alreadyHave = contactClone.findIndex((val: any) => val.id == id)
                if (alreadyHave == -1) {
                    let createDataForTab = [...contactClone, { id, contacts: typeContactResponse.data.resultData.list }]
                    let selectedDataFilter: any = createDataForTab.filter((val) => val.id == id)
                    if (selectedDataFilter?.length > 0) {
                        await selectedDataFilter[0].contacts.forEach(function (obj: any) {
                            obj.value = obj.fullName;
                            obj.key = obj.id;
                        });
                    }
                    if (id > 1) {
                        dispatch({ type: CONTACTS, payload: createDataForTab })
                        if (typeContactResponse.data.resultData?.totalRecords) totalContactsClone.push({ totalRecords: typeContactResponse.data.resultData.totalRecords, id });
                    }
                    else {
                        dispatch({ type: CONTACTS, payload: createDataForTab });
                    }
                } else {
                    await contactClone.forEach((obj: any) => {
                        if (obj.id === id) {
                            let cloneDate = [...obj.contacts, ...typeContactResponse.data.resultData.list]
                            obj.contacts = cloneDate;
                            obj.contacts.forEach(function (obj: any) {
                                obj.value = obj.fullName;
                                obj.key = obj.id;
                            });
                        }
                    });
                    dispatch({ type: CONTACTS, payload: contactClone })
                }
            }
            dispatch({ type: TOTALCONTACTS, payload: totalContactsClone });
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        }
    }
};

export const GetTypeContactsSpecialityAction = (type: number, specialityID: number) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            dispatch({ type: SCREENLOADER, payload: true });
            dispatch({ type: LOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                const typeContactResponse: any = await getTypeContacts(JSON.parse(accessToken), type, specialityID);
                if (typeContactResponse.data.resultData.list?.length > 0) {
                    typeContactResponse.data.resultData.list.forEach(function (obj: any) {
                        obj.value = obj.fullName;
                        obj.key = obj.id;
                    });
                }
                const currentState = getState();
                let contactClone = JSON.parse(JSON.stringify(currentState.root.searchedData));
                let createDataForTab = [...contactClone, { id: type, contacts: typeContactResponse.data.resultData.list }];
                if (type === 2) dispatch({ type: SEARCHEDDATA, payload: createDataForTab })
                else if (type === 3) dispatch({ type: SEARCHEDDATA, payload: createDataForTab })
            };
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        }
    }
}

export const openSheet = (sheetRef: any) => sheetRef.current.open();

export const closeSheet = (sheetRef: any) => sheetRef.current.close();

export const handleSearch = (
    value: string,
    data: { value: string, key: string }[] | SpecialityModal[],
    key?: string
) => {
    if (value && value.length > 0) {
        const filteredData = data.filter((item: any) => {
            const itemName = key ? item[key].toLowerCase().includes(value.toLowerCase()) : item.name.toLowerCase().includes(value.toLowerCase());
            return itemName;
        });
        return filteredData;
    } else return data;
};
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