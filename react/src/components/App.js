// Importing React classes and functions from node modules & from components
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Importing the components
import Navigation from './Navigation';
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import Signup from './Sign-up';

function App() {
  return (
    <div>
      {/* Router is used for routing to different pages */}
      <Router>
        <Header />
        <Navigation />
        <Switch>
          <Route path="/Sign-up">
            <Signup />
          </Route>
          <Route path={["/Home", "/"]}>
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
