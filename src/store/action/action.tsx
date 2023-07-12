import ActionTypes from "../constant/constant";
import { CommonActions } from '@react-navigation/native';
import { getPosts } from '../../core/http-services/services/services';
import { LOGIN_ENDPOINT } from '../../core/http-services/apis/apis';
import { Dispatch } from 'redux';


export const login = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADER, payload: true });
            let userData = getPosts(LOGIN_ENDPOINT)
            console.log(userData.respone, 'user has been logged in')
        } catch (error) {
            console.log(error)
        }
    }
}
