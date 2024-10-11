import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'redux';

import { loginRequestKey } from '../../utilities/constants';
import {
    ForgetModal,
    LoginModal,
    MemberShipApiModal,
    SignUpModal,
} from '../../core/modals/login.modal';
import {
    CONTACTS,
    CONTACTTYPESCOUNT,
    CURRENTUSERPROFILE,
    INITIALROUTE,
    LOADER,
    PAGINATIONLOADER,
    SCREENLOADER,
    SEARCHEDDATA,
    TOTALCONTACTS,
    GET_INDUSTRIES_SUCCESS,
    GET_JOB_TYPES_SUCCESS,
    CLOCKIN_SUCCESS,
    CLOCKIN_FAILURE,
    CURRENT_PROJECTS,
    GET_TIMESHEET_BY_USER_REQUEST,
    GET_TIMESHEET_BY_USER_SUCCESS,
    GET_TIMESHEET_BY_USER_FAILURE,
    GET_MEMBERS_BY_TIMESHEET_REQUEST,
    GET_MEMBERS_BY_TIMESHEET_SUCCESS,
    GET_MEMBERS_BY_TIMESHEET_FAILURE,
    GET_CURRENT_TIMESHEET_REQUEST,
    GET_CURRENT_TIMESHEET_SUCCESS,
    GET_CURRENT_TIMESHEET_FAILURE,
    GET_USER_TIMESHEETS_REQUEST,
    GET_USER_TIMESHEETS_SUCCESS,
    GET_USER_TIMESHEETS_FAILURE,
    UPDATE_TIMESHEET_REQUEST,
    UPDATE_TIMESHEET_SUCCESS,
    UPDATE_TIMESHEET_FAILURE,
} from '../constant/constant';
import {
    forget_password,
    login,
    logout,
    userIdentity,
    signUp,
    externalLogin,
    memberShipApi
} from '../../core/http-services/apis/identity-api/authentication.service';
import {
    typeContact,
    createContact,
    deleteContact,
    editContact,
    getContact,
    searchContact,
    getTypeContacts,
    contactTypeCount,
    addSpecialities,
} from '../../core/http-services/apis/application-api/contact/contact.service';
import {
    IContactCreateModel,
    SpecialityModal,
} from '../../core/modals/contact.modal';
import {
    fetchIndustries,
    fetchSpecialityByIndustry,
    fetchJobTypeByIndustry,
} from '../../core/http-services/apis/application-api/onboarding-api/industries.service';
import { Industry, PrimarySpecialty } from '../../core/modals/industry.modal';
import { Toast } from 'react-native-toast-notifications';
import { t } from 'i18next';
import { changeRoute } from '../../core/helpers/async-storage';
import { breakIn, breakOut, clockIn, clockOut } from '../../core/http-services/apis/application-api/timecard-api/timecard.service';
import { TimesheetTransactionViewModel } from '../../core/modals/timecard.modal';
import { getProjectsByRadius } from '../../core/http-services/apis/application-api/projects/projects.service';
import { getCurrentTimesheetApi, getMembersByTimesheet, getTimesheetByUserApi, getTimesheetsForCurrentUserApi, updateTimesheetApi } from '../../core/http-services/apis/application-api/timecard-api/member.service';
import { TeamTimesheetListView, TimesheetViewModel } from '../../core/modals/timeSheetMember.modal';
import { IResponse } from '../../core/modals';

//  LOGIN ACTION

export const loginAction = (
    inputValue: string,
    password: string,
    directLoginToken?: string,
) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            const loginData: LoginModal = {
                //"key": loginRequestKey,
                //object: {
                Email: inputValue, Password: password,
                //},
            };
            let userData: any;
            console.log("directLogin: ",directLoginToken);
            if (directLoginToken) userData = await userIdentity(directLoginToken)
            else userData = await login(loginData, dispatch)
            if (Object.keys(userData).length > 0) {
                await AsyncStorage.setItem('accessToken', JSON.stringify(userData.accessToken));
                dispatch({ type: CURRENTUSERPROFILE, payload: userData });
                // Toast.show(t('successfully_login'), {
                //     type: 'custom_success_toast',
                // });
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
            await forget_password(forgetData, dispatch)
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
            // console.log("logout");
            await logout()
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('isBusiness');
            // await AsyncStorage.removeItem('rememberMe');

            console.log("logout");
            dispatch({ type: CURRENTUSERPROFILE, payload: {} });
            dispatch({ type: INITIALROUTE, payload: 'AuthNavigation' });
            dispatch({ type: CONTACTS, payload: [] });
            dispatch({ type: LOADER, payload: false });
        } catch (error: any) {
            // if something is wrong error will save in store and will show the error here
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
        }
    }
}


