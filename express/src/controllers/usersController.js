const db = require("../database");
const argon2 = require("argon2");

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

  if (user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  var days = new Array(7);
  var month = new Array(12);
  month[0] = "Jan"; month[1] = "Feb"; month[2] = "Mar"; month[3] = "Apr"; month[4] = "May"; month[5] = "Jun";
  month[6] = "Jul"; month[7] = "Aug"; month[8] = "Sep"; month[9] = "Oct"; month[10] = "Nov"; month[11] = "Dec";
  days[0] = "Sun"; days[1] = "Mon"; days[2] = "Tue"; days[3] = "Wed"; days[4] = "Thu"; days[5] = "Fri"; days[6] = "Sat";

  var date = new Date(),
    currentDateTime = await days[date.getDay()] + " " + month[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();

  const user = await db.users.create({
    email: req.body.email,
    username: req.body.username,
    hashed_password: hash,
    name: req.body.name,
    dateJoined: currentDateTime
  });

  res.json(user);
};
