import React from 'react'
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import landingImg from '../assets/logo.webp';

export default function Landing() {
    return (
        <div className="w-full bg-gray-50 ">
            <div className="block md:flex gap-5 w-11/12 md:w-10/12 pt-16 mx-auto">
            <div className='flex-1'>
                <img className='' src={landingImg} alt='landing image'/>
            </div>
            <div className='flex-1 leading-relaxed mt-10'>
                <h2 className='font-bold text-3xl md:text-3xl text-pink-700'>The Ultimate School Management Solution</h2>
                <div className='flex flex-col gap-2'>
                <p className='text-normal pt-3 md:pt-4'><span className='font-semibold'>Stay Connected:</span> Easily send messages to teachers, staff, and parents.
                </p>
                <h2 className='text-normal'><span className='font-semibold'>Keep Everyone Updated:</span> Share school events, announcements, and updates in real time.</h2>
                <h2 className='text-normal'><span className='font-semibold'>Simplify Management:</span> Track student data, performance, and more—all in one place.</h2>
                <h3 className='text-sm md:text-normal italic font-semibold text-pink-800'>Take your school’s organization to the next level with <span className='text-black'>School</span>Sync!</h3>
                </div>

            <Link to="/SignIn">
            <Button className="w-11/12 md:w-56 mt-14 mx-auto md:mx-0" gradientDuoTone="pinkToOrange">Get Started</Button>
            </Link>
            </div>
            </div>
        </div>
    );
}
