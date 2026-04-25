import React, { useEffect, useState } from 'react'
import './labReportModal.scss'
import { Accordion, Card, Modal, useAccordionButton } from 'react-bootstrap';
import dayjs from 'dayjs';
import CustomToggle from './customToggle';
import { DatePicker  } from 'antd';
import arrowBtn from '../../assets/images/svg/arrowBtn.svg';
import API from '../../utils/httpService';
import Cookies from 'js-cookie';
import moment from 'moment';

const LabReportModal = ({gettingLabReports, addLabReports, handleCloseLabReports }) => {
    const [value, setValue] = useState(dayjs('2022-04-17'));
    const [fbs, setFbs] = useState('')
    const [rbs, setRbs] = useState('')
    const [hb1Ac, setHb1Ac] = useState('')
    const [sCr, setScr] = useState('')
    const [MAlb, setMAlb] = useState('')
    const [hUP24, set24hUP] = useState('')
    const [hCCT24, set24hCCT] = useState('')
    const [lipid, setLipid] = useState('')
    const [trigly, setTrigly] = useState('')
    const [lDL, setLDL] = useState('')
    const [hDL, setHDL] = useState('')
    const [cCG, setECG] = useState('')
    const [echo, setEcho] = useState('')
    const [t3, setT3] = useState('')
    const [xRayChest, setXRayChest] = useState('')
    const [glucose, setGlucose] = useState('')
    const [hBS, setHBS] = useState('')
    const [urineDR, setUrineDR] = useState('')
    const [chol, setChol] = useState('')
    const [eTT, setETT] = useState('')
    const [cDS, setCDS] = useState('')
    const [labName, setLabName] = useState('')
    const [remarks, setRemarks] = useState('')
    const [patient_id, Setpatient_id] = useState('');
    // const [selectedDate, setSelectedDate] = useState(moment().format('YYYY/MM/DD'));
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [isReturningPatient, setIsReturningPatient] = useState('');
    const [nameError, setNameError] = useState('');
    const [dateError, setDateError] = useState('');

    // Get current date and format it as per your requirement
    const currentDate = moment().format('DD/MM/YYYY');
    const currentDateForPayload = moment().format('YYYY-MM-DD');

    useEffect(() => {
        const patientId = Cookies.get('selectedPatientId')
        const isReturningPatient = Cookies.get('isReturningPatient')
        setSelectedPatientId(patientId)
        setIsReturningPatient(isReturningPatient)
    }, [labName])

    useEffect(() => {
        const patientId = Cookies.get('patient_id')
        Setpatient_id(patientId)
    }, [selectedDate, labName])

    const handleLabReports = async () => {
        let dateError = '';
        let nameError = '';
        // if(!selectedDate){
        //     dateError = 'Please select a date'
        // }
        if(!labName){
            nameError = 'Lab Name field is required.';
        }
        // setDateError(dateError)
        setNameError(nameError);
        if(nameError){
            return;
        }else {
            const data = {
                patient_id: isReturningPatient ? selectedPatientId : Cookies.get('patient_id'),
                fbs,
                rbs,
                hba1c: hb1Ac,
                urine_dr: urineDR,
                tfh_cct: hCCT24,
                total_lipid: lipid,
                triglyceride: trigly,
                ldl: lDL,
                hdl: hDL,
                ecg: cCG,
                ett: eTT,
                echo: echo,
                cholesterol: chol,
                t3: t3,
                cds: cDS,
                glucose: glucose,
                hbs: hBS,
                xray_chest: xRayChest,
                remarks: remarks,
                lab_name: labName,
                date: selectedDate ? selectedDate : currentDateForPayload
    
            }
            try {
                const response = await API.post('/patient/add-lab-reports', data)
                if(response?.status == '201'){
                    gettingLabReports()
                    handleCloseLabReports()
                    setFbs('');
                    setRbs('');
                    setHb1Ac('');
                    setScr('');
                    set24hUP('');
                    setMAlb('');
                    set24hCCT('');
                    setLipid('');
                    setLDL('');
                    setHDL('');
                    setECG('');
                    setEcho('');
                    setT3('');
                    setXRayChest('');
                    setUrineDR('');
                    setGlucose('');
                    setUrineDR('');
                    setHBS('');
                    setChol('');
                    setETT('');
                    setCDS('');
                    setRemarks('');
                    setLabName('');
                    setSelectedDate('');
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleDateChange = (date, dateString) => {
        if (dateString) {
            const formattedDate = moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD');
            setSelectedDate(formattedDate);
        } else {
            setSelectedDate(null);
        }
    };

    return (
        <Modal
            className='labReportModal'
            show={addLabReports}
            onHide={handleCloseLabReports}
            centered
        >
            <Modal.Body className='labReportModalBody viewModal '>
                <div className="wraperInfo">
                    <span className='cross_icon_modal' onClick={handleCloseLabReports}>  </span>
                    <h2> LAB REPORTS </h2>
                </div>
                <div className="main-wraping">
                    <div className="left">
                        <div className="top">
                            <div className="single">
                                <label htmlFor=""> DATE </label>
                                <DatePicker
                                  placeholder={currentDate}
                                  format="DD/MM/YYYY"
                                  disabledDate={(current) => {
                                    const tomorrow = moment().add(1, 'day').startOf('day');
                                    return current && current >= tomorrow;
                                  }}
                                  className='datePick'
                                  onChange={handleDateChange}/>
                                  {dateError &&
                                            <span className='ErrorState'>{dateError}</span>
                                    }
                            </div>
                            <div className="single">
                                <label htmlFor=""> Lab Name </label>
                                <input type="text" maxLength={50} className='labInp' placeholder='Enter Lab Name' value={labName}
                                    onChange={(e) => {
                                    const value = e.target.value.slice(0, 50)
                                    setLabName(value)}}/>
                                     {nameError &&
                                            <span className='ErrorState'>{nameError}</span>
                                    }
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> FBS </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={fbs}
                                                onChange={(e) => {
                                                    const value = e.target.value.slice(0, 10)
                                                    setFbs(value)}}/>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> RBS </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={rbs}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setRbs(value)}}/>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> Hb1Ac </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={hb1Ac}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setHb1Ac(value)}}/>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> S. Cr. </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={sCr}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setScr(value)}}/>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> M.Alb </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={MAlb}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setMAlb(value)}}/>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> 24h UP </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={hUP24}
                                             onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                set24hUP(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> 24h CCT </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={hCCT24}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                set24hCCT(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> Lipid </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={lipid}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setLipid(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> Trigly </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={trigly}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setTrigly(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> LDL. </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={lDL}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setLDL(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> HDL. </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={hDL}
                                             onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setHDL(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> ECG </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={cCG}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setECG(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> Echo </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={echo}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setEcho(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> T3 </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={t3}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setT3(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> X-Ray Chest </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={xRayChest}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setXRayChest(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> Glucose </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={glucose}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setGlucose(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> HBS </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={hBS}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setHBS(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> Urine DR </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={urineDR}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setUrineDR(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> Chol </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={chol}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setChol(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> ETT </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={eTT}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setETT(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="singling">
                                <Accordion className='accordian__singling'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <a className="wraping">
                                                <h3> CDS </h3>
                                            </a>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <input type="number" className='inputFieldNum' value={cDS}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 10)
                                                setCDS(value)}}/> 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                         
                    </div>
                    <div className="right">
                        <div className="single">
                            <label htmlFor=""> Remarks </label>
                            <textarea name="" id="" maxLength={200} placeholder='write' value={remarks}
                            onChange={(e) => {
                                const value = e.target.value.slice(0, 200)
                                setRemarks(value)}}/>
                        </div>
                    </div>
                </div>
                <div className="btnsWraping">
                    <button className='cancelBtn' onClick={handleCloseLabReports}> Cancel </button>
                    <div className="btn_wrape" onClick={handleLabReports}>
                        <button > SAVE DETAILS </button>
                        <div className="arrow_wrape">
                            <img src={arrowBtn} className="arrow"></img>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default LabReportModal;
