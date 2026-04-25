import React, { useEffect, useState } from 'react'
import { Table, Row, Col, Container } from 'react-bootstrap';
import SmbgModal from '../../smbgModal/SmbgModal';
import { DatePicker } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './diabitiesHistoryAppointments.scss';
import API from '../../../utils/httpService';
import Cookies from 'js-cookie';
import moment from 'moment';

const DiabitiesHistoryAppointments = ({ returnPatientDetails, setKey }) => {
    const headers = ["Pre Breakfast", "Post Breakfast", "Pre Lunch", "Post Lunch", "Pre Dinner"]
    const [showSmbgModal, setShowSmbgModal] = useState(false);
    const handleCloseSmgModal = () => setShowSmbgModal(false);
    const handleShowSmgModal = () => setShowSmbgModal(true);
    const [smbgData, setSmbgData] = useState([])
    const [patient_id, Setpatient_id] = useState('');
    const [diabetic, setDiabetic] = useState('')
    const [yearDiagnosed, setYearDiagnosed] = useState(null);
    const [takingInsulin, setTakingInsulin] = useState('No');
    const [takingInsulinError, setTakingInsulinError] = useState('');
    const [takingInsulinInput, setTakingInsulinInput] = useState(null);
    const [ketoacidosis, setKetoacidosis] = useState('No');
    const [ketoacidosisError, setKetoacidosisError] = useState('');
    const [ketoacidosisInput, setKetoacidosisInput] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [remarksInput, setRemarksInput] = useState(null);
    const [isReturningPatient, setIsReturningPatient] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState('');

    useEffect(() => {
        const patientId = Cookies.get('selectedPatientId')
        const isReturningPatient = Cookies.get('isReturningPatient')
        setSelectedPatientId(patientId)
        setIsReturningPatient(isReturningPatient)
    }, [])


    useEffect(() => {
        if (returnPatientDetails) {
            setDiabetic(returnPatientDetails?.patient_diabetes_history?.type)
            setTakingInsulin(returnPatientDetails?.patient_diabetes_history?.insulin == null ? "No" : returnPatientDetails?.patient_diabetes_history?.insulin == 0 ? 'No' : 'Yes')
            setKetoacidosis(returnPatientDetails?.patient_diabetes_history?.keto_diagnosis == null ? "No" : returnPatientDetails?.patient_diabetes_history?.keto_diagnosis == 0 ? 'No' : 'Yes')
            setRemarks(returnPatientDetails?.patient_diabetes_history?.remarks == null ? "" : returnPatientDetails?.patient_diabetes_history?.remarks == 0 ? 'No' : 'Yes')
            setTakingInsulinInput(returnPatientDetails?.patient_diabetes_history?.insulin_details)
            setKetoacidosisInput(returnPatientDetails?.patient_diabetes_history?.keto_details)
            setYearDiagnosed(returnPatientDetails?.patient_diabetes_history?.year_diagnosed)

        }
    }, [returnPatientDetails])

    const handleDiabetesHistory = async () => {
        let insulin  = ''
        let ketoDignosis = ''

        if(!takingInsulin){
            insulin = 'Select your insulin status';
        }
        if(!ketoacidosis){
            ketoDignosis = 'Select your ketoacidosis status';
        }
        setTakingInsulinError(insulin)
        setKetoacidosisError(ketoDignosis)
        
        const data = {
            patient_id: isReturningPatient ? +selectedPatientId : Cookies.get('patient_id'),
            year_diagnosed: yearDiagnosed,
            diabetes_type: diabetic,
            type: diabetic,
            insulin: !takingInsulin ? "" : takingInsulin == 'Yes' ? 1 : 0,
            keto_diagnosis: !ketoacidosis ? "" : ketoacidosis == 'Yes' ? 1 : 0,
            insulin_details: takingInsulinInput,
            keto_details: ketoacidosisInput,
            remarks: remarksInput
        }
        try {
            const response = await API.post('/patient/add-diabetes-history', data)
            if (response?.success) {
                setKey('vitals')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleYearDiagnosedChange = (date) => {
        if (date) {
            const selectedYear = date.year();
            setYearDiagnosed(selectedYear);
        } else {
            setYearDiagnosed(null);
        }
    };

    useEffect(() => {
        const patientId = Cookies.get('patient_id')
        Setpatient_id(patientId)
    }, [showSmbgModal]) 

    useEffect(() => {
        if(takingInsulin != ''){
            setTakingInsulinError('')
        }
        if(ketoacidosis != '' ){
            setKetoacidosisError('')
        }
    }, [takingInsulin, ketoacidosis])


    const gettingSMBG = async () => {
        try {
            if (selectedPatientId || patient_id) {
                const response = await API.get(`patient/get-smbg?patient_id=${isReturningPatient ? selectedPatientId : Cookies.get('patient_id')}`)
                setSmbgData(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingSMBG()
    }, [patient_id])

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if needed

    const formattedDate = `${month}/${day}/${year}`;

    return (
        <>
            <div className='diaaa_wrapp'>
                    <Row>
                        <Col md={6} className='diabitiesHistoryAppointments'>
                            <div className="left">
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
                                        <label htmlFor=""> Type I Diabetes </label>
                                    </div>
                                    <div className="single_check checks_radio_customSmall">
                                        <input type="radio" name='type[]'
                                            value='iI_diabetes'
                                            checked={diabetic == 'iI_diabetes'}
                                            onChange={() => setDiabetic('iI_diabetes')}
                                        />
                                        <label htmlFor=""> Type II Diabetes </label>
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

                                <DatePicker
                                    placeholder="Select Year"
                                    className='datePicker01'
                                    picker="year" // Only show year picker
                                    disabledDate={(current) => current && current > moment()} // Disable future years
                                    value={yearDiagnosed ? moment(yearDiagnosed, 'YYYY') : null}
                                    onChange={handleYearDiagnosedChange}
                                />
                            </div>
                            <div className="wraper-dialog position-relative">
                                <div className="first-top test">
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
                                                onChange={() => {
                                                    setTakingInsulin('No');
                                                    setTakingInsulinInput('');
                                                }} 
                                                />
                                                <label htmlFor="">No</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='position-relative'>
                                        <textarea
                                            name=""
                                            id=""
                                            placeholder=''
                                            disabled={ takingInsulin == 'No'}
                                            value={takingInsulinInput}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                if (inputValue.length <= 100) { // Applying 100-character validation
                                                setTakingInsulinInput(inputValue);
                                            }
                                        }}
                                        />
                                        <p className='chrLimit'>100 character limit</p>
                                    </div>

                                {takingInsulinError && <div className="ErrorState">
                                    <span> {takingInsulinError} </span>
                                </div>}

                            </div>

                            <div className="wraper-dialog position-relative">
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
                                                onChange={() => {
                                                    setKetoacidosis('No');
                                                    setKetoacidosisInput('');
                                                }}
                                            />
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='position-relative'>
                                    <textarea name="" id="" placeholder='' disabled={!ketoacidosis || ketoacidosis == 'No'} value={ketoacidosisInput}
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            if (inputValue.length <= 100) { // Applying 100-character validation
                                                setKetoacidosisInput(e.target.value);
                                            }
                                        }}
                                    />
                                    <p className='chrLimit'>100 character limit</p>
                                </div>

                                {ketoacidosisError && <div className="ErrorState">
                                    <span> {ketoacidosisError} </span>
                                </div>}
                            </div>

                            <div className="wraper-dialog position-relative">
                                <div className="first-top">
                                    <h3> Remarks </h3>
                                    <div className="checks-single-wraper d-none">
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
                                        </div>
                                    </div>
                                    <div className='position-relative'>
                                        <textarea
                                            name=""
                                            id=""
                                            placeholder=''
                                            disabled={remarks === 'No'}
                                            value={remarksInput}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                if (inputValue.length <= 100) { // Applying 50-character validation
                                                setRemarksInput(inputValue);
                                            }
                                        }}
                                    />
                                        <p className='chrLimit'>100 character limit</p>
                                    </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className='diabitiesHistoryAppointments diabitiesHistoryHeight'>
                        <div className="right">
                            <div className="top-right">
                                <h3> SMBG  </h3>
                                <button className='right-add-btn' onClick={handleShowSmgModal}> ADD </button>
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
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </Table>
                                {console.log({isReturningPatient})}
                                <div className='buttonGroupSmbg'>
                                    {isReturningPatient == 'true' && (
                                         <button className='continue__btnUpdate' onClick={handleDiabetesHistory}>
                                         UPDATE DATA
                                     </button>
                                    )} 
                                <button className='continue__btn' onClick={handleDiabetesHistory}>
                                    CONTINUE
                                </button>
                                </div>
                            </div>
                            </div>
                        </Col>
                    </Row>
            </div>
            <SmbgModal gettingSMBG={gettingSMBG} showSmbgModal={showSmbgModal} handleCloseSmgModal={handleCloseSmgModal} />
        </>
    )
}

export default DiabitiesHistoryAppointments;
