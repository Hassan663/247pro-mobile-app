import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    GetTypeContactsSpecialityAction,
    TotalCounts,
    TypeContactAction
} from "../../../../store/action/action";
import {
    contactTypeCount,
    getSpecialities
} from "../../../../core/http-services/apis/application-api/contact/contact.service";

export const FILESDATA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const contactTypefilter = async (id: number, dispatch: any, setpageIndex?: any, pageIndex?: number) => {
    try {
        if (id !== 0) await dispatch(TypeContactAction(id, setpageIndex, pageIndex));
    } catch (error) {
        console.log("error--->", error)
    }
}

export const specialityCount = async (dispatch: any) => {
    try {
        let accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken !== null) await dispatch(TotalCounts(JSON.parse(accessToken)))
    } catch (error) {
        console.log("error--->", error);
    }
}
export const getProContacts = async (dispatch: any, type: number, specialityID: number) => {
    try {
        if (type !== 0 && specialityID) await dispatch(GetTypeContactsSpecialityAction(type, specialityID));
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
