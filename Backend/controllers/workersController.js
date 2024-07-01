const Worker=require('../models/workersModel');
// const {errorHandler}=require('../utils/errorHandler');

const addWorker=async(req,res,next)=>{
    const {fullName,email,phoneNo,Department}=req.body;
    if(
        !fullName ||
        !email ||
        !phoneNo ||
        !Department ||
        fullName===""||
        email===""||
        phoneNo==="" ||
        Department===""
    ){
        console.log("Kindly fill all fields");
        return res.status(400).json({success:false, message:"All fields must be filed"})
        // next(errorHandler(400,"Kindly fill all fields"))
    }
    try {
        const existingWorker=await Worker.findOne({fullName})
        if(existingWorker){
            return res.status(400).json({success:false,message:"Worker already exists"})
            // next(errorHandler(400,"Teacher already exists"))
        }
        const newWorker=new Worker({
            fullName,
            email,
            phoneNo,
            Department
        })
        await newWorker.save()
        return res.status(200).json({success:true,message:"New Worker Added Successfully"})
    } catch (error) {
        console.log("Error adding Worker");
        res.status(500).json({success:false,message:error.message})
    }
}

const getWorkers=async(req,res,next)=>{
    try {
        const workers=await Worker.find();
        return res.status(200).json(workers);
    } catch (error) {
        console.log("can't fetch workers");
        return res.status(500).json({message:error.message})
        
    }
}

module.exports={
    addWorker,
    getWorkers
}