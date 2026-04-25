import React, { useEffect, useState } from 'react'
import './labReportsAppointments.scss';
import { Table } from 'react-bootstrap';
import LabReportModal from '../../labReportModal/LabReportModal';
import API from '../../../utils/httpService';
import Cookies from 'js-cookie';

const LabReportsAppointments = ({ setKey }) => {
    const [addLabReports, setAddLabReports] = useState(false);
    const handleCloseLabReports = () => setAddLabReports(false);
    const handleShowLabReports = () => setAddLabReports(true);
    const [labsData, setLabsData] = useState([])
    const [patient_id, Setpatient_id] = useState('');
    const [isReturningPatient, setIsReturningPatient] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState('');

    useEffect(() => {
        const patientId = Cookies.get('selectedPatientId')
        const isReturningPatient = Cookies.get('isReturningPatient')
        setSelectedPatientId(patientId)
        setIsReturningPatient(isReturningPatient)
    }, [addLabReports])

    useEffect(() => {
        const patientId = Cookies.get('patient_id')
        Setpatient_id(patientId)
    }, [addLabReports])

    const gettingLabReports = async () => {
        try {
            if (selectedPatientId || patient_id) {
                const response = await API.get(`/patient/get-reports?patient_id=${isReturningPatient ? selectedPatientId : patient_id}`)
                setLabsData(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingLabReports()
    }, [patient_id])

    const handleLabReport = () => {
        setKey('diabetesHistory')
    }

    return (
        <>
            <button className='add__btn' onClick={handleShowLabReports}> ADD </button>
            <div className='labReportsAppointments p-0'>
                <div className="wraperAll">
                    <div className="wraperLabsTable">
                        <Table responsive className='table-data-labs-report'>
                            <thead>
                                <tr>
                                    <th>  Date </th>
                                    <th> Lab <br /> Name  </th>
                                    <th> ECG  </th>
                                    <th>RBS   </th>
                                    <th> Hb1Ac  </th>
                                    <th> S.Cr. </th>
                                    <th> Urine DR  </th>
                                    <th> M.Alb  </th>
                                    <th> 24h <br /> UP  </th>
                                    <th> 24h <br /> CCT  </th>
                                    <th> Lipid  </th>
                                    <th> HDL  </th>
                                    <th> FBS  </th>
                                    <th> Glucose  </th>
                                    <th> Trigly </th>
                                    <th> Echo </th>
                                    <th>LDL. </th>
                                    <th>T3 </th>
                                    <th>ETT </th>
                                    <th>HBS </th>
                                    <th>Chol</th>
                                    <th>T4 </th>
                                    <th>X-Ray Chest </th>
                                    <th>CDS </th>
                                    <th>TSH </th>
                                    <th>Remarks </th>
                                </tr>
                            </thead>
                            <tbody>
                                {labsData.length > 0 ? labsData.map((item) => (
                                    <tr>
                                        <td>{item?.date}</td>
                                        <td>{item?.lab_name}</td>
                                        <td>{item?.ecg}</td>
                                        <td>{item?.rbs}</td>
                                        <td>{item?.hba1c}</td>
                                        <td>{item?.s_creatinine}</td>
                                        <td>{item?.urine_dr}</td>
                                        <td>{item?.alb}</td>
                                        <td>{item?.hup}</td>
                                        <td>{item?.tfh_cct}</td>
                                        <td>{item?.total_lipid}</td>
                                        <td>{item?.hdl}</td>
                                        <td>{item?.fbs}</td>
                                        <td>{item?.glucose}</td>
                                        <td>{item?.triglyceride}</td>
                                        <td>{item?.echo}</td>
                                        <td>{item?.ldl}</td>
                                        <td>{item?.t3}</td>
                                        <td>{item?.ett}</td>
                                        <td>{item?.hbs}</td>
                                        <td>{item?.cholesterol}</td>
                                        <td>{item?.t4}</td>
                                        <td>{item?.xray_chest}</td>
                                        <td>{item?.cds}</td>
                                        <td>{item?.tsh}</td>
                                        <td>{item?.remarks}</td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colspan="27" className='table-td'>
                                        <div className='empyAddRec'> Add Records </div>
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                    <button className='continueBtn' onClick={handleLabReport}> CONTINUE  </button>
                </div>
            </div>
            <LabReportModal gettingLabReports={gettingLabReports} addLabReports={addLabReports} handleCloseLabReports={handleCloseLabReports} />
        </>
    )
}

export default LabReportsAppointments;

