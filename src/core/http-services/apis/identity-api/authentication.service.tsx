import { LoginModal } from '../../../modals/login.modal';
import { postApi } from '../../services/services';
import { LOGIN_ENDPOINT } from '../apis';
import { IResponse } from '../../../modals/index'; // Assuming IResponse and IdentityModel are properly imported or defined
import { ILoginResponseData } from '../../../modals/login.modal'; // Replace './types' with the actual path to the file containing the LoginResponseData type


const login = async (loginData: LoginModal): Promise<IResponse<ILoginResponseData>> => {
    try {
      // const response = await postApi<LoginModal, ILoginResponseData>('https://jsonplaceholder.typicode.com/posts', loginData);
      const response = await postApi<LoginModal, ILoginResponseData>(LOGIN_ENDPOINT, loginData);
      // console.log(response,'responseresponse')
      return response;
    } catch (error) {
      console.error('Login error service:', error);
      throw error;
    }
  };

  export { login };
