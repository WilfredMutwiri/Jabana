import React from 'react'
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import landingImg from '../images/landing.webp'

export default function Landing() {
    return (
        <div className="w-full bg-gray-50 ">
            <div className="block md:flex gap-5 w-11/12 md:w-10/12 pt-16 mx-auto">
            <div className='flex-1'>
                <img className='' src={landingImg} alt='landing image'/>
            </div>
            <div className='flex-1 leading-relaxed mt-10'>
                <h2 className='font-bold text-3xl md:text-3xl text-pink-700'>The Ultimate Communication Manager</h2>
                <p className='text-normal md:text-lg pt-3 md:pt-4'>Manage School communication with ease!</p>
                <h2 className='text-normal md:text-lg'>Send messages to your team and other workers conviently.</h2>
                <h3 className='text-sm md:text-normal italic'>You can also contact parents and keep them updated on school events and announcements.</h3>
            <Link to="/SignIn">
            <Button className="w-11/12 md:w-56 mt-14 mx-auto md:mx-0" gradientDuoTone="pinkToOrange">Get Started</Button>
            </Link>
            </div>
            {/* <h2 className="text-center font-semibold text-lg">You can now Manage your School with ease!</h2>
            <h2 className="text-center font-semibold text-sm md:text-lg ">Send messages to your team & workers convenietly</h2>
            <div>
                <img className="w-80  mx-auto" src="https://i.pinimg.com/originals/d8/d0/26/d8d026086d1857007558e3f350ee6ea4.gif"/>
            </div>
            <h3 className="text-center font-semibold text-sm">It's that simple...</h3> */}
            {/* <Link to="/SignIn">
            <Button className="mx-auto w-56 mt-4">Get Started</Button>
            </Link> */}
            </div>
        </div>
    );
}
