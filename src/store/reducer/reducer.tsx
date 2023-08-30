import { CURRENTUSERPROFILE,ISUSERLOGIN, OTPSUPPORTED } from '../constant/constant'

export type Action = {
    type: string;
    payload: object;
}

const INITIAL_STATE = {
    isUserLogin: false,
    otpSupported: false,

}

export default (states = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case CURRENTUSERPROFILE:
            return ({
                ...states,
                currentUserProfile: action.payload
            })
        case ISUSERLOGIN:
            return ({
                ...states,
                isUserLogin: action.payload
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