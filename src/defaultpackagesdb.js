const mongoose=require("mongoose")
const packagesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    packname:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    }
})
const defaultpackage=new mongoose.model('defaultpackage',packagesSchema)
module.exports=defaultpackage