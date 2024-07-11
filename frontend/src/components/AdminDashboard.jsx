import React from 'react'
import { IoMdClose } from "react-icons/io";
import { GrUserWorker } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import profilePic from '../images/userprofile.jpg'
import { FaDatabase } from "react-icons/fa6";
import { GiLovers } from "react-icons/gi";
import { useSelector,useDispatch } from 'react-redux';
import { FaCaretDown } from "react-icons/fa";

import { useRef, useState } from "react";

import TeachersSquare from "./Database/TeachersSquare";
import ParentsSquare from "./Database/ParentsSquare";
import WorkersSquare from "./Database/WorkersSquare";
import UpdatePage from "./UpdatePage";
import { Button } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import {SERVER_URL} from '../constants/SERVER_URL'
import { signoutSuccess } from '../../Redux/User/userSlice';
export default function AdminDashboard() {
    const Navigate=useNavigate()
    const dispatch=useDispatch();
    const {currentUser}=useSelector(state=>state.user)
    const [visibleSection,setVisibleSection]=useState('updatePage')
    const [menuVisible,setMenuVisible]=useState(true)
    const handleRevealMenu=()=>{
        setMenuVisible(!menuVisible)
    }
    const handleCloseMenu=()=>{
        setMenuVisible(!menuVisible)
    }
    const showSection=(section)=>{
        setVisibleSection(section)
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
            <hr />
            <div className=" w-full overflow-hidden ">
            <div className="flex justify-between">
            <div className="flex md:hidden w-full">
                <FaCaretDown className="text-3xl text-black block md:hidden ml-2 mt-4" onClick={handleRevealMenu}/>
            </div>
            </div>
            </div>
            <section>
                <div className="block md:flex w-11/12 m-auto mt-10 gap-5 md:gap-10">
                    {/* left section */}
                <div className={`-mt-7  bg-gray-200 rounded-md p-4 shadow-sm shadow-pink-5x00 w-auto mb-5 md:mb-0 ${menuVisible ? 'block':'hidden'}`}>
                    <div>
                        <img className='h-36 w-auto rounded-full mx-auto' src={profilePic} alt="profilePic"/>
                    </div>
                    <h2 className='text-center p-3'>Admin <span className='text-pink-500'>@ {
                    currentUser ? currentUser.userName:'Mark'}</span></h2>
                    <div className='pt-4'>
                        <ul className='flex flex-col gap-5 text-center'>
                            <li onClick={()=>showSection('updatePage')} className='p-2 hover:bg-gray-100 rounded-md text-orange-500 hover:text-pink-500 cursor-pointer flex gap-3'><span><FaDatabase className="text-xl"/></span>School Database</li>

                            <li onClick={()=>showSection('teachers')} className='p-2 hover:bg-gray-100 rounded-md text-orange-500 hover:text-pink-500 cursor-pointer flex gap-3'><span><FaUsers className="text-xl"/></span>Teachers Square</li>

                            <li onClick={()=>showSection('parents')} className='p-2 hover:bg-gray-100 rounded-md text-orange-500 hover:text-pink-500 cursor-pointer flex gap-3'><span><GiLovers className="text-xl"/></span>Parents Square</li>

                            <li onClick={()=>showSection('workers')} className='p-2 hover:bg-gray-100 rounded-md text-orange-500 hover:text-pink-500 cursor-pointer flex gap-3'><span><GrUserWorker className="text-xl"/></span>Workers Square</li>
                        </ul>
                        <Button className="w-full mt-4" outline onClick={handleSignout}>Exit</Button>
                    </div>
                    <IoMdClose className="text-center mt-4 mx-auto block md:hidden" onClick={handleCloseMenu}/>
                </div>
                {/* right section */}
                <div className="bg-gray-200 rounded-md shadow-sm shadow-pink-500 p-3 flex-1">
                    <h2 className="text-xl text-center font-semibold text-pink-500">Mbitini Girls High School</h2>
                    <hr/>
                                            {/* teachers div */}
                    <div className={visibleSection==='teachers'?'':'hidden'}>
                        <TeachersSquare className=""/>
                    </div>
                    {/* parents div */}
                    <div className={visibleSection==='parents'?'':'hidden'}>
                    <ParentsSquare className=""/>
                    </div>
                    {/* workers square */}
                    <div className={visibleSection==='workers'?'':'hidden'}>
                    <WorkersSquare className=""/>
                    </div>
                    <div className={visibleSection==='updatePage'?'':'hidden'}>
                        <UpdatePage/>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
}

