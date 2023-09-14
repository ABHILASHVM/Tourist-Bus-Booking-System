const mongoose=require("mongoose")
const logInSchema2=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
    
})


const LogInCollection2=new mongoose.model('LogInCollection2',logInSchema2)
module.exports=LogInCollection2