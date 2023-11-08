import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';
import '../styling/FormTemp.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/home");
    };

    return (
        <div className="formtemp">
            <form onSubmit={handleSubmit}>
                <div onClick={() => history.goBack()} className="back-icon">
                    <FaArrowCircleLeft />
                </div>
                <h2>
                    <span className="purple-text">Sign</span> Up
                </h2>
                <label>Email:</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Confirm Password:</label>
                <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
