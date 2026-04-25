import React, {useState} from 'react'
import './medicalHistoryProfile.scss';
import {Table, Button} from 'react-bootstrap';
import MedicalHistoryModal from './medicalHistoryModalProfile/MedicalHistoryModal';
import deletIcon from '../../../assets/images/svg/deleteIcon.svg';

const MedicalHistory = ({medicalHistory,patientMedicalHistory,fetchPatientDetails,setSuccessfullyUpdated}) => {
    const [editModal, setEditModal] = useState(false);

    const handleEditClose = () => setEditModal(false);
    const handleEditShow = () => setEditModal(true);

console.log({medicalHistory})

    return (
        <div className='medicalHistory p-0'>
            <form>
                <div className="">
                    <Table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Question</th>
                                <th>Response</th>
                                <th>Remarks</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {/* {medicalHistory?.medical_history?.length > 0 && (
                            <tbody>
                            <tr>
                            <td>{medicalHistory?.date}</td>
                            <td>{medicalHistory?.medical_history?.map((item) => (
                                <div className='d-block my-1'>{item?.Question}</div>
                            ))}</td>
                             <td>{medicalHistory?.medical_history?.map((item) => (
                                <div className='d-block my-1'>{item?.Answer == 0 ? 'No' : 'Yes' }</div>
                            ))}</td>
                            <td>
                              {medicalHistory?.medical_history?.map((item, index) => {
                                return !item?.Response ? (
                                    <div key={index} className='d-block my-1'>-</div>
                                ) : (
                                   <div key={index} className='d-block my-1'>{item.Response}</div>
                                );
                                })}
                            </td>
                            <td><Button className='pl-0 pt-0 pb-0 pr-5' onClick={handleEditShow}><img src={deletIcon} alt="" /></Button></td>
                            </tr>
                        </tbody>

                        )} */}

                    <tbody>
                        {medicalHistory?.medical_history?.length > 0 && medicalHistory?.medical_history?.map((item) => {
                            return (
                                <>
                                    <tr>
                                        <td>
                                            {item?.Question == 'Previous Treat' ? (
                                                medicalHistory?.date
                                            ) : null}
                                        </td>
                                        <td>{item?.Question}</td>
                                        <td>{item?.Answer == 1 ? 'Yes' : 'No'}</td>
                                        <td>
                                    
                                            { !item?.Response ? (
                                            <div className='d-block my-1'>-</div>
                                        ) : (
                                        <div className='d-block my-1 responss'>{item.Response}</div>
                                        )}
                                        
                                    </td>
                                        <td>
                                            {item?.Question == 'Previous Treat' ? (
                                                <Button className='pl-0 pt-0 pb-0 pr-5' onClick={handleEditShow}><img src={deletIcon} alt="" /></Button>
                                            ) : null}
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                    </Table>
                </div>
            </form>
            <MedicalHistoryModal setEditModal={setEditModal} fetchPatientDetails={fetchPatientDetails} setSuccessfullyUpdated={setSuccessfullyUpdated}  patientMedicalHistory={patientMedicalHistory} handleEditClose={handleEditClose} editModal={editModal}  />
        </div>
    )
}

export default MedicalHistory;
