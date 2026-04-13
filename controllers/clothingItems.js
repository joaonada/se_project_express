const Post = require('../models/post');

module.exports.getPosts = (req, res) => {
  Post.find({})
    .then(posts => res.send({ data: posts }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};
