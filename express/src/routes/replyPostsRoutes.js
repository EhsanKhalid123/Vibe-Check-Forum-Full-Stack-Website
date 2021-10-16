module.exports = (express, app) => {
    const controller = require("../controllers/replyPostsController.js");
    const router = express.Router();

    // Select all posts.
    router.get("/", controller.all);

    // Deletes a post from the DB.
    router.post("/delete", controller.delete);

    // Deletes a post from the DB.
    router.post("/delete2", controller.delete2);

    // Create a new post.
    router.post("/create", controller.create);

    // Add routes to server.
    app.use("/VCApi/replyPosts", router);
};
