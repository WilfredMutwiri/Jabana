const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv').config()
const authRoutes=require('./Routes/authRoutes')
const usersRoutes=require('./Routes/usersRoutes')

const app=express();
app.use(express.json());
app.use(cors())

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

// test api
app.use('/api/auth',authRoutes)
app.use('/api/users',usersRoutes)