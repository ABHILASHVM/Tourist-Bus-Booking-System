const { text } = require("express")
const mongoose=require("mongoose")
const packageBookingSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        
    },
    count:{
        type:Number,
        required:true,
    },
    packname:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true,
        unique:true
    }
})

const busBookingSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    destinations:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    seats:{
        type:String,
        required:true,
    },
    days:{
        type:Number,
        required:true,
    },
   
    requirements:{
        type:String
       
    },
    amount:{
        type:String,
        required:true,
    },
    picture:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true,
        unique:true
    }
   
})

const packageBookingCollection=new mongoose.model('packageBookingCollection',packageBookingSchema)
const busBookingCollection=new mongoose.model('busBookingCollection',busBookingSchema)

module.exports={packageBookingCollection,busBookingCollection}