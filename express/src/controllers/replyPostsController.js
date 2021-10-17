// Import all database files
const db = require("../database");

// Endpoint for selecting all posts from the database.
exports.all = async (req, res) => {
    // const posts = await db.replyPosts.findAll();
  const posts = await db.replyPosts.findAll({include: {model: db.forumPosts, as: "forumPostsID"} && {model: db.users, as: "users"} });
  res.json(posts);
};

// Endpoint for creating a post in the database.
// Routes are delcared in Routes folder.
exports.create = async (req, res) => {
  const post = await db.replyPosts.create({
    replyText: req.body.replyText,
    forumPosts_id: req.body.forumPosts_id,
    email: req.body.email
  });

  res.json(post);
};

// Remove a post from the database.
exports.delete = async (req, res) => {
  const replyPosts_id = req.body.replyPosts_id;

  let removed = false;

  const post = await db.replyPosts.findByPk(replyPosts_id);
  if(post !== null) {
    await post.destroy();
    removed = true;
  }

  return res.json(removed);
};

// Remove a specific posts reply Post from the database.
exports.delete2 = async (req, res) => {
    const forumPosts_id = req.body.forumPosts_id;
  
    let removed = false;
  
    const post = await db.replyPosts.destroy({where: { forumPosts_id: forumPosts_id }});
  
  
    return res.json(post);
  };