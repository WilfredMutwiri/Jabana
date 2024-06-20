import React from 'react'
import { Button } from "flowbite-react";
import TeachersUpdate from "./DatabaseUpdate/TeachersUpdate";
import { useState,useRef } from "react";
import ParentsUpdate from "./DatabaseUpdate/ParentsUpdate";
import WorkersUpdate from "./DatabaseUpdate/WorkersUpdate";

export default function UpdatePage() {
    const [visibleSection,setVisibleSection]=useState('dashboard')
    const teachersBtnRef=useRef(null);
    const parentsBtnRef=useRef(null);
    const workersBtnRef=useRef(null)

    const teachersDivRef=useRef(null);
    const parentsDivRef=useRef(null);
    const workersDivRef=useRef(null)

    const showSection=(section)=>{
        setVisibleSection(section)
    }
    const revealTeachers=()=>{
        if(teachersBtnRef.current && teachersDivRef.current){
            teachersDivRef.current.style.display="block";
            parentsDivRef.current.style.display="none";
            workersDivRef.current.style.display="none"


        }
    }
    const revealParents=()=>{
        if(parentsBtnRef.current && parentsDivRef.current){
            parentsDivRef.current.style.display="block";
            teachersDivRef.current.style.display="none";
            workersDivRef.current.style.display="none"
        }
    }
    const revealWorkers=()=>{
    if(workersBtnRef.current && workersDivRef.current){
        workersDivRef.current.style.display="block"
        parentsDivRef.current.style.display="none";
        teachersDivRef.current.style.display="none";

    }
    }
    return (
        <div>
            <div className={visibleSection==='dashboard'?'':'hidden'}>
            <div className="w-full block md:grid grid-cols-3 gap-4 mt-4">
            {/* Teachers div */}
            <div className={`bg-gray-50 p-1 rounded-md`} ref={teachersDivRef}>
                <h2 className="p-2 text-center text-lg text-pink-700">Available Teachers</h2>
                <hr />
                <div>
                    <ul className="flex flex-col gap-2">
                        <li>John Kamau <span>+2547 00 000 000</span></li>
                        <li>Gladys Pendo <span>+2547 00 000 000</span></li>
                        <li>MaryLine Mwende <span>+2547 00 000 000</span></li>
                        <li>Elphas Muchui <span>+2547 00 000 000</span></li>
                        <li>James Kinuthia <span>+2547 00 000 000</span></li>
                        <li>Elvis Mwendwa <span>+2547 00 000 000</span></li>
                    </ul>
                    <Button className="w-full mt-3" gradientDuoTone="pinkToOrange" outline>Show More</Button>
                    <Button onClick={()=>showSection('teachers')} className="w-full mt-2" gradientDuoTone="pinkToOrange" outline>Add New Teacher</Button>
                </div>
            </div>
            {/* parents div */}
            <div className={`bg-gray-50 p-1 rounded-md hidden md:block`} ref={parentsDivRef}>
                <h2 className="p-2 text-center text-lg text-pink-700">Available Student's Parents</h2>
                <hr />
                <div>
                    <ul className="flex flex-col gap-2">
                        <li>Jane Luke <span>+2547 00 000 000</span></li>
                        <li>Opiyo Mark <span>+2547 00 000 000</span></li>
                        <li>Linet Mwende<span>+2547 00 000 000</span></li>
                        <li>Mark Kiprotich<span>+2547 00 000 000</span></li>
                        <li>Elisha Juma<span>+2547 00 000 000</span></li>
                        <li>Johnson Mwendwa<span>+2547 00 000 000</span></li>
                    </ul>
                    <Button className="w-full mt-3" gradientDuoTone="pinkToOrange" outline>Show More</Button>
                    <Button onClick={()=>showSection('parents')} className="w-full mt-2" gradientDuoTone="pinkToOrange" outline>Add New Parent</Button>
                </div>
            </div>
            {/* workers div */}
            <div className={`bg-gray-50 p-1 rounded-md hidden md:block`} ref={workersDivRef}>
                <h2 className="p-2 text-center text-lg text-pink-700">Available Workers</h2>
                <hr />
                <div>
                    <ul className="flex flex-col gap-2">
                        <li>Mery Cherotich<span>+2547 00 000 000</span></li>
                        <li>Joshua Mutithia<span>+2547 00 000 000</span></li>
                        <li>Oliver Mark<span>+2547 00 000 000</span></li>
                        <li>Jackline Mwende<span>+2547 00 000 000</span></li>
                        <li>Paul Mutisya<span>+2547 00 000 000</span></li>
                        <li>Omondi Jack<span>+2547 00 000 000</span></li>
                    </ul>
                    <Button className="w-full mt-3" gradientDuoTone="pinkToOrange" outline>Show More</Button>
                    <Button onClick={()=>showSection('workers')} className="w-full mt-2" gradientDuoTone="pinkToOrange" outline>Add New Worker</Button>
                </div>
            </div>
        </div>
        <div className="flex md:hidden gap-3 mt-5">
            <hr />
            <Button onClick={revealTeachers} ref={teachersBtnRef}>Teachers</Button>
            <Button onClick={revealParents} ref={parentsBtnRef}>Parents</Button>
            <Button onClick={revealWorkers} ref={workersBtnRef}>Workers</Button>

        </div>
        </div>
        <div className={visibleSection==='teachers'?'':'hidden'}>
                <TeachersUpdate/>
        </div>
        <div className={visibleSection==='parents'?'':'hidden'}>
                <ParentsUpdate/>
        </div>
        <div className={visibleSection==='workers'?'':'hidden'}>
                <WorkersUpdate/>
        </div>
        </div>
    );
}
