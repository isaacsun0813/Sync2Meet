import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Landing = () => {

    const history = useHistory();

    const handleLogin = () => {
        history.push("/login");
    }

    return (
        <div className="landing">
            <h1>Sync2Meet</h1>
            <div>
                <button onClick={handleLogin}>Login</button>
                <button>Sync With Contacts</button>
            </div>
        </div>
    );
}
 
export default Landing;