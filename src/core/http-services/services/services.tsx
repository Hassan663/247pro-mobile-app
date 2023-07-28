import axios from 'axios';
import { IResponse } from '../../modals';

//TODO: Write a generic error hndling 

// getapi response type alwasy IResponse
const postApi = async <TReq, TRes>(url: string, postData: TReq): Promise<IResponse<TRes>> => {
    try {
      const response = await axios.post(url, postData);
      return response.data;
    } catch (error) {
    //   handleApiError(error);
      throw error;
    }
  };




// const postApi = async <TReq, TRes>(url: string, postData: TReq): Promise<IResponse<TRes>> => { return await axios.post(url, postData) };

// getapi response type alwasy IResponse
const getApi = async <TReq, TRes> (url: string): Promise<IResponse<TRes>>  => { return await axios.get(url) };

// getapi response type alwasy IResponse
const deleteApi = async <TReq, TRes> (url: string): Promise<IResponse<TRes>>  =>{ return await axios.delete(url) };

// getapi response type alwasy IResponse
const putApi = async  <TReq, TRes> (url: string, postData: object) : Promise<IResponse<TRes>>  => { return await axios.put(url, postData) };


export { postApi, getApi, deleteApi, putApi };
