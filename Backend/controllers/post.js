const express = require('express')
const router = express.Router()
const Models = require('../models')

/**
 * GET : Afficher tout les posts
 */
 exports.getAllPosts = (req, res, next) => {
    Models.post.findAll({
      //attributes: ['email', 'firstname'],
    //   where: { id: req.params.id }, inutile car on veut tous les posts ?
     // order: ['id', 'DESC']
    })
    .then(posts => {
      if(posts){
        res.status(200).json({posts})
      } else {
        res.status(404).json({message: "Not Found"})
      }
    })
    .catch(error => res.status(500).json({ error }));
  }

/**
 * GET : Afficher un post
 * postId
 */
 exports.getOnePost = (req, res, next) => {
    Models.post.findOne({
      //attributes: ['email', 'firstname'],
      where: { id: req.params.id }
    })
    .then(post => {
      if(post){
        res.status(200).json({post})
      } else {
        res.status(404).json({message: "Not Found"})
      }
    })
    .catch(error => res.status(500).json({ error }));
  };

/**
 * POST : Creer un post
 * email, description, date
 */
exports.createPost = async (req, res, next) => {
    const newPost = await Models.post.create(
        { description: req.body.description,
            userId: user.id
        })
    .then( post => {
        res.status(200).json({message : "OK", post})
    })
    .catch(error => res.status(500).json({ error }))
};

/**
 * PUT : Modifier un post
 * token, postId
 */
 exports.modifyPost = (req, res, next) => {
    const token = req.headers.authorization
    const decodedToken = jwt.decode(token.split(" ")[1])
    const userId = decodedToken.userId
    const updatedPost = req.body.description
    if(updatedPost && updatedPost != null){
     Models.post.update({ description: updatedPost}, { where: { id: userId}})
     .then( () => { res.status(200).json({message:'Ok'})})
     .catch(error => res.status(500).json({ error }));
    } else {
       res.status(500).json({ message: "No password gived" });
    }
 }

/**
 * DELETE : Supprimer un post
 * token, postId
 */
 exports.deletePost = async (req, res, next) => {

    const token = req.headers.authorization
    const decodedToken = jwt.decode(token.split(" ")[1])
    const userId = decodedToken.userId
    let commentValue, postValue
  
    // SUPPRIMER TOUS LES COMMENTAIRES
  
    await Models.comment.destroy({where: { userId: userId }})
    .then( destroy => { commentValue = destroy})
    .catch(error => res.status(500).json({ error }));
  
    // SUPPRIMER TOUS LES POSTS
  
    await Models.post.destroy({where: { userId: userId }})
    .then( destroy => { postValue = destroy})
    .catch(error => res.status(500).json({ error }));

    res.json({message : "OK", 
    commentsDelete : commentValue, 
    postsDelete : postValue})
 }