// ORM Related Code Goes in This File.

// Import Sequelize Library and its Components.
const { Sequelize, DataTypes } = require("sequelize");
// Import Database information from config file so it can connect to the DB.
const config = require("./config.js");

// Constant DB to store methods inside and allow the outside world to use them by calling db.methodName.
const db = {
    Op: Sequelize.Op
};

// Create Sequelize.
// Tell the ORM about the database, so it can connect.
// Created an Instance of Sequelize and passed the database information from config.js file.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
});

// Define Models.
// Importing database tables/models to create and use.
db.users = require("./models/users.js")(db.sequelize, DataTypes);
db.forumPosts = require("./models/forumPosts.js")(db.sequelize, DataTypes);

// Relate post and user through foreign key.
// Relating Posts table to the Users table with a foreign key.
db.forumPosts.belongsTo(db.users, { foreignKey: { name: "username", allowNull: false } });

// Include a sync option with seed data logic included.
db.sync = async () => {
    // Sync schema.
    // Creates the tables defined in Models if not created
    await db.sequelize.sync();

    // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
    // await db.sequelize.sync({ force: true }); <-- This will delete all tables and recreate them So if more tables are added then the current command inuse wont do anything because that only works if no tables are created.
    // So if tables are created and more tables are added then have to use force: true so it can add the new tables, as it will first drop all tables and then create them. Only required when model is updated and things in the table is changed.

    // Runs this function asyncornous to the above one, so this only runs once above one is completed.
    await seedData();
};

async function seedData() {
    // Variable Constant Declared = Counts the users tables data.
    const count = await db.users.count();

    // Only seed data if necessary.
    // Checks if there are no users in the database users table and then runs the bottom code otherwise this function is returned if data already exists in users table in DB.
    if (count > 0)
        return;

    // Creates and argon2 instance for password hashing.
    const argon2 = require("argon2");

    // Sample User data to add into the database user table.
    let hashedPassword = await argon2.hash("abc123", { type: argon2.argon2id });
    await db.users.create({email: "test@test.com", username: "TestAcc", hashed_password: hashedPassword, name: "Test User" });

} 

// Exporting db module methods so it can be accessed by other classes/files.
module.exports = db;