export const signUpAction = (name: string, email: string, password: string,) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            const signupData: SignUpModal = {
                // key: loginRequestKey,
                // object: {
                Email: email, // User email
                Name: name, // User name
                Password: password, // User password
                TimeZone: "Asia/Karachi",
                //       },
            }
            console.log(signupData, 'SignUp:')
            let SignupResponse: any;
            SignupResponse = await signUp(signupData, dispatch);
            dispatch({ type: LOADER, payload: false });
            console.log(SignupResponse, 'SignUp')
            if (Object.keys(SignupResponse).length > 0) {
                await AsyncStorage.setItem('accessToken', JSON.stringify(SignupResponse.accessToken));
                dispatch({ type: CURRENTUSERPROFILE, payload: SignupResponse });
                return true;  
            }
            return false; // Return false if sign-up failed
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
            return false; // Return false if an error occurred
        }
    }
}

export const showError = (errMsg?: string, errorTitle?: string, disbleHideError?: boolean): any => async (dispatch: Dispatch) => {
    dispatch({ type: 'IS_ERROR', payload: true });
    dispatch({ type: 'SET_ERROR_MSG', payload: errMsg });
    dispatch({ type: 'SET_ERROR_TITLE', payload: errorTitle });
    if (disbleHideError) {

    } else {

        setTimeout(() => {
            dispatch({ type: 'IS_ERROR', payload: false });
            dispatch({ type: 'SET_ERROR_MSG', payload: '' });
            dispatch({ type: 'SET_ERROR_TITLE', payload: '' });
        }, 5000);
    }
};

export const hideError = (): any => async (dispatch: Dispatch) => {
    dispatch({ type: 'IS_ERROR', payload: false });
    dispatch({ type: 'SET_ERROR_MSG', payload: '' });
    dispatch({ type: 'SET_ERROR_TITLE', payload: '' });
};

export const socialLoginAction = (googleResponse?: any) => {
    return async (dispatch: Dispatch) => {
        try {
            console.log(googleResponse, 'Google login response received');
            dispatch({ type: LOADER, payload: true });

            let userData: any;

            // Call externalLogin API with Google token to get user data
            userData = await externalLogin({
                provider: 'Google',
                idToken: googleResponse.idToken,
            });

            // Log userData for debugging
            console.log('userData received from externalLogin:', userData);

            // Check if userData is empty or null
            if (!userData || Object.keys(userData).length === 0) {
                throw new Error('User data is empty or invalid.');
            }

            console.log('isRegister status:', userData.isRegister);

            if (userData.isRegister === true) {
                console.log("User is already registered.");

                // Prepare data for membership API call
                let memberShipApiData: MemberShipApiModal = {
                    accountId: userData.accountId,
                    identityUserId: userData.identityUserId,
                    userEmail: userData.email,
                };

                // Call memberShipApi with data and accessToken
                const memberShipApiResponse: any = await memberShipApi(
                    memberShipApiData,
                    userData.accessToken
                );

                console.log('Membership API Response:', memberShipApiResponse);

                // Store access token in AsyncStorage
                await AsyncStorage.setItem('accessToken', JSON.stringify(userData.accessToken));

                // Fetch user profile using userIdentity API
                const userProfile = await userIdentity(userData.accessToken);

                console.log('User Profile fetched after membership API:', userProfile);

                // Check if userProfile is empty
                if (!userProfile || Object.keys(userProfile).length === 0) {
                    throw new Error('User profile is empty or invalid.');
                }

                // Dispatch the fetched profile to Redux
                dispatch({ type: CURRENTUSERPROFILE, payload: userProfile });

            } else {
                console.log('User is not registered yet.');

                if (Object.keys(userData).length > 0) {
                    console.log("Proceeding with non-registered user flow.");

                    // Store access token in AsyncStorage
                    await AsyncStorage.setItem('accessToken', JSON.stringify(userData.accessToken));

                    // Fetch user profile using userIdentity API
                    const userProfile = await userIdentity(userData.accessToken);

                    console.log('User Profile fetched for non-registered user:', userProfile);

                    // Check if userProfile is empty
                    if (!userProfile || Object.keys(userProfile).length === 0) {
                        throw new Error('User profile is empty or invalid.');
                    }

                    // Dispatch the fetched profile to Redux
                    dispatch({ type: CURRENTUSERPROFILE, payload: userProfile });
                }
            }

            // End loading state
            dispatch({ type: LOADER, payload: false });

        } catch (error: any) {
            console.error('Error in socialLoginAction:', error.message);
            Toast.show("Something Went Wrong",)
            Toast.hideAll()
            dispatch({ type: LOADER, payload: false });
        }
    };
};



