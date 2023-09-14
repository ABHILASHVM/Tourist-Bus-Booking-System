const mongoose=require("mongoose")
const feedbackSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
    },
    feedback:{
        type:String,
        required:true,
    }
    
})


const feedbackCollection=new mongoose.model('feedbackCollection',feedbackSchema)
module.exports=feedbackCollection