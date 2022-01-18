const db = require('../models/db');

//constructor
const User = function (user) {
  (this.lastname = user.lastname),
    (this.firstname = user.firstname),
    (this.email = user.email),
    (this.password = user.password);
};

User.signup = (newUser) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users SET ?', newUser, (err, res) => {
      if (err) {
        reject(err);
        return;
      } else {
        //insertId retourne l'identifiant généré par la dernière requête
        resolve(res.insertId);
      }
    });
  });
};

//Trouve l'utilisateur qui se connecte
User.findOneByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', email, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(res);
        resolve(res);
      }
    });
  });
};

//trouve le profil d'un utilisateur
User.findOneById = (userId, result) => {
  db.query('SELECT * FROM users WHERE userId = ?', userId, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found profil: ', res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: 'not_found' }, null);
  });
};

//Modifier le profil
User.updateById = (userId, user, result) => {
  db.query(
    'UPDATE users SET email = ?, lastname = ?, firstname = ? WHERE userId = ?',
    [user.email, user.lastname, user.firstname, userId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        //ne trouve pas l'utilisateur avec son id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated user: ', { userId: userId, ...user });
      result(null, { userId: userId, ...user });
    }
  );
};

//supprimer le compte
User.deleteById = (userId, result) => {
  db.query('DELETE FROM users WHERE userId = ?', userId, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      //ne trouve pas l'utilisateur avec son id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted user with id: ', userId);
    result(null, res);
  });
};

module.exports = User;
