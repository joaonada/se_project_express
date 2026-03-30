const item = require("../models/clothingItem");

const { HTTP_STATUS } = require("../utils/constants");

const getAllItems = (req, res) => {
  item
    .find({})
    .then((items) => res.status(200).send(items))
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
    .create({ name, weather, imageUrl })
    .then((createdItem) => res.status(201).send(createdItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  item
    .findByIdAndDelete(id)
    .then((deletedItem) => res.status(200).send(deletedItem))
    .catch((err) => {
      console.error(err);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const putItemLike = (req, res) => {

  item
    .findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((updatedItem) => res.status(200).send(updatedItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const deleteItemLike = (req, res) => {
  item
    .findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .then((updatedItem) => res.status(200).send(updatedItem))
    .catch((err) => {
      console.error(err);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem,
  putItemLike,
  deleteItemLike,
};
