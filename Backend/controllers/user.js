const express = require('express')
const router = express.Router()
const Models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cryptoJS = require('crypto-js')

let iv = cryptoJS.enc.Hex.parse(''+process.env.AES_IV+'');
let key = cryptoJS.enc.Hex.parse(''+process.env.AES_KEY+'');

/**
 * GET : Afficher un utilisateur
 * Email en Paramètre + token en Headers
 */
exports.getOneUser = (req, res, next) => {
  Models.User.findOne({
    //attributes: ['email', 'firstname'],
    where: { id: req.params.id }
  })
  .then(user => {
    if(user){
      res.status(200).json({user})
    } else {
      res.status(404).json({message: "Not Found"})
    }
  })
  .catch(error => res.status(500).json({ error }));
}

/**
 * POST : Enregistrement d'un user
 * email, password, firstname, lastname
 */
 exports.signup = async (req, res, next) => {
  let hashPwd
  await bcrypt.hash(req.body.password, 10)
    .then(hash => {
    hashPwd = hash
  })
  const newUser = await Models.User.create(
    { firstname: req.body.firstname, 
      lastname: req.body.lastname, 
      email: req.body.email, 
      password:hashPwd,
      isAdmin: false
    })
  .then( user => {
    res.status(200).json({message : "OK", user})
  })
  .catch(error => res.status(500).json({ error }));
    };

/**
 * POST : Connection d'un user
 * email, password
 * password => bcrypt
 */
 exports.login = async (req, res, next) => {

  await Models.User.findOne({
    //attributes: ['email', 'firstname'],
    where: { email: req.body.email }
  })
  .then(user => {
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if(valid) {
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )})
      }
    })
    .catch(error => { console.log(error) })
  })
  .catch(error => res.status(500).json({ error }));
 };

/**
 * PUT : Mise a jour d'un user
 * Depuis l'email + Token + Password => Modification
 * email, token, password
 */

 exports.modifyPassword = async (req, res, next) => {
   const token = req.headers.authorization
   const decodedToken = jwt.decode(token.split(" ")[1])
   const userId = decodedToken.userId
   let hashNewPwd
   await bcrypt.hash(req.body.password, 10)
     .then(hash => {
     hashNewPwd = hash
   })
   const newPassword = hashNewPwd
   if(newPassword && newPassword != null){
    Models.User.update({ password: newPassword}, { where: { id: userId}})
    .then( () => { res.status(200).json({message:'Ok'})})
    .catch(error => res.status(500).json({ error }));
   } else {
      res.status(500).json({ message: "No password gived" });
   }
}


/**
 * DELETE : Suppression d'un user
 * Token
 */

 exports.deleteAccount = async (req, res, next) => {

  const token = req.headers.authorization
  const decodedToken = jwt.decode(token.split(" ")[1])
  const userId = decodedToken.userId
  let accountValue, commentValue, postValue

  // SUPPRIMER TOUS LES COMMENTAIRES

  await Models.comment.destroy({where: { userId: userId }})
  .then( destroy => { commentValue = destroy})
  .catch(error => res.status(500).json({ error }));

  // SUPPRIMER TOUS LES COMMENTAIRES DU POST
  let postsToDelete = await Models.post.findAll({ where: { userId: userId} })
  for(const post of postsToDelete) {
    await Models.comment.destroy({ where: { postId: post.id}})
    await Models.post.destroy({ where: { id: post.id }})
  }

  // SUPPRIMER TOUS LES POSTS

  // await Models.post.destroy({where: { userId: userId }})
  // .then( destroy => { postValue = destroy})
  // .catch(error => res.status(500).json({ error }));

  // SUPPRIMER L'UTILISATEUR

  await Models.User.destroy({where: { id: userId }})
  .then( destroy => { accountValue = destroy})
  .catch(error => res.status(500).json({ error }));

  // END

  res.status(200).json({message : "OK", 
    accountDelete : accountValue, 
    commentsDelete : commentValue, 
    postsDelete : postValue})
}