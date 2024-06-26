const mongoose=require('mongoose')
const teacherSchema=new mongoose.Schema({
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
    }
},{timestamps:true});

const Teacher=mongoose.model("Teacher",teacherSchema);
module.exports=Teacher;