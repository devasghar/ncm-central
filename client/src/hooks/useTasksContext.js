import {TasksContext} from "../contex/TasksContext";
import {useContext} from "react";

export const useTasksContext = () => {
    const context = useContext(TasksContext)

    if(!context) {
        throw Error("useTasksContext must be used inside TasksContextProvider")
    }

    return context
}