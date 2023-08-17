import {useState, useEffect} from "react"
import {useVisitorsContext} from "../../hooks/useVisitorsContext";

const VisitorForm = () => {
    const {dispatch} = useVisitorsContext()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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
            name,
            email,
            phone
        }

        const res = await fetch("/api/visitors/", {
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
            setEmail('')
            setPhone('')
            dispatch({type: 'CREATE_VISITOR', payload: json})
        }
    }

    return (<form className={"create"} onSubmit={handleSubmit}>
        <h3>Add a new visitor</h3>
        <label>Visitor Name</label>
        <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes('username') ? 'error' : ''}
        />

        <label>Visitor Email</label>
        <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={emptyFields.includes('email') ? 'error' : ''}
        />

        <label>Visitor Phone</label>
        <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className={emptyFields.includes('phone') ? 'error' : ''}
        />

        <button>Add Visitor</button>
        {error && <div className="error">
            {error}
        </div>}
    </form>)
}

export default VisitorForm