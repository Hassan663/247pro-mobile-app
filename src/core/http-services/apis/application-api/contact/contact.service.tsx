import { postApi, putApi } from '../../../services/services';
import { ContactModel, IContactCreateModel, IContactUpdateModel } from '../../../../modals/contact.modal';
import { IResponse } from '../../../../modals';


const createContact = async (data: IContactCreateModel): Promise<IResponse<ContactModel>> => {
    try {
      return await postApi<IContactCreateModel, ContactModel>('APIURLHERE', data);
    } catch (error) {
      console.error('Login error service:', error);
      throw error;
    }
  };


  const updateContact = async (data: IContactUpdateModel): Promise<IResponse<ContactModel>> => {
    try {
      return await postApi<IContactUpdateModel, ContactModel>('APIURLHERE', data);
    } catch (error) {
      console.error('Login error service:', error);
      throw error;
    }
  };


  export { createContact, updateContact };
