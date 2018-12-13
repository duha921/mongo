const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:String,
    age:Number
});
const postSchema = mongoose.Schema({
    
   title: String,
   desc: String,
   numberOfLikes:Number
});

module.exports=mongoose.model('User',userSchema)
module.exports=mongoose.model('Post',postSchema)

