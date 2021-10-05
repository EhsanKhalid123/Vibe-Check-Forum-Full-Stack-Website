module.exports = (express, app) => {
    const controller = require("../controllers/forumPostsController.js");
    const router = express.Router();
  
    // Select all posts.
    router.get("/", controller.all);
  
    // Create a new post.
    router.post("/", controller.create);
  
    // Add routes to server.
    app.use("/VCApi/posts", router);
  };
  