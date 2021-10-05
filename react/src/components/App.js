// Importing React classes and functions from node modules & from components
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Importing the components
import Navigation from './Navigation';
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import Signup from './Sign-up';
import Login from './Login';
import { getUser, removeUser } from "../data/repository";

function App() {

  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  return (
    <div>
      {/* Router is used for routing to different pages */}
      <Router>
        <Header />
        <Navigation user={user} logoutUser={logoutUser} />
        <Switch>
          <Route path="/Sign-up">
            <Signup loginUser={loginUser}/>
          </Route>
          <Route path="/Sign-in">
            <Login loginUser={loginUser}/>
          </Route>
          <Route path={["/Home", "/"]}>
            <Home user={user}/>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
