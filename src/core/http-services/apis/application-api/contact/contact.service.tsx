import { postApi, putApi } from '../../../services/services';
import { ContactModel, IContactCreateModel, IContactUpdateModel } from '../../../../modals/contact.modal';
import { IResponse } from '../../../../modals';
import { LOGIN_ENDPOINT } from '../../apis';


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


export { createContact, updateContact };
