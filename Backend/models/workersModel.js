const mongoose=require('mongoose')
const workerSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNo:{
        type:String,
        required:true,
        unique:true
    },
    Department:{
            type:String,
            required:true,
    }
},{timestamps:true});

const Worker=mongoose.model("Worker",workerSchema);
module.exports=Worker;