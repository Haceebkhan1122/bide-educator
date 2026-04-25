import React, { useEffect, useState, useRef } from 'react'
import { Row, Tab, Tabs, Col, Container } from 'react-bootstrap';
import WraperLayout from '../wraperLayout/wraperLayout';
import './tabsContentEducator.scss';
import { DatePicker } from 'antd';
import moment from 'moment';
import EducatorAssessment from '../educatorAssessment/EducatorAssessment';
import PrescriptionContentEducator from './prescriptionContentEducator/PrescriptionContentEducator';
import './tabsContentEducator.scss';
import PersonalHistoryEducator from './personalHistoryEducator/PersonalHistoryEducator';
import MedicalHistoryEducator from './medicalHistoryEducator/MedicalHistoryEducator';
import LabsReportsEducator from './labReportsEducator/LabReportsEducator';
import VitalsEducator from './vitalsEducator/VitalsEducator';
import DiabitiesHistoryEducator from './diabitiesHistoryEducator/DiabitiesHistoryEducator';
import Baselayout from '../BaseLayout';
import customCalendar from '../../assets/images/svg/customCalendar.svg'
import API from '../../utils/httpService';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { ConsoleIcon } from 'evergreen-ui';
import { configConsumerProps } from 'antd/lib/config-provider';

