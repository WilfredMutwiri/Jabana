const Student=require('../models/studentModel');
// const {errorHandler}=require('../utils/errorHandler');

const addStudent=async(req,res)=>{
    const {studentName,parentEmail,parentPhoneNo,studentAdmNo,studentClass,parentName}=req.body;
    if(
        !studentName||
        !parentEmail ||
        !parentPhoneNo ||
        !studentAdmNo ||
        !studentClass ||
        !parentName ||
        studentName===""||
        parentEmail===""||
        parentPhoneNo==="" ||
        studentClass==="" ||
        !studentAdmNo===""
    ){
        console.log("Kindly fill all fields");
        return res.status(400).json({success:false, message:"All fields must be filed"})
        // next(errorHandler(400,"Kindly fill all fields"))
    }
    try {
        const existingStudent=await Student.findOne({$or:[{studentName},{studentAdmNo}]})
        if(existingStudent){
            return res.status(400).json({success:false,message:"Student already exists"})
            // next(errorHandler(400,"Teacher already exists"))
        }
        const newStudent=new Student({
            studentName,
            parentName,
            parentEmail,
            parentPhoneNo,
            studentAdmNo,
            studentClass
        })
        await newStudent.save()
        return res.status(200).json({success:true,message:"New Student Added Successfully"})
    } catch (error) {
        console.log("Error adding student");
        res.status(500).json({success:false,message:error.message})
    }
}

const getStudents=async(req,res,next)=>{
    try {
        const students=await Student.find();
        return res.status(200).json(students);
    } catch (error) {
        console.log("can't fetch students");
        return res.status(500).json({message:error.message})
        
    }
}

const getStudentsCount=async(req,res)=>{
    try {
        const parentsCount=await Student.countDocuments();
        res.json(parentsCount);
    } catch (error) {
        return res.status(500).json({message:"Error fetching students"})
    }
}

module.exports={
    addStudent,
    getStudents,
    getStudentsCount
}