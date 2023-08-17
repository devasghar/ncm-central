import {useCredsContext} from "../../hooks/useCredsContext";
import {formatDistanceToNow} from "date-fns";
import {useEffect, useState} from "react";

const CredDetails = ({cred}) => {
    const {dispatch} = useCredsContext()
    const [token, setToken] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        setToken(token)
    }, [])

    const handleDelete = async () => {
        const res = await fetch('/api/creds/' + cred._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })

        const json = await res.json()

        if (res.ok) {
            dispatch({type: 'DELETE_CRED', payload: json})
        }
    }

    return (<div className={"details"}>
        <h4>{cred.username}</h4>
        <p>Password: {cred.password}</p>
        <p>URL: {cred.url}</p>
        <p>{formatDistanceToNow(new Date(cred.createdAt), {addSuffix: true})}</p>
        <span className={"delete material-symbols-outlined"} onClick={handleDelete}>delete</span>
    </div>)
}

export default CredDetails