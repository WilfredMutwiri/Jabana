const express=require('express');
const router=express.Router();
const {addTeacher, getTeachers, getTeacherCount, getTeacherInfo, deleteTeacher}=require('../controllers/teachersController.js')
const {addParent,getParents, getParentsCount}=require('../controllers/parentsController.js');
const { addWorker, getWorkers, workersCount, getWorkerInfo } = require('../controllers/workersController.js');
const { addStudent, getStudents, getStudentsCount } = require('../controllers/studentController.js');
const { addSubject, getSubjects } = require('../controllers/subjectsController.js');

router.post('/addTeacher',addTeacher);
router.get('/getTeachers',getTeachers);
router.get('/teachersCount',getTeacherCount);
router.get('/teacher/:id',getTeacherInfo);
router.delete('/deleteTeacher/:id',deleteTeacher);

router.post('/addParent',addParent);
router.get('/getParents',getParents);
router.get('/parentsCount',getParentsCount);

router.post('/addWorker',addWorker);
router.get('/getWorkers',getWorkers);
router.get('/workersCount',workersCount);
router.get('/worker/:id',getWorkerInfo);

router.post('/addStudent',addStudent);
router.get('/getStudents',getStudents);
router.get('/studentsCount',getStudentsCount);

//subjects
router.post('/addSubject',addSubject);
router.get('/getSubjects',getSubjects);


module.exports=router;