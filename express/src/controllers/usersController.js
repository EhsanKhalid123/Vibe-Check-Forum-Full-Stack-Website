const db = require("../database");
const argon2 = require("argon2");
const Sequelize = require("sequelize");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.users.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.users.findByPk(req.params.id);

  res.json(user);
};

// Select one user from the database if email and password are a match.
exports.login = async (req, res) => {
  const user = await db.users.findByPk(req.query.email);

  if (user === null || await argon2.verify(user.hashed_password, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  const user = await db.users.create({
    email: req.body.email,
    username: req.body.username,
    hashed_password: hash,
    name: req.body.name
  });

  res.json(user);
};

// Update a user in the database.
exports.update = async (req, res) => {
  const email = req.params.email;

  const user = await db.users.findByPk(email);

  user.first_name = req.body.firstName;
  user.last_name = req.body.lastName;

  await user.save();

  return res.json(user);
};

// Remove a user from the database.
exports.delete = async (req, res) => {
  const email = req.body.email;

  let removed = false;

  const user = await db.users.findByPk(email);
  if(user !== null) {
    await user.destroy();
    removed = true;
  }

  return res.json(removed);
};

