import { Endpoint, GetApi, IResponse } from '../../modals';
import { handleApiError } from '../apis/handle-api-error/api.error.service';
import axios, { AxiosError, AxiosResponse } from 'axios';

// Dummy JWT Token (replace this with an actual JWT token if needed)
const DUMMY_JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXV6YW1taWwiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJteW5hbWVpc211emFtbWlsaHVzc2FpbnNoYWhAZ21haWwuY29tIiwidXNlcklkIjoiNDkyOGEyNWEtNTE0ZC00NjczLWJiYWMtMmIzZWI2NmIzYzA1IiwiYWNjb3VudElkIjoiNDkyOGEyNWEtNTE0ZC00NjczLWJiYWMtMmIzZWI2NmIzYzA1IiwiaWRlbnRpdHlVc2VySWQiOiI4YTVkM2NhOS0zZWM1LTQ4MDMtYmUyZC0wYTNlMWQ1Yzk4ODIiLCJqdGkiOiIwY2NiNTA1NS1mMDhkLTRmY2EtYmYxMy1lMGNkOGE3ZDBmMWYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcwMTc5Mzg5MywiaXNzIjoiaHR0cHM6Ly9hcGlkZXZwcm9maW5kZXIuMjQ3cHJvLmNvbSIsImF1ZCI6Imh0dHBzOi8vYXBwZGV2cHJvZmluZGVyLjI0N3Byby5jb20ifQ.IHvZLG90aqrK-0OjIUOll5m_6-sfZSyrjca4313O4i4';

const postApi = async <TReq, TRes>(ENDPOINT: Endpoint, postData: TReq): Promise<IResponse<TRes>> => {
  try {
    // Determine whether to include the header based on ENDPOINT.JWTToken
    const headers: any = {}
    if (ENDPOINT.JWTToken) headers.Authorization = `Bearer ${ENDPOINT.JWTToken}`
    // const headers = ENDPOINT.JWTToken ? { Authorization: `Bearer ${DUMMY_JWT_TOKEN}` } : {};
    const response: any = await axios.post(ENDPOINT.url, postData, { headers });
    return response
  } catch (error) {
    console.log(error, 'response',)
    const axiosError = error as AxiosError;
    handleApiError(axiosError);
    throw error;
  }
};

const getApi = async <TReq, TRes>(ENDPOINT: Endpoint, postData: TReq): Promise<IResponse<TRes>> => {
  try {
    const headers: any = {}
    if (ENDPOINT.JWTToken) headers.Authorization = `Bearer ${ENDPOINT.JWTToken}`
    if (ENDPOINT.Cookie) headers.Cookie = '_247PRO_Refresh_Token=JXZYg8umdK7Ghlr%2BdjYn9d6CKIODHjeJvlPhPtk9p8zxfrsYBgbG4iJuAJDwxdF%2FhEAvS7STb9GTqqkNwHFpYM60NKcsnG3HyXdg4yExg3GZoJms%2BAvzFFkonfNty4NlQ5EKEeoldW6wsFiucqzPSWV5bjvXhoLlgeZ4I9tkwY2BViGCGYVaRqPKhU%2BR6drb3m4k%2BOiXkThN4wb4uO7MEr%2ByT40bURi%2BVZazUQOL2386LBZmBcSkVlVUePzhjYVIP2ZaOlMtUfaoz8Hr6FiizqIATST5bm695CX2lsRgJSzVPjiqkD1OoZ1XSsdoN7B3LwyWfYG86RqkSaLqiuzrVQ%3D%3D'
    const response: any = await axios.get(ENDPOINT.url, { headers });
    return response
  } catch (error) {
    console.log(error, 'error123')
    const axiosError = error as AxiosError;
    handleApiError(axiosError);
    throw error;
  }
};

const deleteApi = async <TReq, TRes>(LOGIN_ENDPOINT: Endpoint): Promise<IResponse<TRes>> => {
  try {
    console.log(LOGIN_ENDPOINT, "LOGIN_ENDPOINT")
    // Determine whether to include the header based on LOGIN_ENDPOINT.JWTToken
    const headers = LOGIN_ENDPOINT.JWTToken ? { Authorization: `Bearer ${LOGIN_ENDPOINT.JWTToken}` } : {};
    const response: any = await axios.delete(LOGIN_ENDPOINT.url, { headers });
    console.log(response, "response Of delete")
    return response
  } catch (error) {
    const axiosError = error as AxiosError;
    handleApiError(axiosError);
    throw error;
  }
};

const putApi = async <TReq, TRes>(LOGIN_ENDPOINT: Endpoint, postData: TReq): Promise<IResponse<TRes>> => {
  try {
    // Determine whether to include the header based on LOGIN_ENDPOINT.JWTToken
    const headers = LOGIN_ENDPOINT.JWTToken ? { Authorization: `Bearer ${LOGIN_ENDPOINT.JWTToken}` } : {};
    const response: any = await axios.put(LOGIN_ENDPOINT.url, postData, { headers });
    return response
  } catch (error) {
    const axiosError = error as AxiosError;
    handleApiError(axiosError);
    throw error;
  }
};

export { postApi, getApi, deleteApi, putApi };