// export const signUpAction = (name: string, email: string, password: string) => {
//     return async (dispatch: Dispatch) => {
//         try {
//             dispatch({ type: LOADER, payload: true });
//             const loginData: SignUpModal = {
//                 "key": loginRequestKey,
//                 "object": {
//                     "name": name, // User name
//                     "email": email, // User email
//                     "password": password // User password
//                 }
//             }
//             let SignupResponse: any;
//             SignupResponse = await signUp(loginData)
//             if (Object.keys(SignupResponse).length > 0) {
//                 await AsyncStorage.setItem('accessToken', JSON.stringify(SignupResponse.accessToken));
//                 dispatch({ type: CURRENTUSERPROFILE, payload: SignupResponse });
//             }
//             dispatch({ type: LOADER, payload: false });
//         } catch (error: any) {
//             console.log(error.message, 'error')
//             dispatch({ type: LOADER, payload: false });
//         }
//     }
// }

//  LOGIN ACTION

//  APP ACTION


export const GetIndustriesAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            const industries = await fetchIndustries(accessToken);
            console.log(industries);
            dispatch({ type: GET_INDUSTRIES_SUCCESS, payload: industries });
            dispatch({ type: LOADER, payload: false });
        } catch (error) {
            console.log('Error fetching industries:', error);
            dispatch({ type: LOADER, payload: false });
        }
    };
};

export const GetSpecialityByIndustriesAction = (industryId) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            const industries = await fetchSpecialityByIndustry(accessToken, industryId);
            dispatch({ type: GET_INDUSTRIES_SUCCESS, payload: industries });
            dispatch({ type: LOADER, payload: false });
        } catch (error) {
            console.log('Error fetching industries:', error);
            dispatch({ type: LOADER, payload: false });
        }
    };
};

export const GetJobTypesByIndustryAction = (industryId) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            const jobTypes = await fetchJobTypeByIndustry(accessToken, industryId);
            dispatch({ type: GET_JOB_TYPES_SUCCESS, payload: jobTypes });
            dispatch({ type: LOADER, payload: false });
        } catch (error) {
            console.log('Error fetching job types:', error);
            dispatch({ type: LOADER, payload: false });
        }
    };
};


