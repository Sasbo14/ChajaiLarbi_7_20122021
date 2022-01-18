const Post = require('../models/Post.models');

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  //create post
  const post = new Post({
    content: req.body.content,
    user_Id: req.body.user_Id,
  });

  //Save content in the database
  Post.create(post, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while creating post.',
      });
    else res.send(data);
  });
};

exports.getAllPost = (req, res) => {
  Post.getAllPost((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving post.',
      });
    else res.send(data);
  });
};

exports.getOnePost = (req, res) => {
  Post.getOnePostById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not found') {
        res.status(404).send({
          message: `Not found post with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving post with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.updatePost = (req, res) => {
  //Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);

  Post.updatePost(req.params.id, new Post(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not found') {
        res.status(404).send({
          message: `Not found Post with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Post with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.deletePost = (req, res) => {
  Post.deletePost(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not found') {
        res.status(404).send({
          message: `Not found Post with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Post with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Post was deleted successfully!` });
  });
};
