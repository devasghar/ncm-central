import {formatDistanceToNow} from "date-fns";
import {useVisitorsContext} from "../../hooks/useVisitorsContext";
import {useEffect, useState} from "react";

const VisitorDetails = ({visitor}) => {
    const {dispatch} = useVisitorsContext()
    const [token, setToken] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        setToken(token)
    }, [])

    const handleDelete = async () => {
        const res = await fetch('/api/visitors/' + visitor._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })

        const json = await res.json()

        if (res.ok) {
            dispatch({type: 'DELETE_VISITOR', payload: json})
        }
    }

    return (<div className={"details"}>
        <h4>{visitor.name}</h4>
        <p>{visitor.email}</p>
        <p>{visitor.phone}</p>
        <p>{formatDistanceToNow(new Date(visitor.createdAt), {addSuffix: true})}</p>
        <span className={"delete material-symbols-outlined"} onClick={handleDelete}>delete</span>
    </div>)
}

export default VisitorDetails