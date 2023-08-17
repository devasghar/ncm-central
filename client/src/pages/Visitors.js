import {useEffect} from "react";

import VisitorDetails from "../components/visitors/VisitorDetails";
import VisitorForm from "../components/visitors/VisitorForm";
import {useVisitorsContext} from "../hooks/useVisitorsContext";

const Clients = () => {
    const {visitors, dispatch} = useVisitorsContext()
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchVisitors = async () => {
            const res = await fetch('/api/visitors', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const json = await res.json()

            if (res.ok) {
                dispatch({
                    type: 'SET_VISITORS',
                    payload: json
                })
            } else {
                window.location.href = '/';
            }
        }

        fetchVisitors()
    }, [dispatch])

    return (<div className="clients">
        <div className="clients-">
            {visitors && visitors.map((visitor) => (
                <VisitorDetails key={visitor._id} visitor={visitor}/>
            ))}
        </div>
        <div className="client-form">
            <VisitorForm/>
        </div>
    </div>)
}

export default Clients;