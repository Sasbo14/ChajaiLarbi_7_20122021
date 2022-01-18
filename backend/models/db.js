const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

//Authentication with the database
const db = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

//Connexion with the database
db.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

module.exports = db;
