const ClothingItem = require('../models/clothingItem');

module.exports.getPosts = (req, res) => {
  ClothingItem.find({})
    .then(clothingItems => res.send({ data: clothingItems }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};
