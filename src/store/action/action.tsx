import ActionTypes from "../constant/constant";
import { CommonActions } from '@react-navigation/native';
import { getApi } from '../../core/http-services/services/services';
import { LOGIN_ENDPOINT } from '../../core/http-services/apis/apis';
import { Dispatch } from 'redux';
import { IResponse } from '../../core/modals';


export const login = () => {
    return async (dispatch: Dispatch) => {
        try {
            let userData = getApi(LOGIN_ENDPOINT)
            let loginResponse: IResponse<typeof userData>;



        } catch (error) {
            console.log(error)
        }
    }
}
