import {Toast} from 'react-native-toast-notifications';
import {getApi, postApi} from '../../services/services';
import {Endpoint, IResponse} from '../../../modals/index';
import {
  ILoginResponseData,
  ISignupResponseData,
  MemberShipApiModal,
  SignUpModal,
} from '../../../modals/login.modal';
import {
  ForgetModal,
  IForgetResponseData,
  LoginModal,
  UserIdentity,
} from '../../../modals/login.modal';
import {
  ENTERNAL_LOGIN,
  FORGET_PASSWORD_ENDPOINT,
  LOGIN_ENCRIPTION_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGIN_ENDPOINT_NEW,
  LOGIN_IDENTITY_ENDPOINT,
  LOGOUT_ENDPOINT,
  MEMBERSHIP_ENDPOINT,
  SIGNUP_ENDPOINT,
  SIGNUP_ENDPOINT_NEW,
} from '../apis';
import {t} from 'i18next';

import {showError} from '../../../../store/action/action';
import {Dispatch} from 'redux';
import {VALIDATIONMESSAGE} from '../../../helpers/validation/validation-message';
import axios from 'axios';

/**
 * Performs user login by sending login data to the server.
 *
 * @param loginData - The login data containing user credentials.
 * @returns A promise that resolves to the login response.
 */

const encryptData = async (
  loginData: LoginModal,
): Promise<IResponse<ILoginResponseData>> => {
  try {
    // Step 1: Encrypt the login data
    console.log(
      'DataForEncryption: ',
      loginData,
      ' :',
      LOGIN_ENCRIPTION_ENDPOINT,
    );
    const encryptedLoginResponse: any = await postApi<
      LoginModal,
      ILoginResponseData
    >(LOGIN_ENCRIPTION_ENDPOINT, loginData);
    console.log('api response:', encryptedLoginResponse);
    return encryptedLoginResponse;
  } catch (error) {
    console.error('Encrypt Login service error:', error);
    throw error;
  }
};

