import React from 'react';
"use client";
import { Button, Navbar } from "flowbite-react";
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";

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
        <div className='flex gap-2'>
        <div>
        {
        currentUser ? <FaRegCircleUser className='text-2xl text-cyan-800'/> : ""
      }
        </div>
        <div>
        {
          currentUser ? currentUser.userName :
          <Link to="SignIn">
          <Button gradientDuoTone="pinkToOrange">Login</Button>
          </Link>
        }
        </div>
        </div>
      </div>
      <hr/>
    </Navbar>
  );
}
