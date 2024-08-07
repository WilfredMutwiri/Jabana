import React, { useEffect } from 'react'
import { Alert, Button, Spinner } from "flowbite-react";
import TeachersUpdate from "./DatabaseUpdate/TeachersUpdate";
import { useState,useRef } from "react";
import ParentsUpdate from "./DatabaseUpdate/ParentsUpdate";
import WorkersUpdate from "./DatabaseUpdate/WorkersUpdate";
import { useSelector,useDispatch} from 'react-redux';
import { fetchTeachers } from '../../Redux/User/teacherSlice';
import { fetchParents } from '../../Redux/User/parentSlice';
import { fetchWorkers } from '../../Redux/User/workerSlice';

export default function UpdatePage() {
    const [visibleSection,setVisibleSection]=useState('dashboard')
    const teachersBtnRef=useRef(null);
    const parentsBtnRef=useRef(null);
    const workersBtnRef=useRef(null)

    const teachersDivRef=useRef(null);
    const parentsDivRef=useRef(null);
    const workersDivRef=useRef(null)

    const dispatch=useDispatch()
    const {teachers,loading,error}=useSelector(state=>state.teacher);
    const {parents,ploading,perror}=useSelector(state=>state.parent)
    const {workers,w_loading,w_error}=useSelector(state=>state.worker)


    useEffect(()=>{
        dispatch(fetchTeachers());
        dispatch(fetchParents());
        dispatch(fetchWorkers())
    },[dispatch])

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
            <div className="w-full block gap-4 mt-4">
            {/* Teachers div */}
            <div className={`bg-gray-50 p-1 rounded-md`} ref={teachersDivRef}>
                <h2 className="p-2 text-center text-lg text-pink-700">Available Teachers</h2>
                <h1 className='text-center p-2 italic text-sm text-cyan-800'>( Teacher Name, Teacher Email,Teacher Phone No )</h1>
                <hr />
                <div>
                    <ul className="flex flex-col gap-4 p-3">
                        {teachers && teachers.map((teacher) => (
                            <li className='block gap-4 md:flex justify-between' key={teacher._id}>
                                <h2>{teacher.fullName}</h2>
                                <h3 className='text-cyan-700'>{teacher.email}</h3>
                                <h3 className='text-black'>{teacher.phoneNo}</h3>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-gray-300 p-3 mt-4">
                        <div className="w-10/12 mx-auto mt-3">
                        <Button className='mx-auto w-full'  gradientDuoTone="pinkToOrange" outline>Show More</Button>
                        </div>
                        <div className="w-10/12 mx-auto mt-3">
                        <Button className='mx-auto w-full mt-2 mb-2' onClick={()=>showSection('teachers')} gradientDuoTone="pinkToOrange" outline>Add New Teacher</Button>
                        </div>
                        {loading && 
                        <>
                        <Spinner size="sm"/>
                        <span className='ml-3'>Loading...</span>
                        </>
                        }
                        {
                        error && <Alert className='mt-4' color="failure">{error}</Alert>
                        }
                    </div>
                </div>
            </div>
            {/* parents div */}
            <div className={`bg-gray-50 p-1 rounded-md hidden`} ref={parentsDivRef}>
                <h2 className="p-2 text-center text-lg text-pink-700">Available Student's Parents</h2>
                <h1 className='text-center p-2 italic text-sm text-cyan-800'>( Parent Name, Parent Email,Parent Phone No,Student name, Student Admission No )</h1>
                <hr />
                <div>
                <ul className="flex flex-col gap-4 p-3">
                        {parents && parents.map((parent) => (
                            <li className='block gap-4 md:flex justify-between' key={parent._id}>
                                <h2>{parent.fullName}</h2>
                                <h3 className='text-cyan-700'>{parent.email}</h3>
                                <h3 className='text-black'>{parent.phoneNo}</h3>
                                <h3 className='text-pink-700'>{parent.studentName}</h3>
                                <h3 className='text-black'>{parent.studentAdmNo}</h3>

                            </li>
                        ))}
                    </ul>
                    <div className="bg-gray-300 p-3 mt-4">
                    <Button className="w-10/12 mx-auto mt-3" gradientDuoTone="pinkToOrange" outline>Show More</Button>
                    <Button onClick={()=>showSection('parents')} className="w-10/12 mx-auto mt-2 mb-2" gradientDuoTone="pinkToOrange" outline>Add New Parent</Button>
                    </div>
                    {ploading && 
                        <>
                        <Spinner size="sm"/>
                        <span className='ml-3'>Loading...</span>
                        </>
                        }
                        {
                        perror && <Alert className='mt-4' color="failure">{error}</Alert>
                        }
                </div>
            </div>
            {/* workers div */}
            <div className={`bg-gray-50 p-1 rounded-md hidden`} ref={workersDivRef}>
                <h2 className="p-2 text-center text-lg text-pink-700">Available Workers</h2>
                <h1 className='text-center p-2 italic text-sm text-cyan-800'>( Worker's Name, Email, phone No, Department )</h1>

                <hr />
                <div>
                <ul className="flex flex-col gap-4 p-3">
                        {workers && workers.map((worker) => (
                            <li className='block gap-4 md:flex justify-between' key={worker._id}>
                                <h2>{worker.fullName}</h2>
                                <h3 className='text-cyan-700'>{worker.email}</h3>
                                <h3 className='text-black'>{worker.phoneNo}</h3>
                                <h3 className='text-pink-700'>{worker.Department}</h3>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-gray-300 p-3 mt-4">
                    <Button className="w-10/12 mx-auto mt-3" gradientDuoTone="pinkToOrange" outline>Show More</Button>
                    <Button onClick={()=>showSection('workers')} className="w-10/12 mx-auto mt-2 mb-2" gradientDuoTone="pinkToOrange" outline>Add New Worker</Button>
                    {w_loading && 
                        <>
                        <Spinner size="sm"/>
                        <span className='ml-3'>Loading...</span>
                        </>
                        }
                        {
                        perror && <Alert className='mt-4' color="failure">{w_error}</Alert>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="flex gap-3 mt-5">
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
