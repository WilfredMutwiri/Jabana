const mongoose=require('mongoose')
const studentSchema=new mongoose.Schema({
    studentName:{
        type:String,
        required:true,
        unique:false
    },
    parentEmail:{
        type:String,
        required:true,
        unique:false
    },
    parentPhoneNo:{
        type:String,
        required:true,
        unique:false
    },
    studentAdmNo:{
        type:String,
        required:true,
        unique:true
    },
    studentClass:{
        type:String,
        required:true,
        unique:false
    },
    parentName:{
        type:String,
        required:true,
        unique:false
    }
},{timestamps:true});

const Student=mongoose.model("Student",studentSchema);
module.exports=Student;