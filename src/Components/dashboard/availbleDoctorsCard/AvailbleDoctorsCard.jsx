import React from 'react'
import './availbleDoctorsCard.scss';
import { ProgressBar, Table } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AvailbleDoctorsCard = ({ dashboardData, availableDoctors, heading, headers, identity, fromRecent }) => {

    const navigate = useNavigate();

    const handleAction = (item) => {
        const existingPatientID = Cookies.get('patientID');
        if (existingPatientID) {
            Cookies.remove('patientID');
        }
        Cookies.set('patientID', item?.id);
        navigate('/patient/patient-profile');
    };

    return (
        <div className={`availbleDoctorsCard mainBoxTable`}>
            {identity === "availableDoctor" && <h3 className='availableDoctorHeading'> {heading} </h3>}
            {identity === "recentPatients" && (
                <div className='headingWrapper'>
                    <h3 className='availableDoctorHeading'> {heading} </h3>
                    <div className='completebarWrapper'>
                        <div className='progressbarWrapper'>
                            <h4>Completed</h4>
                            <p>{dashboardData?.total_complete_count}/{dashboardData?.total_count}</p>
                        </div>
                        <ProgressBar now={dashboardData?.total_complete_count/dashboardData?.total_count*100} className='completeProgress'/>
                    </div>
                </div>
            )}
            <div className={fromRecent ? 'w-100 tableHeight recent_table' : 'w-100 tableHeight'}>
                <Table className='table-data'>
                    <thead>
                        <tr>
                            {headers.map((item, i) => {
                                return (<>
                                    <th key={i}>{item}</th>
                                </>)
                            })}
                        </tr>
                    </thead>
                    <tbody >
                        {identity === "availableDoctor" && availableDoctors?.length > 0 &&
                            availableDoctors?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>Dr. {item?.doctor_name}</td>
                                        <td>{item?.status}</td>
                                        <td>{item?.patient_name}</td>
                                        <td className='patient-counttt'>{item?.count}</td>
                                        <td className='site-txtt'>{item?.site}</td>
                                    </tr>
                                )
                            })
                        }
                        {identity === "recentPatients" && dashboardData?.recent_patients?.length > 0 &&
                            dashboardData?.recent_patients?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td> {item?.mr_no}</td>
                                        <td>{item?.patient_name}</td>
                                        <td>{item?.mobile_number}</td>
                                        <td>{item?.last_visit}</td>
                                        <td>{item?.last_visit_status}</td>
                                        {identity === "recentPatients" &&
                                            <td >
                                                <button onClick={() => handleAction(item)} className='view-btn'> VIEW </button>
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default AvailbleDoctorsCard;
