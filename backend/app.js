const express = require('express');
const db = require('./models/db.js');
const app = express();

app.use(express.json());

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentaryRoutes = require('./routes/commentary.routes');

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/commentary', commentaryRoutes);

module.exports = app;
