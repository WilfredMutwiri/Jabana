const express=require('express');
const router=express.Router();
const {sendSMS,smsDelivered}=require('../controllers/smsController.js')

router.post('/sendSMS',sendSMS);
router.post('/smsDelivered',smsDelivered);

module.exports=router;