/*
 * File that handel the posts routes
 */

 /*
  * @TODO this file is not finished
  *
  */

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose=require('mongoose');
const Post = require('../modules/mongos');




// Getting information
router.get('/:id', (req, res) => {
 
  Post.findById(req.params.id) .then(result=>{
    
 if(!result){
    res.status(404).send('no such a post'); 
 }
    res.send(result);
 
}).catch(err =>{
  es.status(400).send(err.massage);
}) 
})
router.delete('/:id', (req, res) => {
  
  Post.remove({_id:req.params.id}).then (result =>
    {
     // res.send('post has been deleted');
 res.send("number of deleted "+ result.n);
    })
  });

// Adding a new post
router.post('/', (req, res) => {
  // Setting Schema so i can validate it
  const validating = userValidating(req.body);

  if(validating.error){
    res.status(400).send(validating.error.details);
  }else {
const post=new Post({
  
  title: req.body.title,
  desc: req.body.desc,
  numberOfLikes:req.body.numberOfLikes
});
post.save()
.then(result =>{
  console.log('added');
  
})
    res.send('Done');
  }
});
/*
// Adding a new post
router.post('/', (req, res) => {
   // Setting Schema so i can validate it
   const validating = postValidating(req.body);

   if (validating.error) {
       res.status(400).send(validating.error.details);
   } else {
       let newpost = {
         
           'title': 'req.body.title',
           'desc': "hafagbsdfgdsjfsdjk",
           'numberOfLike': 0
       };
       posts.push(newpost);
       res.send('Done');
   }
});*/

// PUT
router.put('/:id', (req, res) => {
  // Check if the Post exist

  const validating = userValidating(req.body);
  //  If the validation fails
  if(validating.error){
    res.status(400).send(validating.error.details);
}    else {
Post.update({_id:req.params.id}, { $set:{   title: req.body.title,  desc: req.body.desc,  numberOfLikes:req.body.numberOfLikes }})
.then(result =>{
     res.send(result);
}).catch(err =>{
res.status(400).send(err.massage);
});

      //  If the validation success
      res.send('updated');
     
    }

  
});


//  To validate the POST PUT requestes
function userValidating(post) {
  const postSchema = {
    'title': Joi.string().min(3).required(),
    'desc': Joi.string().required(),
    'numberOfLikes':Joi.number().required()
  }
  return Joi.validate(post, postSchema);
}


//  Expoting the router so app.js can use it in a MiddleWare
module.exports = router;
