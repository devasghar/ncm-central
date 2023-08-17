import {useEffect} from "react";

import ClientDetails from "../components/clients/ClientDetails";
import ClientForm from "../components/clients/ClientForm";
import {useClientsContext} from "../hooks/useClientsContext";

const Clients = () => {
    const {clients, dispatch} = useClientsContext()
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchClients = async () => {
            const res = await fetch('/api/clients', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const json = await res.json()

            if (res.ok) {
                dispatch({
                    type: 'SET_CLIENTS',
                    payload: json
                })
            } else {
                window.location.href = '/';
            }
        }

        fetchClients()
    }, [dispatch])

    return (<div className="clients">
        <div className="clients-">
            {clients && clients.map((client) => (
                <ClientDetails key={client._id} client={client}/>
            ))}
        </div>
        <div className="client-form">
            <ClientForm/>
        </div>
    </div>)
}

export default Clients;