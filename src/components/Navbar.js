import { Link } from "react-router-dom";
import "../styling/Navbar.css";

const Navbar = () => {

    return (
        <nav className="navbar">
            <Link to="/home" className="navbar-brand">
                <h1>
                    <span className="sync-text">Sync</span>2Meet
                </h1>
            </Link>
            <div className="links">
            {/* <Link to="/sync">Sync Contacts</Link> */}
                <Link to="/profile">Username</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;