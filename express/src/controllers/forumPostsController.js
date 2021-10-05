// Import all database files
const db = require("../database");

// Endpoint for selecting all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.forumPosts.findAll();
  
  res.json(posts);
};

// Endpoint for creating a post in the database.
// Routes are delcared in Routes folder.
exports.create = async (req, res) => {
  const post = await db.forumPosts.create({
    postText: req.body.postText,
    email: req.body.email
  });

  res.json(post);
};
