const dotenv=require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const authRoutes=require('./Routes/authRoutes')
const usersRoutes=require('./Routes/usersRoutes')
const smsRoutes=require('./Routes/smsRoutes')
const errorHandler=require('./utils/errorHandler')

const app=express();
app.use(express.json());
app.use(cors())

// test api

// AFRICASTKNG
app.use('/api/auth',authRoutes)
app.use('/api/users',usersRoutes)
app.use('/api/sms',smsRoutes)

app.listen(process.env.PORT || 4001,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to db successfully");
    })
    .catch((error)=>{
        console.log(error);
    })
// middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
    })

// sending sms
// sendSMS()



