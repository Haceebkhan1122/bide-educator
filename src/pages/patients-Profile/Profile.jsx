import React,{useState,useEffect} from 'react'
import PatientsProfile from '../../Components/Patients-Profile/PatientsProfile'
import Cookies from 'js-cookie';
import API from '../../utils/httpService';

const PatientsProfilePage = () => {

    const [patientDetails, setPatientDetails] = useState('');
    const [patientInfo, setPatientInfo] = useState({});
    const [patientHistory, setPatientHistory] = useState({});
    const [labsReports, setLabsReports] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState({});
    const [diabetesHistory, setDiabetesHistory] = useState({});
    const [patientVitals, setPatientVitals] = useState([]);
    const [patientMedicalHistory, setPatientMedicalHistory] = useState({});



    const patientID = Cookies.get('patientID');
    const fetchPatientDetails = async () => {
        try {
            const response = await API.get(`/consultation/patient-details?patient_id=${patientID}`);
            setPatientDetails(response)
            setPatientInfo(response?.patient_info)
            setPatientHistory(response?.patient_personal_history)
            setLabsReports(response?.patient_reports)
            setMedicalHistory(response?.patient_medical_history_array)
            setDiabetesHistory(response?.patient_diabetes_history)
            setPatientVitals(response?.patient_vitals)
            setPatientVitals(response?.patient_vitals)
            setPatientMedicalHistory(response?.patient_medical_history)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchPatientDetails(); 
    }, [patientID]);
    return (
        <div>
            <PatientsProfile 
            patientHistory={patientHistory} 
            patientInfo={patientInfo} 
            patientDetails={patientDetails}
            labsReports={labsReports}
            medicalHistory={medicalHistory}
            diabetesHistory={diabetesHistory}
            patientID={patientID}
            patientVitals={patientVitals} 
            patientMedicalHistory={patientMedicalHistory}
            fetchPatientDetails={fetchPatientDetails}
            />
        </div>
    )
}

export default PatientsProfilePage
