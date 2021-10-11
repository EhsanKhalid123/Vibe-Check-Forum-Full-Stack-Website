// Importing React classes and functions from node modules
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { findUser, getProfile, setUser, updateUser } from "../data/repository";
import MessageContext from "../data/MessageContext";

// Functional Component for Signup Page
function EditProfile(props) {

    const [values, setValues] = useState({email: props.user.email, name: props.user.name, username: props.user.username });
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { setMessage } = useContext(MessageContext);
    

    // Declared constants to get from EditForm page as EditForm page returns these functions
    // Code taken from Lab Examples of Week 4 Activity 1

    // Generic change handler.
    const handleInputChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form and if invalid do not contact API.
        const { trimmedValues, isValid } = await handleValidation();
        if (!isValid)
            return;

        // update user.
        const user = await updateUser(trimmedValues, props.user.email);

        // Show success message.
        setMessage(
            <>
                <strong>{user.email}</strong>'s account has been updated successfully.
            </>);

        // Set user state.
        props.loginUser(user);

        // Navigate to the profiles page.
        history.push("/MyProfile");
    };

    const handleValidation = async () => {
        const trimmedValues = trimFields();
        const formErrors = {};

        let key = "name";
        let value = trimmedValues[key];
        if (value.length === 0)
            formErrors[key] = "Name field cannot be empty";
        else if (value.length > 40)
            formErrors[key] = "Name length cannot be greater than 40.";

        key = "username";
        value = trimmedValues[key];
        if (value.length === 0)
            formErrors[key] = "Username field cannot be empty";
        else if (value.length > 32)
            formErrors[key] = "Username length cannot be greater than 32.";

        setErrors(formErrors);

        return { trimmedValues, isValid: Object.keys(formErrors).length === 0 };
    };

    const trimFields = () => {
        const trimmedValues = {};
        Object.keys(values).map(key => trimmedValues[key] = values[key].trim());
        setValues(trimmedValues);

        return trimmedValues;
    };

    // Returns HTML elements and content to display on the pages
    return (

        // Code adapted from Official Bootstrap Documents:
        // https://getbootstrap.com/docs/4.0/components/forms/

        // Signup Form Code using normal HTML elements
        <div>
            <h1 className="text-center mb-3" style={{ padding: "50px 20px 0 20px" }}>Edit Your Profile Details</h1>
            <hr style={{ width: "50%", marginBottom: "20px", borderWidth: "1px", backgroundColor: "#5dc7d8" }} />
            <p style={{ textAlign: "center", fontSize: "20px" }}><b style={{ color: "red" }}>Note:</b> Same details must be entered if you don't want certain details to change!</p>
            <p>&nbsp;</p>
            <form className="sign-up-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="email"><b>Email:</b></label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Your Email Address" value={values.email} onChange={handleInputChange} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="name"><b>Name:</b></label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter a New Name" value={values.name} onChange={handleInputChange} required />
                    {errors.name && (
                        <p style={{ color: "red", textAlign: "center", fontSize: "18px", margin: "10px 10px 10px 10px" }}>{errors.name}</p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="username"><b>Username:</b></label>
                    <input type="text" className="form-control" id="username" name="username" placeholder="Enter a New Username" value={values.username} onChange={handleInputChange} required />
                    {errors.username && (
                        <p style={{ color: "red", textAlign: "center", fontSize: "18px", margin: "10px 10px 10px 10px" }}>{errors.name}</p>
                    )}
                </div>
                <a href="/MyProfile">
                    <button type="button" className="btn btn-danger" style={{ margin: "10px", textAlign: "center" }}>Cancel</button>
                </a>
                <button type="submit" className="btn btn-primary" style={{ margin: "10px", textAlign: "center" }}>Save</button>

            </form>
        </div>
    );
}

// Export the Edit Profile Function
export default EditProfile;