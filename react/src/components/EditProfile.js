// Importing React classes and functions from node modules
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { findUser, updateUser } from "../data/repository";
import MessageContext from "../data/MessageContext";

// Functional Component for Signup Page
function EditProfile(props) {

    const [values, setValues] = useState({ name: "", username: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { email } = useParams();

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

        // Create user.
        const user = await updateUser(trimmedValues);

        // Show success message.
        // setMessage(
        //     <>
        //         <strong>{user.name}</strong> profile has been updated successfully.
        //     </>);

        // Navigate to the profiles page.
        history.push("/");
    };

    const handleValidation = async () => {
        const trimmedValues = trimFields();
        const formErrors = {};

        let key = "name";
        let value = trimmedValues[key];
        if (value.length === 0)
            formErrors[key] = "Name is required.";
        else if (value.length > 40)
            formErrors[key] = "Name length cannot be greater than 40.";

        key = "username";
        value = trimmedValues[key];
        if (value.length === 0)
            formErrors[key] = "Username is required.";
        else if (value.length > 32)
            formErrors[key] = "Username length cannot be greater than 32.";

        key = "email";
        value = trimmedValues[key];
        if (value.length === 0)
            formErrors[key] = "Email address is required.";
        else if (value.length > 128)
            formErrors[key] = "Email length cannot be greater than 128.";
        else if (!/\S+@\S+\.\S+/.test(value))
            formErrors[key] = "Please enter a valid email address";
        else if (await findUser(trimmedValues.email) !== null)
            formErrors[key] = "Email is already registered.";

        key = "password";
        value = trimmedValues[key];
        if (value.length === 0)
            formErrors[key] = "Password is required.";
        else if (value.length < 6)
            formErrors[key] = "Password must contain at least 6 characters.";
        else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[^ ]{6,}/.test(value))
            formErrors[key] = "Password must meet requirements!";

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
                <div className="form-group">
                    <label htmlFor="email"><b>Email:</b></label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter a new Email" value={values.email} onChange={handleInputChange} required />
                    {errors.email && (
                        <p style={{ color: "red", textAlign: "center", fontSize: "18px", margin: "10px 10px 10px 10px" }}>{errors.email}</p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password"><b>Password:</b></label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter a New Password" value={values.password} onChange={handleInputChange} required />
                    <small id="emailHelp" className="form-text text-muted" style={{ fontWeight: "bold" }}>Password must be 6 characters, mix of upper and lowercase, numbers and punctuation</small>
                    {errors.password && (
                        <p style={{ color: "red", textAlign: "center", fontSize: "18px", margin: "10px 10px 10px 10px" }}>{errors.password}</p>
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