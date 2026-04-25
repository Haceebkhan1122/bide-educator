import React, { useEffect, useState } from 'react'
import { Tab, Tabs, Col, Row, Container } from 'react-bootstrap';
import WraperLayout from '../wraperLayout/wraperLayout';
import BasicDetailsAppointments from './basicDetailsAppointments/BasicDetailsAppointments';
import DiabitiesHistoryAppointments from './diabitiesHistoryAppointments/DiabitiesHistoryAppointments';
import LabReportsAppointments from './labReportsAppointments/LabReportsAppointments';
import MedicalHistoryAppointments from './medicalHistoryAppointments/MedicalHistoryAppointments';
import PersonalHistoryAppointments from './personalHistoryAppointments/PersonalHistoryAppointments';
import VitalsApppointments from './vitalsApppointments/VitalsApppointments';
import './createAppointment.scss';
import { useNavigate } from 'react-router-dom';
import sizeback from '../../assets/images/svg/sizeback.svg'
import API from '../../utils/httpService';
import { ConsoleIcon } from 'evergreen-ui';
import Cookies from 'js-cookie';

const CreateAppointment = () => {
    const [key, setKey] = useState("basicDetails");
    const [gender, setGender] = useState('Select');
    const [mrNo, setMrNo] = useState('');
    const [successState, setSuccessState] = useState('')
    const [ethnicityList, setEthnicityList] = useState('')
    const [returnPatientDetails, SetReturnPatientDetails] = useState([]);

    const navigate = useNavigate();

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
        gettingMrNo()
        gettingEthnicity()
    }, [])

    const gettingPatientDetails = async () => {
        try {
            const response = await API.get(`/consultation/patient-details?patient_id=${Cookies.get('patient_id')}`)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(Cookies.get('patient_id')){
            gettingPatientDetails()
        }
    }, [Cookies.get('patient_id')])

    useEffect(() => {
        const unloadCallback = (event) => {
          event.preventDefault();
          event.returnValue = "";
          return "";
        };
      
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
      }, []);

    return (
        <WraperLayout>
            <Container fluid className='contianer_wrap'>
                <Row>
                    <Col md={12}>
                        <div className="create-appointment">
                            {successState?.data && <div className="toasting-notification">
                                <span> {successState?.data} </span>
                            </div>}
                            <div className="top">
                                <img src={sizeback} className='back-arrow' onClick={()=> navigate('/dashboard')}></img>
                                <h3> Create Appointment </h3>
                            </div>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="tabs_top_appointment"
                            >
                                <Tab eventKey="basicDetails" title="Basic Details">
                                    <hr className='divider' />
                                    < BasicDetailsAppointments returnPatientDetails={returnPatientDetails} ethnicityList={ethnicityList} mrNo={mrNo} gender={gender} setGender={setGender} setKey={setKey}/>
                                </Tab>
                                <Tab eventKey="personalHistory" title="Personal History">
                                    <hr className='divider' />
                                    <  PersonalHistoryAppointments returnPatientDetails={returnPatientDetails} gender={gender} setKey={setKey}/>
                                </Tab>
                                <Tab eventKey="medicalHistory" title="Medical History">
                                    <hr className='divider' />
                                    < MedicalHistoryAppointments returnPatientDetails={returnPatientDetails} setKey={setKey}/>
                                </Tab>
                                <Tab eventKey="labReports" title="Lab Reports">
                                    <hr className='divider labing_hr' />
                                    <  LabReportsAppointments returnPatientDetails={returnPatientDetails} setKey={setKey}/>
                                </Tab>
                                <Tab eventKey="diabetesHistory" title="Diabetes History">
                                    <hr className='divider diabitiesHr' />
                                    < DiabitiesHistoryAppointments returnPatientDetails={returnPatientDetails} setKey={setKey}/>
                                </Tab>
                                <Tab eventKey="vitals" title="Vitals">
                                <hr className='divider vitalHr' />
                                    <VitalsApppointments returnPatientDetails={returnPatientDetails} setSuccessState={setSuccessState}/>
                                </Tab>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </Container>
        </WraperLayout>
    )
}

export default CreateAppointment;
