import React from 'react'
import { Alert, Button, Label, Spinner, TextInput, Textarea } from "flowbite-react";
import { useState } from 'react';
import { SERVER_URL } from '../../constants/SERVER_URL';

export default function TeachersSquare() {
    const [formData,setFormData]=useState({});
    const [loading,setLoading]=useState(false);
    const [smsSuccess,setSmsSuccess]=useState(false);
    const [isError,setIsError]=useState("");

    // check phone number validity
    const validPhoneNo=(phonenumber)=>{
        const regex = /^\+2547\d{8}$/;
        return regex.test(phonenumber)
    }
    // +254774529458
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value.trim()})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setSmsSuccess(false);
        setIsError(false);

        if(!formData ||
            !formData.message ||
            formData==="" ||
            formData.message===""
        ){
            setLoading(false)
           return setIsError("Can't send empty message")
        }else if(!formData.phoneNo || !formData.phoneNo===""){
            setLoading(false);
            return setIsError("Kindly select a recipient!")
        }else if(!validPhoneNo(formData.phoneNo)){
            setLoading(false);
            return setIsError("Invalid Phone number")
        }
        try {
            const res=await fetch(SERVER_URL+'/api/sms/sendSMS',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data=await res.json();
            if(!res.ok){
                setIsError(data.message || "An error occured")
                setLoading(false);
                return;
            }
            setSmsSuccess(true);
            setLoading(false)
            setSmsSuccess("Message sent successfully!");
        } catch (error) {
            setIsError(error.message);
            setLoading(false)
        }
    }
    return (
        <div>
            <div className="bg-gray-300 rounded-md p-3 w-full mt-4">
                            <h2 className="text-center font-semibold text-orange-500">Teachers Square</h2>
                            <form onSubmit={handleSubmit}>
                            <div className="block md:flex gap-6">
                                <div className=" pt-3 flex flex-col gap-4 flex-1">
                                    <h2>Send Message to:</h2>
                                    <div className="flex gap-3">
                                    <Button className="w-full">All Teachers</Button>
                                    </div>
                                    <hr />
                                    <div>
                                    <Label value="All Teachers Except"/>
                                    <TextInput 
                                    type="text"
                                    className="mt-2 mb-2"
                                    placeholder="+254700000000"
                                    onChange={handleChange}
                                    id='phoneNo'
                                    />
                                    </div>
                                    <hr />
                                    <div>
                                    <Label value="Special Teacher"/>
                                    <TextInput 
                                    type="text"
                                    className="mt-2 mb-2"
                                    placeholder="+2540700000000"
                                    id='phoneNo'
                                    onChange={handleChange}
                                    />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <Textarea 
                                    className="w-full h-72 mt-4" 
                                    placeholder="Dear Sir/Madam, you are hearby notified that..."
                                    id='message'
                                    onChange={handleChange}/>
                                    <Button className="w-full mt-3" gradientDuoTone="pinkToOrange" disabled={loading} outline type='submit'>
                                        {
                                            loading ?
                                            (
                                            <>
                                            <Spinner size="sm"/>
                                            <span className='ml-3 text-red-600'>Sending message...</span>
                                            </>
                                            ):'Send Message'
                                        }
                                    </Button>
                                    {
                                        isError && 
                                        <Alert color="failure" className='mt-4'>
                                            {isError}
                                        </Alert>
                                    }
                                    {
                                        smsSuccess &&
                                        <Alert color="success" className='mt-4'>
                                            {smsSuccess}
                                        </Alert>
                                    }
                                </div>
                        </div>
                </form>
            </div>
        </div>
    );
}