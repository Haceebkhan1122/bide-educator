import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import LabReportModal from '../../labReportModal/LabReportModal';
import './labReportsEducator.scss';
import API from '../../../utils/httpService';
import moment from 'moment';

const LabReportsEducator = ({selectedPatientId, patientDetails}) => {
    const [addLabReports, setAddLabReports] = useState(false);
    const handleCloseLabReports = () => setAddLabReports(false);
    const handleShowLabReports = () => setAddLabReports(true);
    const [labsData, setLabsData] = useState([])

    const headers = [
        "Date ",
        " Lab  Name",
        " ECG",
        " RBS",
        " Hb1Ac",
        " S.Cr.",
        "Urine DR ",
        " M.Alb",
        " 24h",
        " 24h CCT",
        "Lipid ",
        "Chol ",
        "ECG",
        "ETT",
        "Echo",
        "T3",
        "T4",
        "TSH",
        "CDS",
        "Glocose",
        "HBS",
        "X-Ray Chest",
        "Remarks",
    ]

    const gettingLabReports = async () => {
        try {
            if(selectedPatientId){
                const response = await API.get(`/patient/get-reports?patient_id=${selectedPatientId}`)
                setLabsData(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingLabReports()
    }, [selectedPatientId])

    return (
        <>
            <div className='labReportsEducator p-0'>
                <div className="wraperAll">
                    <div className="wraperLabsTable">
                        <Table responsive className='table-data-labs-report'>
                            <thead>
                                <tr>
                                    {headers.map((item, i) => {
                                        return (<>
                                            <th key={i}>{item}</th>
                                        </>)
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {labsData?.map((item) => (
                                    <tr>
                                    <td>{moment(item?.date)?.format('DD/MM/YYYY')}</td>
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
                                    <td>{item?.ecg}</td>
                                    <td>{item?.ett}</td>
                                    <td>{item?.echo}</td>
                                    <td>{item?.t3}</td>
                                    <td>{item?.t4}</td>
                                    <td>{item?.tsh}</td>
                                    <td>{item?.cds}</td>
                                    <td>{item?.glucose}</td>
                                    <td>{item?.hbs}</td>
                                    <td>{item?.xray_chest}</td>
                                    <td>{item?.remarks}</td>
                                </tr>
                                ))
                                    }
                            </tbody>
                        </Table>
                    </div>
                    <button className='continueBtn'> CONTINUE  </button>
                </div>
            </div>
            <LabReportModal addLabReports={addLabReports} handleCloseLabReports={handleCloseLabReports} />
        </>
    )
}

export default LabReportsEducator;

