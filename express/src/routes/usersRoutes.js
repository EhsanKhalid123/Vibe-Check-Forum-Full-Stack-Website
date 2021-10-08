module.exports = (express, app) => {
    const controller = require("../controllers/usersController.js");
    const router = express.Router();
  
    // Select all users.
    router.get("/", controller.all);
  
    // Select a single user with id.
    router.get("/select/:email", controller.one);
  
    // Select one user from the database if username and password are a match.
    router.get("/Sign-in", controller.login);
  
    // Deletes a user from the DB.
    router.post("/delete", controller.delete);

    // Create a updates user details.
    router.post("/update", controller.update);

    // Create a new user.
    router.post("/", controller.create);
  
    // Add routes to server.
    app.use("/VCApi/users", router);
  };