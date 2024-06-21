import React from 'react';
"use client";
import { Button, Navbar } from "flowbite-react";
import { useSelector,useDispatch } from 'react-redux';
import logoImg from '../images/c42342e7743a6b9de0a54a599a591043.jpg'

export default function NavBar() {
  const dispatch=useDispatch();
  const {currentUser}=useSelector(state=>state.user)
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
      <div className="flex p-3">
        <span className="text-orange-500 text-2xl bg-black p-1 rounded-md">J</span>
        <h2 className="text-pink-700 text-2xl p-1">abana</h2>
        </div>
      </Navbar.Brand>
      <div className="block md:order-2  text-lg font-semibold text-pink-700  text-center">
        <div className='flex'>
        <div>
        {
        currentUser ? <img className='w-11 mr-2 rounded-full' src={logoImg}/> : ""
      }
        </div>
        <div>
        {
          currentUser ? currentUser.userName :
          <Button gradientDuoTone="pinkToOrange">Login</Button>
        }
        </div>
        </div>
      </div>
      <hr/>
    </Navbar>
  );
}
