const mangoose= require ('mangoose')

const{MONGODB_URl}=process.env

exports.connect = ()=>{
    mangoose.connect(MONGODB_URl,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log(`DB CONNETED SUCCESSFULLY`))
    .catch(error=>{
        console.log(`DB CONNECTION FAILED`);
        console.log(error);
        process.exit(1)
    })
    
}