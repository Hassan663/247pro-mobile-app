import {
    CURRENTUSERPROFILE,
    LOADER,
    OTPSUPPORTED,
    INITIALROUTE,
    SPLASHSTATUSBAR,
    CONTACTS,
    SCREENLOADER,
    SEARCHEDDATA
} from '../constant/constant'

export type Action = {
    type: string;
    payload: object;
}

const INITIAL_STATE = {
    otpSupported: false,
    loader: false,
    screenLoader: false,
    splashStatusBar: false,
    initialRoute: 'Splash',
    currentUserProfile: {},
    contacts: [],
    searchedData: [],
    // contactResponse.data.resultData.list
}

export default (states = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case CURRENTUSERPROFILE:
            return ({
                ...states,
                currentUserProfile: action.payload
            })
        case SPLASHSTATUSBAR:
            return ({
                ...states,
                splashStatusBar: action.payload
            })
        case INITIALROUTE:
            return ({
                ...states,
                initialRoute: action.payload
            })
        // case ISUSERLOGIN:
        //     return ({
        //         ...states,
        //         isUserLogin: action.payload
        //     })
        case OTPSUPPORTED:
            return ({
                ...states,
                otpSupported: action.payload
            })
        case LOADER:
            return ({
                ...states,
                loader: action.payload
            })
        case SCREENLOADER:
            return ({
                ...states,
                screenLoader: action.payload
            })
        case CONTACTS:
            return ({
                ...states,
                contacts: action.payload
            })
        case SEARCHEDDATA:
            return ({
                ...states,
                searchedData: action.payload
            })
        // case ISERROR:
        //     return ({
        //         ...states,
        //         isError: action.payload
        //     })
        default:
            return states;
    }
}