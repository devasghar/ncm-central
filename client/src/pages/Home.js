import LoginForm from "../components/LoginForm";
import {useState, useEffect} from "react";

const Home = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt');

        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (<div className="home">
        <div className="login-form">
            {!isLoggedIn && <LoginForm/>}
            {isLoggedIn && <p>You are logged in!</p>}
        </div>
    </div>)
}

export default Home;