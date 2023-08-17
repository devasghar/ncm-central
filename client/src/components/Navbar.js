import {Link} from 'react-router-dom';

const Navbar = () => {
    return(<header>
        <div className="container">
            <Link to={"/"} >
                <h1>NCM Central</h1>
            </Link>


            <div className="link-group">
                <Link to={"/creds"} >
                    Credentials
                </Link>

                <Link to={"/clients"} >
                    Clients
                </Link>

                <Link to={"/visitors"} >
                    Visitors
                </Link>
            </div>
        </div>
    </header>)
}

export default Navbar;