const TabsContentEducator = () => {
    const [key, setKey] = useState("assessment");
    const [selectedPatientId, setSelectedPatientId] = useState("");
    const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
    const [patientDetails, setPatientDetails] = useState("");
    const [ethnicityList, setEthnicityList] = useState([]);
    const [prescriptionList, setPrescriptionList] = useState([]);
    const [educationAssessmentList, setEducationAssessmentList] = useState([]);
    const [dateChangeDietaryAss, setDateChangeDietaryAss] = useState([])
    const [changeDateError, setChangeDateError] = useState([])
    const [handleToast, setHandleToast] = useState(false)
    const [isPrefilledData, setIsPrefilledData] = useState(false)
    const [selectedDate, setSelectedDate] = useState()
    const [appointmentDate, setAppointmentDate] = useState()
    const [printState, setPrintState] = useState(false)


    const location = useLocation();   

    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
      });

      const currentDateForDownload = moment().format('YYYY-MM-DD');

      useEffect(() => {
        if(!selectedDate){
            setSelectedDate(currentDateForDownload)
        }
      }, [selectedDate])

    
    useEffect(() => {
        const patientId = Cookies.get('start_assessment_Patient_Id')
        const appointmentId = Cookies.get('start_assessment_Appointment_Id')
        setSelectedPatientId(patientId)
        setSelectedAppointmentId(appointmentId)
      }, [patientDetails, key, ethnicityList, location])

    const gettingPatientDetails = async () => {
        try {
            if(selectedPatientId){
                const response = await API.get(`/consultation/patient-details?patient_id=${selectedPatientId}`)
                setPatientDetails(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingPatientDetails()
    }, [selectedPatientId])

    const gettingEthnicity = async () => {
        try {
            const response = await API.get('/ethnicities')
            setEthnicityList(response?.data)
        } catch (error) {
            console.log(error)
        }
    }

    const gettingPrescriptions = async () => {
        try {
            if(selectedAppointmentId){
                const response = await API.get(`consultation/prescriptions?appointment_id=${selectedAppointmentId}`)
                setPrescriptionList(response?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingEthnicity();
        gettingPrescriptions();
    }, [selectedAppointmentId])

    useEffect(() => {
        if(prescriptionList?.length > 0) {
            const formattedDate = moment(prescriptionList[0]?.date,'DD/MM/YYYY').format('YYYY-MM-DD');
            setAppointmentDate(formattedDate);

        }
    }, [prescriptionList]);
    const fetchAssessment  = async () => {
        if(appointmentDate !== 'undefined' && appointmentDate){
                console.log({appointmentDate})
                if(location?.pathname == '/patient/diabetes-educator' && key == 'assessment'){
                    try {
                        const response = await API.get(`/consultation/assessments-dietary?patient_id=${selectedPatientId}&appointment_date=${appointmentDate}`)
                        if(response?.status === 200){
                            // setPrintState(false)
                            setDateChangeDietaryAss(response?.data)
                            setIsPrefilledData(true)
                        }else {
                            setChangeDateError(response?.error)
                            setHandleToast(true)
                            setIsPrefilledData(false)
                            setTimeout(() => {
                                setHandleToast(false)
                            }, 1500);
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        }
    useEffect(() => {
        if (appointmentDate) {
            fetchAssessment();
        }
    }, [appointmentDate])
    
    

    const onChange = async (date, dateString) => {
        setSelectedDate(dateString)
        if(location?.pathname == '/patient/diabetes-educator' && key == 'assessment'){
            try {
                const response = await API.get(`/consultation/assessments-dietary?patient_id=${selectedPatientId}&appointment_date=${dateString}`)
                if(response?.status === 200){
                    setDateChangeDietaryAss(response?.data)
                    setIsPrefilledData(true)
                    setPrintState(false)
                }else {
                    setChangeDateError(response?.error)
                    setHandleToast(true)
                    setIsPrefilledData(false)
                    setTimeout(() => {
                        setHandleToast(false)
                    }, 1500);
                }
            } catch (error) {
                console.log(error)
            }
        }
    };

    const handleDietaryDownload = async () => {
        try {
            const response = await API.get(`/consultation/assessments-dietary?patient_id=${selectedPatientId}&appointment_date=${selectedDate}&download=true`, {
                responseType: 'blob' 
            });
    
            const blob = new Blob([response], { type: 'application/pdf' });
    
            const filename = `Dietary_Assessment`;
            const url = window.URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); 
    
        } catch (error) {
            console.error('Download error:', error);
        }
    }

    const handlePrescriptionDownload = async () => {
        try {
            const response = await API.get(`/consultation/prescriptions?appointment_id=${selectedAppointmentId}&download=true`, {
                responseType: 'blob' 
            });
    
            const blob = new Blob([response], { type: 'application/pdf' });
    
            const filename = `Prescription`;
            const url = window.URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); 
    
        } catch (error) {
            console.error('Download error:', error);
        }
    }

    const gettingEducationalAssessment = async () => {
        try {
            if(selectedPatientId){
                const response = await API.get(`/consultation/last-educational-assessments?patient_id=${selectedPatientId}`)
                setEducationAssessmentList(response?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingEducationalAssessment();
    }, [selectedPatientId, patientDetails])


    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0'); 

    const formattedDate = `${day}/${month}/${year}`; 

    return (
        <Baselayout>
        <WraperLayout>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <div className="create-appointment patient-profile">
                            {handleToast && <div className="toasting-notification">
                                <span> {changeDateError} </span>
                            </div>}
                            <div className="profile-detail">
                                <div className='details'>
                                <h3>{patientDetails?.patient_info?.name} - {patientDetails?.patient_info?.mr_no}</h3>
                                {/* <p>New Patient</p> */}
                                </div>
                                <ul>
                                    <li>
                                        <h6>Age</h6>
                                        <p>{patientDetails?.patient_info?.age} years</p>
                                    </li>
                                    <li>
                                        <h6>Gender</h6>
                                        <p>{patientDetails?.patient_info?.gender}</p>
                                    </li>
                                    <li>
                                        <h6>Date Of Birth</h6>
                                        <p>{patientDetails?.patient_info?.date_of_birth}</p>
                                    </li>
                                    <li>
                                        <h6>CNIC</h6>
                                        <p>{patientDetails?.patient_info?.cnic}</p>
                                    </li>
                                    <li>
                                        <h6>Address</h6>
                                        <p>{patientDetails?.patient_info?.address}</p>
                                    </li>
                                    <li>
                                        <h6>Ethnicity</h6>
                                        <p>{ethnicityList?.map((ethnicity) => {
                                            if(patientDetails?.patient_info?.ethnicity == ethnicity.id){
                                                return `${ethnicity.name}`;
                                            }
                                            return null;     
                                        })}</p>
                                    </li>
                                    <li>
                                        <h6>Follow Up</h6>
                                        <p>{prescriptionList?.[0]?.follow_up_date && (
                                                moment(prescriptionList?.[0]?.follow_up_date)?.format('DD/MM/YYYY')
                                        )}</p>
                                    </li>
                                </ul>
                            </div> 
                            
                            <Row className='position-relative'>
                            <Col md={3}>
                                    <div className='text-end datePickerBox'>
                                        <label>Date</label>
                                    <DatePicker format={'DD/MM/YYYY'} inputReadOnly placeholder={formattedDate} className='datePickerTabs' suffixIcon={<img src={customCalendar} /> } onChange={onChange} />
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='TabsEducator'>
                                    <Tabs
                                                id="controlled-tab-example"
                                                activeKey={key}
                                                onSelect={(k) => setKey(k)}
                                                className="tabs_top_appointment"
                                            >
                                                <Tab eventKey="assessment" title={"Assessment"}>
                                                    <hr className='dividerEducator' />
                                                    <EducatorAssessment prescriptionList={prescriptionList} fetchAssessment={fetchAssessment} setPrintState={setPrintState} printState={printState} handleDietaryDownload={handleDietaryDownload} educationAssessmentList={educationAssessmentList} isPrefilledData={isPrefilledData} dateChangeDietaryAss={dateChangeDietaryAss} ethnicityList={ethnicityList} setKey={setKey} selectedAppointmentId={selectedAppointmentId} patientDetails={patientDetails}/>
                                                </Tab>
                                                <Tab eventKey="Prescription" title={"Prescription"}>
                                                    <hr className='dividerEducator' />
                                                    <PrescriptionContentEducator handlePrescriptionDownload={handlePrescriptionDownload} ethnicityList={ethnicityList} prescriptionList={prescriptionList} patientDetails={patientDetails}/>
                                                </Tab>
                                                <Tab eventKey="Personal History" title={"Personal History"}>
                                                    <hr className='dividerEducator' />
                                                    <PersonalHistoryEducator patientDetails={patientDetails}/>
                                                </Tab>
                                                <Tab eventKey="Medical History" title={"Medical History"}>
                                                    <hr className='dividerEducator' />
                                                    <MedicalHistoryEducator patientDetails={patientDetails}/>
                                                </Tab>
                                                <Tab eventKey="Diabetes History" title={"Diabetes History"}>
                                                    <hr className='dividerEducator' />
                                                    <DiabitiesHistoryEducator selectedPatientId={selectedPatientId} patientDetails={patientDetails}/>
                                                </Tab>
                                                <Tab eventKey="Lab Reports" title={"Lab Reports"}>
                                                    <hr className='dividerEducator' />
                                                    <LabsReportsEducator selectedPatientId={selectedPatientId} patientDetails={patientDetails}/>
                                                </Tab>
                                                <Tab eventKey="Vitals" title={"Vitals"}>
                                                    <hr className='dividerEducator' />
                                                    <VitalsEducator selectedPatientId={selectedPatientId} patientDetails={patientDetails}/>
                                                </Tab>
                                            </Tabs>
                                    </div>
                                </Col>
                                
                            </Row>
                        </div>
                    </Col>
                </Row >
            </Container >
        </WraperLayout >
         </Baselayout>
    )
}

export default TabsContentEducator;
