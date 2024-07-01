const express=require('express');
const router=express.Router();
const {addTeacher, getTeachers}=require('../controllers/teachersController.js')
const {addParent,getParents}=require('../controllers/parentsController.js');
const { addWorker, getWorkers } = require('../controllers/workersController.js');

router.post('/addTeacher',addTeacher);
router.get('/getTeachers',getTeachers);
router.post('/addParent',addParent);
router.get('/getParents',getParents);
router.post('/addWorker',addWorker);
router.get('/getWorkers',getWorkers);

module.exports=router;