export const ContactAction = (setpageIndex: any, pageIndex: number) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            // dispatch({ type: PAGINATIONLOADER, payload: true });
            dispatch({ type: LOADER, payload: true });
            // dispatch({ type: SCREENLOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                let contactResponse: any = await getContact(JSON.parse(accessToken), pageIndex, 15);
                if (contactResponse.data.resultData.list.length > 0) {
                    await setpageIndex(pageIndex + 1)
                    const currentState = getState();
                    let contactClone = JSON.parse(JSON.stringify(currentState.root.contacts));
                    const alreadyHave = contactClone.findIndex((obj: { id: number }) => obj.id === 0)
                    let mergeResponse;
                    if (contactClone?.length > 0) {
                        contactResponse.data.resultData.list.forEach(function (obj: any) {
                            obj.value = obj.fullName;
                            obj.key = Math.floor(Math.random() * Date.now());;

                        });
                        contactClone[alreadyHave]?.contacts.push(...contactResponse.data.resultData.list);
                        dispatch({ type: CONTACTS, payload: contactClone });
                    } else {
                        mergeResponse = [...contactClone, ...contactResponse.data.resultData.list];
                        mergeResponse.forEach(function (obj: any) {
                            obj.value = obj.fullName;
                            obj.key = Math.floor(Math.random() * Date.now());;

                        });
                        let createDataForTab = [{ id: 0, contacts: mergeResponse }];
                        if (contactResponse?.data?.resultData?.list?.length > 0) dispatch({ type: CONTACTS, payload: createDataForTab });
                    }
                    if (contactResponse?.data?.resultData?.totalRecords) dispatch({ type: TOTALCONTACTS, payload: [{ totalRecords: contactResponse.data.resultData.totalRecords, id: 0 }] });
                }
            }
            // dispatch({ type: SCREENLOADER, payload: false });
            // dispatch({ type: PAGINATIONLOADER, payload: false });
            dispatch({ type: LOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            // dispatch({ type: SCREENLOADER, payload: false });
            // dispatch({ type: PAGINATIONLOADER, payload: false });
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
            const contactTypeCounts = currentState.root.contactTypesCount;
            const alreadyHave = contactClone.findIndex((obj: any) => obj.id === inputValues.contactTypeId);
            const alltabIndex = contactClone.findIndex((obj: { id: number }) => obj.id === 0);
            // CONTACT WORKING
            if (alreadyHave === -1) {
                if (contactClone.length > 0) {
                    if (alltabIndex !== -1) contactClone[alltabIndex].contacts.push(createContactResponse.data.resultData)
                    else contactClone.push({ id: 0, contacts: [createContactResponse.data.resultData] });
                }
                else {
                    contactClone.push(
                        { id: 0, contacts: [createContactResponse.data.resultData] },
                        { id: inputValues.contactTypeId, contacts: [createContactResponse.data.resultData] }
                    );
                }
            }
            else {
                if (alltabIndex !== -1) contactClone[alltabIndex].contacts.push(createContactResponse.data.resultData)
                else contactClone.push({ id: 0, contacts: [createContactResponse.data.resultData] });
                contactClone[alreadyHave].contacts.push(createContactResponse.data.resultData)
            };

            // CONTACT COUNTS WORKING
            const alreadyHaveCount = contactTypeCounts.findIndex((obj: { contactTypeId: number, count: number; }) => obj.contactTypeId === inputValues.contactTypeId);

            if (alreadyHaveCount !== -1) handleEditContactCount(true, inputValues.contactTypeId, getState)
            else contactTypeCounts.push({ count: 1, contactTypeId: inputValues.contactTypeId });

            const filterCountsForAllTabs = contactTypeCounts.filter((obj: { contactTypeId: number, count: number; }) => obj.contactTypeId === 0);

            if (filterCountsForAllTabs.length > 0) handleEditContactCount(true, 0, getState)
            else contactTypeCounts.push({ count: 1, contactTypeId: inputValues.contactTypeId });

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
const handleEditContactCount = (isAdd: boolean, selectedTabId?: number, getState?: any) => {
    const currentState = getState();
    const contactTypeCounts = currentState.root.contactTypesCount;
    const filterCounts = contactTypeCounts.filter((obj: { contactTypeId: number, count: number; }) => obj.contactTypeId === selectedTabId)
    if (filterCounts?.length > 0) {
        if (isAdd) { filterCounts[0].count = filterCounts[0].count + 1; }
        else {
            if (filterCounts[0]?.count > 0) filterCounts[0].count = filterCounts[0].count - 1;
        }
    } else {
        contactTypeCounts.push({ contactTypeId: selectedTabId, count: 1 })
    }
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
            const contactTypeCounts = currentState.root.contactTypesCount;
            const contactTypeCountsForTotalContact = currentState.root.totalContacts

            if (previousList == -1 && findId === -1) {
                console.log('266 - inputValues.contactTypeId', contactTypeCounts,)
                handleEditContactCount(false, id, getState)
                removeFromTotalContact(currentState, id)
                handleEditContactCount(true, editContactResponse.data.resultData.contactTypeId, getState)
            }
            else {
                let editContactIndex = contactClone[previousList].contacts.findIndex((i: { id: number }) => i.id == editContactResponse.data.resultData.id);
                if (findId === -1) {
                    console.log('274 - inputValues.contactTypeId', contactTypeCounts, findId, editContactResponse.data.resultData.contactTypeId)
                    handleEditContactCount(false, id, getState)
                    removeFromTotalContact(currentState, id)
                    handleEditContactCount(true, editContactResponse.data.resultData.contactTypeId, getState)
                    contactClone[previousList].contacts.splice(editContactIndex, 1);
                } else {
                    if (id !== inputValues.contactTypeId) {
                        console.log('279 - inputValues.contactTypeId', contactTypeCounts, editContactIndex)
                        if (editContactIndex !== -1) {
                            handleEditContactCount(false, id, getState)
                            removeFromTotalContact(currentState, id)
                            handleEditContactCount(true, editContactResponse.data.resultData.contactTypeId, getState)
                            contactClone[previousList].contacts.splice(editContactIndex, 1);
                            contactClone[findId].contacts.splice(editContactIndex, 0, editContactResponse.data.resultData);
                        }
                    } else {
                        console.log('287 - inputValues.contactTypeId', contactTypeCounts, editContactIndex)
                        contactClone[findId].contacts.splice(editContactIndex, 1, editContactResponse.data.resultData);
                    }
                }
            }
            console.log(contactClone, 'contactClone', contactTypeCounts, contactTypeCountsForTotalContact)
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
            let response: any = await contactTypeCount(accessToken);
            let allData: number = 0;
            response?.data?.resultData?.map((val: any) => { allData = allData + val.count })
            response?.data?.resultData.unshift({ contactTypeId: 0, count: allData })
            dispatch({ type: CONTACTTYPESCOUNT, payload: response.data.resultData });
        } catch (error: any) {
            console.log(error.message, 'error')
        }
    }
}
const removeFromTotalContact = (currentState: any, tabId?: number) => {
    const contactTypeCountsForTotalContact = currentState.root.totalContacts
    const filterCountsFromSpecialityTabForTotalContact = contactTypeCountsForTotalContact.filter((obj: { id: number, count: number; }) => obj.id === tabId)
    if (filterCountsFromSpecialityTabForTotalContact?.length > 0) {
        if (filterCountsFromSpecialityTabForTotalContact[0].totalRecords > 0) {
            filterCountsFromSpecialityTabForTotalContact[0].totalRecords = filterCountsFromSpecialityTabForTotalContact[0].totalRecords - 1;
        }
    }

}

