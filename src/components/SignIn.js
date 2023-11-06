import { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { FaArrowCircleLeft } from 'react-icons/fa';
import '../styling/SignIn.css';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/home");
    }

    return (
        <div className="signin">
            <form onSubmit={handleSubmit}>
                <div onClick={() => history.push("/")} className="back-icon">
                    <FaArrowCircleLeft />
                </div>
                <h2>Sign In</h2>
                <GoogleLogin />
                <hr className="rounded" />
                <label>Email:</label>
                <input
                    type="text"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Sign In</button>
                <Link to="/signup">Don't have an account? Make one here</Link>
            </form>
        </div>
    );
}

export default SignIn;