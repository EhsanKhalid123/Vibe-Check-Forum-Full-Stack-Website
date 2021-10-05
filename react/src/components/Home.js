// Importing React classes and functions from node modules
import React from "react";
import logo from "../logo.png";


// Functional Component for the Home page
function Home(props) {

    // Returns HTML elements to display content on pages
    return (

        // Contents of the main page uses basic HTML elements
        <div className="text-center">
            <p>&nbsp;</p>
            <h1 className="home-welcome display-4">Welcome to Vibe Check</h1>
            {props.username !== null && <h4 style={{margin: "0px 10px 10px 10px"}}><strong>Hello {props.username}!</strong></h4>}
            <img src={logo} className="home-logo-image" alt="logo" />
            <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <hr style={{ width: "90%", borderWidth: "1px", backgroundColor: "#5dc7d8" }} />
            <div style={{ padding: "0 10% 5% 10%" }}>
                <h1 className="home-welcome display-4" style={{ marginBottom: "20px", marginTop: "30px" }}>About Us</h1>
                <p style={{ fontSize: "18px" }}>
                    Vibe Check is an online social network for university students to socialise through forums.
                    Vibe Check aims to engage various groups together in order to discuss a specific topics or
                    state their opinion on something as well as to provide information which can be helpful to others,
                    whether it's solving a problem or just a general thing!
                    Students often use other mediums such as social media platforms, text messaging or other apps to communicate
                    about questions, queries, issues or suggestions about the courses they are studying.
                    So Vibe Check is a place where all these conversations can take place by creating a separate forum for different topics,
                    this will be helpful and beneficial for every student! Sign-up now and create a forum or start posting!
                </p>
            </div>
        </div>
    );
}

// Export the home Function
export default Home;