interface Contact {
    id: number; // Assuming id is of type number, adjust as necessary
}

interface ObjectWithContacts {
    contacts: Contact[];
}

function removeObjectById(array: ObjectWithContacts[], idToRemove: number): ObjectWithContacts[] {
    return array.filter((obj: ObjectWithContacts) => {
        obj.contacts = obj.contacts.filter((contact: Contact) => contact.id !== idToRemove);
        return obj.contacts.length > 0;
    });
}

export const DeleteContactAction = (id: number, activeTabId: number, contactTypeId: number) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            await deleteContact(id);
            const currentState = getState();
            let contactClone = currentState.root.contacts;
            if (contactTypeId == activeTabId) {
                removeFromTotalContact(currentState, contactTypeId)
                handleEditContactCount(false, contactTypeId, getState)
                removeFromTotalContact(currentState, 0)
                handleEditContactCount(false, 0, getState)

            }
            else {
                removeFromTotalContact(currentState, activeTabId)
                removeFromTotalContact(currentState, contactTypeId)
                handleEditContactCount(false, activeTabId, getState)
                handleEditContactCount(false, contactTypeId, getState)
            }
            let arrayOfObjects = removeObjectById(contactClone, id);
            dispatch({ type: CONTACTS, payload: [] });
            dispatch({ type: CONTACTS, payload: arrayOfObjects });
        } catch (error: any) {
            console.log(error.message, 'error')
        }
    }
}


export const SearchContactAction = (keyword: string, type: number, specialityID?: number) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            dispatch({ type: SCREENLOADER, payload: true });
            // dispatch({ type: LOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                const searchContactResponse: any = await searchContact(JSON.parse(accessToken), keyword, type, specialityID);

                if (searchContactResponse.data.resultData.list?.length > 0) {
                    searchContactResponse.data.resultData.list.forEach(function (obj: any) {
                        obj.value = obj.fullName;
                        obj.key = Math.floor(Math.random() * Date.now());;

                    });
                };
                const currentState = getState();
                let contactClone = JSON.parse(JSON.stringify(currentState.root.searchedData));

                const isAlreadyHave = contactClone.findIndex((obj: { id: number }) => obj.id === type)
                if (isAlreadyHave === -1) {
                    contactClone.push({ id: type, contacts: searchContactResponse.data.resultData.list });
                } else {
                    contactClone[isAlreadyHave].contacts = searchContactResponse.data.resultData.list;
                }
                dispatch({ type: SEARCHEDDATA, payload: contactClone })
            }
            // dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            // dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        }
    }
}

