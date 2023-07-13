import ActionTypes from "../constant/constant";
import { CommonActions } from '@react-navigation/native';
import { postApi } from '../../core/http-services/services/services';
import { LOGIN_ENDPOINT } from '../../core/http-services/apis/apis';
import { Dispatch } from 'redux';
import { IResponse } from '../../core/modals';


export const login = () => {
    return async (dispatch: Dispatch) => {
        try {

            // loader will apear
            let userData = postApi(LOGIN_ENDPOINT, { phone: '123', pass: 'xyz' })
            let loginResponse: IResponse<typeof userData>;
            // data will be save in redux store
            // loader will close


        } catch (error) {
            // if something is wrong error will save in store and will show the error here
            console.log(error)
        }
    }
}
