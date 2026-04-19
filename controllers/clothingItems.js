const ClothingItem = require('../models/clothingItem');

const { HTTP_STATUS } = require("../utils/constants");

module.exports.getPosts = (req, res) => {
  ClothingItem.find({})
    .then(clothingItems => res.send({ data: clothingItems }))
    .catch(() => res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'Error' }));
};
