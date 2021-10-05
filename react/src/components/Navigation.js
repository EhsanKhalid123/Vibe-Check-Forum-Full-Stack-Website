// Importing React classes and functions from node modules
import React from "react";

// Functional Component for Navigation Bar
function Navigation(props) {

  // Returns HTML code from this function which is displayed by importing on other pages
  return (
    // Navigation bar Code adapted from Official Bootstrap Documents, I made changes to it
    // https://getbootstrap.com/docs/4.0/components/navbar/

    // Navbar Code using normal HTML elements
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#f0f0f0" }}>
      <div className="container">
        <a className="navbar-brand" href="/">
          <img className="navbar-brand" src={'assets/images/Vibe Check - Navbar.png'} width="150px" alt="Icon for Vibe Check" />
          {/* <img className="navbar-brand" src={process.env.PUBLIC_URL + '/favicon.png'} width="50px" /> */}
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/Home">Home</a>
            </li>
            {/* {props.username !== null &&
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/MyProfile">My Profile</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Forum">Forum</a>
                </li>
              </>
            } */}
          </ul>
          <ul className="navbar-nav">
            {/* {props.username === null ? */}
              <div className="form-inline my-2 my-lg-0">
                <a href="/Sign-up">
                  <button className="btn btn-outline-success mr-sm-2" type="submit">Sign-up</button>
                </a>
                <a href="/Sign-in">
                  <button className="btn btn-warning my-2 my-sm-0" type="submit">Sign-in</button>
                </a>
              </div>
            {/* //   :
            //   <>
            //     <li className="nav-item">
            //       <span className="nav-link" style={{color: "Black"}}>Welcome, {props.username}</span>
            //     </li>
            //     <div className="form-inline my-2 my-lg-0">
            //       <a href="/Sign-in" onClick={props.logoutUser}>
            //         <button className="btn btn-warning my-2 my-sm-0" type="submit">Logout</button>
            //       </a>
            //     </div>
            //   </>
            // } */}
          </ul>
        </div>
      </div>
    </nav>

  );
}

// Export the Navigation Function
export default Navigation;