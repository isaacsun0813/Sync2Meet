// SignIn.js
import GoogleButton from 'react-google-button';
import { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { FaArrowCircleLeft } from 'react-icons/fa';
import '../styling/FormTemp.css';

const clientId = "1061598744546-rgjfi5ji87f3lsl7ee5f635a9id9fgf1.apps.googleusercontent.com";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the email/password sign-in logic
        history.push("/home");
    }
    
    const handleLoginSuccess = async (tokenResponse) => {
        // Extract the authorization code from the credential response
        const code = tokenResponse.code;
        console.log(JSON.stringify({ body: JSON.stringify({ code }) }));
        if (code) {
          try {
            const response = await fetch('https://lkfnvbv76h.execute-api.us-east-2.amazonaws.com/Prod/auth', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ body: JSON.stringify({ code }) }),
            });
            const data = await response.json();
            const responseBody = JSON.parse(data.body); // Parse the body to an object
            localStorage.setItem('accessToken', responseBody.access_token);
            console.log(responseBody)
            // Handle the received data, which should include the access token and refresh token
            console.log("accessTOKEN", responseBody.access_token );
            // Redirect to the /home route after successful login
            history.push('/home');
          } catch (error) {
            console.error('Error:', error);
            // Handle errors, such as by displaying a message to the user
          }
        } else {
          console.log('No code received from Google OAuth');
        }
      };
      const login = useGoogleLogin({
        onSuccess: handleLoginSuccess,
        onError: () => console.log('Login Failed'),
        flow: 'auth-code',
        scope: "https://www.googleapis.com/auth/calendar",
    });
    return (
        <div className="formtemp">
            <form onSubmit={handleSubmit}>
                <div onClick={() => history.push("/")} className="back-icon">
                    <FaArrowCircleLeft />
                </div>
                <h2>
                    <span className="purple-text">Sign</span> In
                </h2>
                {/* Google Sign In */}
                <GoogleButton onClick={login}/>
                <hr className="rounded" />
                {/* Email Sign In */}
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
                <button type="submit">Sign In</button>
                <Link to="/signup">Don't have an account? Make one here</Link>
            </form>
        </div>
    );
}

export default SignIn;
