const express = require('express')
const router = express.Router()
const Models = require('../models')

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
     // order: ['id', 'DESC']
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