import { getApi, postApi, putApi } from '../../../services/services';
import { ContactModel, IContactCreateModel, IContactUpdateModel } from '../../../../modals/contact.modal';
import { IResponse } from '../../../../modals';
import { GET_CONTACT_ENDPOINT, LOGIN_ENDPOINT } from '../../apis';


const createContact = async (data: IContactCreateModel): Promise<IResponse<ContactModel>> => {
  try {
    return await postApi<IContactCreateModel, ContactModel>({ url: `api url`, JWTToken: true, }, data);
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
    GET_CONTACT_ENDPOINT.url = GET_CONTACT_ENDPOINT.url + `?pageIndex=${pageIndex}&pageSize=${pageSize}`
    GET_CONTACT_ENDPOINT.JWTToken = accessToken
    return await getApi<IContactUpdateModel, ContactModel>(GET_CONTACT_ENDPOINT, data);
  } catch (error) {
    console.error('getContact error service:', error);
    throw error;
  }
};


export { createContact, updateContact, getContact };
