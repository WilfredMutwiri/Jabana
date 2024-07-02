const dotenv=require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const authRoutes=require('./Routes/authRoutes')
const usersRoutes=require('./Routes/usersRoutes')
const errorHandler=require('./utils/errorHandler')

const app=express();
app.use(express.json());
app.use(cors())

// test api
app.use('/api/auth',authRoutes)
app.use('/api/users',usersRoutes)

// error handling middleware 
app.use(errorHandler)


app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to db successfully");
    })
    .catch((error)=>{
        console.log(error);
    })



