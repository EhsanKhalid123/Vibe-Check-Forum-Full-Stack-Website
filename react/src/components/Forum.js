// Importing React classes and functions from node modules
import React, { useState, useEffect } from "react";
import { getPosts, createPost, getProfile, deletePost, createReplyPost } from "../data/repository";

// Functional Component for Forum Page
function Forum(props) {

    const [post, setPost] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState([]);
    const [confirmPopup, setconfirmPopup] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // Popup Toggle Switch Function
    const togglePopup = async (id) => {

        setSelectedId(id);
        if (id === selectedId)
            setconfirmPopup(!confirmPopup);
    }

    // Load posts.
    useEffect(() => {
        async function loadPosts() {
            const currentPosts = await getPosts();

            setPosts(currentPosts);
            setIsLoading(false);
        }

        async function loadUserDetails() {
            const currentDetails = await getProfile(props.user.email);
            setUserData(currentDetails)

        }
        loadUserDetails();
        loadPosts();
    }, []);

    const handleInputChange = (event) => {
        setPost(event.target.value);
        setErrorMessage("");
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Trim the post text.
        const trimmedPost = post.trim();

        if (trimmedPost === "") {
            setErrorMessage("A post cannot be empty!");
            return;
        } else if (trimmedPost.length > 600) {
            setErrorMessage("A post cannot be greater than 600 characters!");
            return;
        }

        // Create post.
        const newPost = { postText: trimmedPost, email: props.user.email, postDate: new Date().toLocaleString() };
        await createPost(newPost);

        newPost.user = { username: props.user.username };

        // Add post to locally stored posts.
        setPosts([...posts, newPost]);

        // Reset post content.
        setPost("");
        setErrorMessage("");
    };

    const handleSubmitReply = async (event) => {
        event.preventDefault();

        // Trim the post text.
        const trimmedPost = post.trim();

        if (trimmedPost === "") {
            setErrorMessage("A post cannot be empty!");
            return;
        } else if (trimmedPost.length > 600) {
            setErrorMessage("A post cannot be greater than 600 characters!");
            return;
        }

        // Create post.
        const newPost = { replyText: trimmedPost, email: props.user.email, forumPosts_id: selectedId, replyDate: new Date().toLocaleString() };
        await createReplyPost(newPost);

        newPost.user = { username: props.user.username };

        // Add post to locally stored posts.
        setPosts([...posts, newPost]);

        // Reset post content.
        setPost("");
        setErrorMessage("");
        setconfirmPopup(false);
    };

    // Returns HTML elements and content to display on the pages
    return (

        // Text Post Form Code using normal HTML elements
        <div className="text-center">
            <p>&nbsp;</p>
            <h1 className="home-welcome display-4">Forum</h1>
            <hr style={{ width: "90%", borderWidth: "1px", backgroundColor: "#5dc7d8" }} />
            <p style={{ fontSize: "20px" }}>Feel Free to make a post!</p>
            <p>&nbsp;</p>

            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <h3 style={{ margin: "0 25% 10px 25%", width: "50%", textAlign: "left" }}>Create a Post:</h3>
                    <textarea style={{ margin: "auto", width: "50%", height: "110px", border: "solid 2px #5dc7d8" }} className="form-control" id="postText" name="postText" rows="3" value={post} onChange={handleInputChange} />
                </div>
                {errorMessage && (
                    <p style={{ color: "red", textAlign: "center", fontSize: "18px", margin: "10px 10px 10px 10px" }}>{errorMessage}</p>
                )}
                <button type="submit" style={{ textAlign: "right", margin: "0 0 0 40%", padding: "5px 25px 5px 25px" }} className="btn btn-outline-primary mr-sm-2" >Post</button>
                <button type="button" style={{ textAlign: "right" }} className="btn btn-outline-danger mr-sm-2" onClick={() => { setPost(""); setErrorMessage(null); }}  >Cancel</button>
            </form>
            <p>&nbsp;</p>
            <div>
            </div>
            {isLoading ?
                <div>Loading posts...
                    <p>&nbsp;</p>
                </div>
                :
                posts.length === 0 ?
                    <span className="text-muted">No posts have been submitted.</span>
                    :
                    posts.map((userPosts) =>
                        <div>
                            <div className="posts card" >
                                <div className="card-body">
                                    <h5 style={{ float: "left", textAlign: "center" }} className="card-title">{userPosts.user.username}</h5>
                                    <span style={{ float: "right", textAlign: "center", color: "#212121" }}>{new Date(userPosts.postDate).toLocaleString("en-AU", { hour12: true, hour: 'numeric', minute: 'numeric', day: "numeric", month: "short", year: "numeric" })}</span>
                                    <p style={{ margin: "0 0 10% 0" }}></p>
                                    <p style={{ clear: "both", float: "left", textAlign: "left" }} className="card-text">{userPosts.postText}</p>
                                    {userPosts.email === userData.email &&
                                        <div>
                                            <div>
                                                <button type="submit" style={{ float: "right", textAlign: "right" }} className="btn btn-danger mr-sm-2" onClick={async () => { await deletePost(userPosts); setPosts(await getPosts()); }} >Delete</button>
                                                <button style={{ float: "right", textAlign: "right" }} className="btn btn-dark mr-sm-2" onClick={() => togglePopup(userPosts.forumPosts_id)} >Reply</button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div>
                                {confirmPopup === false ?
                                    <div><p>&nbsp;</p></div>
                                    :
                                    <div>
                                        <p>&nbsp;</p>
                                        {selectedId === userPosts.forumPosts_id &&
                                            <div>
                                                <form onSubmit={handleSubmitReply} >
                                                    <div className="form-group">
                                                        <h5 style={{ margin: "10px 25% 10px 25%", width: "50%", textAlign: "left" }}>Reply to a post:</h5>
                                                        <textarea style={{ margin: "auto", width: "50%", height: "110px", border: "solid 2px #5dc7d8" }} className="form-control" id="postText" name="postText" rows="3" value={post} onChange={handleInputChange} />
                                                    </div>
                                                    <button type="submit" style={{ textAlign: "right", margin: "0 0 0 40%", padding: "5px 25px 5px 25px" }} className="btn btn-outline-primary mr-sm-2" >Post</button>
                                                    <button type="button" style={{ textAlign: "right" }} className="btn btn-outline-danger mr-sm-2" onClick={() => { setPost(""); setErrorMessage(null); togglePopup(); }}  >Cancel</button>
                                                    <p>&nbsp;</p>
                                                </form>
                                            </div>
                                        }
                                    </div>
                                }

                            </div>
                        </div>
                    )}
        </div>
    );
}

// Export the sign-up Function
export default Forum;