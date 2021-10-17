// Importing React classes and functions from node modules & from components
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getUser, removeUser } from "../data/repository";

// Importing the components
import Navigation from './Navigation';
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import Signup from './Sign-up';
import Login from './Login';
import MyProfile from "./MyProfile";
import EditProfile from './EditProfile';
import Forum from './Forum';
import MessageContext from "../data/MessageContext";
import Friends from "../components/Friends";

function App() {

  const [user, setUser] = useState(getUser());
  const [message, setMessage] = useState(null);

  // Set message to null automatically after a period of time.
  useEffect(() => {
    if (message === null)
      return;

    const id = setTimeout(() => setMessage(null), 7000);

    // When message changes clear the queued timeout function.
    return () => clearTimeout(id);
  }, [message]);

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
      <MessageContext.Provider value={{ message, setMessage }}>
        <Router>
          <Header />
          <Navigation user={user} logoutUser={logoutUser} />
          <Switch>
          {user !== null &&
              <Route path="/Friends">
                <Friends user={user} loginUser={loginUser} logoutUser={logoutUser} />
              </Route>
            }
            {user !== null &&
              <Route path="/Forum">
                <Forum user={user} loginUser={loginUser} logoutUser={logoutUser} />
              </Route>
            }
            {user !== null &&
              <Route path="/EditProfile" render={props => (
                <EditProfile {...props} user={user} loginUser={loginUser} logoutUser={logoutUser} />
              )} />
            }
            {user !== null &&
              <Route path="/MyProfile">
                <MyProfile user={user} loginUser={loginUser} logoutUser={logoutUser} />
              </Route>
            }
            <Route path="/Sign-in">
              <Login loginUser={loginUser} />
            </Route>
            <Route path="/Sign-up">
              <Signup loginUser={loginUser} />
            </Route>
            <Route path={["/Home", "/"]}>
              <Home user={user} />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </MessageContext.Provider>
    </div>
  );
}

export default App;
