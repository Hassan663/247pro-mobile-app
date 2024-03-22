import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeRoute } from "../../../../core/helpers/async-storage";
import { SCREENLOADER } from "../../../../store/constant/constant";
import { getContactDetails } from "../../../../core/http-services/apis/application-api/contact/contact.service";
import { DeleteContactAction } from "../../../../store/action/action";

export const fetchingDetails = async (id: number, dispatch: any) => {
    try {
        dispatch({ type: SCREENLOADER, payload: true })
        let accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            return await getContactDetails(JSON.parse(accessToken), id);
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: SCREENLOADER, payload: false })
    }
}


export const deleteContact = async (id: number, navigation?: any, Loader?: boolean, dispatch?: any, tabId?: any) => {
    if (id !== undefined && tabId !== undefined) {
        await dispatch(DeleteContactAction(id, tabId));
        if (!Loader) changeRoute(navigation, 'pop');
    }
}
