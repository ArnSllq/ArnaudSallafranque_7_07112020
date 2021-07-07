const express = require('express')
const router = express.Router()
const Models = require('../models')
const jwt = require('jsonwebtoken')

/**
 * GET : Count le nombre de commentaire d'un post
 * postId
 */


/**
 * GET : Affiche tous les commentaires d'un post
 * postId
 */
 exports.getAllComments = (req, res, next) => {
    Models.comment.findAll({
      //attributes: ['email', 'firstname'],
      where: { postId: req.params.postId },
     order: [['id', 'ASC']]
    })
    .then(comments => {
      if(comments){
        res.status(200).json({comments})
      } else {
        res.status(404).json({message: "Not Found"})
      }
    })
    .catch(error => res.status(500).json({ error }));
  }

/**
 * POST : Creer un commentaire sur un post
 * postId, token
 */
 exports.createComment = async (req, res, next) => {
    const newComment = await Models.comment.create({ 
        comment: req.body.comment,
        userId: req.body.userId,
        postId: req.body.postId
    })
    .then( post => {
        res.status(200).json({message : "OK", post})
    })
    .catch(error => res.status(500).json({ error }))
};


/**
 * PUT : Modifier un commentaire sur un post
 * commentID, token
 */

/**
 * DELETE : Supprimer un commentaire sur un post
 * commentID, token
 */

exports.deleteComment = async (req, res, next) => {
  const token = req.headers.authorization
  const decodedToken = jwt.decode(token.split(" ")[1])
  const userId = decodedToken.userId
  const isAdmin = decodedToken.isAdmin
  const comment =  await Models.comment.findOne({where: {id: req.params.id}});
  if(!isAdmin && userId != comment.userId) {return res.status(401).json({message: "Vérifiez que vous avez les droits suffisants pour supprimer ce commentaire"}) }

  await Models.comment.destroy({where: { id: req.params.id }})
  .then( destroy => {res.status(200).json({ message: "OK"}) })
  .catch(error => res.status(500).json({ error }));
}