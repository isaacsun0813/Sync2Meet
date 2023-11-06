import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import '../styling/Landing.css';

const Landing = () => {

    const history = useHistory();

    const handleSignin = () => {
        history.push("/signin");
    }

    return (
        <div className="landing">
            <h1>
                <span className="sync-text">Sync</span>2Meet
            </h1>
            <div>
                <button onClick={handleSignin}>Sign In</button>
                <button>Sync With Contacts</button>
            </div>
        </div>
    );
}
 
export default Landing;