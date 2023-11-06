import { LoginModal } from '../../../modals/login.modal';
import { postApi } from '../../services/services';
import { LOGIN_ENCRIPTION_ENDPOINT, LOGIN_ENDPOINT } from '../apis';
import { IResponse } from '../../../modals/index'; // Assuming IResponse and IdentityModel are properly imported or defined
import { ILoginResponseData } from '../../../modals/login.modal'; // Replace './types' with the actual path to the file containing the LoginResponseData type


const login = async (loginData: LoginModal): Promise<IResponse<ILoginResponseData>> => {
  try {
    const encriptesLoginResponse = await postApi<LoginModal, ILoginResponseData>(LOGIN_ENCRIPTION_ENDPOINT, loginData);
    let loginData1: any = { token: encriptesLoginResponse.response }
    const response = await postApi<LoginModal, ILoginResponseData>(LOGIN_ENDPOINT, loginData1);
    return response;
  } catch (error) {
    console.error(loginData, 'Login error service:', error);
    throw error;
  }
};

export { login };
