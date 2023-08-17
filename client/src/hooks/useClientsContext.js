import {ClientsContext} from "../contex/ClientsContext";
import {useContext} from "react";

export const useClientsContext = () => {
    const context = useContext(ClientsContext)

    if(!context) {
        throw Error("useClientsContext must be used inside ClientsContextProvider")
    }

    return context
}