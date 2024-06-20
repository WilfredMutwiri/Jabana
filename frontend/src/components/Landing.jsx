import React from 'react'
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="w-full bg-gray-50 ">
            <div className="w-10/12 pt-16 mx-auto p-3">
            <h2 className="text-center font-semibold text-lg">You can now Manage your School with ease!</h2>
            <h2 className="text-center font-semibold text-sm md:text-lg ">Send messages to your team & workers convenietly</h2>
            <div>
                <img className="w-80  mx-auto" src="https://i.pinimg.com/originals/d8/d0/26/d8d026086d1857007558e3f350ee6ea4.gif"/>
            </div>
            <h3 className="text-center font-semibold text-sm">Its that simple...</h3>
            <Link to="/signIn">
            <Button className="mx-auto w-56 mt-4">Get Started</Button>
            </Link>
            </div>
        </div>
    );
}
