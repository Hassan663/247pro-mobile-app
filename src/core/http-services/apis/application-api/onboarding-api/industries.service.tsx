// services/industry.service.tsx
import {getApi, postApi, putApi} from '../../../services/services';
import {Endpoint, IResponse} from '../../../../modals/index';
import {
  Industry,
  PrimarySpecialty,
  JobType,
} from '../../../../modals/industry.modal';
import {
  INDUSTORY_ENDPOINT,
  PRIMARY_SPECIALITY_ENDPOINT,
  JOB_TYPE_ENDPOINT,
  SUBMIT_JOB_LEAD_ENDPOINT,
} from '../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace this with your actual API URL
const API_URL = 'https://your-api-url.com';

export const fetchIndustries = async (
  accessToken: string,
): Promise<IResponse<Industry[]>> => {
  try {
    const data: any = {};
    //let accessToken = await AsyncStorage.getItem('accessToken');
    //const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVGVzdCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRlc3QwMEBnbWFpbC5jb20iLCJ1c2VySWQiOiIzNjE4MjhhYi0yYWNlLTRlNGYtODk3MC0wMjU3ODM5MDdiYTciLCJhY2NvdW50SWQiOiIzNjE4MjhhYi0yYWNlLTRlNGYtODk3MC0wMjU3ODM5MDdiYTciLCJpZGVudGl0eVVzZXJJZCI6ImFiNjMxZjRhLTRjY2ItNGVlNC1iNzA2LTE5YmMzYTUxZTg1OCIsImp0aSI6IjdmZTE1Yzk2LTBjOWMtNDk3My1iM2FkLTY5ZjU0ZThmZjRiYyIsImV4cCI6MTcyNTQ5MjgwNCwiaXNzIjoiaHR0cHM6Ly9hcGkuMjQ3cHJvLmNvbSIsImF1ZCI6Imh0dHBzOi8vYXBwLjI0N3Byby5jb20ifQ._2CiZjC0CLArpsjHtdIgzDb5K-X2B4J5uhKGk0wWdz4';
  
  
    const INDUSTORY_ENDPOINT_CLONE: Endpoint = {...INDUSTORY_ENDPOINT};
    INDUSTORY_ENDPOINT_CLONE.JWTToken = JSON.parse(accessToken);
    // Call the API and get the response
    console.log("Api Call: ",INDUSTORY_ENDPOINT_CLONE);
    const response = await getApi(INDUSTORY_ENDPOINT_CLONE, data);
    // Extract resultData from the response
    console.log(response);
    if (response.data && response.data.resultData) {
      return {
        ...response,
        resultData: response.data.resultData as Industry[], // Cast resultData to Industry[]
      };
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error fetching industries:', error.message);
    throw error;
  }
};

export const fetchSpecialityByIndustry = async (
    accessToken: string,
    industryId: number,
  ): Promise<IResponse<PrimarySpecialty[]>> => {
    try {
      const data: any = {};
      const PRIMARY_SPECIALITY_ENDPOINT_CLONE: Endpoint = {...PRIMARY_SPECIALITY_ENDPOINT};
      PRIMARY_SPECIALITY_ENDPOINT_CLONE.url= PRIMARY_SPECIALITY_ENDPOINT.url + `/${industryId}`;
      PRIMARY_SPECIALITY_ENDPOINT_CLONE.JWTToken = JSON.parse(accessToken);
      // Call the API and get the response
      console.log(PRIMARY_SPECIALITY_ENDPOINT_CLONE);
      const response = await getApi(PRIMARY_SPECIALITY_ENDPOINT_CLONE, data);
      // Extract resultData from the response
      if (response.data && response.data.resultData) {
        return {
          ...response,
          resultData: response.data.resultData as PrimarySpecialty[], // Cast resultData to Industry[]
        };
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error fetching industries:', error);
      throw error;
    }
  };

  export const fetchJobTypeByIndustry = async (
    accessToken: string,
    industryId: number,
  ): Promise<IResponse<JobType[]>> => {
    try {
      const data: any = {};
      const JOB_TYPE_ENDPOINT_CLONE: Endpoint = {...JOB_TYPE_ENDPOINT};
      JOB_TYPE_ENDPOINT_CLONE.url= JOB_TYPE_ENDPOINT.url + `/${industryId}`;
      JOB_TYPE_ENDPOINT_CLONE.JWTToken = JSON.parse(accessToken);
      // Call the API and get the response
      console.log(JOB_TYPE_ENDPOINT_CLONE);
      const response = await getApi(JOB_TYPE_ENDPOINT_CLONE, data);
      // Extract resultData from the response
      if (response.data && response.data.resultData) {
        return {
          ...response,
          resultData: response.data.resultData as JobType[], // Cast resultData to Industry[]
        };
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error fetching industries:', error);
      throw error;
    }
  };


  export const submitJobLeads = async (
    accessToken: string,
    industryId: string,
    jobTypeId: string,
    specialtyIds: number[],
  ): Promise<any> => {
  
    const data = {
      industryId,
      jobTypeId,
      specialtyIds: Array.isArray(specialtyIds) ? specialtyIds : [specialtyIds], // Ensure specialtyIds is always an array
    };
  
    try {
      //const data: any = {};
      const SUBMIT_JOB_LEAD_ENDPOINT_CLONE: Endpoint = {...SUBMIT_JOB_LEAD_ENDPOINT};
      SUBMIT_JOB_LEAD_ENDPOINT_CLONE.url= SUBMIT_JOB_LEAD_ENDPOINT.url;
      SUBMIT_JOB_LEAD_ENDPOINT_CLONE.JWTToken = JSON.parse(accessToken);
      // Call the API and get the response
      console.log(SUBMIT_JOB_LEAD_ENDPOINT_CLONE);
      console.log(data);
       
      const response = await putApi(SUBMIT_JOB_LEAD_ENDPOINT_CLONE, data);
      // Extract resultData from the response
      console.log(response.data);
      if (response.data && response.data.resultData) {
        return {
          ...response,
          resultData: response.data.resultData, // Cast resultData to Industry[]
        };
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error fetching industries:', error);
      throw error;
    }
  };
  