import { ContactAction, TypeContactAction } from "../../../../store/action/action";

export const FILESDATA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


export const contactTypefilter = async (id: number, dispatch: any) => {
    try {
        if(id !== 0)await dispatch(TypeContactAction(id))
        else dispatch(ContactAction("" , 1))
    } catch (error) {
    }
} 



