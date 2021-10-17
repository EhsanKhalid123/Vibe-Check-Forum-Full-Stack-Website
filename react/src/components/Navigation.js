// Importing React classes and functions from node modules
import React from "react";
import { Link } from "react-router-dom";

// Functional Component for Navigation Bar
function Navigation(props) {

  // Returns HTML code from this function which is displayed by importing on other pages
  return (
    // Navigation bar Code adapted from Official Bootstrap Documents, I made changes to it
    // https://getbootstrap.com/docs/4.0/components/navbar/

    // Navbar Code using normal HTML elements
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#f0f0f0" }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img className="navbar-brand" src={'assets/images/Vibe Check - Navbar.png'} width="150px" alt="Icon for Vibe Check" />
          {/* <img className="navbar-brand" src={process.env.PUBLIC_URL + '/favicon.png'} width="50px" /> */}
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/Home">Home</Link>
            </li>
            {/* The following links only appear if user is logged in */}
            {props.user !== null &&
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/MyProfile">My Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Forum">Forum</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Friends">Friends</Link>
                </li>
              </>
            }
          </ul>
          <ul className="navbar-nav">
            {/* Button Display changes according to if user is logged in or not */}
            {props.user === null ?
              <div className="form-inline my-2 my-lg-0">
                <Link to="/Sign-up">
                  <button className="btn btn-outline-success mr-sm-2" type="submit">Sign-up</button>
                </Link>
                <Link to="/Sign-in">
                  <button className="btn btn-warning my-2 my-sm-0" type="submit">Sign-in</button>
                </Link>
              </div>
              :
              <>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: "Black" }}>Welcome, {props.user.username}</span>
                </li>
                <div className="form-inline my-2 my-lg-0">
                  <Link to="/Sign-in" onClick={props.logoutUser}>
                    <button className="btn btn-warning my-2 my-sm-0" type="submit">Logout</button>
                  </Link>
                </div>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>

  );
}

// Export the Navigation Function
export default Navigation;