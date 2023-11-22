import { getApi, postApi } from '../../services/services';
import { IResponse } from '../../../modals/index';
import { ForgetModal, IForgetResponseData, LoginModal, } from '../../../modals/login.modal';
import { ILoginResponseData } from '../../../modals/login.modal';
import {
  FORGET_PASSWORD_ENDPOINT,
  LOGIN_ENCRIPTION_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGIN_IDENTITY_ENDPOINT,
  LOGOUT_ENDPOINT
} from '../apis';

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
    const loginDataWithToken: any = { token: encryptedLoginResponse.response };
    const loginResponse: any = await postApi<LoginModal, ILoginResponseData>(LOGIN_ENDPOINT, loginDataWithToken);
    LOGIN_IDENTITY_ENDPOINT.JWTToken = loginResponse.accessToken
    LOGIN_IDENTITY_ENDPOINT.Cookie = true
    const emptyBody: any = {};

    // Step 3: get user identity 
    let identityResponse: any = await getApi<LoginModal, ILoginResponseData>(LOGIN_IDENTITY_ENDPOINT, emptyBody);
    identityResponse.accessToken = loginResponse.accessToken
    return identityResponse;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};
const forget_password = async (forgetdata: ForgetModal): Promise<IResponse<ILoginResponseData>> => {
  try {
    FORGET_PASSWORD_ENDPOINT.url = FORGET_PASSWORD_ENDPOINT.url + `?email=${forgetdata.email}`
    const forgetPasswordData: any = {};
    const response = await postApi<ForgetModal, IForgetResponseData>(FORGET_PASSWORD_ENDPOINT, forgetPasswordData);
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
    console.log(response, 'response')
    return response;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};

export { login, forget_password, logout };
