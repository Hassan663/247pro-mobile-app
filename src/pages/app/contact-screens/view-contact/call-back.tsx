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


export const deleteContact = async (id: number, navigation?: any, Loader?: boolean, dispatch?: any, activeTabId?: any, contactTypeId?: number) => {
    if (id !== undefined && activeTabId !== undefined && contactTypeId !== undefined) {
        await dispatch(DeleteContactAction(id, activeTabId, contactTypeId));
        if (!Loader) changeRoute(navigation, 'pop');
    }
} 

// let array1= [
//      { id: 0, contact: [{ name: 'abcd', id: 9243, }, { name: 'abcd', id: 9723, }, { name: 'abcd', id: 938, }, { name: 'abcd', id: 943, }] },
//      { id: 1, contact: [{ name: 'abcd', id: 943223, }] },
//      { id: 2, contact: [{ name: 'abcd', id: 938, }] },
//      { id: 3, contact: [{ name: 'abcd', id: 912323, }] },
//      { id: 4, contact: [{ name: 'abcd', id: 273, }] },
//  ]
//  let array2=[
//      { totalRecords: 40, id: 0 },
//      { totalRecords: 30, id: 1 },
//      { totalRecords: 3, id: 2 },
//  ]