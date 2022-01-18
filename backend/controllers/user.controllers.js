const bcrypt = require('bcrypt');
const User = require('../models/User.models');
//The jsonwebtoken package to be able to create and verify authentication tokens
const jwt = require('jsonwebtoken');
require('dotenv').config();
const envdbToken = process.env.DB_TOKEN;

//SIGNUP
exports.signup = async (req, res, next) => {
  let lastname = req.body.lastname;
  let firstname = req.body.firstname;
  let email = req.body.email;
  let password = req.body.password;

  //vérification que tous les champs sont bien remplis
  if (!lastname || !firstname || !email || !password) {
    return res
      .status(400)
      .send({ message: 'Tous les champs doivent être remplis' });
  }
  try {
    //S'assure que l'email n'existe pas déjà dans la base de donnée
    const user = await User.findOneByEmail(email);
    if (user.length === 0) {
      const hashed = await bcrypt.hash(password, 10);
      const newUser = new User({
        lastname: lastname,
        firstname: firstname,
        email: email,
        password: hashed,
      });
      const userId = await User.signup(newUser);
      res.status(200).json({
        userId: userId,
        admin: 0,
      });
    } else {
      return res.status(400).send({ error: 'Cet email est déjà utilisé' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

//LOGIN
exports.login = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  //cherche l'email dans la bdd
  User.findOneByEmail(email)
    .then((user) => {
      let userId = user[0].userId;
      let userPass = user[0].password;
      let admin = user[0].admin;
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé' });
      }
      //si l'utilisateur est trouver on compare le mdp avec le hash du mdp de l'utilisateur
      bcrypt
        .compare(password, userPass)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
          }
          res.status(200).json({
            userId: userId,
            admin: admin,
            token: jwt.sign({ userId: user._id }, `${envdbToken}`, {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.status(501).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Info d'un profil utilisateur
exports.userInfo = (req, res) => {
  User.findOneById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Tutorial with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

//modifier un profil
exports.update = (req, res) => {
  //Validation de la requête
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  console.log(req.body);

  User.updateById(req.params.id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating user with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.deleteUser = (req, res) => {
  User.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating user with id ' + req.params.id,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
