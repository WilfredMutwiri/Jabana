import React, { useEffect, useState } from 'react';
import { Alert, Button, Label, Modal, Spinner,Table,TextInput } from "flowbite-react";
import ParentsUpdate from "../DatabaseUpdate/ParentsUpdate";
import WorkersUpdate from "../DatabaseUpdate/WorkersUpdate";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeachers } from '../../../Redux/User/teacherSlice';
import { IoTrashOutline } from "react-icons/io5";
import {SERVER_URL} from '../../constants/SERVER_URL';
import { addTeacherStart,addTeacherSuccess,addTeacherFailure } from '../../../Redux/User/teacherSlice';
import Sidebar from '../Sidebar';
import { TiMessages } from 'react-icons/ti';
import { FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function ManageTeachers() {
    const [formData,setFormData]=useState({});
    const [isloading,setIsLoading]=useState(false);
    const [isError,setError]=useState(null);
    const [addSuccess,setAddSuccess]=useState(false);
    const dispatch=useDispatch();
    const [visibleSection, setVisibleSection] = useState('dashboard');
    const { teachers, loading, error } = useSelector(state => state.teacher);
    const { parents, ploading, perror } = useSelector(state => state.parent);
    const { workers, w_loading, w_error } = useSelector(state => state.worker);
    
    // modal
    const [openModal,setOpenModal]=useState(false);
    // teachers count
    const [teachersCount,setTeachersCount]=useState(0);
    // handle change function
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value.trim()})
    }
    // handle submit function
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setAddSuccess(false);
        try {
            dispatch(addTeacherStart())
            const res=await fetch(SERVER_URL+'/api/users/addTeacher',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            const data=await res.json();
            if(data.success===false){
                dispatch(addTeacherFailure(data.message))
                return;
            }
            if(res.ok){
                dispatch(addTeacherSuccess(data))
                setIsLoading(false);
                setError(false);
                setAddSuccess(true);
            }
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            setAddSuccess(false);
            dispatch(addTeacherFailure(error.message))
        }
    }

    // get number of teachers
    const getTeachersCount=async()=>{
        const response=await fetch(`${SERVER_URL}/api/users/teachersCount`);
        const data=await response.json();

        if(response.ok){
            setTeachersCount(data.teachersCount);
        }else{
            throw new data.error || "Error fetching teachers";
        }
    }
    // useeffect
    useEffect(() => {
        dispatch(fetchTeachers());
        getTeachersCount();
    }, [dispatch]);

    

    return (
        <div>
            <div className='flex justify-between gap-4 w-[95%]  mx-auto'>
                <div className=''>
                    <Sidebar/>
                </div>
                <div className="flex-1 gap-4 mt-4">
                    {/* Teachers div */}
                    <div className={`bg-gray-200 p-1 rounded-md`}>
                        <div className='flex justify-between bg-gray-300 rounded-md p-2'>
                            <h2 className="flex-1 mx-auto p-2 text-left text-lg text-pink-700">Available Teachers</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Teacher's Name</Table.HeadCell>
                                    <Table.HeadCell>Teacher's Email</Table.HeadCell>
                                    <Table.HeadCell>Teacher's Phone No</Table.HeadCell>
                                    <Table.HeadCell>Record</Table.HeadCell>
                                    <Table.HeadCell>
                                        <span className="sr-only">Edit</span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {teachers && teachers.map((teacher) => (
                                        <Table.Row key={teacher._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {teacher.fullName}
                                            </Table.Cell>
                                            <Table.Cell className="text-cyan-700">
                                                {teacher.email}
                                            </Table.Cell>
                                            <Table.Cell className="text-black">
                                                {teacher.phoneNo}
                                            </Table.Cell>
                                            <Table.Cell className="text-black">
                                            <a href="#" className="font-medium text-red-600 hover:underline dark:text-cyan-500">View</a>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <a href="#" className="font-medium text-red-600 hover:underline dark:text-cyan-500">
                                                    <IoTrashOutline/>
                                                </a>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                        <div className="bg-white p-3">
                            <hr />
                            <Label className='text-red-600' gradientDuoTone="pinkToOrange" outline>Show More </Label>
                            <div className="w-10/12 mx-auto mt-3">
                            </div>
                            {loading &&
                                <>
                                    <Spinner size="sm" />
                                    <span className='ml-3'>Loading...</span>
                                </>
                            }
                            {
                                error && <Alert className='mt-4' color="failure">{error}</Alert>
                            }
                        </div>
                    </div>
                </div>
                {/* options div */}
                <div className='bg-gray-100 p-4 rounded-md shadow-sm shadow-gray-400'>
                    <div className='bg-gray-800 p-4 rounded-md'>
                        <FaUsers className='text-center text-2xl text-white mx-auto'/>
                        <h1 className='text-xl font-semibold text-white'>Total Teachers</h1>
                        <p className='text-sm text-white font-semibold'>{teachersCount}</p>
                        </div>
                    <div className='bg-gray-800 p-4 rounded-md mt-4'>
                        <TiMessages className='text-center text-2xl text-white mx-auto'/>
                        <Link to="/teachersSquare">
                        <Button className='text-xs w-full mt-2' gradientDuoTone="pinkToOrange">Send Message</Button>
                        </Link>
                        </div>
                    <div className='bg-gray-800 p-4 rounded-md mt-4'>
                        <h1 className='text-2xl font-semibold text-center text-white'>+</h1>
                        <Button className='text-xs w-full mt-2' gradientDuoTone="pinkToOrange" onClick={() =>setOpenModal(true)}>Add New Teacher</Button>
                    </div>
                </div>
            </div>

            <div>
            <Modal show={openModal} onClose={()=>setOpenModal(false)}>
                <Modal.Header>Add New Teacher</Modal.Header>
            <Modal.Body>
            <div className="w-full">
            <div className="w-full md:w-10/12 mx-auto bg-gray-800 mt-4 p-3 rounded-md ">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <Label value="Full Name" id="teacherName" className="text-white"/>
                <TextInput 
                placeholder="Enter Full Name"
                type="text"
                onChange={handleChange}
                id='fullName'
                required
                />

                <Label value="email" id="teacherEmail" className="text-white"/>
                <TextInput 
                placeholder="Enter Email Address"
                type="email"
                onChange={handleChange}
                id='email'
                required
                />

                <Label value="phone number" id="teacherPhone" className="text-white"/>
                <TextInput 
                placeholder="Enter Phone No:"
                type="text"
                onChange={handleChange}
                id='phoneNo'
                required
                />
                <Button className="w-full mt-4" type='submit' disabled={isloading} gradientDuoTone="pinkToOrange" outline>
                    {
                        isloading ?
                        <>
                        <Spinner size="sm"/>
                        <span className='ml-3 text-red-600'>Adding New Teacher...</span>
                        </> : 'Add new Teacher'
                    }
                </Button>
                {
                    isError && 
                    <Alert color="failure">
                        {isError.message}
                    </Alert>
                }
                {
                    addSuccess && 
                    <Alert color="success">
                        New Teacher Added Successfuly!
                    </Alert>
                }
            </form>
            </div>
        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button gradientDuoTone="pinkToOrange" onClick={()=>setOpenModal(false)}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
