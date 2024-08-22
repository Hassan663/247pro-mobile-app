import { Toast } from 'react-native-toast-notifications';
import { getApi, postApi } from '../../services/services';
import { Endpoint, IResponse } from '../../../modals/index';
import { ILoginResponseData, ISignupResponseData, MemberShipApiModal, SignUpModal } from '../../../modals/login.modal';
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
  LOGOUT_ENDPOINT,
  MEMBERSHIP_ENDPOINT,
  SIGNUP_ENDPOINT
} from '../apis';
import { t } from 'i18next';

/**
 * Performs user login by sending login data to the server.
 *
 * @param loginData - The login data containing user credentials.
 * @returns A promise that resolves to the login response.
 */

const encryptData = async (loginData: LoginModal): Promise<IResponse<ILoginResponseData>> => {
  try {
    // Step 1: Encrypt the login data
    const encryptedLoginResponse: any = await postApi<LoginModal, ILoginResponseData>(LOGIN_ENCRIPTION_ENDPOINT, loginData);
    return encryptedLoginResponse;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};


const memberShipApi = async (memberShipApiData: MemberShipApiModal, accessToken: string): Promise<IResponse<ISignupResponseData>> => {
  try {
    MEMBERSHIP_ENDPOINT.JWTToken = accessToken
    const memberResponse: any = await postApi<MemberShipApiModal, ISignupResponseData>(MEMBERSHIP_ENDPOINT, memberShipApiData);
    return memberResponse;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
}
const signUp = async (loginData: SignUpModal): Promise<IResponse<ISignupResponseData>> => {
  try {

    // Step 1: Encrypt the login data
    const encryptedLoginResponse: any = await encryptData(loginData)

    // Step 2: Prepare the login request with the token received from step 1
    const signUpDataWithToken: any = { token: encryptedLoginResponse.data.response };
    const SignupResponse: any = await postApi<SignUpModal, ISignupResponseData>(SIGNUP_ENDPOINT, signUpDataWithToken);

    let memberShipApiData: MemberShipApiModal = {

      accountId: SignupResponse.data.accountId,
      identityUserId: SignupResponse.data.identityUserId,
      userEmail: SignupResponse.data.email,
    };

    if (SignupResponse.data.userName) {
      memberShipApiData.userName = SignupResponse.data.userName;
    } else {
      memberShipApiData.userName = SignupResponse.data.email;

    }
    console.log(memberShipApiData, 'memberShipApiDa123ta', SignupResponse)
    const memberShipApiResponeData: any = await memberShipApi(memberShipApiData, SignupResponse.data.accessToken)
    console.log(memberShipApiResponeData, 'memberShipApiResponeData',)

    // Step 3: get user identity 
    const identityResponse: any = await userIdentity(SignupResponse.data.accessToken)
    return identityResponse;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};
const login = async (loginData: LoginModal): Promise<IResponse<ILoginResponseData>> => {
  try {

    // Step 1: Encrypt the login data
    const encryptedLoginResponse: any = await encryptData(loginData)

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
    // LOGIN_IDENTITY_ENDPOINT.Cookie = true
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
    const FORGET_PASSWORD_ENDPOINT_CLONE: Endpoint = { ...FORGET_PASSWORD_ENDPOINT };
    FORGET_PASSWORD_ENDPOINT_CLONE.url = FORGET_PASSWORD_ENDPOINT.url + `?email=${forgetdata.email}`
    const forgetPasswordData: any = {};
    const response: any = await postApi<ForgetModal, IForgetResponseData>(FORGET_PASSWORD_ENDPOINT_CLONE, forgetPasswordData);
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

export { login, forget_password, userIdentity, logout, encryptData, signUp };
