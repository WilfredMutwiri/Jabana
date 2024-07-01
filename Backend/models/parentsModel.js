const mongoose=require('mongoose')
const parentSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:false
    },
    phoneNo:{
        type:String,
        required:true,
        unique:false
    },
    studentName:{
        type:String,
        required:true,
        unique:true
    },
    studentAdmNo:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true});

const Parent=mongoose.model("Parent",parentSchema);
module.exports=Parent;