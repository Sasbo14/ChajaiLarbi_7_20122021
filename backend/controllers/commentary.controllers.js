const Commentary = require('../models/Commentary.models');
const Post = require('../models/Commentary.models');

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  //create post
  const commentary = new Commentary({
    content: req.body.content,
    user_Id: req.body.user_Id,
    post_Id: req.body.post_Id,
  });

  //Save content in the database
  Commentary.create(commentary, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while creating commentary.',
      });
    else res.send(data);
  });
};

exports.getAllCommentary = (req, res) => {
  Post.getAllCommentary((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving commentary.',
      });
    else res.send(data);
  });
};

exports.getOneCommentary = (req, res) => {
  Post.getOneCommentaryById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not found') {
        res.status(404).send({
          message: `Not found commentary with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving commentary with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.updateCommentary = (req, res) => {
  //Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);

  Commentary.updateCommentary(
    req.params.id,
    new Commentary(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not found') {
          res.status(404).send({
            message: `Not found Commentary with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error updating Commentary with id ' + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

exports.deleteCommentary = (req, res) => {
  Post.deleteCommentary(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not found') {
        res.status(404).send({
          message: `Not found Commentary with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Commentary with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Commentary was deleted successfully!` });
  });
};