const memberShipApi = async (
  memberShipApiData: MemberShipApiModal,
  accessToken: string,
): Promise<IResponse<ISignupResponseData>> => {
  try {
    MEMBERSHIP_ENDPOINT.JWTToken = accessToken;
    const memberResponse: any = await postApi<
      MemberShipApiModal,
      ISignupResponseData
    >(MEMBERSHIP_ENDPOINT, memberShipApiData);
    return memberResponse;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};
const signUp = async (
  signupData: SignUpModal,
  dispatch: Dispatch,
): Promise<IResponse<ISignupResponseData>> => {
  try {
    // Step 1: Encrypt the login data
    //const encryptedLoginResponse: any = await encryptData(loginData);

    // Step 2: Prepare the login request with the token received from step 1
    // const signUpDataWithToken: any = {
    //   token: encryptedLoginResponse.data.response,
    // };
    console.log("SignUp signupData=====:",signupData, SIGNUP_ENDPOINT)

    const SignupResponse: any = await postApi<SignUpModal, ISignupResponseData>(
      SIGNUP_ENDPOINT,
      signupData,
      // signUpDataWithToken,
    );

    let memberShipApiData: MemberShipApiModal = {
      accountId: SignupResponse.data.accountId,
      identityUserId: SignupResponse.data.identityUserId,
      userEmail: SignupResponse.data.email,
    };
    console.log("memberShipApiData.identityUserId=====:",memberShipApiData.identityUserId)

    if (SignupResponse.data.userName) {
      memberShipApiData.userName = SignupResponse.data.userName;
    } else {
      memberShipApiData.userName = SignupResponse.data.email;
    }
    console.log(memberShipApiData, 'memberShipApiDa123ta', SignupResponse);
    const memberShipApiResponeData: any = await memberShipApi(
      memberShipApiData,
      SignupResponse.data.accessToken,
    );
    console.log(memberShipApiResponeData, 'memberShipApiResponeData');

    // Step 3: get user identity
    const identityResponse: any = await userIdentity(
      SignupResponse.data.accessToken,
    );
    return identityResponse;
  } catch (error: any) {
    console.log(error.response.data.fields[0].message,"Hello")
    if (error.response.data.fields[0].message === 'The user already exists') {
      dispatch(showError(t(error.response.data.fields[0].message), t('Email')));
    } else {
      dispatch(showError(error.response.data.fields[0].message, 'all'));
    }
    console.error('Login service error:', error);
    throw error;
  }
};
// const login = async (
//   loginData: LoginModal,
//   dispatch: Dispatch,
// ): Promise<IResponse<ILoginResponseData>> => {
//   try {
//     // Step 1: Encrypt the login data ==>> Encrytion not needed for LOGIN_ENDPOINT_NEW
//     //const encryptedLoginResponse: any = await encryptData(loginData);

//     // Step 2: Prepare the login request with the token received from step 1
//     // const loginDataWithToken: any = {
//     //   token: encryptedLoginResponse.data.response,
//     // };
//     const loginResponse: any = await postApi<LoginModal, ILoginResponseData>(
//       LOGIN_ENDPOINT,
//       loginData,
//       //loginDataWithToken, ==>> encryoted loginData not Needed
//     );

//     // Step 3: get user identity
//     const identityResponse: any = userIdentity(loginResponse.data.accessToken);
//     return identityResponse;
//   } catch (error) {
   
//     dispatch(showError('Invalid Crendentials', 'all'));
   
//     console.error('Login service ssss error:', error);
//     throw error;
//   }
// };

const login = async (
  loginData: LoginModal,
  dispatch: Dispatch,
  setError: (field: string, message: string) => void  // This will be used to set field-specific errors
): Promise<IResponse<ILoginResponseData>> => {
  try {
    // Call the login API
    const loginResponse: any = await postApi<LoginModal, ILoginResponseData>(
      LOGIN_ENDPOINT,
      loginData
    );

    // Get user identity after successful login
    const identityResponse: any = await userIdentity(loginResponse.data.accessToken);
    return identityResponse;
  } catch (error: any) {
    // Check if the error contains a response with fields
    if (axios.isAxiosError(error) && error.response?.data) {
      const apiError = error.response.data;
      
      // Show error messages from the "fields" array, if available
      if (apiError.fields && apiError.fields.length > 0) {
        apiError.fields.forEach((fieldError: { name: string; message: string }) => {
          if (fieldError.name) {
            // Set the error on the specific text field (e.g., email, password)
            setError(fieldError.name, fieldError.message);
          }
        });
      } else {
        // If no specific field errors, show a general error message
        dispatch(showError(apiError.message || 'Invalid Credentials', 'all'));
      }
    } else {
      // If it's a non-Axios error or no response data, show a generic error
      dispatch(showError('Invalid Credentials', 'all'));
    }

    // Log the error for debugging
    console.error('Login service error:', error);
    throw error;  // Rethrow the error to handle it elsewhere if necessary
  }
};

const userIdentity = async (
  accessToken: string,
): Promise<IResponse<ILoginResponseData>> => {
  try {
    console.log('accessToken here:', accessToken);
    LOGIN_IDENTITY_ENDPOINT.JWTToken = accessToken;
    // LOGIN_IDENTITY_ENDPOINT.Cookie = true
   // const emptyBody: any = {};
    let identityResponse: any = await getApi<UserIdentity, ILoginResponseData>(
      LOGIN_IDENTITY_ENDPOINT,
     // emptyBody,
    );
    console.log('Identity:', identityResponse);
    identityResponse.data.accessToken = accessToken;
    return identityResponse.data;
  } catch (error) {
    console.error('Identity service error:', error);
    throw error;
  }
};
const externalLogin = async (body: any): Promise<IResponse<ILoginResponseData>> => {
  try {
    // ENTERNAL_LOGIN.JWTToken = accessToken
    // ENTERNAL_LOGIN.Cookie = true
    // const emptyBody: any = {};
    // const url = 'https://api.247pro.com/api/auth/google-external-login';
    // const response = await axios.post(
    //   url,
    //   body,
    //   {
    //     headers: {
    //       'accept': '*/*',
    //       'Content-Type': 'application/json-patch+json',
    //     },
    //   }
    // );
    let externalGoogleResponse: any = await postApi<UserIdentity, ILoginResponseData>(ENTERNAL_LOGIN, body);
    return externalGoogleResponse.data;
  } catch (error) {
    console.error('External google response:', error);
    throw error;
  }
};

const forget_password = async (
  forgetdata: ForgetModal,
  dispatch: Dispatch,
): Promise<IResponse<ILoginResponseData>> => {
  try {
    const FORGET_PASSWORD_ENDPOINT_CLONE: Endpoint = {
      ...FORGET_PASSWORD_ENDPOINT,
    };
    FORGET_PASSWORD_ENDPOINT_CLONE.url =
      FORGET_PASSWORD_ENDPOINT.url + `?email=${forgetdata.email}`;
    const forgetPasswordData: any = {};
    const response: any = await postApi<ForgetModal, IForgetResponseData>(
      FORGET_PASSWORD_ENDPOINT_CLONE,
      forgetPasswordData,
    );
    if (response.status === 204) {
      Toast.show(t('New password link sent to your email') + ` ${forgetdata.email}`, {
        type: 'custom_success_toast',
      });
    }
    return response;
  } catch (error: any) {
    dispatch(showError(VALIDATIONMESSAGE[10], t('Email_or_phone')));
    console.error('Login service error:', error);
    throw error;
  }
};
const logout = async (): Promise<IResponse<ILoginResponseData>> => {
  try {
    const logOutData: any = {};
    const response = await postApi<LoginModal, ILoginResponseData>(
      LOGOUT_ENDPOINT,
      logOutData,
    );
    return response;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};

export { login, forget_password, userIdentity, logout, encryptData, signUp, externalLogin, memberShipApi };
