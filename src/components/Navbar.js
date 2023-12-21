import { Link } from "react-router-dom";
import SignIn from './SignIn.js';
import "../styling/Navbar.css";

const Navbar = () => {

    return (
        <nav className="navbar">
            <Link to="/home" className="navbar-brand">
                <h1>
                    <span className="sync-text">Sync</span>2Meet
                </h1>
            </Link>
            <div>
                <SignIn />
            </div>
        </nav>
    );
}
 
export default Navbar;