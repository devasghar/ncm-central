import {useEffect, useState} from "react"
import {useClientsContext} from "../../hooks/useClientsContext";

const ClientForm = () => {
    const {dispatch} = useClientsContext()

    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        setToken(token)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const client = {
            name
        }

        const res = await fetch("/api/clients/", {
            method: "POST",
            body: JSON.stringify(client),
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
            setName('')
            dispatch({type: 'CREATE_CLIENT', payload: json})
        }
    }

    return (<form className={"create"} onSubmit={handleSubmit}>
        <h3>Add a new client</h3>
        <label>Client Name</label>
        <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes('username') ? 'error' : ''}
        />

        <button>Add Client</button>
        {error && <div className="error">
            {error}
        </div>}
    </form>)
}

export default ClientForm