const Teacher=require('../models/teachersModel');
// const {errorHandler}=require('../utils/errorHandler');

const addTeacher=async(req,res,next)=>{
    const {
        fullName,
        email,
        phoneNo,
        sex,
        placeOfBirth,
        nationalId,
        boxOffice,
        Role,
        classInCharge,
        Employer,
        title,
        nationality,
        maritalStatus,
        religion
    }=req.body;
    if(
        !fullName ||
        !email ||
        !phoneNo ||
        fullName===""||
        email===""||
        phoneNo===""
    ){
        console.log("Kindly add all fields");
        return res.status(400).json({success:false, message:"All fields must be filed"})
        // next(errorHandler(400,"Kindly fill all fields"))
    }
    try {
        const existingTeacher=await Teacher.findOne({$or:[{fullName},{email},{phoneNo}]})
        if(existingTeacher){
            return res.status(400).json({success:false,message:"Teacher already exists"})
            // next(errorHandler(400,"Teacher already exists"))
        }
        const newTeacher=new Teacher({
            fullName,
            email,
            phoneNo,
            sex,
            placeOfBirth,
            nationalId,
            boxOffice,
            maritalStatus,
            Role,
            classInCharge,
            Employer,
            title,
            nationality,
            maritalStatus,
            religion
        })
        await newTeacher.save()
        return res.status(200).json({success:true,message:"New Teacher Added Successfully"})
    } catch (error) {
        console.log("Error adding teacher");
        res.status(500).json({success:false,message:error.message})
    }
}

const getTeachers=async(req,res,next)=>{
    try {
        const teachers=await Teacher.find();
        return res.status(200).json(teachers);
    } catch (error) {
        console.log("can't fetch teachers");
        return res.status(500).json({message:error.message})
        
    }

}

const getTeacherCount=async(req,res)=>{
    try {
        const teachersCount=await Teacher.countDocuments();
        res.json({teachersCount});
    } catch (error) {
        res.status(500).json({error:"Can't retrieve number of teachers"});
    }
}

//get a single teacher data
const getTeacherInfo=async(req,res)=>{
    try {
        const teacher=await Teacher.findById(req.params.id);
        if(!teacher){
            return res.status(404).json({message:"Teacher not found"});
        }else{
            res.json(teacher);
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};
//delete a teacher
const deleteTeacher=async(req,res)=>{
    try {
        const teacher=await Teacher.findByIdAndDelete(req.params.id);
        if(!teacher){
            return res.status(404).json({message:"Teacher not found"});
        }else{
            res.json({message:"Teacher deleted Successfully!"});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports={
    addTeacher,
    getTeachers,
    getTeacherCount,
    getTeacherInfo,
    deleteTeacher
}