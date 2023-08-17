import {useEffect, useState} from "react";
import {useCredsContext} from "../../hooks/useCredsContext";

const CredForm = () => {
    const {dispatch} = useCredsContext()

    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        setToken(token)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (query.trim()) {
            dispatch({type: 'SET_CREDS', payload: []})

            const res = await fetch("/api/creds/find/" + query.trim(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })

            const json = await res.json()
            if (!res.ok) {
                setError(json.error)
                setEmptyFields((json.emptyFields))
            }

            if (res.ok) {
                setError(null)
                setEmptyFields([])
                dispatch({type: 'SET_CREDS', payload: json})
            }
        } else {

            const res = await fetch("/api/creds/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })

            const json = await res.json()
            if (res.ok) {
                dispatch({type: 'SET_CREDS', payload: json})
            }
        }
    }

    return (<form className={"create"} onSubmit={handleSubmit}>
        <h3>Search</h3>
        <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className={emptyFields.includes('query') ? 'error' : ''}
        />

        <button>Search</button>
        {error && <div className="error">
            {error}
        </div>}
    </form>)
}

export default CredForm