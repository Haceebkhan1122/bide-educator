import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Divider, FormControl, InputLabel, MenuItem } from '@mui/material';
import { Select } from 'antd';
import { Table } from 'react-bootstrap';
import './assignDoctorModal.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import API from '../../../utils/httpService';
import { ConsoleIcon } from 'evergreen-ui';

const AssignDoctorModal = ({assignDocQueueId, setShowAssignDoctor, assignDocPatientId, setSuccessState, doctorId, setDoctorId, waitingLength, setAssignDocToWaitingList, availableDoctors, showAssignDoctor, handleCloseAssignDoctor }) => {
    const headers = ["", "Doctor Name", "Patient Count", "Site", ""]
    const [assignDoctor, setAssignDoctor] = useState('')
    const [patient_id, Setpatient_id] = useState('');
    const location = useLocation();
    const navigate = useNavigate()
    const [isReturningPatient, setIsReturningPatient] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [isAssignBtnClicked, setIsAssignBtnClicked] = useState(false);

    const [doctorIdError, setDoctorIdError] = useState('');
    const [failedError, setFailedError] = useState('');

    useEffect(() => {
        const patientId = Cookies.get('selectedPatientId')
        const isReturningPatient = Cookies.get('isReturningPatient')
        setSelectedPatientId(patientId)
        setIsReturningPatient(isReturningPatient)
    }, [])

    useEffect(() => {
        const patientId = Cookies.get('patient_id')
        Setpatient_id(patientId)
    }, [assignDoctor])

    const keepWaiting = () => {
        setShowAssignDoctor(false)
    }

    const handleWaitingList = async () => {
        try {
            const response = await API.post(`/appointment/add-waiting-list?patient_id=${isReturningPatient ? selectedPatientId : patient_id}&type=${Cookies.get('consultationType')}`)
            setSuccessState(response);
            handleCloseAssignDoctor();
            Cookies.set('dashboardToast', JSON.stringify(response))
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            console.log(error)
        }
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if needed

    const formattedDate = `${year}-${month}-${day}`;

    const handleAssignDoctor = async () => { 
            try {
                let error = 'The Doctor ID field is required.'
                if(!doctorId){
                    setDoctorIdError(error)
                }else {
                    if(assignDocQueueId){
                        const response = await API.post(`/appointment/create-appointment?doctor_id=${doctorId}&patient_id=${assignDocPatientId ? assignDocPatientId : isReturningPatient ? selectedPatientId : patient_id}&appt_date=${formattedDate}&waiting_queue_id=${assignDocQueueId}`)
                        if(response?.status == 200){
                            setIsAssignBtnClicked(true)
                            // setSuccessState(response);
                            handleCloseAssignDoctor();
                            Cookies.set('dashboardToast', JSON.stringify(response))
                            setTimeout(() => {
                                navigate('/dashboard');
                            }, 1500);
                        }else {
                            setFailedError(response)
                            // setTimeout(() => {
                            //     navigate('/dashboard');
                            // }, 3000);
                        }
                    }else {
                        const response = await API.post(`/appointment/create-appointment?doctor_id=${doctorId}&patient_id=${assignDocPatientId ? assignDocPatientId : isReturningPatient ? selectedPatientId : patient_id}&appt_date=${formattedDate}&type=${Cookies.get('consultationType')}`)
                        if(response?.status == 200){
                            setIsAssignBtnClicked(true)
                            // setSuccessState(response);
                            handleCloseAssignDoctor();
                            Cookies.set('dashboardToast', JSON.stringify(response))
                            setTimeout(() => {
                                navigate('/dashboard');
                            }, 1500);
                        }else {
                            setFailedError(response)
                            // setTimeout(() => {
                            //     navigate('/dashboard');
                            // }, 3000);
                        }
                    }
                    
                }
                
             } catch (error) {
                 console.log(error)
        }
    }

    const handleChange = (item) => {
        setAssignDoctor(item?.doctor_name)
        setDoctorId(item?.doctor_id)
    }

    useEffect(() => {
        if(!showAssignDoctor){
            setDoctorIdError('')
        }
    }, [showAssignDoctor])
    
    return (
        <Modal className='assignDoctorModal ps-0' show={showAssignDoctor} onHide={handleCloseAssignDoctor} centered >
            {availableDoctors?.length > 0 && (
                <Modal.Body className='assignDoctorModalBody withData '>
                <div className="withResults   ">
                {failedError?.error && (
                    <div className="toasting-notification">
                        <span> {failedError?.error} </span>
                    </div>
                )}

                    <div className='wraperInfo ps-4'>
                    <h2 className='mb-3 d-flex align-items-start justify-content-between'> Assign Doctor  <span className='cross_icon_modal' onClick={handleCloseAssignDoctor}>  </span> </h2>
                    <div className='fixHeight'>
                            <Table className='table-data-assign'>
                                <thead>
                                    <tr>
                                        {headers.map((item, i) => (
                                            <th key={i}>{item}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {availableDoctors?.length > 0 && availableDoctors?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="noDividerTd checks_radio_custom check__radio_border pe0">
                                                <input disabled={item?.limit_exced == true ? true : false} type="radio" name="assignDoctor" value={assignDoctor} onChange={() => handleChange(item)}/>
                                                <label htmlFor="assignDoctor"></label>
                                            </td>
                                            <td className='ps0'>Dr. {item?.doctor_name}</td>
                                            <td className='assigneDoctorCount'>
                                                    <span style={{ color: '#19B3B5' }}>
                                                        {/* {item.count.split('/')} */}
                                                        {item.count.split('/')[0]}
                                                    </span>
                                                    <span>/</span>
                                                         <span>{item.count.split('/')[1]}</span> 
                                                    {/* {item.count.slice(item.count.indexOf(' '))} */}
                                                </td>
                                            <td className="noDividerTd">
                                                {item?.site}
                                            </td>
                                            <td className="noDividerTd pe0">
                                                <button className={item?.current_status === "INCALL" ? "incallBtn" : "onlineBtn"} style={{cursor:"default"}}>{item?.current_status}</button>
                                            </td>
                                        </tr>
                                    ))}      
                                </tbody>
                            </Table>
                            {doctorIdError &&
                                        <span className='ErrorState'>{doctorIdError}</span>
                                    }
                    </div>
                    <button className={availableDoctors?.length <= 0 ? 'assignBtnDisabled' : 'assignBtn'}  
                    onClick={handleAssignDoctor} disabled={availableDoctors?.length <= 0 || isAssignBtnClicked}> ASSIGN </button>

                    </div>
                </div>
                </Modal.Body>
            )}
            {!availableDoctors?.length > 0 && (
                <Modal.Body centered className='assignDoctorModalBody withNodata'>

                    <div className='noDravailable wraperInfo'>
                        <span className='cross_icon_modal' onClick={handleCloseAssignDoctor}>  </span>
                        <h2 >No Doctor Available right now</h2>
                        {waitingLength ? (
                            <button className='assignBtn' onClick={keepWaiting}>KEEP WAITING</button>
                        ): (
                        <button className='assignBtn' onClick={handleWaitingList}> ADD IN WAITING LIST </button>
                        )}
                    </div>
                </Modal.Body>
            )}
        </Modal>
    )
}

export default AssignDoctorModal;
