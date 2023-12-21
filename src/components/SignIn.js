// SignIn.js
import { useHistory} from "react-router-dom";
import { useGoogleLogin} from '@react-oauth/google';
import googleLogo from './google.svg';
import '../styling/SignInButton.css';

const clientId = "1061598744546-rgjfi5ji87f3lsl7ee5f635a9id9fgf1.apps.googleusercontent.com";

const SignIn = () => {
    const history = useHistory();
    
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
      <button onClick={login} className="custom-google-button">
        <img src={googleLogo} alt="Google sign-in" />
        <span>Sign in with Google</span>
      </button>
    );
}

export default SignIn;
