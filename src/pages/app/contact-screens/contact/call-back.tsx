import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypeContactAction } from "../../../../store/action/action";
import { contactTypeCount } from "../../../../core/http-services/apis/application-api/contact/contact.service";

export const FILESDATA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


export const contactTypefilter = async (id: number, dispatch: any) => {
    try {
        if (id !== 0) await dispatch(TypeContactAction(id))
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

