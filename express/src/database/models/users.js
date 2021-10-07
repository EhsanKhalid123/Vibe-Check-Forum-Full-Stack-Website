const { Sequelize } = require("sequelize");

// Creating a Sequelize instance and Table.
module.exports = (sequelize, DataTypes) =>
    // Defining the table name.
    sequelize.define("users", {
        // Defining Table Fields/Data with properties.
        email: {
            type: DataTypes.STRING(128),
            primaryKey: true
        },
         // Defining Table Fields/Data with properties.
        username: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
         // Defining Table Fields/Data with properties.
        hashed_password: {
            type: DataTypes.STRING(96),
            allowNull: false
        },
         // Defining Table Fields/Data with properties.
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
          // Defining Table Fields/Data with properties.
        dateJoined: {
            type: DataTypes.DATEONLY(),
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    }, {
        // Don't add the timestamp attributes (updatedAt, createdAt).
        timestamps: false
    });
