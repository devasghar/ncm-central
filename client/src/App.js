import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Navbar from "./components/Navbar";
import Creds from "./pages/Creds";
import Visitors from "./pages/Visitors";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route
                            path={"/"}
                            element={<Home/>}
                        />
                        <Route
                            path={"/creds"}
                            element={<Creds/>}
                        />
                        <Route
                            path={"/clients"}
                            element={<Clients/>}
                        />

                        <Route
                            path={"/visitors"}
                            element={<Visitors/>}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
