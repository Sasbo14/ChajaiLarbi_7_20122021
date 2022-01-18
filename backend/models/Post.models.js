const db = require('./db');

//constructor
const Post = function (post) {
  (this.content = post.content), (this.user_Id = post.user_Id);
};

//créer un post
Post.create = (newPost, result) => {
  //const user_id = result.insertId;
  db.query('INSERT INTO postContent SET ?', newPost, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created post: ', { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};

//affiche tout les post
Post.getAllPost = (result) => {
  db.query('SELECT * FROM postContent', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

//affiche un seul post
Post.getOnePostById = (postId, result) => {
  db.query(`SELECT * FROM postContent WHERE postId = ${postId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found post: ', res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: 'not_found' }, null);
  });
};

//Modifier un post
Post.updatePost = (postId, post, result) => {
  db.query(
    `UPDATE postContent SET content = ? WHERE postId = ${postId}`,
    [post.content, postId],
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
      console.log('updated post: ', { postId: postId, ...post });
      result(null, { postId: postId, ...post });
    }
  );
};

//Suppression d'un post
Post.deletePost = (postId, result) => {
  db.query(`DELETE FROM postContent WHERE postId = ${postId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: 'not found' }, null);
      return;
    }
    console.log('deleted post with id: ', postId);
    result(null, res);
  });
};

module.exports = Post;
