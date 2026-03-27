const item = require("../models/clothingItem");

const getAllItems = (req, res) => {
  item.find({})
  .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server.' });
    });
};

const createItem = (req, res) => {
  const { name, avatar } = req.body;

  item.create({ name, avatar })
    .then((item) => res
    .status(201)
    .send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .send({ message: 'An error has occurred on the server.' });
    });
};

const deleteItem = (req, res) => {
  item.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server.' });
    });

};

const putItemLike = (req, res) => {
  const { name, avatar } = req.body;

item.putLike({ name, avatar })
    .then((user) => res
    .status(201)
    .send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .send({ message: 'An error has occurred on the server.' });
    });
};

const deleteItemLike = (req, res) => {
  item.find({})
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server.' });
    });

};


module.exports = {
  getAllItems,
  createItem,
  deleteItem,
  putItemLike,
  deleteItemLike,
};