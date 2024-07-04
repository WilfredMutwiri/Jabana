
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
    try{
        const {phoneNo,message}=req.body;
        const smsResponse=await sms.send({
            to:phoneNo,
            message:message,
            enqueue:true
        });
        // check response report
        if(smsResponse && smsResponse.SMSMessageData){
            const smsMessageData=smsResponse.SMSMessageData;
            const responseMessage=smsMessageData.Message;
            if(responseMessage.includes("1/1")){
                res.status(200).json({
                    status:"Success",
                    message:"SMS delivered successfully!",
                    data:smsResponse
                });
            }else if(responseMessage.includes("0/1")){
                res.status(400).json({
                    status:"failed",
                    message:"SMS not delivered",
                    data:smsResponse
                }); 
            }   
        }
    }catch(error){
        console.log(error);
        res.status(400).json({
            status:"failed",
            message:"SMS not delivered",
            error:error.toString()
        });
    }
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
