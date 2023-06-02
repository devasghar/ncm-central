import {useCredsContext} from "../hooks/useCredsContext";
import {formatDistanceToNow} from "date-fns";

const CredDetails = ({cred}) => {
    const {dispatch} = useCredsContext()
    const handleClick = async () => {
        const res = await fetch('/api/creds/' + cred._id, {
            method: 'DELETE'
        })

        const json = await res.json()

        if (res.ok) {
            dispatch({type: 'DELETE_CRED', payload: json})
        }
    }

    return (<div className={"cred-details"}>
        <h4>{cred.username}</h4>
        <p>Password: {cred.password}</p>
        <p>URL: {cred.url}</p>
        <p>{formatDistanceToNow(new Date(cred.createdAt), {addSuffix: true})}</p>
        <span className={"material-symbols-outlined"} onClick={handleClick}>edit</span>
        <span className={"material-symbols-outlined"} onClick={handleClick}>delete</span>
    </div>)
}

export default CredDetails