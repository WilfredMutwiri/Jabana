import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import {useState} from 'react';
import {SERVER_URL} from '../constants/SERVER_URL'
export default function SignIn(){
        const Navigate=useNavigate();
        const [loading,setIsLoading]=useState(false);
        const [formData,setFormData]=useState({});
        const [errorMessage,setErrorMessage]=useState(false);
        const [loginSuccess,setLoginSuccess]=useState(false);
    
        const handleChange=(e)=>{
            setFormData({...formData,[e.target.id]:e.target.value.trim()})
            console.log(FormData);
        }
        const handleSubmit=async(e)=>{
            e.preventDefault();
            setIsLoading(true);
            setErrorMessage(false);
            setLoginSuccess(false)
            if(!formData.userName ||
                !formData.email ||
                !formData.password ||
                formData.userName==="" ||
                formData.email===" "||
                formData.password===""
            ){
                setErrorMessage("All fields must be filled!")
            }
            try {
                const res=await fetch(SERVER_URL+'/api/auth/signin',{
                    method:"POST",
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(formData)
                })
                const data=await res.json()
                if(res.ok){
                    setLoginSuccess(true)
                    setLoginSuccess("Login successfull!")
                    Navigate('/admin');
                }
            } catch (error) {
                console.log(error);
            }
    
        }
  return (
        <div className="w-full">
            <hr/>
            <div className="block md:flex w-10/12 pt-20 m-auto gap-5">
                <div className='flex-1'>
                <div className="flex p-3">
                <span className="text-orange-500 text-2xl bg-black p-2 rounded-md">J</span>
                <h2 className="text-pink-700 text-2xl p-2">abana</h2>
                </div>  
                <p>
                    Your ultimate school manager, send sms to your students'parents, teachers and other workers with ease,
                    Login today with your email and password to get access to enjoy our services!
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
                        <Button  gradientDuoTone='pinkToOrange'className='w-full' type='submit' disabled={loading}>
                            {
                                loading ? (
                                    <>
                                    <Spinner size="sm"/>
                                    <span className='pl-3'>Loading...</span>
                                    </>
                                ):'Login'
                            }
                        </Button>
                    </form>
                    {
                        errorMessage && <Alert color="failure" className='mt-4'>
                            {errorMessage}
                        </Alert>
                    }
                    {
                        loginSuccess && <Alert color="success" className='mt-4'>
                            {loginSuccess}
                        </Alert>
                    }
                    <p className='pt-3 text-sm'>
                        Don't have an account? <span className='text-blue-600'><a href='/Signup'>Create Account</a></span>
                    </p>
                </div>
            </div>
        </div>
    );
}
