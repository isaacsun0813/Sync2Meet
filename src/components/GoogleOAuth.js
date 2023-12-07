import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useHistory } from 'react-router-dom'; // Correct import for react-router v5

function GoogleOAuth() { // Renamed for clarity
  const history = useHistory();

  const handleLoginSuccess = async (credentialResponse) => {
    // credentialResponse should contain the authorization code if the responseType was set to 'code'
    const code = credentialResponse.code;
    try {
      const response = await fetch('https://lkfnvbv76h.execute-api.us-east-2.amazonaws.com/Prod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      // Log the data or do something with it, like storing the tokens securely
      console.log(data);
      
      // Redirect to the /home route after successful login
      history.push('/home');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => console.log('Login Failed')}
      useOneTap // If you want to enable one-tap login
    />
  );
}

export default GoogleOAuth;
