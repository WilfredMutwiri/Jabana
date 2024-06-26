const User=require('../models/userModel');
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken');
const { errorHandler } = require('../utils/errorHandler');

const signup=async(req,res,next)=>{
    const {userName,email,password}=req.body;
    if(
        !userName ||
        !email ||
        !password ||
        userName==="" ||
        email==="" ||
        password=== ""
    ){
        next(errorHandler(400,"All fields must be filled"))
    }
    try {
        const existingUser=await User.findOne({userName});
        if(existingUser){
            next(errorHandler(400,"userName already in use"))
        }
        const existingEmail=await User.findOne({email});
        if(existingEmail){
            next(errorHandler(400,"Email already exists"))
        }
        const hashPassword=bcryptjs.hashSync(password,10);
        const newUser=new User({
            userName,
            email,
            password:hashPassword
        });

        await newUser.save()
        res.status(200).json({message:"Signup successful"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

const signin=async(req,res,next)=>{
const {userName,email,password}=req.body;
if(
    !userName ||
    !email ||
    !password ||
    userName===""||
    email===""||
    password===""
){
    next(errorHandler(400,"All fields must be filled"))
}
try {
    // check user availability in db
    const validUser=await User.findOne({email})
    if(!validUser){
        return next(errorHandler(400,"User not found"))
    }
    // check user password
    const validPassword=bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
        return next(errorHandler(400,"Invalid password"))
    }
    // create token
    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    // separate password from response
    const {password:pass,...rest}=validUser._doc;
    // create cookie
    res.status(200)
    .cookie('access_token',token,{
        httpOnly:true
    })
    .json(rest)
} catch (error) {
    
}
}

module.exports={
    signup,
    signin
}
