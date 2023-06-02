import {createContext, useReducer} from "react";

export const CredsContext = createContext()

export const credReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CREDS':
            return {
                creds: action.payload
            }
        case 'CREATE_CRED':
            return {
                creds: [action.payload, ...state.creds]
            }
        case 'DELETE_CRED':
            return {
                creds: state.creds.filter((cred) => cred._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const CredsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(credReducer, {creds: null})

    return (<CredsContext.Provider value={{...state, dispatch}}>
        {children}
    </CredsContext.Provider>)
}