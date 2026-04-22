const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { HTTP_STATUS } = require("../utils/constants");
const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(HTTP_STATUS.OK).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: "Requested resource not found" });
      }
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const updateCurrentUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(HTTP_STATUS.OK).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: "Invalid data" });
      }
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(HTTP_STATUS.OK).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

async function createUser(req, res) {
  const {} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(email.password, 10);
    const user = await User.create({
      ...user,
      password: hashedPassword
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(HTTP_STATUS.OK).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: "Invalid data" });
      }

      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)

    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = { updateCurrentUser, getCurrentUser,getUsers, createUser, getUser, login };
