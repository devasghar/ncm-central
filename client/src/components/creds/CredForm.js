import {useEffect, useState} from "react";
import {useCredsContext} from "../../hooks/useCredsContext";

const CredForm = () => {
    const {dispatch} = useCredsContext()

    const [username, setUsername] = useState('');
    const [url, setUrl] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        setToken(token)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const cred = {
            username,
            url,
            password
        }

        const res = await fetch("/api/creds/", {
            method: "POST",
            body: JSON.stringify(cred),
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
            setUsername('')
            setUrl('')
            setPassword('')
            dispatch({type: 'CREATE_CRED', payload: json})
        }
    }

    return (<form className={"create"} onSubmit={handleSubmit}>
        <h3>Add a new cred</h3>
        <label>Cred Name</label>
        <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className={emptyFields.includes('username') ? 'error' : ''}
        />

        <label>URL</label>
        <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            className={emptyFields.includes('url') ? 'error' : ''}
        />

        <label>Password</label>
        <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={emptyFields.includes('password') ? 'error' : ''}
        />

        <button>Add Cred</button>
        {error && <div className="error">
            {error}
        </div>}
    </form>)
}

export default CredForm