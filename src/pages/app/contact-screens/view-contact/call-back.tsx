import AsyncStorage from "@react-native-async-storage/async-storage";
import { getContactDetails } from "../../../../core/http-services/apis/application-api/contact/contact.service";

export const fetchingDetails = async (id: number) => {
    let accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
        return await getContactDetails(JSON.parse(accessToken), id);
    }
}