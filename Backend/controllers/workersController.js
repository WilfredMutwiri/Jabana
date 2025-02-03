const Worker=require('../models/workersModel');
// const {errorHandler}=require('../utils/errorHandler');

const addWorker=async(req,res,next)=>{
    const {
        fullName,
        email,
        phoneNo,
        Department,
        title,
        sex,
        nationality,
        placeOfBirth,
        nationalId,
        boxOffice,
        maritalStatus,
        religion,
        status,
        workerId
    }=req.body;
    if(
        !fullName||
        !email||
        !phoneNo|| 
        !Department||
        !workerId ||
        fullName===""||
        email===""||
        phoneNo===""||
        Department===""||
        workerId===""
    ){
        console.log("Kindly fill all fields");
        return res.status(400).json({success:false, message:"All fields must be filled"})
        // next(errorHandler(400,"Kindly fill all fields"))
    }
    try {
        const existingWorker=await Worker.findOne({$or:[{fullName},{email},{phoneNo}]})
        if(existingWorker){
            return res.status(400).json({success:false,message:"Worker already exists"})
            // next(errorHandler(400,"Teacher already exists"))
        }
        const newWorker=new Worker({
            fullName,
            email,
            phoneNo,
            Department,
            title,
            sex,
            nationality,
            placeOfBirth,
            nationalId,
            boxOffice,
            maritalStatus,
            religion,
            status,
            workerId
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
// get workers number
const workersCount=async(req,res)=>{
    try {
        const totalWorkers=await Worker.countDocuments();
        res.json(totalWorkers);
    } catch (error) {
        return res.status(500).json({message:"Can't fetch workers"});
    }
}

//get a single worker data
const getWorkerInfo=async(req,res)=>{
    try {
        const worker=await Worker.findById(req.params.id);
        if(!worker){
            return res.status(404).json({message:"Worker not found"});
        }else{
            res.json(worker);
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

module.exports={
    addWorker,
    getWorkers,
    workersCount,
    getWorkerInfo
}