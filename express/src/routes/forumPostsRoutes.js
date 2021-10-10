module.exports = (express, app) => {
  const controller = require("../controllers/forumPostsController.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Deletes a post from the DB.
  router.post("/delete", controller.delete);

  // Create a new post.
  router.post("/create", controller.create);

  // Add routes to server.
  app.use("/VCApi/posts", router);
};
