import { postApi } from '../../services/services';
import { IResponse } from '../../../modals/index';
import { LoginModal } from '../../../modals/login.modal';
import { ILoginResponseData } from '../../../modals/login.modal';
import {
  LOGIN_ENCRIPTION_ENDPOINT,
  LOGIN_ENDPOINT
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
    const response = await postApi<LoginModal, ILoginResponseData>(LOGIN_ENDPOINT, loginDataWithToken);
    return response;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};

export { login };
