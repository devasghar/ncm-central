import {useEffect} from "react";

import CredDetails from "../components/CredDetails";
import CredForm from "../components/CredForm";
import {useCredsContext} from "../hooks/useCredsContext";

const Home = () => {
    const {creds, dispatch} = useCredsContext()
    useEffect(() => {
        const fetchCreds = async () => {
            const res = await fetch('/api/creds')
            const json = await res.json()

            if (res.ok) {
                dispatch({
                    type: 'SET_CREDS',
                    payload: json
                })
            }
        }

        fetchCreds()
    }, [dispatch])

    return (<div className="home">
        <div className="creds">
            {creds && creds.map((cred) => (
                <CredDetails key={cred._id} cred={cred}/>
            ))}
        </div>
        <div className="cred-form">
            <CredForm/>
        </div>
    </div>)
}

export default Home;