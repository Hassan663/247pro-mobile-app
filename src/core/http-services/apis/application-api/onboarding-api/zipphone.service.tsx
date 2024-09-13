import {getApi, postApi, putApi} from '../../../services/services';
import {Endpoint, IResponse} from '../../../../modals/index';

import {ZipAndPhone} from '../../../../modals/zipphone.modal'; //need to re-evalute this modal based on API
import {ZIP_PHONE_ENDPOINT} from '../../apis';
import { useDispatch } from 'react-redux';
import { CURRENTUSERPROFILE } from '../../../../../store/constant/constant';

export const submitZipAndPhone = async (
  accessToken: string,
  _postalCode: string,
  _phone: string,
  phoneCountryId: number,
): Promise<IResponse> => {
  try {
   
    const data: ZipAndPhone = {
      postalCode: _postalCode,
      phone: _phone,
      phoneCountryId: phoneCountryId,
    };
    const ZIP_PHONE_ENDPOINT_CLONE: Endpoint = {...ZIP_PHONE_ENDPOINT};
    ZIP_PHONE_ENDPOINT_CLONE.JWTToken = JSON.parse(accessToken);
    // Call the API and get the response
    console.log("api payload: ",data);
    const response = await putApi(ZIP_PHONE_ENDPOINT_CLONE, data);
    //return response
    // Extract resultData from the response
    if (response.data && response.data.resultData) {
      console.log(response.data);
      return {
        ...response,
        resultData: response.data.resultData,
      };
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error Posting zip and Phone:', error);
    throw error;
  }
};
