import React, { useEffect, useState } from 'react'
import { Table, Row, Col, Container } from 'react-bootstrap';
import SmbgModal from '../../smbgModal/SmbgModal';
import { DatePicker } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditIcon } from 'evergreen-ui';
import './diabitiesHistoryEducator.scss';
import deleteIcon from '../../../assets/images/svg/deleteIcon.svg'
import moment from 'moment';
import API from '../../../utils/httpService';
import DiabetesHistoryEditModal from '../../tabsContentProfile/diabetesHistoryProfile/diabetesHistoryEditModal/DiabetesHistoryEditModal';

const DiabitiesHistoryEducator = ({selectedPatientId, patientDetails}) => {
    const headers = ["Pre Breakfast", "Post Breakfast", "Pre Lunch", "Post Lunch", "Pre Dinner"]
    const [showSmbgModal, setShowSmbgModal] = useState(false);
    const handleCloseSmgModal = () => setShowSmbgModal(false);
    const handleShowSmgModal = () => setShowSmbgModal(true);

    const [diabetic, setDiabetic] = useState('')
    const [yearDiagnosed, setYearDiagnosed] = useState(null);
    const [takingInsulin, setTakingInsulin] = useState(null);
    const [takingInsulinInput, setTakingInsulinInput] = useState(null);
    const [ketoacidosis, setKetoacidosis] = useState(null);
    const [ketoacidosisInput, setKetoacidosisInput] = useState(null);
    const [remarks, setRemarks] = useState(null);
    const [remarksInput, setRemarksInput] = useState(null);
    const [smbgData, setSmbgData] = useState([])
    const [modalSmbg, setModalSmbg] = useState();
    const [editModalShow, setEditModalShow] = useState(false);


    useEffect(() => {
        if(patientDetails){
            setDiabetic(patientDetails?.patient_diabetes_history?.type )
            setTakingInsulin(patientDetails?.patient_diabetes_history?.insulin == null ? "" : patientDetails?.patient_diabetes_history?.insulin == 0 ? 'No' : 'Yes')
            setKetoacidosis(patientDetails?.patient_diabetes_history?.keto_diagnosis == null ? "" : patientDetails?.patient_diabetes_history?.keto_diagnosis == 0 ? 'No' : 'Yes')
            setRemarks(patientDetails?.patient_diabetes_history?.remarks == 0 ? 'No' : 'Yes')
            setRemarksInput(patientDetails?.patient_diabetes_history?.remarks)
            setTakingInsulinInput(patientDetails?.patient_diabetes_history?.insulin_details)
            setKetoacidosisInput(patientDetails?.patient_diabetes_history?.keto_details)
            setYearDiagnosed(patientDetails?.patient_diabetes_history?.year_diagnosed)
            
        }
    },[patientDetails])

    const gettingSMBG = async () => {
        try {
            if(selectedPatientId){
                const response = await API.get(`patient/get-smbg?patient_id=${selectedPatientId}`)
                setSmbgData(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingSMBG()
    }, [selectedPatientId])

    const handleYearDiagnosedChange = (date, dateString) => {
        if (dateString) {
            const year = moment(dateString, 'YYYY-MM-DD').format('YYYY');
            setYearDiagnosed(year);
        } else {
            setYearDiagnosed(null);
        }
    };

    const handleEditClose = () => setEditModalShow(false);

    const handleEditShow = (items) => {
        setModalSmbg(items)
        setEditModalShow(true)
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={6} className='diabitiesHistoryEducator'>
                        <div className="left">
                            <div className="single dd">
                                <FontAwesomeIcon icon="fas fa-calendar-alt" className='ss' />
                                <DatePicker placeholder={patientDetails?.patient_diabetes_history?.date} className='datePicker01' />
                            </div>
                            <div className="single__types">
                                    <h3>Type of Diabetes </h3>
                                    <div className='wraper-checks'>
                                        <div className="single_check checks_radio_customSmall" >
                                            <input type="radio" name='type[]'
                                             value='pre_diabetes'
                                            checked={diabetic == 'pre_diabetes'}
                                            onChange={() => setDiabetic('pre_diabetes')}
                                            />
                                            <label htmlFor=""> Pre Diabetes </label>
                                        </div>
                                        <div className="single_check checks_radio_customSmall">
                                            <input type="radio" name='type[]'
                                             value='i_diabete'
                                             checked={diabetic == 'i_diabete'}
                                             onChange={() => setDiabetic('i_diabete')}
                                            />
                                            <label htmlFor=""> Type i Diabetes </label>
                                        </div>
                                        <div className="single_check checks_radio_customSmall">
                                            <input type="radio" name='type[]'
                                            value='iI_diabetes'
                                            checked={diabetic == 'iI_diabetes'}
                                            onChange={() => setDiabetic('iI_diabetes')}
                                            />
                                            <label htmlFor=""> Type iI Diabetes </label>
                                        </div>
                                        <div className="single_check checks_radio_customSmall">
                                            <input type="radio" name='type[]'
                                            value='ges_diabetes'
                                            checked={diabetic == 'ges_diabetes'}
                                            onChange={() => setDiabetic('ges_diabetes')}
                                            />
                                            <label htmlFor=""> Gestational Diabetes </label>
                                        </div>
                                    </div>
                                </div>
                            <div className="single dd">
                                <h3>Year Diagnosed </h3>
                                <FontAwesomeIcon icon="fas fa-calendar-alt" className='ss' />
                                <DatePicker
                                        placeholder="Select Year"
                                        className='datePicker01'
                                        format="YYYY"
                                        value={yearDiagnosed ? moment(yearDiagnosed, 'YYYY') : null}
                                        onChange={handleYearDiagnosedChange}
                                    />
                            </div>
                            
                            <div className="wraper-dialog">
                                    <div className="first-top">
                                        <h3> Is patient taking insulin? </h3>
                                        <div className="checks-single-wraper">
                                            <div className="yes-single checks_radio_customSmall">
                                                <input type="radio" name='insulin'
                                                value='Yes'
                                                checked={takingInsulin == 'Yes'}
                                                onChange={() => setTakingInsulin('Yes')}
                                                />
                                                <label htmlFor="">Yes</label>
                                            </div>
                                            <div className="yes-single checks_radio_customSmall">
                                                <input type="radio" name='insulin'
                                                value='No'
                                                checked={takingInsulin == 'No'}
                                                onChange={() => setTakingInsulin('No')}
                                                />
                                                <label htmlFor="">No</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea name="" id="" placeholder='' disabled={takingInsulin == 'No'} value={takingInsulinInput} onChange={(e) => setTakingInsulinInput(e.target.value)}/>
                                </div>

                                <div className="wraper-dialog">
                                    <div className="first-top">
                                        <h3> Is patient diagnosed with Ketoacidosis? </h3>
                                        <div className="checks-single-wraper">
                                            <div className="yes-single checks_radio_customSmall">
                                                <input type="radio" name='Ketoacidosis'
                                                value='Yes'
                                                checked={ketoacidosis == 'Yes'}
                                                onChange={() => setKetoacidosis('Yes')}
                                                />
                                                <label htmlFor="">Yes</label>
                                            </div>
                                            <div className="yes-single checks_radio_customSmall">
                                                <input type="radio" name='Ketoacidosis'
                                                value='No'
                                                checked={ketoacidosis == 'No'}
                                                onChange={() => setKetoacidosis('No')}
                                                />
                                                <label htmlFor="">No</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea name="" id="" placeholder='' disabled={ketoacidosis == 'No'} value={ketoacidosisInput} onChange={(e) => setKetoacidosisInput(e.target.value)}/>
                                </div>

                                <div className="wraper-dialog">
                                    <div className="first-top" style={{marginBottom:'10px'}}>
                                        <h3> Remarks </h3>
                                        {/* <div className="checks-single-wraper">
                                            <div className="yes-single checks_radio_customSmall">
                                                <input type="radio" name='remarks'
                                                value='Yes'
                                                checked={remarks == 'Yes'}
                                                onChange={() => setRemarks('Yes')}
                                                />
                                                <label htmlFor="">Yes</label>
                                            </div>
                                            <div className="yes-single checks_radio_customSmall">
                                                <input type="radio" name='remarks'
                                                value='No'
                                                checked={remarks == 'No'}
                                                onChange={() => setRemarks('No')}
                                                />
                                                <label htmlFor="">No</label>
                                            </div>
                                        </div> */}
                                    </div>
                                    <textarea name="" id="" placeholder='' disabled={remarks == 'No'} value={remarksInput} onChange={(e) => setRemarksInput   (e.target.value)}/>
                                </div>
                        </div>
                    </Col>
                    <Col md={6} className='diabitiesHistoryEducator'>
                        <div className="right">
                            <div className="top-right">
                                <h3> SMBG  </h3>
                            </div>
                            <div className="bottom-right">
                                <Table responsive className="table-diabities" >
                                    <thead>
                                        <tr>
                                            <th className='align-middle'>Date</th>
                                            <th className='align-middle'>Pre <br></br>Breakfast</th>
                                            <th className='align-middle'>Post <br></br> Breakfast</th>
                                            <th className='align-middle'>Pre <br></br>Lunch</th>
                                            <th className='align-middle'>Post <br></br>Lunch</th>
                                            <th className='align-middle'>Pre <br></br> Dinner</th>
                                            <th className='align-middle'>Post <br></br> Dinner</th>
                                            <th className='align-middle'>Before <br></br> Bed</th>
                                            <th className='align-middle'>Random</th>
                                            <th className='align-middle'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                              smbgData?.map((item) => (
                                            <tr>
                                                <td>{item?.date}</td>
                                                <td>{item?.pre_breakfast}</td>
                                                <td>{item?.post_breakfast}</td>
                                                <td>{item?.pre_lunch}</td>
                                                <td> {item?.post_lunch}</td>
                                                <td> {item?.pre_dinner}</td>
                                                <td>{item?.post_dinner}</td>
                                                <td>{item?.before_bed}</td>
                                                <td>{item?.random}</td>
                                                <td>
                                                    <div className="btnEdit">
                                                        {/* <button> Print </button> */}
                                                        <img src={deleteIcon} alt="" onClick={() => handleEditShow(item)}></img>
                                                    </div>
                                                </td>
                                            </tr>
                                              ))  
                                            }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <SmbgModal showSmbgModal={showSmbgModal} handleCloseSmgModal={handleCloseSmgModal} />
            <DiabetesHistoryEditModal setSmbg={setSmbgData}  modalSmbg={modalSmbg} handleEditClose={handleEditClose} setEditModalShow={setEditModalShow} editModalShow={editModalShow} />

        </>
    )
}

export default DiabitiesHistoryEducator;
