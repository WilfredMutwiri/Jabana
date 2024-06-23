const express=require('express');
const router=express.Router();
const {addTeacher}=require('../controllers/usersController.js')

router.post('/addTeacher',addTeacher)

module.exports=router;