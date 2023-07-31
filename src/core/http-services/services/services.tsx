import { Endpoint, IResponse } from '../../modals';
import { handleApiError } from '../apis/handle-api-error/api.error.service';
import axios, { AxiosError, AxiosResponse } from 'axios';

// Dummy JWT Token (replace this with an actual JWT token if needed)
const DUMMY_JWT_TOKEN = 'your_dummy_jwt_token_here';

const postApi = async <TReq, TRes>(LOGIN_ENDPOINT: Endpoint, postData: TReq): Promise<IResponse<TRes>> => {
  try {
    // Determine whether to include the header based on LOGIN_ENDPOINT.JWTToken
    const headers = LOGIN_ENDPOINT.JWTToken ? { Authorization: `Bearer ${DUMMY_JWT_TOKEN}` } : {};

    const response = await axios.post(LOGIN_ENDPOINT.url, postData, { headers });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    handleApiError(axiosError);
    throw error;
  }
};

const getApi = async <TReq, TRes>(LOGIN_ENDPOINT: Endpoint): Promise<IResponse<TRes>> => {
  try {
    // No need to include headers for GET requests
    const response = await axios.get(LOGIN_ENDPOINT.url);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    handleApiError(axiosError);
    throw error;
  }
};

const deleteApi = async <TReq, TRes>(LOGIN_ENDPOINT: Endpoint): Promise<IResponse<TRes>> => {
  try {
    // Determine whether to include the header based on LOGIN_ENDPOINT.JWTToken
    const headers = LOGIN_ENDPOINT.JWTToken ? { Authorization: `Bearer ${DUMMY_JWT_TOKEN}` } : {};

    const response = await axios.delete(LOGIN_ENDPOINT.url, { headers });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    handleApiError(axiosError);
    throw error;
  }
};

const putApi = async <TReq, TRes>(LOGIN_ENDPOINT: Endpoint, postData: object): Promise<IResponse<TRes>> => {
  try {
    // Determine whether to include the header based on LOGIN_ENDPOINT.JWTToken
    const headers = LOGIN_ENDPOINT.JWTToken ? { Authorization: `Bearer ${DUMMY_JWT_TOKEN}` } : {};

    const response = await axios.put(LOGIN_ENDPOINT.url, postData, { headers });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    handleApiError(axiosError);
    throw error;
  }
};

export { postApi, getApi, deleteApi, putApi };
