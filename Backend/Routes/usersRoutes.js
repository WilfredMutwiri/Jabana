const express=require('express');
const router=express.Router();
const {addTeacher, getTeachers}=require('../controllers/usersController.js')

router.post('/addTeacher',addTeacher)
router.get('/getTeachers',getTeachers)

module.exports=router;