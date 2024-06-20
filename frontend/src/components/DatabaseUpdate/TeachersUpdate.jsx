import React from 'react'
import { Button, Label, TextInput } from "flowbite-react";

export default function TeachersUpdate() {
    const handleReload=()=>{
        window.location.reload()
    }
    return (
        <div className="w-full">
            <Button onClick={handleReload} outline>Back</Button>
            <div className="w-full md:w-5/12 m-auto bg-cyan-700 mt-4 p-3 rounded-md">
            <form className="flex flex-col gap-2">
                <Label value="Full Name" id="teacherName" className="text-white"/>
                <TextInput placeholder="full name" type="text"/>
                <Label value="email" id="teacherEmail" className="text-white"/>
                <TextInput placeholder="teacher@gmail.com" type="email"/>
                <Label value="phone number" id="teacherPhone" className="text-white"/>
                <TextInput placeholder="+254700000000" type="text"/>
                <Button className="w-full mt-4" gradientDuoTone="pinkToOrange" outline>Add Teacher</Button>
            </form>
            </div>
        </div>
    );
}
