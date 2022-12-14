const mangoose = require("mongoose")

const userSchema = new mangoose.Schema({
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
        unique: true,//
         },

    password:{
        type:String,
    }
});

module.exports= mangoose.model('user',userSchema)
