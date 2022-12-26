require ("dotenv").config(); // environment variables .package
require (".//config/database").connect();// databse connection
const User= require ('./model/user');//created user 
const bcrypt= require('bcryptjs')
 const jwt=require('jsonwebtoken')
 const auth = require("./midleware/auth")

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

   const existinguser= await User.findOne({email});
     
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

   user.password=undefined;
   //update or not
   res.status(201).json(user)
      
   } catch (error) {
      console.log(error);
   }
 });
 
 //login flow

 app.post("/login", async (req,res)=>{
    
   try {
      
     const {email,password}=req.body
     if(!(email&&password)){
      res.status(400).send("field is missing")
     }

   const user= await User.findOne({email})
     
   // if(!(user)){
   //    res.status(400).send("you are not registered in this site")
   // }

   if(user &&(await bcrypt.compare(password,user.password))){
       const token = jwt.sign(
         {user_id:user._id,email},
         process.env.SECRET_KEY,
         {
            expiresIn:"3h"
         }
       )
       user.token=token
       user.password=undefined
       res.status(200).json(user)

   }
  res.status(400).send(" email or passowrd is incorrect")
    
   } catch (error) {
      console.log("error");
   }

 })

 //dashboard rout

 app.get("/dashboard",auth,(req,res)=>{
   res.send("welcome to dashboard")
 })

 module.exports = app;


