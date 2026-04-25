import React, {useEffect, useState} from 'react'
import './diabetesHistoryProfile.scss';
import { Col, Row, Table, Button } from 'react-bootstrap';
import DiabetesHistoryEditModal from './diabetesHistoryEditModal/DiabetesHistoryEditModal';
import {  DatePicker } from 'antd';
import moment from 'moment';
import API from '../../../utils/httpService';
import Loader from '../../customLoader/loader';
import editIcon from '../../../assets/images/svg/deleteIcon.svg';
import Cookies from 'js-cookie';

const DiabetesHistory = ({setSmbg, diabetesHistory,smbg,fetchPatientDetails,setSuccessfullyUpdated}) => {
    const [editModalShow, setEditModalShow] = useState(false);
    const [typeOfDiabetic, setTypeOfDiabetic] = useState('');
    const [yearsDiagnosed, setYearsDiagnosed] = useState(false);
    const [insulin, setInsulin] = useState(false);
    const [insulinDetails, setInsulinDetails] = useState('');
    const [ketoDiagnosis, setKetoDiagnosis] = useState(false);
    const [ketoDetails, setKetoDetails] = useState('');
    const [remarks, setRemarks] = useState('');
    const [date, setDate] = useState(false);
    const [patientId, setPatientId] = useState();
    const [loading, setLoading] = useState(false);
    const [modalSmbg, setModalSmbg] = useState();

    const [takingInsulinError, setTakingInsulinError] = useState('');
    const [ketoacidosisError, setKetoacidosisError] = useState('');

    const handleEditClose = () => setEditModalShow(false);
    const handleEditShow = (items) => {
        setModalSmbg(items)
        setEditModalShow(true)
    };
     useEffect(() => {
      if(diabetesHistory){
        setDate(diabetesHistory?.date);
        setTypeOfDiabetic(diabetesHistory?.type);
        setYearsDiagnosed(diabetesHistory?.year_diagnosed);
        setInsulin(diabetesHistory?.insulin == null ? " " : diabetesHistory?.insulin == 0 ? 'No' : 'Yes');
        setInsulinDetails(diabetesHistory?.insulin_details);
        setKetoDetails(diabetesHistory?.keto_details);
        setKetoDiagnosis(diabetesHistory?.keto_diagnosis == null ? " " : diabetesHistory?.keto_diagnosis == 0 ? 'No' : 'Yes')
        setPatientId(diabetesHistory?.patient_id);  
        setRemarks(diabetesHistory?.remarks)
      }
    }, [diabetesHistory])

    const updateDiabeticHistory = async () => {
        let hasError = false
        let insulinErr  = ''
        let ketoDignosisErr = ''

        if(!insulin || insulin == ' '){
            insulinErr = 'Select your insulin status';
            hasError = true
        }
        if(!ketoDiagnosis  || ketoDiagnosis == ' '){
            ketoDignosisErr = 'Select your ketoacidosis status';
            hasError = true
        }
        setTakingInsulinError(insulinErr)
        setKetoacidosisError(ketoDignosisErr)

        if(hasError){
            return
        }

        setLoading(true)
           const data = {
            type : typeOfDiabetic,
            year_diagnosed : yearsDiagnosed,
            insulin: insulin == 'No' ? 0 : 1,
            keto_diagnosis : ketoDiagnosis == 'No' ? 0 : 1,
            insulin_details: insulinDetails,
            keto_details : ketoDetails,
            patient_id : patientId ? patientId : Cookies.get('patientID'),
            remarks: remarks,
        }
        try {
            const response = await API.post("patient/add-diabetes-history",data)
            if(response?.status == 201){
                fetchPatientDetails()
                setSuccessfullyUpdated(true)
                setLoading(false)
                setTimeout(() => {
                    setSuccessfullyUpdated(false)
                    }, 1500);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(insulin != ' '){
            setTakingInsulinError('')
        }
        if(ketoDiagnosis != ' ' ){
            setKetoacidosisError('')
        }
    }, [insulin, ketoDiagnosis])

 
    const handleDateChange = (date, dateString) => {
        if (dateString) {
            const year = moment(dateString, 'YYYY-MM-DD').format('YYYY');
            setYearsDiagnosed(year);
        } else {
            setYearsDiagnosed(null);
        }
    };

    const { YearPicker } = DatePicker;
 return (
    <>
    {loading && <Loader/>}
        <Row>
            <Col md={6}>
                <div className='diabetesHistory'>
                    <form>
                        <div className="wraperForm ">
                            <div className="single">
                                <label htmlFor="">Type of Diabetes </label>
                                <div className="checks-single-wraper">
                                    <div className="yes-single">
                                        <input checked={typeOfDiabetic == 'pre_diabetes'} onChange={() => setTypeOfDiabetic('pre_diabetes')} value='pre_diabetes' type="radio" name='pre_diabetes' />
                                        <label htmlFor="">Pre Diabetes</label>
                                    </div>
                                    <div className="yes-single">
                                        <input checked={typeOfDiabetic == 'type_i'} onChange={() => setTypeOfDiabetic('type_i')} value='type_i' type="radio" name='typeI' />
                                        <label htmlFor="">Type i Diabetes</label>
                                    </div>
                                    <div className="yes-single">
                                        <input checked={typeOfDiabetic == 'type_ii'} onChange={() => setTypeOfDiabetic('type_ii')} value='type_ii' type="radio" name='typeII' />
                                        <label htmlFor="">Type iI Diabetes</label>
                                    </div>
                                    <div className="yes-single">
                                        <input checked={typeOfDiabetic == 'gestational_diabetes'} onChange={() => setTypeOfDiabetic('gestational_diabetes')} value='gestationalDiabetes' type="radio" name='diabetes' />
                                        <label htmlFor="">Gestational Diabetes</label>
                                    </div>
                                </div>
                            </div>
                            <div className="single">
                                <label htmlFor="">Year Diagnosed </label>
                                {/* <YearPicker picker="year" placeholder={yearsDiagnosed} disabledDate={disabledDate} onChange={handleDateChange}  className='dateInp' format="yyyy" /> */}
                                <DatePicker
                                    placeholder="Select Year"
                                    className='datePicker01'
                                    picker="year" // Only show year picker
                                    disabledDate={(current) => current && current > moment()} // Disable future years
                                    value={yearsDiagnosed ? moment(yearsDiagnosed, 'YYYY') : null}
                                    onChange={handleDateChange}
                                />
                            </div>
                            <div className='single singleInput'>
                                <div className='single-wrap'>
                                    <label htmlFor="">Is patient taking insulin?</label>
                                    <div className="checks-single-wraper">
                                        <div className="yes-single">
                                            <input value='Yes' checked={insulin == 'Yes'} onChange={() => setInsulin('Yes')} type="radio" name='insulin' />
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className="yes-single">
                                            <input value='No' checked={insulin == 'No'} 
                                            onChange={() => {
                                                setInsulin('No');
                                                setInsulinDetails('');
                                            }} 
                                            type="radio" name='insulin' />
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                </div>
                                <textarea disabled={insulin == ' ' || insulin === 'No'} value={insulinDetails} maxLength={30} onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 100);
                                    setInsulinDetails(inputValue) }}  name="" id="" placeholder='' />
                            </div>

                            {takingInsulinError && <div className="ErrorState">
                                    <span> {takingInsulinError} </span>
                                </div>}

                            <div className='single singleInput'>
                                <div className='single-wrap'>
                                    <label htmlFor="">Is patient diagnosed with Ketoacidosis?</label>
                                    <div className="checks-single-wraper">
                                        <div className="yes-single">
                                            <input value='Yes' checked={ketoDiagnosis == 'Yes'} onChange={() => setKetoDiagnosis('Yes')} type="radio" name='keto' />
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className="yes-single">
                                            <input value='No' checked={ketoDiagnosis == 'No'} 
                                            onChange={() => {
                                                setKetoDiagnosis('No');
                                                setKetoDetails('');
                                            }}  
                                            type="radio" name='keto' />
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                </div>
                                <textarea disabled={ketoDiagnosis == ' ' || ketoDiagnosis === 'No'} value={ketoDetails} maxLength={30} onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 100);
                                    setKetoDetails(inputValue) }} name="" id="" placeholder='' />
                            </div>

                            {ketoacidosisError && <div className="ErrorState">
                                    <span> {ketoacidosisError} </span>
                                </div>}

                            <div className='single singleInput'>
                                <label htmlFor="">Remarks</label>
                                <textarea value={remarks} onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 100);
                                    setRemarks(inputValue) }} name="" id="" placeholder='' />
                            </div>
                        </div>
                    </form>
                </div>
            </Col>
            <Col md={6}>
                <div className='diabetesHistory px-0'>
                    <div className="wraperForm borderNone">
                        <div className="top-right">
                            <h3> SMBG  </h3>
                        </div>
                        <div className='diabetesheight'>
                            <Table responsive className='table-diabities'>
                                <thead style={{verticalAlign:'middle'}}>
                                    <tr>
                                            <th>Date</th>
                                            <th>Pre <br></br>Breakfast</th>
                                            <th>Post <br></br> Breakfast</th>
                                            <th>Pre <br></br>Lunch</th>
                                            <th>Post <br></br>Lunch</th>
                                            <th>Pre <br></br> Dinner</th>
                                            <th>Post <br></br> Dinner</th>
                                            <th>Before <br></br> Bed</th>
                                            <th>Random</th>
                                            <th >Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {smbg?.map((items) => {
                                        return (
                                        <tr key={items?.id} style={{borderBottom: '0.3px solid #9A9A9A'}}>
                                            <td>{items?.date}</td>
                                            <td>{items?.pre_breakfast}</td>
                                            <td>{items?.post_breakfast}</td>
                                            <td>{items?.pre_lunch}</td>
                                            <td>{items?.post_lunch}</td>
                                            <td>{items?.pre_dinner}</td>
                                            <td>{items?.post_dinner}</td>
                                            <td>{items?.before_bed}</td>
                                            <td>{items?.random}</td>
                                            <td>
                                                <div className='d-flex align-items-center justify-content-between gap3'>
                                                    {/* <Button className='p-0 print'>Print</Button> */}
                                                    <Button className='p-0' onClick={() => handleEditShow(items)}><img src={editIcon} alt="" /></Button>
                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div >
                        <button onClick={updateDiabeticHistory} className='update__btn'> 
                                UPDATE DATA
                        </button>
                    </div>
                </div>
            </Col>
        </Row>
        <DiabetesHistoryEditModal setSmbg={setSmbg} fetchPatientDetails={fetchPatientDetails} setSuccessfullyUpdated={setSuccessfullyUpdated} modalSmbg={modalSmbg} handleEditClose={handleEditClose} setEditModalShow={setEditModalShow} editModalShow={editModalShow} />
    </>
  )
}

export default DiabetesHistory
