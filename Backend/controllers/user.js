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

  const newUser = await Models.User.create(
    { firstname: req.body.firstname, 
      lastname: req.body.lastname, 
      email: req.body.email, 
      password:req.body.password
    })
  .then( user => {
    res.status(200).json({message : "OK", user})
  })
  .catch(error => res.status(500).json({ error }));
  

    // utilisation de bcrypt pour hasher le mot de passe
      //bcrypt.hash(req.body.password, 10)
      //  .then(hash => {
      //    const user = new User({
      //      // utilisation de crypto-JS pour chiffrer les adresses mail
      //      email: cryptoJS.AES.encrypt(req.body.email, key, {iv: iv}).toString(),
      //      password: hash
      //    });
      //    user.save()
      //      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      //      .catch(error => res.status(400).json({ error }));
      //  })
      //  .catch(error => res.status(500).json({ error }));
    };

/**
 * POST : Connection d'un user
 * email, password
 * password => bcrypt
 */
 exports.login = async (req, res, next) => {

  await Models.User.findOne({
    //attributes: ['email', 'firstname'],
    where: { email: req.body.email, password: req.body.password  }
  })
  .then(user => {
    if(user){
      res.status(200).json({
        userId: user.id,
        token: jwt.sign(
          { userId: user.id },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' }
        )})
    } else {
      res.status(404).json({message: "Not Found"})
    }
  })
  .catch(error => res.status(500).json({ error }));
  //   let encryptedEmail = cryptoJS.AES.encrypt(req.body.email, key, {iv: iv}).toString()
  //   User.findOne({ email: encryptedEmail})
  //     .then(user => {
  //       if (!user) {
  //         return res.status(401).json({ error: 'Utilisateur non trouvé !' });
  //       }
  //       bcrypt.compare(req.body.password, user.password)
  //         .then(valid => {
  //           if (!valid) {
  //             return res.status(401).json({ error: 'Mot de passe incorrect !' });
  //           }
  //           res.status(200).json({
  //             userId: user._id,
  //             token: jwt.sign(
  //               { userId: user._id },
  //               'RANDOM_TOKEN_SECRET',
  //               { expiresIn: '24h' }
  //             )
  //           });
  //         })
  //         .catch(error => res.status(500).json({ error }));
  //     })
  //     .catch(error => res.status(500).json({ error }));
 };

/**
 * PUT : Mise a jour d'un user
 * Depuis l'email + Token + Password => Modification
 * email, token, password
 */

 exports.modifyPassword = (req, res, next) => {
   const token = req.headers.authorization
   const decodedToken = jwt.decode(token.split(" ")[1])
   const userId = decodedToken.userId
   const newPassword = req.body.password
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

  await Models.comment.destroy({where: { userid: userId }})
  .then( destroy => { commentValue = destroy})
  .catch(error => res.status(500).json({ error }));

  // SUPPRIMER TOUS LES POSTS

  await Models.post.destroy({where: { userID: userId }})
  .then( destroy => { postValue = destroy})
  .catch(error => res.status(500).json({ error }));

  // SUPPRIMER L'UTILISATEUR

  await Models.User.destroy({where: { id: userId }})
  .then( destroy => { accountValue = destroy})
  .catch(error => res.status(500).json({ error }));

  // END

  res.json({message : "OK", 
    accountDelete : accountValue, 
    commentsDelete : commentValue, 
    postsDelete : postValue})
}