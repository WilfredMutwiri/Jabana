const Subject=require('../models/subjectsModel');

const addSubject=async(req,res)=>{
    const {subjectName,subjectId,subjectTeacher}=req.body;
    if(
        !subjectName||
        !subjectId||
        !subjectTeacher||
        subjectName===""||
        subjectId===""||
        subjectTeacher===""
    ){
        console.log("Kindly add all fields");
        return res.status(400).json({success:false, message:"All fields must be filed"})
    }
    try {
        const existingSubject=await Subject.findOne({$or:[{subjectId},{subjectTeacher}]})
        if(existingSubject){
            return res.status(400).json({success:false,message:"Subject already exists"})
        }
        const newSubject=new Subject({
            subjectName,
            subjectId,
            subjectTeacher
        })
        await newSubject.save()
        return res.status(200).json({success:true,message:"New Subject Added Successfully"})
    } catch (error) {
        console.log("Error adding subject");
        res.status(500).json({success:false,message:error.message})
    }
}

const getSubjects=async(req,res)=>{
    try {
        const subjects=await Subject.find();
        return res.status(200).json(subjects);
    } catch (error) {
        console.log("can't fetch subjects");
        return res.status(500).json({message:error.message})
        
    }

}

module.exports={
    addSubject,
    getSubjects
}