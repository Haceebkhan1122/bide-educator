import React, {useState} from 'react'
import './vitalsProfile.scss';
import { Table, Button } from 'react-bootstrap'; 
import VitalsEditModal from './vitalsEditModalProfile/VitalsEditModalProfile';
import editIcon from '../../../assets/images/svg/deleteIcon.svg';

const Vitals = ({patientVitals,fetchPatientDetails,setSuccessfullyUpdated}) => {
    const [editModalShow, setEditModalShow] = useState(false);
    const [vitals, setVitals] = useState(false);
    
    const handleEditClose = () => setEditModalShow(false);
    // const handleEditShow = () => setEditModalShow(true);

    const handleEditShow = (items) => {
        setVitals(items)
        setEditModalShow(true)
    };
  return (
    <div className='vitals'>
        <div className="wraperForm">
            <Table responsive>
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
                        <th className='align-middle'>Glucometer Result (mg/dL)</th>
                        <th className='align-middle'></th>
                    </tr>
               </thead>
                {patientVitals?.map((item) => {
                    return(
                        <tbody>
                            <tr className='vitals-tr' key={item}>
                                <td>{item?.created_at}</td>
                                <td>{item.weight}</td>
                                <td>{item?.height}</td>
                                <td>{item?.heart_rate}</td>
                                <td>{item?.blood_pressure_systolic}</td>
                                <td>{item?.blood_pressure_diastolic}</td>
                                <td>{item?.bmi}</td>
                                <td>{item?.temperature}</td>
                                <td>{item?.glucometer_result}</td>
                                <td><Button className='p-0' onClick={() => handleEditShow(item)}><img  src={editIcon} alt="" /></Button></td>
                            </tr>
                        </tbody>
                    )
                })}
            </Table>
        </div>
        <VitalsEditModal fetchPatientDetails={fetchPatientDetails} setSuccessfullyUpdated={setSuccessfullyUpdated} vitals={vitals} handleEditClose={handleEditClose} setEditModalShow={setEditModalShow} editModalShow={editModalShow} />
    </div>
  )
}

export default Vitals