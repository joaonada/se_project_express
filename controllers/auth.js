const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { HTTP_STATUS } = require("../utils/constants");


const { JWT_SECRET } = require("../utils/config");

const User = require("../models/user");

module.exports.register = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      avatar: req.body.avatar
    }))
    .then((user) => {
      res.status(HTTP_STATUS.CREATED).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
      res.status(HTTP_STATUS.CONFLICT).json({ message: "User with this email already exists" });
      } else {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      res.status(HTTP_STATUS.UNAUTHORIZED).send({ message: err.message });
    });
};
