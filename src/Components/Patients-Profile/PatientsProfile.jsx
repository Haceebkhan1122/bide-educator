import React, { useEffect, useState } from 'react'
import { Tab, Tabs, Row, Col } from 'react-bootstrap';
import WraperLayout from '../wraperLayout/wraperLayout';
import './patientsProfile.scss';
import BasicDetails from '../tabsContentProfile/basicDetailsProfile/BasicDetailsProfile';
import PersonalHistory from '../tabsContentProfile/personalHistoryProfile/PersonalHistoryProfile';
import MedicalHistory from '../tabsContentProfile/medicalHistoryProfile/MedicalHistoryProfile';
import LabReports from '../tabsContentProfile/labReportsProfile/LabReportsProfile';
import DiabetesHistory from '../tabsContentProfile/diabetesHistoryProfile/DiabetesHistoryProfile';
import Vitals from '../tabsContentProfile/vitalsProfile/VitalsProfile';
import Prescription from '../tabsContentProfile/prescriptionProfile/PrescriptionProfile';
import DietaryAssessment from '../tabsContentProfile/dietaryAssessmentProfile/DietaryAssessmentProfile';
import BaseLayout from '../BaseLayout.jsx';
import { useNavigate } from 'react-router-dom';
import sizeback from '../../assets/images/svg/sizeback.svg'
import API from '../../utils/httpService.js';
import Loader from '../customLoader/loader.js';

const PatientsProfile = ({medicalHistory,patientHistory,patientInfo,labsReports,diabetesHistory,patientID,patientVitals,fetchPatientDetails,patientMedicalHistory}) => {
    const [key, setKey] = useState("basicDetails")
    const [successfullyUpdated, setSuccessfullyUpdated] = useState(false)
    const [ethnicites,setEthnicites] = useState([]);
    const [smbg,setSmbg] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const dashboardNavigation = () => {
        navigate('/dashboard')
    }
    useEffect(() => {
        setLoading(true)
        const getEthnicites = async () => {
            try {
            const response = await API.get('/ethnicities')
              if(response){
                setEthnicites(response?.data)
                setLoading(false)
              }
            } catch (error) {
                console.log(error)
            }
        }
        getEthnicites();
    }, [])

    useEffect(() => {
        setLoading(true)
        const getSmbg = async () => {
          try {
            if(patientID){
                const response = await API.get(`patient/get-smbg?patient_id=${patientID}`)
                if(response){
                    setSmbg(response)
                    setLoading(false)
                }
            }
          } catch (error) {
              console.log(error)
          }
        }
        if(diabetesHistory){
            getSmbg()
        }
      }, [])

     

    return (
        <BaseLayout>
        <WraperLayout>
            {loading && <Loader/>}
            <div className="create-appointment pateint-profile">
                {successfullyUpdated && (
                    <div className="toasting-notification">
                        <span> Update Successfully! </span>
                    </div>
                )}
                <div className="top">
                    <img src={sizeback} className='back-arrow' onClick={dashboardNavigation}></img>
                    <h3> {patientInfo?.name} - {patientInfo?.mr_no} </h3>
                </div>
                <Row className='mx-3'>
                    <Col sm={2}>
                        <div className='sidebar'>
                            <h3>Patient Details</h3>
                            <div className='sidebar-detail'>
                                <div className='mb-2'>
                                    <h5>MR Number</h5>
                                    <span>{patientInfo?.mr_no}</span>
                                </div>
                                <div className='mb-2'>
                                    <h5>Name</h5>
                                    <span>{patientInfo?.name}</span>
                                </div>
                                <div className='mb-2'>
                                    <h5>Mobile Number</h5>
                                    <span>{patientInfo?.number}</span>
                                </div>
                                <div className='mb-2'>
                                    <h5>Gender</h5>
                                    <span>{patientInfo?.gender}</span>
                                </div>
                                <div className='mb-2'>
                                    <h5>Date of Birth</h5>
                                    <span>{patientInfo?.date_of_birth?.replaceAll('/', '.')}</span>
                                </div>
                                <div className='mb-2'>
                                    <h5>CNIC</h5>
                                    <span>{patientInfo?.cnic}</span>
                                </div>
                                <div className='mb-2'>
                                    <h5>Address</h5>
                                    <span>{patientInfo?.address}</span>
                                </div>
                                <div className='mb-2'>
                                    <h5>Work Address</h5>
                                    <span>{patientInfo?.work_address}</span>
                                </div>
                                <div className='mb-2'>
                                    <h5>Ethnicity</h5>
                                    <span>
                                        {ethnicites?.map((ethnicity) => {
                                            if(patientInfo?.ethnicity === ethnicity.id){
                                                return `${ethnicity.name}`;
                                            }
                                            return null;     
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={10}>
                        <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="tabs_top_appointment"
                    >
                        <Tab eventKey="basicDetails" title="Basic Details">
                            <hr className='divider' />
                            <BasicDetails 
                            ethnicites={ethnicites} 
                            setEthnicites={setEthnicites} 
                            setSuccessfullyUpdated={setSuccessfullyUpdated} 
                            fetchPatientDetails={fetchPatientDetails} 
                            patientInfo={patientInfo}
                            />
                        </Tab>
                        <Tab eventKey="personalHistory" title="Personal History">
                            <hr className='divider' />
                            <PersonalHistory 
                            gender={patientInfo?.gender} 
                            patientHistory={patientHistory}
                            setSuccessfullyUpdated={setSuccessfullyUpdated} 
                            fetchPatientDetails={fetchPatientDetails}  />
                        </Tab>
                        <Tab eventKey="medicalHistory" title="Medical History">
                            <hr className='divider' />
                            <MedicalHistory 
                            patientMedicalHistory={patientMedicalHistory} 
                            medicalHistory={medicalHistory} 
                            setSuccessfullyUpdated={setSuccessfullyUpdated} 
                            fetchPatientDetails={fetchPatientDetails} />
                        </Tab>
                        <Tab eventKey="labReports" title="Lab Reports" >
                            <hr className='divider' />
                            <LabReports 
                            labsReports={labsReports}
                            setSuccessfullyUpdated={setSuccessfullyUpdated} 
                            fetchPatientDetails={fetchPatientDetails}  />
                        </Tab>
                        <Tab eventKey="diabetesHistory" title="Diabetes History">
                            <hr className='divider' />
                            <DiabetesHistory 
                            setSmbg={setSmbg}
                            smbg={smbg} 
                            diabetesHistory={diabetesHistory}
                            setSuccessfullyUpdated={setSuccessfullyUpdated} 
                            fetchPatientDetails={fetchPatientDetails} />
                        </Tab>
                        <Tab eventKey="vitals" title="Vitals">
                            <hr className='divider' />
                            <Vitals 
                            patientVitals={patientVitals}
                            setSuccessfullyUpdated={setSuccessfullyUpdated} 
                            fetchPatientDetails={fetchPatientDetails}  />
                        </Tab>
                        <Tab eventKey="prescription" title="Prescription">
                            <hr className='divider' />
                            <Prescription     
                            ethnicites={ethnicites} 
                            patientInfo={patientInfo} 
                            patientID={patientID} />
                        </Tab>
                        <Tab eventKey="dietaryAssessment" title="Dietary Assessment">
                        <hr className='divider' />
                            <DietaryAssessment patientID={patientID} ethnicites={ethnicites} patientInfo={patientInfo}  />
                        </Tab>
                    </Tabs>
                    </Col>
                </Row>
            </div>
        </WraperLayout>
        </BaseLayout>
    )
}

export default PatientsProfile;
