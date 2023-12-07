import SignIn from './components/SignIn.js';
import Landing from './components/Landing.js';
import GoogleOAuth from './components/GoogleOAuth.js'
import Home from './components/Home.js';
import SignUp from './components/SignUp.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthHandler from './components/AuthRedirection';
import { useEffect} from 'react';

const clientId = "1061598744546-rgjfi5ji87f3lsl7ee5f635a9id9fgf1.apps.googleusercontent.com";
function App() {
  return (
    <GoogleOAuthProvider clientId={clientId} scopes = "https://www.googleapis.com/auth/calendar">
      <Router>
        <div className="App">
          <div className="content"> {/* Also make sure to correct `classname` to `className` */}
            <Switch>
              <Route exact path="/">
                <Landing />
              </Route>
              <Route path="/signin">
              <SignIn/>
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
