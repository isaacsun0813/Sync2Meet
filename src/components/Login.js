import { useState } from 'react';
import { useHistory } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/home");
    }

    return (
        <div className="login">
            <form onSubmit={ handleSubmit }>
                <h2>Log In</h2>
                <label>Email:</label>
                <input
                    type = "text"
                    required 
                    value = {email}
                    onChange = { e => setEmail(e.target.value) }
                />
                <label>Password:</label>
                <input
                    type = "text"
                    required 
                    value = {password}
                    onChange = { e => setPassword(e.target.value) }
                />
                <button>Log In</button>
            </form>
        </div>
    );
}
 
export default Login;