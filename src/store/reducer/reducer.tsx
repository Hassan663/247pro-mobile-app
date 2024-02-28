import {
    CURRENTUSERPROFILE,
    LOADER,
    OTPSUPPORTED,
    INITIALROUTE,
    SPLASHSTATUSBAR,
    CONTACTS,
    SCREENLOADER,
    SEARCHEDDATA,
    TOTALCONTACTS,
    CONTACTTYPESCOUNT,
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
    searchedData: [],
    contacts: [],
    // contact:{
    //     all: [{},{}],
    //     client: [{},{}],
    //     staff: [{},{}],
    //     pro: [{},{}],
    //     supplier: [{},{}],
    //     },
        // totalContacts:[{id:0,contact:[]},{id:1,contact:[]},{id:2,contact:[]},{id:3,contact:[]},],
    totalContacts: [],
    contactTypesCount: [],
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
        case TOTALCONTACTS:
            return ({
                ...states,
                totalContacts: action.payload
            })
        case CONTACTTYPESCOUNT:
            return ({
                ...states,
                contactTypesCount: action.payload
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