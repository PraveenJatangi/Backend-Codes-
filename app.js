require ("dotenv").config();
require (".//config/database").connect();
const User= require ('./model/user');
const express = require("express");
 const app = express();
 
 app.get("/",(req,res)=>{
    res.send("<h1> hello from auth system </h1>");

 });

 app.post("/register",async (req,res)=>{
   const{ firstname,lastname,email,password}=req.body;

   if(!(email&&password&&firstname&&lastname)){
      res.status(400).send("All fields are required");
   }

   const existinguser= await User.findOne ({email});
   
   if (existinguser){
      res.status(401).send("user already exits")
   }
 });
 

 module.exports = app;


