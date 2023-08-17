import {useState} from "react";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const cred = {
            username,
            password
        }

        const res = await fetch("/api/login/", {
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
            setUsername('')
            setPassword('')

            const {token} = json;
            localStorage.setItem('jwt', token);
        }
    }

    return (<form className={"create"} onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Username</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className={emptyFields.includes('username') ? 'error' : ''}
            />

            <label>Password</label>
            <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={emptyFields.includes('password') ? 'error' : ''}
            />

            <button>Login</button>
            {error && <div className="error">
                {error}
            </div>}
        </form>)
}

export default LoginForm