import SignIn from './components/SignIn.js';
import Landing from './components/Landing.js';
import Home from './components/Home.js';
import SignUp from './components/SignUp.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <div classname="content">
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/signin">
              <SignIn />
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
  );
}

export default App;
