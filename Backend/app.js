// Ajout des modules requis au fonctionnement de l'app
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

// const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

dotenv.config()

const sequelize = new Sequelize(''+process.env.DB_NAME+'', ''+process.env.DB_USER+'', ''+process.env.DB_PWD+'', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
// app.use('/api/post', postRoutes);
// app.use('/api/auth', userRoutes);
app.use('/api/user', userRoutes)
module.exports = app;