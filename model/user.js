const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
     firstname:{
        type:String,//datatype...
        default:null,// if no body gives any data it gonna set null
     },
     lastnmae:{
        type:String,
        default:null,
     },
     email:{
        type:String,
        unique: true,
         },

    password:{
        type:String,
    }
});

module.exports= mongoose.model('user',userSchema)
