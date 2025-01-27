import React from 'react'
import { useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { FaUsersLine } from "react-icons/fa6";
import { Button, Label } from 'flowbite-react';
import { FaRegClock } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { GiLovers } from "react-icons/gi";
import { FaUserSecret } from "react-icons/fa";
import { BiMessageCheck } from "react-icons/bi";
import { Progress } from "flowbite-react";
import { Link } from 'react-router-dom';
import { PiStudent } from "react-icons/pi";
import { TbBuildingWarehouse } from "react-icons/tb";
import { TiMessages } from "react-icons/ti";
import {SERVER_URL} from '../constants/SERVER_URL';


export default function Dashboard() {
    const {currentUser}=useSelector(state=>state.user)
    const [welcomeText,setWelcomeText]=useState("Welcome Back");

    const [teachersCount,setTeachersCount]=useState(0);
    const [parentsCount,setParentsCount]=useState(0);
    const [workersCount,setWorkersCount]=useState(0);
    const[studentsAmount,setStudentAmount]=useState(0);
    // get teachers count
    const getTeachersCount=async()=>{
        const response=await fetch(`${SERVER_URL}/api/users/teachersCount`);
        const data= await response.json();
        if(response.ok){
            setTeachersCount(data.teachersCount);
        }else{
            throw new data.error || "Error fetching teachers"
        }
    }
// get parents count
const getParentsCount=async()=>{
    const response=await fetch(`${SERVER_URL}/api/users/parentsCount`);
    const data= await response.json();
    if(response.ok){
        setParentsCount(data);
    }else{
        throw new data.error || "Error fetching parents"
    }
}

//get workers count
const getWorkersCount=async()=>{
    const response=await fetch(`${SERVER_URL}/api/users/workersCount`);
    const data=await response.json();
    if(response.ok){
        setWorkersCount(data);
    }else{
        throw new data.error || "Error fetching parents";
    }

}
    //get students count
    const getStudents=async()=>{
        const response=await fetch(`${SERVER_URL}/api/users/studentsCount`);
        const data=await response.json();
        if(response.ok){
            setStudentAmount(data);
        }else{
            throw new data.error || "Error fetching students value";
        }
    } 

    useEffect(()=>{
        const getTimeOfDay=()=>{
            const hours=new Date().getHours();
            if(hours<12){
                return 'Good Morning'
            }else if(hours<18){
                return 'Good Afternoon'
            }else{
                return 'Good Evening'
            }
        }
        setWelcomeText(getTimeOfDay())
        getTeachersCount();
        getParentsCount();
        getWorkersCount();
        getStudents();
    },[])
  return (
    <div>
        <h2 className='font-semibold text-lg p-3'>{welcomeText},<span className=' text-cyan-800'>{currentUser.userName}</span></h2>
        <div className='pt-3 block'>
            <div className='block md:flex gap-6 justify-between'>
                {/* members div */}
                <div className='bg-cyan-700 p-3 rounded-md flex flex-col gap-4 shadow-lg hover:shadow-none shadow-gray-300'>
                    <FaUsersLine className='mx-auto w-auto h-10 text-white'/>
                    <h2 className='font-semibold text-xl text-white'>Total Members</h2>
                    <h3 className='text-2xl text-white font-semibold'>4000</h3>
                    <Label className='text-yellow-300 rounded-md p-1'>*Includes all members in the system</Label>
                </div>
                {/* teachers,workers,parents */}
                <div className='w-full flex gap-6 bg-white rounded-md p-2 shadow-lg shadow-gray-300 hover:shadow-none'>
                    {/* teachers div */}
                    <div className='bg-slate-500 p-3 rounded-md flex-1 gap-4 text-white'>
                        <GiTeacher className='text-xl mx-auto w-auto h-10 text-white'/>
                        <h2 className='font-semibold text-xl pt-3'>Total Teachers</h2>
                        <h3 className='text-2xl font-semibold pt-3'>{teachersCount}</h3>
                        <h2 className='flex justify-between pt-3'>
                        <p className='text-sm text-yellow-300'>*Current</p>
                        <Link to="/ManageTeachers">
                        <h2 className='text-sm cursor-pointer bg-white text-red-600 p-2 rounded-md hover:bg-red-600 hover:text-white'>View</h2>
                        </Link>
                        </h2>
                    </div>
                    {/* parents div */}
                    <div className='p-3 rounded-md flex-1 bg-yellow-600'>
                        <GiLovers className='text-xl mx-auto w-auto h-10 text-white'/>
                        <h2 className='font-semibold text-xl pt-3 text-white'>Total Parents</h2>
                        <h3 className='text-2xl font-semibold pt-3 text-white'>{parentsCount}</h3>
                        <h2 className='flex justify-between pt-3'>
                        <p className='text-sm text-white'>*Current</p>
                        <Link to="/manageParents">
                        <h2 className='text-sm cursor-pointer bg-white text-red-600 p-2 rounded-md hover:bg-red-600 hover:text-white'>View</h2>
                        </Link>
                        </h2>
                    </div>
                    {/* workers div */}
                    <div className='bg-gray-700 p-3 rounded-md flex-1'>
                        <FaUserSecret className='text-xl mx-auto w-auto h-10 text-white'/>
                        <h2 className='font-semibold text-lg pt-3 text-white'>Total Workers</h2>
                        <h3 className='text-2xl font-semibold pt-3 text-white'>{workersCount}</h3>
                        <h2 className='flex justify-between pt-3'>
                        <p className='text-sm text-white'>*Current</p>
                        <Link to="/manageWorkers">
                        <h2 className='text-sm cursor-pointer bg-white text-red-600 p-2 rounded-md hover:bg-red-600 hover:text-white'>View</h2>
                        </Link>
                        </h2>
                    </div>
                </div>

            </div>
            {/* slower div */}
            <div className='mt-10 block md:flex justify-between gap-4'>
            <div className='block md:flex-1 p-2 bg-white shadow-lg shadow-gray-300 hover:shadow-none rounded-md'>
                {/* recent messages */}
                <div className='flex flex-col gap-1 justify-between'>
                <div className='bg-gray-400 p-3 rounded-md flex-1'>
                        <PiStudent className='text-xl mx-auto w-auto h-10 text-black'/>
                        <h2 className='font-semibold text-lg pt-3'>Total Students</h2>
                        <h3 className='text-2xl font-semibold pt-3'>{studentsAmount}</h3>
                        <h2 className='flex justify-between pt-3'>
                        <p className='text-sm text-white'>*Current</p>
                        <Link to="/manageStudents">
                        <h2 className='text-sm cursor-pointer bg-white text-red-600 p-2 rounded-md hover:bg-red-600 hover:text-white'>View</h2>
                        </Link>
                        </h2>
                    </div>
                </div>
            </div>

            <div className='block md:flex-1 p-2 bg-white shadow-lg shadow-gray-300 hover:shadow-none rounded-md'>
                {/* recent messages */}
                <div className='flex flex-col gap-1 justify-between'>
                <div className='bg-blue-600 p-3 rounded-md flex-1'>
                        <TbBuildingWarehouse className='text-xl mx-auto w-auto h-10 text-black'/>
                        <h2 className='font-semibold text-lg pt-3'>Classes</h2>
                        <h3 className='text-2xl font-semibold pt-3'>20</h3>
                        <h2 className='flex justify-between pt-3'>
                        <p className='text-sm text-white'>*Current</p>
                        <h2 className='text-sm cursor-pointer bg-white text-red-600 p-2 rounded-md hover:bg-red-600 hover:text-white'>View</h2>
                        </h2>
                    </div>
                </div>
            </div>
            <div className='block md:flex-1 p-2 bg-white shadow-lg shadow-gray-300 hover:shadow-none rounded-md'>
                {/* recent messages */}
                <div className='flex flex-col gap-1 justify-between'>
                <div className='bg-yellow-400 p-3 rounded-md'>
                        <TiMessages className='text-xl mx-auto w-auto h-10 text-black'/>
                        <h2 className='font-semibold text-lg'>Messages</h2>
                        <h3 className='text-lg font-semibold'><span>Sent </span>300</h3>
                        <h3 className='text-lg font-semibold'><span>Pending </span>300</h3>
                        <h2 className='flex justify-between'>
                        <p className='text-sm text-white'>*Current</p>
                        <h2 className='text-sm cursor-pointer bg-white text-red-600 p-2 rounded-md hover:bg-red-600 hover:text-white'>View</h2>
                        </h2>
                    </div>
                </div>
            </div>
            </div>
            <div></div>
        </div>
    </div>
  )
}
