import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Col, Row, Container } from 'react-bootstrap';
import WraperLayout from '../wraperLayout/wraperLayout';
import BasicDetailsAppointments from '../tabsContentAppointments/basicDetailsAppointments/BasicDetailsAppointments';
import PersonalHistoryAppointments from '../tabsContentAppointments/personalHistoryAppointments/PersonalHistoryAppointments';
import MedicalHistoryAppointments from '../tabsContentAppointments/medicalHistoryAppointments/MedicalHistoryAppointments';
import LabReportsAppointments from '../tabsContentAppointments/labReportsAppointments/LabReportsAppointments';
import DiabitiesHistoryAppointments from '../tabsContentAppointments/diabitiesHistoryAppointments/DiabitiesHistoryAppointments';
import VitalsApppointments from '../tabsContentAppointments/vitalsApppointments/VitalsApppointments';
import Baselayout from '../BaseLayout';
import sizeback from '../../assets/images/svg/sizeback.svg';
import "./returningPatient.scss";
import { useNavigate } from 'react-router-dom';
import API from '../../utils/httpService';
import Cookies from 'js-cookie';

function ReturningPatient() {
    const [key, setKey] = useState("basicDetails");
    const [mrNo, setMrNo] = useState('');
    const [returnPatientDetails, SetReturnPatientDetails] = useState([]);
    const [isReturningPatient, setIsReturningPatient] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [gender, setGender] = useState('Select');
    const [successState, setSuccessState] = useState('')
    const [ethnicityList, setEthnicityList] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const patientId = Cookies.get('selectedPatientId')
        const isReturningPatient = Cookies.get('isReturningPatient')
        setSelectedPatientId(patientId)
        setIsReturningPatient(isReturningPatient)
    }, [])

    const gettingPatientDetails = async () => {
        try {
            const response = await API.get(`/consultation/patient-details?patient_id=${Cookies.get('selectedPatientId')}`)
            SetReturnPatientDetails(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingPatientDetails()
    }, [selectedPatientId])

    const gettingMrNo = async () => {
        try {
            const response = await API.get('/patient/last-mr-no')
            setMrNo(response?.data?.mr_no)
        } catch (error) {
            console.log(error)
        }
    }

    const gettingEthnicity = async () => {
        try {
            const response = await API.get('/ethnicities')
            setEthnicityList(response?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingMrNo();
        gettingEthnicity();
    }, [])

    console.log("dtails===>>>", returnPatientDetails)
    console.log("dtails retur yes ===>>>", isReturningPatient)

    return (
        <Baselayout>
        <WraperLayout>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <div className="returning-patient">
                            <div className="top">
                                <img src={sizeback} className='back-arrow' onClick={()=> navigate('/dashboard')}></img>
                                <h3> Create Appointment </h3>
                            </div>
                            {/* {successState?.data && <div className="toasting-notification">
                                <span> {successState?.data} </span>
                            </div>} */}
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className={`${isReturningPatient ? 'returning_patient' : 'tabs_top_appointment'}`}
                                style={{display:'flex', alignItems:'center', gap:'10px'}}
                            >
                                <Tab eventKey="basicDetails" title="Basic Details">
                                    <hr className='divider w-100  ms-0' />
                                    <BasicDetailsAppointments ethnicityList={ethnicityList} returnPatientDetails={returnPatientDetails} isReturningPatient={isReturningPatient} gender={gender} setGender={setGender} mrNo={mrNo} setKey={setKey}/>
                                </Tab>
                                <Tab eventKey="personalHistory" title="Personal History">
                                    <hr className='divider w-100  ms-0' />
                                    <PersonalHistoryAppointments returnPatientDetails={returnPatientDetails} isReturningPatient={isReturningPatient} gender={gender} setKey={setKey}/>
                                </Tab>
                                <Tab eventKey="medicalHistory" title="Medical History">
                                    <hr className='divider w-100  ms-0' />
                                    <MedicalHistoryAppointments returnPatientDetails={returnPatientDetails} isReturningPatient={isReturningPatient} setKey={setKey}/>
                                </Tab>
                                <Tab eventKey="labReports" title="Lab Reports">
                                    <hr className='divider w-100  ms-0' />
                                    <LabReportsAppointments returnPatientDetails={returnPatientDetails} setKey={setKey}/>
                                </Tab>
                                <Tab eventKey="diabetesHistory" title="Diabetes History">
                                    <hr className='divider w-100  ms-0' />
                                    <DiabitiesHistoryAppointments returnPatientDetails={returnPatientDetails} setKey={setKey}/>
                                </Tab>
                                <Tab eventKey="vitals" title="Vitals">
                                    <hr className='divider w-100 ms-0' />
                                    <VitalsApppointments setSuccessState={setSuccessState}/>
                                </Tab>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </Container>
        </WraperLayout>
        </Baselayout>
    )
}

export default ReturningPatient;