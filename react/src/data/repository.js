import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(email, password) {
  const response = await axios.get(API_HOST + "/VCApi/users/Sign-in", { params: { email, password } });
  const user = response.data;
  
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

async function getProfile(email) {
  const response = await axios.get(API_HOST + `/VCApi/users/get/${email}`);

  return response.data;
}

async function findUser(email) {
  const response = await axios.get(API_HOST + `/VCApi/users/select/${email}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/VCApi/users", user);

  return response.data;
}

async function updateUser(user, email) {
  const response = await axios.post(API_HOST + `/VCApi/users/update/${email}`, user);
  
  const updatedUser = response.data;
  
  setUser(updatedUser);
  
  return updatedUser;
  
}

async function deleteUserDB(user) {
  const response = await axios.post(API_HOST + "/VCApi/users/delete", user);

  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/VCApi/posts");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/VCApi/posts/create", post);

  return response.data;
}

async function deletePost(postID) {
  const response = await axios.post(API_HOST + "/VCApi/posts/delete", postID);

  return response.data;
}

async function deletePost2(email) {
  const response = await axios.post(API_HOST + "/VCApi/posts/delete2", email);

  return response.data;
}

// --- Reply Post ---------------------------------------------------------------------------------------

async function createReplyPost(post) {
  const response = await axios.post(API_HOST + "/VCApi/replyPosts/create", post);

  return response.data;
}

async function getReplyPosts() {
  const response = await axios.get(API_HOST + "/VCApi/replyPosts");

  return response.data;
}

async function deleteReplyPost2(forumPosts_id) {
  const response = await axios.post(API_HOST + "/VCApi/replyPosts/delete2", forumPosts_id);

  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, findUser, createUser,
  getPosts, createPost, deletePost,
  getUser, removeUser, deleteUserDB,
  getProfile, updateUser, setUser, deletePost2,
  createReplyPost, getReplyPosts, deleteReplyPost2
}
