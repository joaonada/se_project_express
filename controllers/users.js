const User = require("../models/user");
const { HTTP_STATUS } = require("../utils/constants");

//  GET /users

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

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(HTTP_STATUS.CREATED).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
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
        return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: "Invalid data" });
      }

      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = { getUsers, createUser, getUser, HTTP_STATUS };
