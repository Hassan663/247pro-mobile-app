import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    contactTypeCount,
    getSpecialities
} from "../../../../core/http-services/apis/application-api/contact/contact.service";
import {
    GetTypeContactsAction,
    TypeContactAction
} from "../../../../store/action/action";

export const FILESDATA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const contactTypefilter = async (id: number, dispatch: any) => {
    try {
        if (id !== 0) await dispatch(TypeContactAction(id));
    } catch (error) {
        console.log("error--->", error)
    }
}

export const specialityCount = async () => {
    try {
        let accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken !== null) {
            return await contactTypeCount(JSON.parse(accessToken));
        }
    } catch (error) {
        console.log("error--->", error);
    }
}
export const getProContacts = async (dispatch: any, type: number, specialityID: number) => {
    try {
        if (type !== 0 && specialityID) await dispatch(GetTypeContactsAction(type, specialityID));
    } catch (error) {
        console.log("error--->", error);
    }
}


export const specialities = async () => {
    try {
        let accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken !== null) return await getSpecialities(JSON.parse(accessToken));
    } catch (error) {
        console.log("error--->", error);
    }
}
