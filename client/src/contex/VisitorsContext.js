import {createContext, useReducer} from "react";

export const VisitorsContext = createContext()

export const visitorReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VISITORS':
            return {
                visitors: action.payload
            }
        case 'CREATE_VISITOR':
            return {
                visitors: [action.payload, ...state.visitors]
            }
        case 'DELETE_VISITOR':
            return {
                visitors: state.visitors.filter((client) => client._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const VisitorsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(visitorReducer, {visitors: null})

    return (<VisitorsContext.Provider value={{...state, dispatch}}>
        {children}
    </VisitorsContext.Provider>)
}