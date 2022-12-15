const mongoose = require ("mongoose")

const{MONGODB_URl}=process.env

exports.connect = ()=>{
    mongoose.connect(MONGODB_URl,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log(`DB CONNETED SUCCESSFULLY`)) //promisess 
    .catch(error=>{
        console.log(`DB CONNECTION FAILED`);
        console.log(error);
        process.exit(1)
    })
    
}