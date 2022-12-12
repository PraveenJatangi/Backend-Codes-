const express = require('express') // for express 
const format = require('date-format') // for date formatting its a third party package
const app = express()
const port = 4000


// normal request for hello world

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//its a facebook rout gives returns the details of user
app.get('/ap/v1/facebook', (req, res) => {
    res.status(200).send("my name is nani")
  })
   
   app.get('/my/one',(req,res) =>{
       const socialWeb ={
         userName:"my name praveen",
         followers:20,
         follows:40,
          date: format.asString('hh:mm:ss',new Date())
       }

       res.status(200).json(socialWeb)
   })

 // gives whatever user requests 
  app.get('/ap/v1/:token', (req, res) => {
    console.log(req.params.token);
    res.status(200).json({param: req.params.token})
  });
  
 //shows at which port present app is running 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})