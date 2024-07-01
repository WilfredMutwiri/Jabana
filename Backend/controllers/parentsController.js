const Parent=require('../models/parentsModel');
// const {errorHandler}=require('../utils/errorHandler');

const addParent=async(req,res,next)=>{
    const {fullName,email,phoneNo,studentName,studentAdmNo}=req.body;
    if(
        !fullName ||
        !email ||
        !phoneNo ||
        !studentName ||
        !studentAdmNo ||
        fullName===""||
        email===""||
        phoneNo==="" ||
        studentName==="" ||
        !studentAdmNo===""
    ){
        console.log("Kindly fill allfields");
        return res.status(400).json({success:false, message:"All fields must be filed"})
        // next(errorHandler(400,"Kindly fill all fields"))
    }
    try {
        const existingStudent=await Parent.findOne({studentName})
        if(existingStudent){
            return res.status(400).json({success:false,message:"Student already exists"})
            // next(errorHandler(400,"Teacher already exists"))
        }
        const newParent=new Parent({
            fullName,
            email,
            phoneNo,
            studentName,
            studentAdmNo
        })
        await newParent.save()
        return res.status(200).json({success:true,message:"New Student Added Successfully"})
    } catch (error) {
        console.log("Error adding student");
        res.status(500).json({success:false,message:error.message})
    }
}

const getParents=async(req,res,next)=>{
    try {
        const parents=await Parent.find();
        return res.status(200).json(parents);
    } catch (error) {
        console.log("can't fetch parents");
        return res.status(500).json({message:error.message})
        
    }
}

module.exports={
    addParent,
    getParents
}