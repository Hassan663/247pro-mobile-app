import AsyncStorage from "@react-native-async-storage/async-storage";
import { getContactDetails } from "../../../../core/http-services/apis/application-api/contact/contact.service";
import { SCREENLOADER } from "../../../../store/constant/constant";
import { changeRoute } from "../../../../core/helpers/async-storage";
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


export const deleteContact = async (id: number, navigation?: any, Loader?: boolean, dispatch?: any) => {
    if (id) {
        await dispatch(DeleteContactAction(id))
        if (!Loader) changeRoute(navigation, 'pop');
    }
}
