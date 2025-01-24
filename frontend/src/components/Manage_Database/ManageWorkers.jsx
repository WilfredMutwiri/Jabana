import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchParents } from '../../../Redux/User/parentSlice';
import { IoTrashOutline } from "react-icons/io5";
import {SERVER_URL} from '../../constants/SERVER_URL';
import { Alert, Button, Label, Spinner, TextInput,Table,Modal } from "flowbite-react";
import { addParentFailure,addParentStart,addParentSuccess } from '../../../Redux/User/parentSlice';
import Sidebar from '../Sidebar';
import { FaUsers } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";


export default function ManageWorkers() {
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
    const [openModal,setOpenModal]=useState(false)
    // handle change function
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value.trim()})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        setError(false);
        setAddSuccess(false)
        try {
            dispatch(addParentStart())
            const res=await fetch(SERVER_URL+"/api/users/addParent",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data=await res.json();
            if(data.success===false){
                setAddSuccess(false)
                dispatch(addParentFailure(data.message))
                return;
            }
            if(res.ok){
                dispatch(addParentSuccess(data))
                setIsLoading(false);
                setError(null);
                setAddSuccess(true)
            }
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            setAddSuccess(false)
            dispatch(addParentFailure(error.message))
        }
    }
    useEffect(() => {
        dispatch(fetchParents());
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
                            <h2 className="flex-1 mx-auto p-2 text-left text-lg text-pink-700">Available Workers</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Worker's Name</Table.HeadCell>
                                    <Table.HeadCell>Phone No</Table.HeadCell>
                                    <Table.HeadCell>Department</Table.HeadCell>
                                    <Table.HeadCell>Worker's Id No:</Table.HeadCell>
                                    <Table.HeadCell>Record</Table.HeadCell>
                                    <Table.HeadCell>
                                        <span className="sr-only">Edit</span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {parents && parents.map((parent) => (
                                        <Table.Row key={parent._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {parent.fullName}
                                            </Table.Cell>
                                            <Table.Cell className="text-black">
                                                {parent.phoneNo}
                                            </Table.Cell>
                                            <Table.Cell className="text-black">
                                                {parent.studentName}
                                            </Table.Cell>
                                            <Table.Cell className="text-black">
                                                {parent.studentAdmNo}
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
                            <h1 className='text-xl font-semibold text-white'>Total Workers</h1>
                            <p className='text-sm text-white font-semibold'>200</p>
                        </div>
                        <div className='bg-gray-800 p-4 rounded-md mt-4'>
                            <TiMessages className='text-center text-2xl text-white mx-auto'/>
                            <Button className='text-xs w-full mt-2' gradientDuoTone="pinkToOrange" onClick={() =>setOpenModal(true)}>Send Message</Button>
                        </div>
                        <div className='bg-gray-800 p-4 rounded-md mt-4'>
                            <h1 className='text-2xl font-semibold text-center text-white'>+</h1>
                            <Button className='text-xs w-full mt-2' gradientDuoTone="pinkToOrange" onClick={() =>setOpenModal(true)}>Add New Worker</Button>
                        </div>
                    </div>

            </div>
            {/* add new worker modal */}
            <div id='modalholder'>
            <Modal show={openModal} onClose={()=>setOpenModal(false)}>
                <Modal.Header>Add New Worker</Modal.Header>
            <Modal.Body>
            <div className="w-full">
            <div className="w-full md:w-10/12 mx-auto bg-gray-800 mt-4 p-3 rounded-md ">
            <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
                <Label value="Full Name" id="parentName" className="text-white"/>
                <TextInput 
                placeholder="Enter Full Name"
                type="text"
                required
                id='fullName'
                onChange={handleChange}
                />
                
                <Label value="Email Address" id="email" className="text-white"/>
                <TextInput 
                placeholder="Enter Email Address"
                required
                type="email"
                id='email'
                onChange={handleChange}
                />
                <Label value="phone number" id="phoneNo" className="text-white"/>
                <TextInput 
                placeholder="Enter Phone No:"
                required
                id="phoneNo"
                type="text"
                onChange={handleChange}
                />
                <Label value='Department' id='stdName' className='text-white'/>
                <TextInput
                placeholder='Department of Work'
                required
                id='studentName'
                type='text'
                onChange={handleChange}
                />
                <Label value='ID No:' id='stdAdmNo' className='text-white'/>
                <TextInput
                placeholder="Worker's Id No:"
                required
                id='studentAdmNo'
                type='text'
                onChange={handleChange}
                />
                <Button className="w-full mt-4" gradientDuoTone="pinkToOrange" outline type='submit' disabled={isloading}>
                    {
                        isloading ? 
                        <>
                        <Spinner size="sm"/>
                        <span className='ml-3 text-red-600'>Adding new Worker...</span>
                        </>: "Add Worker"
                    }
                </Button>
                {
                    error && <Alert color="failure" className='text-black'>
                        {error.message}
                    </Alert>
                }
                {
                    addSuccess &&
                    <Alert className='mt-4' color="success">
                        New Worker Added Successfully!
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
