// Import all database files
const db = require("../database");

// Endpoint for selecting all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.forumPosts.findAll({include: {model: db.users, as: "user"} });
  
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

// Remove a post from the database.
exports.delete = async (req, res) => {
  const forumPosts_id = req.body.forumPosts_id;

  let removed = false;

  const post = await db.forumPosts.findByPk(forumPosts_id);
  if(post !== null) {
    await post.destroy();
    removed = true;
  }

  return res.json(removed);
};

// Remove a specific users posts from the database.
exports.delete2 = async (req, res) => {
  const email = req.body.email;

  let removed = false;

  const post = await db.forumPosts.findAll({where: { email: email }});

  if(post !== null) {
    await post.destroy();
    removed = true;
  }

  return res.json(removed);
};