import {formatDistanceToNow} from "date-fns";
import {useClientsContext} from "../../hooks/useClientsContext";
import {useEffect, useState} from "react";

const ClientDetails = ({client}) => {
    const {dispatch} = useClientsContext()
    const [token, setToken] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        setToken(token)
    }, [])

    const handleDelete = async () => {
        const res = await fetch('/api/clients/' + client._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })

        const json = await res.json()

        if (res.ok) {
            dispatch({type: 'DELETE_CLIENT', payload: json})
        }
    }

    return (<div className={"details"}>
        <h4>{client.name}</h4>
        <p>{formatDistanceToNow(new Date(client.createdAt), {addSuffix: true})}</p>
        <span className={"delete material-symbols-outlined"} onClick={handleDelete}>delete</span>
    </div>)
}

export default ClientDetails