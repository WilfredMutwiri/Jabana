const Student=require('../models/studentModel');

const addStudent=async(req,res)=>{
    const {
        studentName,
        parentEmail,
        parentPhoneNo,
        studentAdmNo,
        studentClass,
        parentName,
        parentNationalId,
        parentTitle,
        placeOfBirth,
        religion,
        nationality,
        status,
        parentBoxOffice
    }=req.body;
    if(
        !studentName||
        !parentEmail ||
        !parentPhoneNo ||
        !studentAdmNo ||
        !studentClass ||
        !parentName ||
        !parentNationalId ||
        !parentTitle ||
        !placeOfBirth ||
        !religion ||
        !nationality ||
        !status ||
        !parentBoxOffice ||
        studentName===""||
        parentEmail===""||
        parentPhoneNo==="" ||
        studentClass==="" ||
        studentAdmNo===""||
        parentName===""||
        parentNationalId===""||
        parentTitle===""||
        placeOfBirth===""||
        religion===""||
        nationality===""||
        status==="",
        parentBoxOffice===""
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
            studentClass,
            parentNationalId,
            parentTitle,
            placeOfBirth,
            religion,
            nationality,
            status,
            parentBoxOffice
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

//get a single student data
const getStudentInfo=async(req,res)=>{
    try {
        const student=await Student.findById(req.params.id);
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }else{
            res.json(student);
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};
//delete a student
const deleteStudent=async(req,res)=>{
    try {
        const student=await Student.findByIdAndDelete(req.params.id);
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }else{
            res.json({message:"Student deleted Successfully!"});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports={
    addStudent,
    getStudents,
    getStudentsCount,
    getStudentInfo,
    deleteStudent
}