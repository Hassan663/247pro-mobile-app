import { CURRENTUSERPROFILE} from '../constant/constant'

export type Action = {
    type: string;
    payload: object;
}

const INITIAL_STATE = {
    isUserLogin: false,
   
}

export default (states = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case CURRENTUSERPROFILE:
            return ({
                ...states,
                currentUserProfile: action.payload
            })
        default:
            return states;
    }
}