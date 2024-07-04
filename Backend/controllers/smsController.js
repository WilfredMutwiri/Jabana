// authentication
const credentials={
    apiKey:process.env.SMS_API, 
    username:process.env.SMS_USERNAME
}

// require the AT package
const AfricasTalking=require('africastalking')(credentials);

const sms=AfricasTalking.SMS;
// send sms
const sendSMS=async(req,res)=>{
    const {phoneNo,message}=req.body;
    sms.send({
        to:phoneNo,
        message:message,
        enqueue:true
    })
    .then(response=>{
        console.log(response);
        res.json(response);
    })
    .catch(error=>{
        console.log(error);
        res.json(error.toString())
    })
};

// deliver callback route
const smsDelivered=async(req,res)=>{
    console.log(req.body);
    res.status(200).json({
        status:"Success",
        message:"SMS delivered successfully!"
    })
}

module.exports={
    sendSMS,
    smsDelivered
}
