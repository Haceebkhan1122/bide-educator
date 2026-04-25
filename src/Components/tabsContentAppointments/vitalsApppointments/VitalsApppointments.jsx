import React, { useEffect, useState } from 'react'
import './vitalsApppointments.scss';
import { Table } from 'react-bootstrap';
import VitalsModal from '../../vitalsModal/VitalsModal';
import AssignDoctorModal from '../../dashboardModals/assignDoctorModal/AssignDoctorModal';
import Cookies from 'js-cookie';
import API from '../../../utils/httpService';
import deleteIcon from '../../../assets/images/svg/deleteIcon.svg';
import VitalsEditModal from '../../tabsContentProfile/vitalsProfile/vitalsEditModalProfile/VitalsEditModalProfile';

const VitalsApppointments = ({setSuccessState}) => {
    const [showVitalsModal, setShowVitalsModal] = useState(false);
    const handleClosevitalsModal = () => setShowVitalsModal(false);
    const handleShowvitalsModal = () => setShowVitalsModal(true);

    // assignmodal
    const [showAssignDoctor, setShowAssignDoctor] = useState(false);
    const handleCloseAssignDoctor = () => setShowAssignDoctor(false);
    const handleShowAssignDoctor = () => setShowAssignDoctor(true);
    const [availableDoctors, setAvailableDoctor] = useState([])
    const [vitalData, setVitalData] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState('')
    const [doctorId, setDoctorId] = useState('')
    const [patient_id, Setpatient_id] = useState('');
    const [isReturningPatient, setIsReturningPatient] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [editModalShow, setEditModalShow] = useState('');
    const [vitals, setVitals] = useState(false);
    const [successfullyUpdated, setSuccessfullyUpdated] = useState(false);

    const [isVitalDataAdded,setIsVitalDataAdded] = useState(false);

    const handleEditClose = () => setEditModalShow(false);

    useEffect(() => {
        const patientId = Cookies.get('selectedPatientId')
        const isReturningPatient = Cookies.get('isReturningPatient')
        setSelectedPatientId(patientId)
        setIsReturningPatient(isReturningPatient)
    }, [])

    useEffect(() => {
        const patientId = Cookies.get('patient_id')
        Setpatient_id(patientId)
    }, [showVitalsModal])

    const getiingAvailableDoctors = async () => {
        try {
            const response = await API.get('/doctor/listing')
            setAvailableDoctor(response?.data)
        } catch (error) {
            console.log(error, "error")
        }
    }

    useEffect(() => {
        getiingAvailableDoctors()
    }, [patient_id])

    const gettingVitals = async () => {
        try {
            if(selectedPatientId || patient_id){
                const response = await API.get(`patient/get-vitals?patient_id=${isReturningPatient ? selectedPatientId : patient_id}`)
                setVitalData(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingVitals()
    }, [patient_id, successfullyUpdated])
    
    const handleCreateAppoitnment = async () => {
        setShowAssignDoctor(true)
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if needed

    const formattedDate = `${month}/${day}/${year}`;

    const handleEditVitalModal = (items) => {
        setVitals(items)
        setEditModalShow(true)
    }
    const fetchPatientDetails = () => {

    }

    return (
        <>
            <div className="top-right text-end">
                <button className='right-add-btn ms-auto btn_vital_p' onClick={handleShowvitalsModal}> ADD </button>
            </div>
            <div className='vitalsApppointments'>
                <div className="right">

                    <div className="bottom-right">
                        <Table responsive className="table-vital" >
                            <thead>
                                <tr>
                                    <th className='align-middle'>Date</th>
                                    <th className='align-middle'>Weight (kg) </th>
                                    <th className='align-middle'>Height (m)</th>
                                    <th className='align-middle'>Heart Rate (/min)</th>
                                    <th className='align-middle'>BP (Systolic)</th>
                                    <th className='align-middle'>BP (Diastolic)</th>
                                    <th className='align-middle'>BMI</th>
                                    <th className='align-middle'>Temperature (°F)</th>
                                    <th className='align-middle'>Glucometer <br></br>Result  (mg/dL)</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    vitalData?.map((item) => (
                                        <tr>
                                            <td>{item?.created_at}</td>
                                            <td>{item.weight}</td>
                                            <td>{item.height}</td>
                                            <td>{item.heart_rate}</td>
                                            <td> {item.blood_pressure_systolic}</td>
                                            <td> {item.blood_pressure_diastolic}</td>
                                            <td> {item.bmi}</td>
                                            <td>{item.temperature}</td>
                                            <td> {item.glucometer_result}</td>
                                            <td> <img src={deleteIcon} alt="" onClick={() => handleEditVitalModal(item)}></img></td>
                                        </tr>
                                    ))
                                }

                                


                                <tr className='d-none'>
                                    <td colSpan={9}><p className='no_record'> Add Records</p></td>
                                </tr>

                            </tbody>
                        </Table>
                        <button className={isVitalDataAdded ? 'continue__btn w32' : 'disable_continue__btn w32'} disabled={!isVitalDataAdded} onClick={handleCreateAppoitnment}>
                            SAVE & ASSIGN DOCTOR
                        </button>
                    </div>
                </div>
            </div>


            <VitalsModal vitals={vitals} setIsVitalDataAdded={setIsVitalDataAdded} gettingVitals={gettingVitals} showVitalsModal={showVitalsModal} handleClosevitalsModal={handleClosevitalsModal} />
            <AssignDoctorModal setSuccessState={setSuccessState} doctorId={doctorId} setDoctorId={setDoctorId} availableDoctors={availableDoctors} showAssignDoctor={showAssignDoctor} handleCloseAssignDoctor={handleCloseAssignDoctor} />
            <VitalsEditModal setSuccessfullyUpdated={setSuccessfullyUpdated} fetchPatientDetails={fetchPatientDetails} vitals={vitals} handleEditClose={handleEditClose} setEditModalShow={setEditModalShow} editModalShow={editModalShow}/>

        </>
    )
}

export default VitalsApppointments;
