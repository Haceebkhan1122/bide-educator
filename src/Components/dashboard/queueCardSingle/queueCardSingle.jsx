import React, { useState } from 'react'
import './queueCardSingle.scss';
import Divider from '@mui/material/Divider';
import { Dropdown, Tab, Tabs } from 'react-bootstrap';
import SwitchDoctorModal from '../../dashboardModals/switchDoctorModal/switchDoctorModal';
import AssignDoctorModal from '../../dashboardModals/assignDoctorModal/AssignDoctorModal';
import { useNavigate } from 'react-router-dom';
import PatientDetailsModal from '../../dashboardModals/patientDetailsModal/PatientDetailsModal';
import API from '../../../utils/httpService';
import Cookies from 'js-cookie';

const QueueCardSingle = ({ waitingLength, setShowPatientDetail, handlePatientDetailClose, callingDashboardList, availableDoctors, dashboardData, heading, identity }) => {
    const [showSwitchDoctor, setShowSwitchDoctor] = useState(false);
    const [doctor, setDoctor] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedSwitch, setSelectedSwitch] = useState('');
    const [assignDocToWaitingList, setAssignDocToWaitingList] = useState('')
    const [switchDoctorToast, setSwitchDoctorToast] = useState(false)
    const [doctorId, setDoctorId] = useState('')
    const [assignDocPatientId, setAssignDoctorPatientId] = useState('')
    const [assignDocQueueId, setAssignDoctorQueueId] = useState('')
    const [successState, setSuccessState] = useState('')
    const [key, setKey] = useState("all");
    const handleCloseSwitchDoctor = () => setShowSwitchDoctor(false);
    const handleShowSwitchDoctor = (doctorName) => {
        setSelectedDoctor(doctorName)
        setShowSwitchDoctor(true)

    };

    // assignmodal
    const [showAssignDoctor, setShowAssignDoctor] = useState(false);
    const handleCloseAssignDoctor = () => setShowAssignDoctor(false);


    const handleShowAssignDoctor = (patientDetails) => {
        setAssignDoctorQueueId(patientDetails?.queue_id)
        setAssignDoctorPatientId(patientDetails?.patient_id)
        setShowAssignDoctor(true)
    };

    const handlePatientDetailShow = () => setShowPatientDetail(true);

    const navigate = useNavigate();


    const handleDeleteAppoint = async (item) => {
        try {
            const response = await API.delete(`/appointment/delete-appointment/${item?.queue_id}`)
            if (response?.status === 200) {
                callingDashboardList()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleStartAssisment = async (queue_id) => {
        try {
            const data = {
                "queue_id": queue_id
            }
            const response = await API.post('/consultation/start-assessment', data)
            if (response?.status === 200) {
                Cookies.set('start_assessment_Patient_Id', response?.data?.patient_id)
                Cookies.set('start_assessment_Appointment_Id', response?.data?.appointment_id)
                navigate("/patient/diabetes-educator")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateDoctor = async (doctorId) => {
        const data = {
            queue_id: selectedDoctor?.queue_id,
            doctor_id: doctor,
        }
        try {
            const response = await API.post('/doctor/switch-doctor', data)
            if (response?.status === 200) {
                setSwitchDoctorToast(true)
                setSelectedSwitch(response?.data)
                callingDashboardList();
                setShowSwitchDoctor(false)
                setTimeout(() => {
                    setSwitchDoctorToast(false)
                }, 1500);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='queueCardSingle c'>
                <div className='boxScrollNew'>
                    <div className="custom-track">

                    </div>
                    <div className='headingWrapper'>
                        <h3 className='queueHeading'> {heading} </h3>

                    </div>
                    {
                        identity === "doctor" && (

                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="tabs_doctor_queue"
                            >
                                <Tab eventKey="all" title={"All"} className='doctor-scroll'>
                                    <AlldoctorQueueList identity={identity} dashboardData={dashboardData} handleDeleteAppoint={handleDeleteAppoint} handleShowSwitchDoctor={handleShowSwitchDoctor} />
                                </Tab>
                                <Tab eventKey="inPerson" title={"In Person"} className='doctor-scroll'>
                                    <InPersonDoctorQueueList identity={identity} dashboardData={dashboardData} handleDeleteAppoint={handleDeleteAppoint} handleShowSwitchDoctor={handleShowSwitchDoctor} />
                                </Tab>
                                <Tab eventKey="video" title={"Video"} className='doctor-scroll'>
                                    <VideoDoctorQueueList identity={identity} dashboardData={dashboardData} handleDeleteAppoint={handleDeleteAppoint} handleShowSwitchDoctor={handleShowSwitchDoctor} />
                                </Tab>
                            </Tabs>

                        )
                    }

                    <div className={identity === "educator" || identity === "waiting" ? "wrapeAllInfo educatorfixes" : "wrapeAllInfo"}>
                        {
                            (switchDoctorToast) &&
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="toasting-notification2">
                                    <span> {selectedSwitch} </span>
                                </div>
                            </div>
                        }
                        <div className="info">

                            <ul className='dashboardList list-unstyled'>
                                {
                                    identity === "waiting" && dashboardData?.waiting_list?.length > 0 &&
                                    dashboardData?.waiting_list?.map((item, index) => {
                                        return (
                                            <li>
                                                <div className="left">
                                                    <div className="moreDetails">
                                                        <div key={index} className="first__info">
                                                            <div className="firsting">
                                                                <div className='d-flex w-100 justify-content-between align-items-baseline'>
                                                                    <p className='zero_one'> #{item?.queue_id} | MS{item?.mr_no}</p>
                                                                    <span className='bolding'>  {item?.date} | {item?.time} </span>
                                                                </div>
                                                                    <p className='name'> <span> {item?.patient_name} </span>  </p>
                                                                <span className='single_name'>{item?.patient_no} </span>
                                                                <div className='d-flex w-100 mt-1/5 justify-content-between align-items-baseline'>
                                                                    <span className='EducatorHead'><span>Educator: </span> <span className='EducatorName'>{item?.educator}</span>  </span>
                                                                    <div className='assignBtn' onClick={() => handleShowAssignDoctor(item)}> ASSIGN  </div>
                                                                </div>
                                                                {assignDocToWaitingList && <span className='single_name'> {assignDocToWaitingList} </span>}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                                {
                                    identity === "educator" && dashboardData?.educator_queues?.length > 0 &&
                                    dashboardData?.educator_queues?.map((item, index) => {
                                        return (
                                            <li>
                                                <div className="left">
                                                    <div className="moreDetails">
                                                        <div key={index} className="first__info">
                                                            <div className="firsting">
                                                                <div className='d-flex w-100 justify-content-between align-items-baseline'>
                                                                    <p className='zero_one'> #{item?.token_no} | MS{item?.mr_no}</p>
                                                                    <span className='bolding'>  {item?.appointment_date} | {item?.appointment_time} </span>
                                                                </div>
                                                                <p className='name'> <span> {item?.patient_name} </span>  </p>
                                                                <span className='single_name'>{item?.patient_no} </span>
                                                                <div className='d-flex w-100 mt-1/5 justify-content-between align-items-baseline'>
                                                                    <span className='EducatorHead'><span>Educator: </span> <span className='EducatorName'>{item?.educator_name}</span>  </span>
                                                                    <button className={index == 0 ? "assignBtn educAssign" : 'disableBtn'} disabled={index == 0 ? false : true} onClick={() => handleStartAssisment(item?.queue_id)}>Start</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })
                                }


                            </ul>

                        </div>
                    </div>
                </div>
            </div>
            <SwitchDoctorModal handleUpdateDoctor={handleUpdateDoctor} selectedDoctor={selectedDoctor} doctor={doctor} setDoctor={setDoctor} availableDoctors={availableDoctors} showSwitchDoctor={showSwitchDoctor} handleCloseSwitchDoctor={handleCloseSwitchDoctor} />
            <AssignDoctorModal assignDocQueueId={assignDocQueueId} waitingLength={waitingLength} setSuccessState={setSuccessState} setShowAssignDoctor={setShowAssignDoctor} assignDocPatientId={assignDocPatientId} doctorId={doctorId} setDoctorId={setDoctorId} assignDocToWaitingList={assignDocToWaitingList} setAssignDocToWaitingList={setAssignDocToWaitingList} availableDoctors={availableDoctors} showAssignDoctor={showAssignDoctor} handleCloseAssignDoctor={handleCloseAssignDoctor} />
            {/* <PatientDetailsModal selectedPatientIndex={selectedPatientIndex} setSelectedPatientIndex={setSelectedPatientIndex} handleSelectSinglePatient={handleSelectSinglePatient} dashboardData={dashboardData} showPatientDetail={showPatientDetail} handlePatientDetailClose={handlePatientDetailClose} /> */}
        </>
    )
}

export default QueueCardSingle;

const AlldoctorQueueList = ({ identity, dashboardData, handleShowSwitchDoctor, handleDeleteAppoint }) => {
    return (
        identity === "doctor" && dashboardData?.doctor_queues?.length > 0 &&
        dashboardData?.doctor_queues?.map((item, index) => {
            return (
                <div className="wrapeAllInfo">
                    <div className="info">
                        <ul className='dashboardList list-unstyled'>
                            <li>
                                <div className="left">
                                    <div className="moreDetails">
                                        <div key={index} className="first__info">
                                            <div className="firsting">
                                                <div className='d-flex w-100 justify-content-between align-items-baseline'>
                                                    <p className='zero_one'> #{item?.token_no} | MS{item?.mr_no}</p>
                                                    <span className='bolding'>  {item?.appointment_date} | {item?.appointment_time} </span>
                                                </div>
                                                <div className='typeWrapper'>
                                                    <p className='name'> <span> {item?.patient_name} </span> </p>
                                                    <div className={item?.type == 'Video' ? 'typeConsultationVideo' : 'typeConsultationInPerson'}>
                                                        {item?.type?.toUpperCase()}
                                                    </div>
                                                </div>
                                                <span className='single_name'>{item?.patient_no} </span>
                                                <div className='d-flex w-100 mt-1/5 justify-content-between align-items-baseline'>
                                                    <span className='EducatorHead'><span>Doctor: </span> <span className='EducatorName'>{item?.doctor_name}</span>  </span>
                                                    <Dropdown className='dropdown_dashboard'>
                                                        <Dropdown.Toggle as='div' id="dropdown-button-dark-example1">
                                                            <div className="doctorBtn" >
                                                                <span className='bars_arrow'>  </span>
                                                            </div>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className='drop__menu'>
                                                            <Dropdown.Item className='drop__menu_item' onClick={() => handleShowSwitchDoctor(item)} >Switch Doctor</Dropdown.Item>
                                                            <Dropdown.Item className='drop__menu_item' onClick={() => handleDeleteAppoint(item)} >Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        })
    )
}
const InPersonDoctorQueueList = ({ identity, dashboardData, handleShowSwitchDoctor, handleDeleteAppoint }) => {
    return (
        identity === "doctor" && dashboardData?.doctor_queues?.length > 0 &&
        dashboardData?.doctor_queues?.filter((filItem) => filItem?.type == "In Person")?.map((item, index) => {
            return (
                <div className="wrapeAllInfo">
                    <div className="info">
                        <ul className='dashboardList list-unstyled'>
                            <li>
                                <div className="left">
                                    <div className="moreDetails">
                                        <div key={index} className="first__info">
                                            <div className="firsting">
                                                <div className='d-flex w-100 justify-content-between align-items-baseline'>
                                                    <p className='zero_one'> #{item?.token_no} | MS{item?.mr_no}</p>
                                                    <span className='bolding'>  {item?.appointment_date} | {item?.appointment_time} </span>
                                                </div>
                                                <div className='typeWrapper'>
                                                    <p className='name'> <span> {item?.patient_name} </span> </p>
                                                    <div className={item?.type == 'Video' ? 'typeConsultationVideo' : 'typeConsultationInPerson'}>
                                                        {item?.type?.toUpperCase()}
                                                    </div>
                                                </div>
                                                <span className='single_name'>{item?.patient_no} </span>
                                                <div className='d-flex w-100 mt-1/5 justify-content-between align-items-baseline'>
                                                    <span className='EducatorHead'><span>Doctor: </span> <span className='EducatorName'>{item?.doctor_name}</span>  </span>
                                                    <Dropdown className='dropdown_dashboard'>
                                                        <Dropdown.Toggle as='div' id="dropdown-button-dark-example1">
                                                            <div className="doctorBtn" >
                                                                <span className='bars_arrow'>  </span>
                                                            </div>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className='drop__menu'>
                                                            <Dropdown.Item className='drop__menu_item' onClick={() => handleShowSwitchDoctor(item)} >Switch Doctor</Dropdown.Item>
                                                            <Dropdown.Item className='drop__menu_item' onClick={() => handleDeleteAppoint(item)} >Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        })
    )
}
const VideoDoctorQueueList = ({ identity, dashboardData, handleShowSwitchDoctor, handleDeleteAppoint }) => {
    return (
        identity === "doctor" && dashboardData?.doctor_queues?.length > 0 &&
        dashboardData?.doctor_queues?.filter((filItem) => filItem?.type == "Video")?.map((item, index) => {
            return (
                <div className="wrapeAllInfo">
                    <div className="info">
                        <ul className='dashboardList list-unstyled'>
                            <li>
                                <div className="left">
                                    <div className="moreDetails">
                                        <div key={index} className="first__info">
                                            <div className="firsting">
                                                <div className='d-flex w-100 justify-content-between align-items-baseline'>
                                                    <p className='zero_one'> #{item?.token_no} | MS{item?.mr_no}</p>
                                                    <span className='bolding'>  {item?.appointment_date} | {item?.appointment_time} </span>
                                                </div>
                                                <div className='typeWrapper'>
                                                    <p className='name'> <span> {item?.patient_name} </span> </p>
                                                    <div className={item?.type == 'Video' ? 'typeConsultationVideo' : 'typeConsultationInPerson'}>
                                                        {item?.type?.toUpperCase()}
                                                    </div>
                                                </div>
                                                <span className='single_name'>{item?.patient_no} </span>
                                                <div className='d-flex w-100 mt-1/5 justify-content-between align-items-baseline'>
                                                    <span className='EducatorHead'><span>Doctor: </span> <span className='EducatorName'>{item?.doctor_name}</span>  </span>
                                                    <Dropdown className='dropdown_dashboard'>
                                                        <Dropdown.Toggle as='div' id="dropdown-button-dark-example1">
                                                            <div className="doctorBtn" >
                                                                <span className='bars_arrow'>  </span>
                                                            </div>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className='drop__menu'>
                                                            <Dropdown.Item className='drop__menu_item' onClick={() => handleShowSwitchDoctor(item)} >Switch Doctor</Dropdown.Item>
                                                            <Dropdown.Item className='drop__menu_item' onClick={() => handleDeleteAppoint(item)} >Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        })
    )
}
