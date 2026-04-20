const user = require("../models/user");
const item = require("../models/clothingItem");

const { HTTP_STATUS } = require("../utils/constants");

const getCurrentUser = (req, res) => {
  user
    .findById(req.user._id)
    .then((currentUser) => res.status(HTTP_STATUS.OK).send(currentUser))
    .catch((err) => {
      console.error(err);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
});
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  user
    .findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((updateUser) => res.status(HTTP_STATUS.OK).send(updateUser))
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

const getAllItems = (req, res) => {
  item
    .find({})
    .then((items) => res.status(HTTP_STATUS.OK).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  item
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((createdItem) => res.status(HTTP_STATUS.CREATED).send(createdItem))
    .catch((err) => {
      console.error(err);
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

const deleteItem = (req, res) => {
  const { id } = req.params;
  item
    .findById(id)
    .orFail()
    .then((foundItem) => {
      if (foundItem.owner.toString() === req.user._id.toString()) {
        return foundItem.deleteOne()
          .then(() => res.status(HTTP_STATUS.OK).send({ message: "Item has been deleted" }));
      }
      return res.status(HTTP_STATUS.FORBIDDEN).send({ message: "Access denied" });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(HTTP_STATUS.NOT_FOUND).send({ message: "Requested resource not found" });
      }
      if (err.name === "CastError") {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server." });
    });
};

const putItemLike = (req, res) => {
  item
    .findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((updatedItem) => res.status(HTTP_STATUS.OK).send(updatedItem))
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

const deleteItemLike = (req, res) => {
  item
    .findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((updatedItem) => res.status(HTTP_STATUS.OK).send(updatedItem))
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

// 2. Export updateCurrentUser
module.exports = {
  getCurrentUser,
  updateCurrentUser,
  getAllItems,
  createItem,
  deleteItem,
  putItemLike,
  deleteItemLike,
};
