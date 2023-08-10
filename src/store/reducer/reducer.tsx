import { CURRENTUSERPROFILE, OTPSUPPORTED } from '../constant/constant'

export type Action = {
    type: string;
    payload: object;
}

const INITIAL_STATE = {
    isUserLogin: false,
    otpSupported: true,

}

export default (states = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case CURRENTUSERPROFILE:
            return ({
                ...states,
                currentUserProfile: action.payload
            })
        case OTPSUPPORTED:
            return ({
                ...states,
                otpSupported: action.payload
            })
        default:
            return states;
    }
}