export const TypeContactAction = (id: number, setpageIndex?: any, pageIndex?: number) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            const currentState = getState();
            let totalContactsClone = JSON.parse(JSON.stringify(currentState.root.totalContacts));
            // dispatch({ type: SCREENLOADER, payload: true });
            dispatch({ type: LOADER, payload: true });
            // dispatch({ type: PAGINATIONLOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                const typeContactResponse: any = await typeContact(JSON.parse(accessToken), id, pageIndex ? pageIndex : 1, 15);
                if (setpageIndex && pageIndex) { await setpageIndex(pageIndex + 1) };
                const currentState = getState();
                let contactClone = JSON.parse(JSON.stringify(currentState.root.contacts));
                let alreadyHave = contactClone.findIndex((val: any) => val.id == id);
                if (alreadyHave === -1) {
                    let createDataForTab = [...contactClone, { id, contacts: typeContactResponse.data.resultData.list }]
                    let selectedDataFilter: any = createDataForTab.filter((val) => val.id == id)
                    if (selectedDataFilter?.length > 0) {
                        await selectedDataFilter[0].contacts.forEach(function (obj: any) {
                            obj.value = obj.fullName;
                            obj.key = Math.floor(Math.random() * Date.now());
                        });
                    }
                    dispatch({ type: CONTACTS, payload: createDataForTab })
                    if (typeContactResponse.data.resultData?.totalRecords) totalContactsClone.push({ totalRecords: typeContactResponse.data.resultData.totalRecords, id });
                } else {
                    await contactClone.forEach((obj: any) => {
                        if (obj.id === id) {
                            let cloneDate = [...obj.contacts, ...typeContactResponse.data.resultData.list]
                            obj.contacts = cloneDate;
                            obj.contacts.forEach(function (obj: any) {
                                obj.value = obj.fullName;
                                obj.key = Math.floor(Math.random() * Date.now());;

                            });
                        }
                    });
                    dispatch({ type: CONTACTS, payload: contactClone })
                }
            }
            dispatch({ type: TOTALCONTACTS, payload: totalContactsClone });
            dispatch({ type: LOADER, payload: false });
            // dispatch({ type: PAGINATIONLOADER, payload: false });
            // dispatch({ type: SCREENLOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
            // dispatch({ type: PAGINATIONLOADER, payload: false });
            // dispatch({ type: SCREENLOADER, payload: false });
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
                        obj.key = Math.floor(Math.random() * Date.now());;

                    });
                }
                const currentState = getState();
                let contactClone = JSON.parse(JSON.stringify(currentState.root.searchedData));
                const isAlreadyHave = contactClone.findIndex((obj: { id: number }) => obj.id === type)
                if (isAlreadyHave === -1) {
                    contactClone.push({ id: type, contacts: typeContactResponse.data.resultData.list });
                } else {
                    contactClone[isAlreadyHave].contacts = typeContactResponse.data.resultData.list;
                }

                dispatch({ type: SEARCHEDDATA, payload: contactClone })
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

export const CreateSpeciality = (apiData: { industryId: number, name: string }) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            dispatch({ type: SCREENLOADER, payload: true });
            let accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                const currentState = getState();
                let specialitiesClone = currentState.root.specialities;
                const responseAddSpeciality: any = await addSpecialities(JSON.parse(accessToken), apiData);
                specialitiesClone.push(responseAddSpeciality.data.resultData);
            };
            dispatch({ type: SCREENLOADER, payload: false });
        } catch (error: any) {
            console.log(error.message, 'error')
            dispatch({ type: LOADER, payload: false });
            dispatch({ type: SCREENLOADER, payload: false });
        }
    }
};


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

//TimeCard Actions

