import {CredsContext} from "../contex/CredsContext";
import {useContext} from "react";

export const useCredsContext = () => {
    const context = useContext(CredsContext)

    if(!context) {
        throw Error("useCredsContent must be used inside CredsContextProvider")
    }

    return context
}