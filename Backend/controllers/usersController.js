const Teacher=require('../models/teachersModel');
const {errorHandler}=require('../utils/errorHandler');

const addTeacher=async(req,res,next)=>{
    const {fullName,email,phoneNo}=req.body;
    if(
        !fullName ||
        !email ||
        !phoneNo ||
        fullName===""||
        email===""||
        phoneNo===""
    ){
        next(errorHandler(400,"Kindly fill all fields"))
    }
    try {
        const existingTeacher=await Teacher.findOne({fullName})
        if(existingTeacher){
            next(errorHandler(400,"Teacher already exists"))
        }
        const newTeacher=new Teacher({
            fullName,
            email,
            phoneNo
        })
        await newTeacher.save()
        res.status(400).json({message:"New Teacher Added Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={
    addTeacher
}