import React, {useState} from 'react'
import './labReportsProfile.scss';
import {Table, Button} from 'react-bootstrap';
import LabReportsEditModal from './labReportsEditModal/LabReportsEditModal'
import LabReportsViewModal from './labReportsViewModalProfile/LabReportsViewModalProfile';
import moment from 'moment';
import editicon from '../../../assets/images/svg/deleteIcon.svg';

const LabReports = ({labsReports,fetchPatientDetails,setSuccessfullyUpdated}) => { 
    const [editModalShow, setEditModalShow] = useState(false);
    const [viewModalShow, setViewModalShow] = useState(false);
    const [report, setReport] = useState({});
    const [remarks, setRemarks] = useState({});

    
    const handleEditShow = (remarks) => {
        setRemarks(remarks)
        setEditModalShow(true);
    }
    const handleEditClose = () => {
        setEditModalShow(false);
    }

    const handleViewClose = () => {
        setViewModalShow(false);
    }

    const handleViewShow = () => {
        setViewModalShow(true);
    }

  return (
    <div className='labReports p-0'>
        <form className='form'>
            <div className="wraperForm ">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Lab Name</th>
                            <th>ECG</th>
                            <th>RBS</th>
                            <th>Hb1Ac</th>
                            <th>S.Cr.</th>
                            <th>Urine DR</th>
                            <th>M.Alb</th>
                            <th>24h UP</th>
                            <th>24h CCT</th>
                            <th>Chol</th>
                            <th>ECG</th>
                            <th>ETT</th>
                            <th>Echo</th>
                            <th>T3</th>
                            <th>T4</th>
                            <th>TSH</th>
                            <th>CDS</th>
                            <th>Glocose</th>
                            <th>HBS</th>
                            <th>X-Ray Chest</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                    {labsReports?.map((report,index) => {
                        return (
                            <tr key={index}>
                                <td>{moment(report?.date).format('DD/MM/YYYY')}</td>
                                <td>{report?.lab_name}</td>
                                <td>{report?.ecg}</td>
                                <td>{report?.rbs}</td>
                                <td>{report?.hba1c}</td>
                                <td>{report?.s_creatinine}</td>
                                <td>{report?.urine_dr}</td>
                                <td>{report?.microalbumin}</td>
                                <td>{report?.tfh_u_protein}</td>
                                <td>{report?.tfh_cct}</td>
                                <td>{report?.cholesterol}</td>
                                <td>{report?.ecg}</td>
                                <td>{report?.ett}</td>
                                <td>{report?.echo}</td>
                                <td>{report?.t3}</td>
                                <td>{report?.t4}</td>
                                <td>{report?.tsh}</td>
                                <td>{report?.cds}</td>
                                <td>{report?.glucose}</td>
                                <td>{report?.hbs}</td>
                                <td>{report?.xray_chest}</td>
                                <td>
                                    <div className='d-flex align-items-center justify-content-between gap-2'>
                                        <Button className='p-0 view' onClick={() => handleEditShow(report)}>View</Button>


                                        <Button className='p-0' onClick={(e) => {
                                            handleViewShow();
                                            setReport(report)
                                        }} ><img src={editicon} alt="" /></Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        </form>

        <LabReportsEditModal report={report} remarks={remarks} handleEditClose={handleEditClose} editModalShow={editModalShow} />

        <LabReportsViewModal report={report} fetchPatientDetails={fetchPatientDetails} setSuccessfullyUpdated={setSuccessfullyUpdated}  setViewModalShow={setViewModalShow} handleViewClose={handleViewClose} viewModalShow={viewModalShow} />
    </div>
  )
}

export default LabReports;
