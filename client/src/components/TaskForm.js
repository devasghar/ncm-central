import {useState} from "react";
import {useTasksContext} from "../hooks/useTasksContext";

const TaskForm = () => {
    const {dispatch} = useTasksContext()

    const [username, setUsername] = useState('');
    const [url, setUrl] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const cred = {
            username,
            url,
            password
        }

        const res = await fetch("/api/tasks/", {
            method: "POST",
            body: JSON.stringify(cred),
            headers: {
                'Content-Type': 'application/json'
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
            console.log('New cred added')
            setUsername('')
            setUrl('')
            setPassword('')
            dispatch({type: 'CREATE_CRED', payload: json})
        }
    }

    return (<form className={"create"} onSubmit={handleSubmit}>
        <h3>Add a new task</h3>
        <label>Task Name</label>
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

export default TaskForm