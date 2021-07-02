const express = require('express')
const router = express.Router()
const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cryptoJS = require('crypto-js')

let iv = cryptoJS.enc.Hex.parse(''+process.env.AES_IV+'');
let key = cryptoJS.enc.Hex.parse(''+process.env.AES_KEY+'');

/**
 * GET : Afficher un utilisateur
 * token
 */
exports.getOneUser = (req, res, next) => {

}

/**
 * POST : Enregistrement d'un user
 * email, password, firstname, lastname
 */
 exports.signup = (req, res, next) => {
    // utilisation de bcrypt pour hasher le mot de passe
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            // utilisation de crypto-JS pour chiffrer les adresses mail
            email: cryptoJS.AES.encrypt(req.body.email, key, {iv: iv}).toString(),
            password: hash
          });
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };

/**
 * POST : Connection d'un user
 * email, password
 * password => bcrypt
 */
 exports.login = (req, res, next) => {
    let encryptedEmail = cryptoJS.AES.encrypt(req.body.email, key, {iv: iv}).toString()
    User.findOne({ email: encryptedEmail})
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

/**
 * PUT : Mise a jour d'un user
 * Depuis l'email + Token + Password => Modification
 * email, token, password
 */

 exports.modifyPassword = (req, res, next) => {
    res.json({message : "ok"})
}


/**
 * DELETE : Suppression d'un user
 * Token
 */

 exports.deleteAccount = (req, res, next) => {
    res.json({message : "ok"})
}