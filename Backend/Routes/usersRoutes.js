const express=require('express');
const router=express.Router();
const {addTeacher, getTeachers, getTeacherCount}=require('../controllers/teachersController.js')
const {addParent,getParents, getParentsCount}=require('../controllers/parentsController.js');
const { addWorker, getWorkers, workersCount } = require('../controllers/workersController.js');
const { addStudent, getStudents, getStudentsCount } = require('../controllers/studentController.js');
const { addSubject, getSubjects } = require('../controllers/subjectsController.js');

router.post('/addTeacher',addTeacher);
router.get('/getTeachers',getTeachers);
router.get('/teachersCount',getTeacherCount);

router.post('/addParent',addParent);
router.get('/getParents',getParents);
router.get('/parentsCount',getParentsCount);

router.post('/addWorker',addWorker);
router.get('/getWorkers',getWorkers);
router.get('/workersCount',workersCount);

router.post('/addStudent',addStudent);
router.get('/getStudents',getStudents);
router.get('/studentsCount',getStudentsCount);

//subjects
router.post('/addSubject',addSubject);
router.get('/getSubjects',getSubjects);


module.exports=router;