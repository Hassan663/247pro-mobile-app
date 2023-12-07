import { getApi, postApi, putApi } from '../../../services/services';
import { ContactModel, IContactCreateModel, IContactUpdateModel } from '../../../../modals/contact.modal';
import { IResponse } from '../../../../modals';
import { CONTACT_ENDPOINT, CREATE_CONTACT_ENDPOINT, LOGIN_ENDPOINT } from '../../apis';
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
    if (pageIndex && pageSize) {
      CONTACT_ENDPOINT.url = CONTACT_ENDPOINT.url + `?pageIndex=${pageIndex}&pageSize=${pageSize}`
    }
    CONTACT_ENDPOINT.JWTToken = accessToken
    return await getApi<IContactUpdateModel, ContactModel>(CONTACT_ENDPOINT, data);
  } catch (error) {
    console.error('getContact error service:', error);
    throw error;
  }
};


export { createContact, updateContact, getContact };
