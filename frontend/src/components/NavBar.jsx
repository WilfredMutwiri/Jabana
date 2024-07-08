import React from 'react';
"use client";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signoutSuccess } from '../../Redux/User/userSlice';
import { useNavigate } from 'react-router-dom';
import {SERVER_URL} from '../constants/SERVER_URL'
export default function NavBar() {
  const dispatch=useDispatch();
  const Navigate=useNavigate()
  const {currentUser}=useSelector(state=>state.user);
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
    <Navbar fluid rounded className='w-full justify-between'>
       <Navbar.Brand>
       <div className="flex w-full justify-between">
        <span className="text-orange-500 text-2xl bg-black p-1 rounded-md">J</span>
        <h2 className="text-pink-700 text-2xl p-1">abana</h2>
        </div>
       </Navbar.Brand>
        <div className="block md:order-2 mad:flex justify-between text-lg font-semibold text-pink-700  text-center">
          <div className='flex gap-2 mt-2 ml-24 md:ml-0'>
         <div>
         {
          currentUser ? (
            <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
              alt='user'
              rounded/>
            }
            >
              <Dropdown.Header>
                <span className='text-sm block text-cyan-700'>@{currentUser.userName}</span>
                <span className='text-sm block font-medium truncate text-pink-600'>{currentUser.email}</span>
              </Dropdown.Header>
              <Link to='#'>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
              </Link>
            </Dropdown>
          ):
          (
            <Link to="/signin">
            <Button gradientDuoTone='pinkToOrange' outline>
              Login
            </Button>
            </Link>
          )
         }
         </div>
         <Navbar.Toggle/>
         </div>
          </div>
         <Navbar.Collapse>
          <Navbar.Link href="#" active> Home</Navbar.Link>
         <Navbar.Link href="#">About</Navbar.Link>
         <Navbar.Link href="#">Documentation</Navbar.Link>
         <Navbar.Link href="#">FAQ</Navbar.Link>
         <Navbar.Link href="#">Contact</Navbar.Link>
         </Navbar.Collapse>
         <hr/>
         </Navbar>
  );
}

