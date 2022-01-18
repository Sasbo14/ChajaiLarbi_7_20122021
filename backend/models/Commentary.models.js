const db = require('./db');

//constructor
const Commentary = function (commentary) {
  (this.content = commentary.content),
    (this.user_Id = commentary.user_Id),
    (this.post_Id = commentary.post_Id);
};

//créer un post
Commentary.create = (newCommentary, result) => {
  //const user_id = result.insertId;
  db.query('INSERT INTO commentaryContent SET ?', newCommentary, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created commentary: ', { id: res.insertId, ...newCommentary });
    result(null, { id: res.insertId, ...newCommentary });
  });
};

//affiche tout les post
Commentary.getAllCommentary = (result) => {
  db.query('SELECT * FROM commentaryContent', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

//affiche un seul post
Commentary.getOneCommentaryById = (commentaryId, result) => {
  db.query(
    `SELECT * FROM commentaryContent WHERE commentaryId = ${commentaryId}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('found thing: ', res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: 'not_found' }, null);
    }
  );
};

//Modifier un post
Commentary.updateCommentary = (commentaryId, commentary, result) => {
  db.query(
    `UPDATE commentaryContent SET content = ? WHERE commentaryId = ${commentaryId}`,
    [commentary.content, commentaryId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        //not found thing with the id
        result({ kind: 'not found' }, null);
        return;
      }
      console.log('updated commentary: ', {
        commentaryId: commentaryId,
        ...commentary,
      });
      result(null, { commentaryId: commentaryId, ...commentary });
    }
  );
};

//Suppression d'un post
Commentary.deleteCommentary = (commentaryId, result) => {
  db.query(
    `DELETE FROM commentaryContent WHERE commentaryId = ${commentaryId}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found commentary with the id
        result({ kind: 'not found' }, null);
        return;
      }
      console.log('deleted commentary with id: ', commentaryId);
      result(null, res);
    }
  );
};

module.exports = Commentary;
