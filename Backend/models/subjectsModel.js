const mongoose=require('mongoose')
const subjectsSchema=new mongoose.Schema({
    subjectName:{
        type:String,
        required:true,
        unique:true
    },
    subjectId:{
        type:String,
        required:true,
        unique:true
    },
    subjectTeacher:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true});

const Subject=mongoose.model("Subject",subjectsSchema);
module.exports=Subject;