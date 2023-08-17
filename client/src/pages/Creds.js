import {useEffect} from "react";

import CredDetails from "../components/creds/CredDetails";
import CredForm from "../components/creds/CredForm";
import {useCredsContext} from "../hooks/useCredsContext";
import CredSearchForm from "../components/creds/CredSearchForm";
import LoadingDots from "../components/LoadingDots";

const Home = () => {
    const {creds, dispatch} = useCredsContext()
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchCreds = async () => {
            const res = await fetch('/api/creds', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const json = await res.json()

            if (res.ok) {
                dispatch({
                    type: 'SET_CREDS',
                    payload: json
                })
            } else {
                window.location.href = '/';
            }
        }

        fetchCreds()
    }, [dispatch])

    return (<>
        <div className="cred-search-form">
            <CredSearchForm/>
        </div>

        <div className="home">
            <div className="creds">
                {creds && Object.keys(creds).length === 0 && <>
                    <LoadingDots/>
                </>}

                {creds && creds.error && <>
                    <p>{creds.error}</p>
                </>}

                {creds && !creds.error && creds.map((cred) => (
                    <CredDetails key={cred._id} cred={cred}/>
                ))}
            </div>
            <div className="cred-form">
                <CredForm/>
            </div>
        </div>
    </>)
}

export default Home;