export const clockInAction = (
    timesheetData: TimesheetTransactionViewModel, // Body data (using the updated model)
    timeZone: string,                            // Query param
    projectId: number                            // Query param
  ) => {
    return async (dispatch: Dispatch) => {
      try {
        dispatch({ type: LOADER, payload: true });  // Start loader
        console.log("THE TIMEZONE AND PROJECTID ", timeZone, projectId)
        // Call the clockIn API
        const response = await clockIn(timesheetData, timeZone, projectId);
  
        // Handle successful response
        if (response) {
          await AsyncStorage.setItem('clockInData', JSON.stringify(response));  // Optional storage
          dispatch({ type: CLOCKIN_SUCCESS, payload: response });
        }
  
        dispatch({ type: LOADER, payload: false });  // Stop loader
  
      } catch (error: any) {
        dispatch({ type: LOADER, payload: false });  // Stop loader
        console.error('Clock-in error:', error.message);
        dispatch({ type: CLOCKIN_FAILURE, payload: error.message });
      }
    };
  };


  export const breakInAction = (
    timesheetData: TimesheetTransactionViewModel // Body data (using the updated model)
  ) => {
    return async (dispatch: Dispatch) => {
      try {
        dispatch({ type: LOADER, payload: true });  // Start loader
  
        // Call the breakIn API
        const response = await breakIn(timesheetData);
  
        // Handle successful response
        if (response) {
          await AsyncStorage.setItem('breakInData', JSON.stringify(response));  // Optional storage
          dispatch({ type: CLOCKIN_SUCCESS, payload: response });
        }
  
        dispatch({ type: LOADER, payload: false });  // Stop loader
  
      } catch (error: any) {
        dispatch({ type: LOADER, payload: false });  // Stop loader
        console.error('Break-in error:', error.message);
        dispatch({ type: CLOCKIN_FAILURE, payload: error.message });
      }
    };
  };


  export const breakOutAction = (
    timesheetData: TimesheetTransactionViewModel // Data to be sent to the break-out API
  ) => {
    return async (dispatch: Dispatch) => {
      try {
        dispatch({ type: LOADER, payload: true });  // Start loader
  
        // Call the breakOut service
        const response = await breakOut(timesheetData);
  
        // Handle successful response
        if (response) {
          await AsyncStorage.setItem('breakOutData', JSON.stringify(response));  // Optional storage
          dispatch({ type: CLOCKIN_SUCCESS, payload: response });
        }
  
        dispatch({ type: LOADER, payload: false });  // Stop loader
  
      } catch (error: any) {
        dispatch({ type: LOADER, payload: false });  // Stop loader
        console.error('Break-out error:', error.message);
        dispatch({ type: CLOCKIN_FAILURE, payload: error.message });
      }
    };
  };

  export const clockOutAction = (
    timesheetData: TimesheetTransactionViewModel // Data to be sent to the clock-out API
  ) => {
    return async (dispatch: Dispatch) => {
      try {
        dispatch({ type: LOADER, payload: true });  // Start loader
  
        // Call the clockOut service
        const response = await clockOut(timesheetData);
  
        // Handle successful response
        if (response) {
          await AsyncStorage.setItem('clockOutData', JSON.stringify(response));  // Optional storage
          dispatch({ type: CLOCKIN_SUCCESS, payload: response });
        }
  
        dispatch({ type: LOADER, payload: false });  // Stop loader
  
      } catch (error: any) {
        dispatch({ type: LOADER, payload: false });  // Stop loader
        console.error('Clock-out error:', error.message);
        dispatch({ type: CLOCKIN_FAILURE, payload: error.message });
      }
    };
  };

  // call like this >>>> dispatch(clockOutAction(timesheetData));

//   //Projects actions
//   export const getProjectsByRadiusAction = (
//     latitude: number,
//     longitude: number,
//     status?: number // Optional status parameter
//   ) => {
//     return async (dispatch: Dispatch) => {
//       try {
//         dispatch({ type: LOADER, payload: true }); // Start loading
        
//         // Call the API to get projects by radius
//         const response = await getProjectsByRadius(latitude, longitude, status);
        
//         // Dispatch success action with the fetched projects
//         dispatch({ type: CURRENT_PROJECTS, payload: response });
  
//       } catch (error) {
//         console.error('Error fetching projects by radius:', error);
//         // Optionally handle errors by dispatching a failure action
//         // dispatch({ type: FETCH_PROJECTS_ERROR, payload: error.message });
//       } finally {
//         dispatch({ type: LOADER, payload: false }); // Stop loading
//       }
//     };
//   };

  export const getProjectsByRadiusAction = (
    latitude: number,
    longitude: number,
    status?: number
  ) => {
    return async (dispatch: Dispatch) => {
      try {
        dispatch({ type: LOADER, payload: true }); // Start loading
        
        const response = await getProjectsByRadius(latitude, longitude, status);
        
        dispatch({ type: CURRENT_PROJECTS, payload: response });
  
        return response; // <-- Explicitly return the response here
  
      } catch (error) {
        console.error('Error fetching projects by radius:', error);
      } finally {
        dispatch({ type: LOADER, payload: false }); // Stop loading
      }
    };
  };
  

  export const getMembersByTimesheetAction = (
    startDate: string, 
    endDate: string, 
    projectId?: number
  ) => async (dispatch: Dispatch) => {
    try {
      console.log("The start and end dates:", startDate, endDate);
  
      // Dispatch request action
      dispatch({ type: GET_MEMBERS_BY_TIMESHEET_REQUEST });
  
      // Fetch data from the API
      const response: IResponse<TeamTimesheetListView[]> = await getMembersByTimesheet(startDate, endDate, projectId);
  
      console.log("Redux Dispatch Response: ", response);
  
      // Dispatch success action with data
      dispatch({
        type: GET_MEMBERS_BY_TIMESHEET_SUCCESS,
        payload: response,
      });
  
      // Return the response for further use
      return response;
    } catch (error) {
      // Dispatch failure action with error message
      dispatch({
        type: GET_MEMBERS_BY_TIMESHEET_FAILURE,
        payload: error.message || 'Error fetching members by timesheet'
      });
  
      // Return the error to handle it outside the action
      return { error: error.message || 'Error fetching members by timesheet' };
    }
  };
