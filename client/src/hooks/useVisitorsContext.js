import {VisitorsContext} from "../contex/VisitorsContext";
import {useContext} from "react";

export const useVisitorsContext = () => {
    const context = useContext(VisitorsContext)

    if(!context) {
        throw Error("useVisitorsContext must be used inside VisitorsContextProvider")
    }

    return context
}