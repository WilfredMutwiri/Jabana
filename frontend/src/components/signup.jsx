import React from 'react'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import {SERVER_URL} from '../constants/SERVER_URL'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

export default function signup() {
  const [formData,setFormData]=useState({});
  const [loading,setLoading]=useState(false);
  const [errorMessage,setErrorMessage]=useState(null);
  const [successMessage,setSuccessMessage]=useState(false);


  const Navigate=useNavigate();

  const handleChange=(e)=>{
      setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }
  const handleSubmit=async(e)=>{
      e.preventDefault();
      if(!formData.userName || !formData.email || !formData.password){
          return setErrorMessage("All fields must be filled")
      }
      try {
          setErrorMessage(null);
          setSuccessMessage(false);
          setLoading(true);
          const res=await fetch(SERVER_URL+'/api/auth/signup',{
              method:"POST",
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify(formData)
          });
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
              throw new Error("Server response is not in JSON format");
          }
          const data=await res.json();
          if(data.success==false){
            return setErrorMessage(error.message)
          }
          setLoading(false)
          if(data){
            setSuccessMessage(true)
            setSuccessMessage("Account Created Successfully!");
          }
          if(res.ok){
            setSuccessMessage(true)
            setSuccessMessage("Account Created Successfully!");
            Navigate('/signIn')
          }
      } catch (error) {
          setErrorMessage(error.message);
          setSuccessMessage(false);
          setLoading(false);
      }
  }
    return (
        <div className="w-full">
            <hr />
            <div className="flex w-10/12 pt-20 m-auto gap-6">
                <div className='flex-1'>
                <div className="flex p-3">
                <span className="text-orange-500 text-2xl bg-black p-2 rounded-md">J</span>
                <h2 className="text-pink-700 text-2xl p-2">abana</h2>
                </div>  
                <p>
                    Your ultimate school manager, send sms to your students'parents, teachers and other workers with ease,
                    Create an account today to get access to enjoy our services!
                </p>
                </div>
                <div className='flex-1'>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <Label value='Your Username'/>
                        <TextInput 
                        placeholder='mark'
                        type='text'
                        id='userName'
                        onChange={handleChange}
                        />
                        <Label value='Your Email'/>
                        <TextInput 
                        placeholder='mark@gmail.com'
                        type='email'
                        id='email'
                        onChange={handleChange}
                        />
                        <Label value='Your Password'/>
                        <TextInput
                        placeholder='*******'
                        type='password'
                        id='password'
                        onChange={handleChange}
                        />
                        <Button 
                        gradientDuoTone='pinkToOrange'
                        type='submit'
                        disabled={loading}
                        >
                            {
                                loading?(
                                    <>
                                    <Spinner size="sm"/>
                                    <span className='pl-3'>Loading...</span>
                                    </>
                                ):'Create Account'
                            }
                        </Button>
                    </form>
                    <p className='pt-3 text-sm'>
                        Already have an account? <span className='text-blue-600'><a href='/Signin'>Login</a></span>
                    </p>
                    {
                    errorMessage &&
                    <Alert color="failure" className='mt-5'>
                        {errorMessage}
                    </Alert>
                }
                {
                    successMessage &&
                    <Alert color="success" className='mt-5'>
                        {successMessage}
                    </Alert>
                }
                </div>
            </div>
        </div>
    );
}
