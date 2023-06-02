import {useTasksContext} from "../hooks/useTasksContext";
import {formatDistanceToNow} from "date-fns";

const CredDetails = ({task}) => {
    const {dispatch} = useTasksContext()
    const handleClick = async () => {
        const res = await fetch('/api/tasks/' + task._id, {
            method: 'DELETE'
        })

        const json = await res.json()

        if (res.ok) {
            dispatch({type: 'DELETE_CRED', payload: json})
        }
    }

    return (<div className={"task-details"}>
        <h4>{task.username}</h4>
        <p>Password: {task.password}</p>
        <p>URL: {task.url}</p>
        <p>{formatDistanceToNow(new Date(task.createdAt), {addSuffix: true})}</p>
        <span className={"material-symbols-outlined"} onClick={handleClick}>delete</span>
    </div>)
}

export default CredDetails