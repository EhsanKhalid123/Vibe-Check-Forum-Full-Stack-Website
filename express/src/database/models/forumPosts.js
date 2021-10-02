// Creating a Sequelize instance and Table.
module.exports = (sequelize, DataTypes) =>
    // Defining the table name.
    sequelize.define("forumPosts", {
        // Defining Table Fields/Data with properties.
        forumPosts_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // Defining Posts field in the table with properties of SQL.
        text: {
            type: DataTypes.STRING(600),
            allowNull: false
        }
    }, {
        // Don't add the timestamp attributes (updatedAt, createdAt).
        timestamps: false
    });
