require ("dotenv").config(); // environment variables .package
require (".//config/database").connect();// databse connection
const User= require ('./model/user');//created user 
const bcrypt= require('bcryptjs')
 const jwt=require('jsonwebtoken')


const express = require("express");// express import
 const app = express();
 
 app.get("/",(req,res)=>{
    res.send("<h1> hello from auth system </h1>");

 });
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.post("/register",async (req,res)=>{
   try {
      const {firstname,lastname,email,password}=req.body;

   if(!(email&&password&&firstname&&lastname)){
      res.status(400).send("All fields are required");
   }

   const existinguser= await User.findOne ({email});
   
   if (existinguser){
      res.status(401).send("user already exits");
   }

   const myEncPassword= await bcrypt.hash(password,10);

   const user= await User.create({
      firstname,
      lastname,
      email,
      password:myEncPassword,

   });

   //token

   const token= jwt.sign(
      {user_id:user._id},
      process.env.SECRET_KEY,
      {
         expiresIn:"2h"
      }

   )
   user.token=token
   //update or not
   res.status(201).json(user)
      
   } catch (error) {
      console.log(error);
   }
 });
 

 module.exports = app;


