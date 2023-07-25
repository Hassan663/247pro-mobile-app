import { LoginModal } from '../../../modals/login.modal';
import { postApi } from '../../services/services';
import { LOGIN_ENDPOINT } from '../apis';
import { IResponse } from '../../../modals/index'; // Assuming IResponse and IdentityModel are properly imported or defined
import { LoginResponseData } from '../../../modals/login.modal'; // Replace './types' with the actual path to the file containing the LoginResponseData type


const login = async (loginData: LoginModal): Promise<IResponse<LoginResponseData>> => {
    try {
      const response = await postApi<LoginModal, LoginResponseData>(LOGIN_ENDPOINT, loginData);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  export { login };
