import { deleteApi, getApi, postApi, putApi } from '../../../services/services';
import { ContactModel, IContactCreateModel, IContactUpdateModel } from '../../../../modals/contact.modal';
import { Endpoint, IResponse } from '../../../../modals';
import {
  CONTACT_ENDPOINT,
  CONTACT_SPECIALITIES,
  CREATE_CONTACT_ENDPOINT,
  LOGIN_ENDPOINT,
  UPLOAD_IMAGE_ENDPOINT
} from '../../apis';
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
    const uri = { ...CREATE_CONTACT_ENDPOINT }
    if (accessToken !== null) { uri.JWTToken = JSON.parse(accessToken) }
    return await putApi<IContactCreateModel, ContactModel>(uri, data);
  } catch (error) {
    console.error('Login error service:', error);
    throw error;
  }
};


const deleteContact = async (id: number): Promise<IResponse<ContactModel>> => {
  try {
    const CONTACT_ENDPOINT_CLONE: Endpoint = { ...CONTACT_ENDPOINT };
    let accessToken = await AsyncStorage.getItem('accessToken');
    CONTACT_ENDPOINT_CLONE.url = CONTACT_ENDPOINT.url + `/${id}`
    if (accessToken !== null) { CONTACT_ENDPOINT_CLONE.JWTToken = JSON.parse(accessToken) }
    return await deleteApi<IContactUpdateModel, ContactModel>(CONTACT_ENDPOINT_CLONE);
  } catch (error) {
    console.error('Login error service:', error);
    throw error;
  }
};

// const updateContact = async (data: IContactUpdateModel): Promise<IResponse<ContactModel>> => {
//   try {
//     return await postApi<IContactUpdateModel, ContactModel>(LOGIN_ENDPOINT, data);
//   } catch (error) {
//     console.error('Login error service:', error);
//     throw error;
//   }
// };

const getContact = async (accessToken: string, pageIndex: number, pageSize: number): Promise<IResponse<ContactModel>> => {
  try {
    const data: any = {};
    const CONTACT_ENDPOINT_CLONE: Endpoint = { ...CONTACT_ENDPOINT };

    if (pageIndex && pageSize) {
      CONTACT_ENDPOINT_CLONE.url = CONTACT_ENDPOINT.url + `?pageIndex=${pageIndex}&pageSize=${pageSize}&sort=FullName&sortDirection=ASC`
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
const searchContact = async (accessToken: string, keyword: string, type: number) => {
  try {
    const data: any = {};
    const CONTACT_DETAILS_ENDPOINT_CLONE: Endpoint = { ...CONTACT_ENDPOINT };

    if (keyword && typeof (type) === 'number') {
      CONTACT_DETAILS_ENDPOINT_CLONE.url = CONTACT_DETAILS_ENDPOINT_CLONE.url + `?pageIndex=1&pageSize=9999&sort=FullName&sortDirection=ASC&search=${keyword}${type === 0 ? '' : '&contactTypeId=' + type}`;
    }
    CONTACT_DETAILS_ENDPOINT_CLONE.JWTToken = accessToken;

    return await getApi<IContactUpdateModel, ContactModel>(CONTACT_DETAILS_ENDPOINT_CLONE, data);
  } catch (error) {
    console.error('getContact error service:', error);
    throw error;
  }
};
const typeContact = async (accessToken: string, id: number, pageIndex: number, pageSize: number) => {
  try {
    const data: any = {};
    const CONTACT_DETAILS_ENDPOINT_CLONE: Endpoint = { ...CONTACT_ENDPOINT };
    if (id) {
      // CONTACT_DETAILS_ENDPOINT_CLONE.url = CONTACT_DETAILS_ENDPOINT_CLONE.url + `?pageIndex=1&pageSize=50&sort=FullName&sortDirection=ASC&contactTypeId=${id}`;
      CONTACT_DETAILS_ENDPOINT_CLONE.url = CONTACT_DETAILS_ENDPOINT_CLONE.url + `?pageIndex=${pageIndex}&pageSize=${pageSize}&sort=FullName&sortDirection=ASC&contactTypeId=${id}`
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


const contactTypeCount = async (accessToken: string) => {
  try {
    const data: any = {};
    const CONTACT_TYPE_COUNT_ENDPOINT_CLONE = { ...CONTACT_ENDPOINT };
    CONTACT_TYPE_COUNT_ENDPOINT_CLONE.url = CONTACT_TYPE_COUNT_ENDPOINT_CLONE.url + '/counts/active';
    CONTACT_TYPE_COUNT_ENDPOINT_CLONE.JWTToken = accessToken;
    return await getApi<IContactUpdateModel, ContactModel>(CONTACT_TYPE_COUNT_ENDPOINT_CLONE, data);
  } catch (error) {
    console.error('Erro contact Type Count:', error);
  }
}

const getTypeContacts = async (accessToken: string, type: number, specialityID: number) => {
  try {
    const data: any = {};
    const CONTACT_DETAILS_ENDPOINT_CLONE: Endpoint = { ...CONTACT_ENDPOINT };
    if (type && specialityID) {
      CONTACT_DETAILS_ENDPOINT_CLONE.url = CONTACT_DETAILS_ENDPOINT_CLONE.url + `?pageIndex=1&pageSize=50&sort=FullName&sortDirection=ASC&contactTypeId=${type}&contactSpecialtyIds=${specialityID}`;
    }
    CONTACT_DETAILS_ENDPOINT_CLONE.JWTToken = accessToken;

    return await getApi<IContactUpdateModel, ContactModel>(CONTACT_DETAILS_ENDPOINT_CLONE, data);
  } catch (error) {
    console.error('getContact error service:', error);
    throw error;
  }
};

const getSpecialities = async (accessToken: string) => {
  try {
    const data: any = {};
    if (accessToken) {
      CONTACT_SPECIALITIES.JWTToken = accessToken;
    }
    return await getApi<IContactUpdateModel, ContactModel>(CONTACT_SPECIALITIES, data);
  } catch (error) {
    console.error('getContact error service:', error);
    throw error;
  }
};

const addSpecialities = async (accessToken: string, apiData: { industryId: number, name: string }) => {
  try {
    const data: any = apiData;
    const CONTACT_SPECIALITIES_ENDPOINT_CLONE = { ...CONTACT_SPECIALITIES };
    CONTACT_SPECIALITIES_ENDPOINT_CLONE.url = CONTACT_SPECIALITIES_ENDPOINT_CLONE.url + '/account-level';
    if (accessToken) {
      CONTACT_SPECIALITIES_ENDPOINT_CLONE.JWTToken = accessToken;
    }
    return await postApi<IContactUpdateModel, ContactModel>(CONTACT_SPECIALITIES_ENDPOINT_CLONE, data);
  } catch (error) {
    console.error('getContact error service:', error);
    throw error;
  }
};

export { createContact, deleteContact, getContact, getContactDetails, editContact, searchContact, typeContact, contactTypeCount, getTypeContacts, getSpecialities, addSpecialities };