// Component Call: dispatch(getMembersByTimesheetAction('2024-09-01', '2024-09-30', projectId));



  

  // Action to fetch timesheet by user
export const getTimesheetByUserAction = (
    userId: string, 
    startDate?: string, 
    endDate?: string, 
    projectId?: number
  ) => async (dispatch: Dispatch) => {
    try {
      // Dispatch request action
      dispatch({ type: GET_TIMESHEET_BY_USER_REQUEST });
  
      // Fetch data from API
      const response: IResponse<TimesheetViewModel[]> = await getTimesheetByUserApi(userId, startDate, endDate, projectId);
  
      // Dispatch success action with data
      dispatch({
        type: GET_TIMESHEET_BY_USER_SUCCESS,
        payload: response
      });
    } catch (error) {
      // Dispatch failure action with error
      dispatch({
        type: GET_TIMESHEET_BY_USER_FAILURE,
        payload: error.message || 'Error fetching timesheet data'
      });
    }
  };
  //call: dispatch(getTimesheetByUserAction('user-id-here', '2024-09-01', '2024-09-30', 1));
  
  // action to get the current timesheet
export const getCurrentTimesheetAction = () => async (dispatch: Dispatch) => {
    try {
      // Dispatch request action
      dispatch({ type: GET_CURRENT_TIMESHEET_REQUEST });
  
      // Fetch the current timesheet from the API
      const response: IResponse<TimesheetViewModel> = await getCurrentTimesheetApi();
  
      // Dispatch success action with the response data
      dispatch({
        type: GET_CURRENT_TIMESHEET_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch failure action with error message
      dispatch({
        type: GET_CURRENT_TIMESHEET_FAILURE,
        payload: error.message || 'Error fetching current timesheet',
      });
    }
  };
  

  // get timesheets for the current user
export const getTimesheetsForCurrentUserAction = (
    startDate?: string,
    endDate?: string
  ) => async (dispatch: Dispatch) => {
    try {
      // Dispatch request action
      dispatch({ type: GET_USER_TIMESHEETS_REQUEST });
  
      // Fetch the timesheets from the API
      const response: IResponse<TimesheetViewModel[]> = await getTimesheetsForCurrentUserApi(
        startDate,
        endDate
      );
  
      // Dispatch success action with the response data
      dispatch({
        type: GET_USER_TIMESHEETS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch failure action with error message
      dispatch({
        type: GET_USER_TIMESHEETS_FAILURE,
        payload: error.message || 'Error fetching user timesheets',
      });
    }
  };
// call: dispatch(getTimesheetsForCurrentUserAction(startDate, endDate));


  export const updateTimesheetAction = (
    timesheetId: string,
    timesheetData: TimesheetViewModel
  ) => async (dispatch: Dispatch) => {
    try {
      // Dispatch request action
      dispatch({ type: UPDATE_TIMESHEET_REQUEST });
  
      // Call the API to update the timesheet
      const response = await updateTimesheetApi(timesheetId, timesheetData);
  
      // Dispatch success action if the update is successful
      dispatch({
        type: UPDATE_TIMESHEET_SUCCESS,
        payload: response,
      });
    } catch (error) {
      // Dispatch failure action with the error message
      dispatch({
        type: UPDATE_TIMESHEET_FAILURE,
        payload: error.message || 'Error updating the timesheet',
      });
    }
  };

  //call: dispatch(updateTimesheetAction(timesheetId, timesheetData));