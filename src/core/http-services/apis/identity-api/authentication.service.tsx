import { Toast } from 'react-native-toast-notifications';
import { getApi, postApi } from '../../services/services';
import { IResponse } from '../../../modals/index';
import { ILoginResponseData } from '../../../modals/login.modal';
import {
  ForgetModal,
  IForgetResponseData,
  LoginModal,
  UserIdentity,
} from '../../../modals/login.modal';
import {
  FORGET_PASSWORD_ENDPOINT,
  LOGIN_ENCRIPTION_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGIN_IDENTITY_ENDPOINT,
  LOGOUT_ENDPOINT
} from '../apis';
import { t } from 'i18next';

/**
 * Performs user login by sending login data to the server.
 *
 * @param loginData - The login data containing user credentials.
 * @returns A promise that resolves to the login response.
 */

const login = async (loginData: LoginModal): Promise<IResponse<ILoginResponseData>> => {
  try {
    // Step 1: Encrypt the login data
    const encryptedLoginResponse: any = await postApi<LoginModal, ILoginResponseData>(LOGIN_ENCRIPTION_ENDPOINT, loginData);

    // Step 2: Prepare the login request with the token received from step 1
    const loginDataWithToken: any = { token: encryptedLoginResponse.data.response };
    const loginResponse: any = await postApi<LoginModal, ILoginResponseData>(LOGIN_ENDPOINT, loginDataWithToken);

    // Step 3: get user identity 
    const identityResponse: any = userIdentity(loginResponse.data.accessToken)
    return identityResponse;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};

const userIdentity = async (accessToken: string): Promise<IResponse<ILoginResponseData>> => {
  try {
    LOGIN_IDENTITY_ENDPOINT.JWTToken = accessToken
    LOGIN_IDENTITY_ENDPOINT.Cookie = true
    const emptyBody: any = {};
    let identityResponse: any = await getApi<UserIdentity, ILoginResponseData>(LOGIN_IDENTITY_ENDPOINT, emptyBody);
    identityResponse.data.accessToken = accessToken
    return identityResponse.data;
  } catch (error) {
    console.error('Identity service error:', error);
    throw error;
  }
};

const forget_password = async (forgetdata: ForgetModal): Promise<IResponse<ILoginResponseData>> => {
  try {
    FORGET_PASSWORD_ENDPOINT.url = FORGET_PASSWORD_ENDPOINT.url + `?email=${forgetdata.email}`
    const forgetPasswordData: any = {};
    const response: any = await postApi<ForgetModal, IForgetResponseData>(FORGET_PASSWORD_ENDPOINT, forgetPasswordData);
    if (response.status == 204) Toast.show(t(`Newpasswordlinksenttoyouremail`) + ` ${forgetdata.email}`, { type: "custom_success_toast" });
    return response;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};
const logout = async (): Promise<IResponse<ILoginResponseData>> => {
  try {
    const logOutData: any = {};
    const response = await postApi<LoginModal, ILoginResponseData>(LOGOUT_ENDPOINT, logOutData);
    return response;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};

export { login, forget_password, userIdentity, logout };
