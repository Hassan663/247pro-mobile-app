import { getApi, postApi, putApi } from '../../../services/services';
import { ContactModel, IContactCreateModel, IContactUpdateModel } from '../../../../modals/contact.modal';
import { Endpoint, IResponse } from '../../../../modals';
import { CONTACT_ENDPOINT, CREATE_CONTACT_ENDPOINT, LOGIN_ENDPOINT, UPLOAD_IMAGE_ENDPOINT } from '../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createContact = async (data: IContactCreateModel): Promise<IResponse<ContactModel>> => {
  try {
    let accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) { CREATE_CONTACT_ENDPOINT.JWTToken = JSON.parse(accessToken) }
    return await postApi<IContactCreateModel, ContactModel>(CREATE_CONTACT_ENDPOINT, data);
  } catch (error) {
    console.error('Login error service:', error);
    throw error;
  }
};

const editContact = async (data: IContactCreateModel): Promise<IResponse<ContactModel>> => {
  try {
    let accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) { CREATE_CONTACT_ENDPOINT.JWTToken = JSON.parse(accessToken) }
    return await putApi<IContactCreateModel, ContactModel>(CREATE_CONTACT_ENDPOINT, data);
  } catch (error) {
    console.error('Login error service:', error);
    throw error;
  }
};


const updateContact = async (data: IContactUpdateModel): Promise<IResponse<ContactModel>> => {
  try {
    return await postApi<IContactUpdateModel, ContactModel>(LOGIN_ENDPOINT, data);
  } catch (error) {
    console.error('Login error service:', error);
    throw error;
  }
};

const getContact = async (accessToken: string, pageIndex: number, pageSize: number): Promise<IResponse<ContactModel>> => {
  try {
    const data: any = {};
    const CONTACT_ENDPOINT_CLONE: Endpoint = { ...CONTACT_ENDPOINT };

    if (pageIndex && pageSize) {
      CONTACT_ENDPOINT_CLONE.url = CONTACT_ENDPOINT.url + `?pageIndex=${pageIndex}&pageSize=${pageSize}`
    }
    CONTACT_ENDPOINT_CLONE.JWTToken = accessToken;

    return await getApi<IContactUpdateModel, ContactModel>(CONTACT_ENDPOINT_CLONE, data);
  } catch (error) {
    console.error('getContact error service:', error);
    throw error;
  }
};

const getContactDetails = async (accessToken: string, id: number): Promise<IResponse<ContactModel>> => {
  try {
    const data: any = {};
    const CONTACT_DETAILS_ENDPOINT_CLONE: Endpoint = { ...CONTACT_ENDPOINT };

    if (id) {
      CONTACT_DETAILS_ENDPOINT_CLONE.url = CONTACT_DETAILS_ENDPOINT_CLONE.url + `/${id}`;
    }
    CONTACT_DETAILS_ENDPOINT_CLONE.JWTToken = accessToken;

    return await getApi<IContactUpdateModel, ContactModel>(CONTACT_DETAILS_ENDPOINT_CLONE, data);
  } catch (error) {
    console.error('getContact error service:', error);
    throw error;
  }
};


export const uploadImage = async (uri: string, fileName: string, accessToken: string | null) => {
  try {
    // Create FormData object
    if (accessToken) {
      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        type: 'image/jpeg',
        name: fileName,
      });
      const UPLOAD_IMAGE_ENDPOINT_CLONE: Endpoint = { ...UPLOAD_IMAGE_ENDPOINT };
      UPLOAD_IMAGE_ENDPOINT_CLONE.JWTToken = accessToken;

      return await postApi(UPLOAD_IMAGE_ENDPOINT_CLONE, formData)
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};







export { createContact, updateContact, getContact, getContactDetails,editContact };
