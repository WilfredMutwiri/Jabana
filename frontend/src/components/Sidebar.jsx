import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useRef, useState } from "react";
import profilePic from '../images/userprofile.jpg'
import { Button, ButtonGroup } from "flowbite-react";
import { FaDatabase } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GiLovers } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const Navigate=useNavigate()
    const {currentUser}=useSelector(state=>state.user)
    const [menuVisible,setMenuVisible]=useState(true)
    const handleRevealMenu=()=>{
        setMenuVisible(!menuVisible)
    }
    const handleCloseMenu=()=>{
        setMenuVisible(!menuVisible)
    }
        const handleSignout=async()=>{
            try {
              const res=await fetch(SERVER_URL+'/api/auth/signout',{
                method:"POST"
              })
              const data=await res.json();
              if(!res.ok){
                console.log(data.message);
              }else{
                dispatch(signoutSuccess());
              }
              Navigate('/Landing')
            }
            catch (error) {
              console.log(error.message);
            }
          }
    return (
        <div>
            <div className={`flex flex-col justify-between mt-4 bg-gray-900 rounded-md shadow-sm shadow-pink-500 w-auto mb-5 md:mb-0 ${menuVisible ? 'block':'hidden'} h-auto`}>
                 <div className='p-4'>
                    <div className=''>
                        <img className='w-20 h-20 rounded-full mx-auto' src={profilePic} alt="profilePic"/>
                    </div>
                    <h2 className='text-center text-white text-lg p-3'>Admin <span className='text-pink-600'>@ {
                    currentUser ? currentUser.userName:'Mark'}</span></h2>
                    <Button className='w-full mt-2' gradientDuoTone="pinkToOrange">Profile</Button>
                    </div>
                    
                    <div className='p-4 border-t-4 bg-gray-800'>
                    <ul className='flex flex-col gap-5 text-center'>
                        <Link to="/admin">
                        <li className='p-2 hover:bg-gray-100 rounded-md text-orange-500 hover:text-pink-500 cursor-pointer flex gap-3'><span><FaDatabase className="text-xl"/></span>Dashboard</li>
                        </Link>

                        <Link to="/ManageTeachers">
                        <li className='p-2 hover:bg-gray-100 rounded-md text-orange-500 hover:text-pink-500 cursor-pointer flex gap-3'><span><FaUsers className="text-xl"/></span>Manage Teachers</li>
                        </Link>

                        <Link to="/manageWorkers">
                        <li className='p-2 hover:bg-gray-100 rounded-md text-orange-500 hover:text-pink-500 cursor-pointer flex gap-3'><span><FaUsers className="text-xl"/></span>Manage Workers</li>
                        </Link>

                        <Link to="/manageParents">
                        <li className='p-2 hover:bg-gray-100 rounded-md text-orange-500 hover:text-pink-500 cursor-pointer flex gap-3'><span><FaUsers className="text-xl"/></span>Manage Parents</li>
                        </Link>

                        <Link to="/manageStudents">
                        <li className='p-2 hover:bg-gray-100 rounded-md text-orange-500 hover:text-pink-500 cursor-pointer flex gap-3'><span><FaUsers className="text-xl"/></span>Manage Students</li>
                        </Link>

                    </ul>
                        <Button className="w-full mt-4" gradientDuoTone="pinkToOrange" outline onClick={handleSignout}>Exit</Button>
                </div>
                        <IoMdClose className="text-center mt-4 mx-auto block md:hidden" onClick={handleCloseMenu}/>
            </div>
        </div>
    )
}

export default Sidebar;