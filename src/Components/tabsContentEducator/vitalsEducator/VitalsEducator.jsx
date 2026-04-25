import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'; 
import VitalsModal from '../../vitalsModal/VitalsModal';
import AssignDoctorModal from '../../dashboardModals/assignDoctorModal/AssignDoctorModal';
import './vitalsEducator.scss';
import API from '../../../utils/httpService';


const VitalsEducator = ({selectedPatientId, patientDetails}) => {
    const [showVitalsModal, setShowVitalsModal] = useState(false);
    const [vitalData, setVitalData] = useState([])
    const handleClosevitalsModal = () => setShowVitalsModal(false);
      const handleShowvitalsModal = () => setShowVitalsModal(true);
 
    // assignmodal
    const [showAssignDoctor, setShowAssignDoctor] = useState(false);
    const handleCloseAssignDoctor = () => setShowAssignDoctor(false);
    const handleShowAssignDoctor = () => setShowAssignDoctor(true);

    const gettingVitals = async () => {
        try {
            if(selectedPatientId){
                const response = await API.get(`patient/get-vitals?patient_id=${selectedPatientId}`)
                setVitalData(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingVitals()
    }, [selectedPatientId])

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if needed

    const formattedDate = `${month}/${day}/${year}`;

    return (
        <>
        <div className='vitalsEducator vitalScroll'> 
            <div className="right">
                <div className="bottom-right">
                    <Table responsive className="table-diabities" >
                        <thead>
                        <tr>
                        <th className='align-middle'>Date</th>
                        <th className='align-middle'>Weight (kg) </th>
                        <th className='align-middle'>Height (m)</th>
                        <th className='align-middle'>Heart Rate ((/min))</th>
                        <th className='align-middle'>BP (Systolic)</th>
                        <th className='align-middle'>BP (Diastolic)</th>
                        <th className='align-middle'>BMI</th>
                        <th className='align-middle'>Temperature (°F)</th>
                        <th className='align-middle'>Glucometer <br></br>Result  (mg/dL)</th>
                        </tr>
                        </thead>
                        <tbody>
                                {
                                    vitalData?.map((item) => (
                                        <tr>
                                            <td>{formattedDate}</td>
                                            <td>{item.weight}</td>
                                            <td>{item.height}</td>
                                            <td>{item.heart_rate}</td>
                                            <td> {item.blood_pressure_systolic}</td>
                                            <td> {item.blood_pressure_diastolic}</td>
                                            <td> {item.bmi}</td>
                                            <td>{item.temperature}</td>
                                            <td> {item.glucometer_result}</td>
                                        </tr>
                                    ))
                                }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
        <VitalsModal showVitalsModal ={showVitalsModal} handleClosevitalsModal = {handleClosevitalsModal} />
        <AssignDoctorModal showAssignDoctor = {showAssignDoctor} handleCloseAssignDoctor = {handleCloseAssignDoctor} />
        </>
    )
}

export default VitalsEducator;
