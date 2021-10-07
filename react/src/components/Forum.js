// Importing React classes and functions from node modules
import React from "react";

// Functional Component for Forum Page
function Forum(props) {

    // Declared constants to get from useForm page as useForm page returns these functions
    // Code taken from Lab Examples of Week 4 Activity 1


    // Function for when successfull passed validations, display message
    // Code taken from Lab Examples of Week 4 Activity 1
    function signUpSuccessfull() {
        console.log('No errors, submit callback called!');
    }

    // Returns HTML elements and content to display on the pages
    return (

        // Text Post Form Code using normal HTML elements
        <div className="text-center">
            <p>&nbsp;</p>
            <h1 className="home-welcome display-4">Forum</h1>
            <hr style={{ width: "90%", borderWidth: "1px", backgroundColor: "#5dc7d8" }} />
            <p style={{ fontSize: "20px" }}>Feel Free to make a post!</p>
            <p>&nbsp;</p>
           
            <form >
                <div className="form-group">
                    <h3 style={{ margin: "0 25% 10px 25%", width: "50%", textAlign: "left" }}>Create a Post:</h3>
                    <textarea style={{ margin: "auto", width: "50%", height: "110px", border: "solid 2px #5dc7d8" }} className="form-control" id="textarea" name="textarea" rows="3" />
                </div>
                <button type="submit" style={{ textAlign: "right", margin: "0 0 0 45%", padding: "5px 25px 5px 25px" }} className="btn btn-outline-primary mr-sm-2" >Post</button>
            </form>
            <p>&nbsp;</p>
            {props.user.posts === null && (
                <div className="posts card" >
                    <div className="card-body">
                        <h5 style={{ float: "left", textAlign: "center"}} className="card-title">{props.posts3}</h5>
                        <span style={{ float: "right", textAlign: "center", color: "#212121"}}>{props.posts2}</span>
                        <p style={{margin: "0 0 10% 0"}}></p>
                        <p style={{clear: "both", float: "left", textAlign: "left"}} className="card-text">{props.posts}</p>
                        <button  type="submit" style={{ float: "right", textAlign: "right" }} className="btn btn-danger mr-sm-2" >Delete</button>
                    </div>
                </div>
            )}
            <p>&nbsp;</p>
        </div>
    );
}

// Export the sign-up Function
export default Forum;