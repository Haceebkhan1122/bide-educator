import React from 'react'
import { Table } from 'react-bootstrap';
import './medicalHistoryEducator.scss';
import deleteIcon from '../../../assets/images/svg/deleteIcon.svg';

const MedicalHistoryEducator = ({patientDetails}) => {
    return (
        <div className='medicalHistoryEducator'>
                <Table className='table-data-labs-report'>
                    <thead>
                        <tr>
                            <th> Date </th>
                            <th> Question </th>
                            <th> Response </th>
                            <th> Remarks </th>
                            <th> Action  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientDetails?.patient_medical_history_array?.medical_history?.length > 0 && patientDetails?.patient_medical_history_array?.medical_history?.map((item) => {
                            return (
                                <>
                                    <tr>
                                        <td>{patientDetails?.patient_medical_history_array?.date}</td>
                                        <td>{item?.Question}</td>
                                        <td>{item?.Answer == 1 ? 'Yes' : 'No'}</td>
                                        <td>{item?.Response}</td>
                                        <td> <img src={deleteIcon} alt="" /> </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
    )
}

export default MedicalHistoryEducator;
