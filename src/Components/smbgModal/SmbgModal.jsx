import React, { useEffect, useState } from 'react'
import './smbgModal.scss';
import { Modal } from 'react-bootstrap';
import API from '../../utils/httpService';
import Cookies from 'js-cookie';
import arrowBtn from "../../assets/images/svg/arrowBtn.svg"
import moment from 'moment';
import { DatePicker } from 'antd';

const SmbgModal = ({gettingSMBG, showSmbgModal, handleCloseSmgModal}) => {
    const [preBreakfast, setPreBreakfast] = useState('')
    const [postBreakfast, setPostBreakfast] = useState('')
    const [prelunch, setPrelunch] = useState('')
    const [postlunch, setPostlunch] = useState('')
    const [preDinner, setPreDinner] = useState('')
    const [postDinner, setPostDinner] = useState('')
    const [beforeBed, setBeforeBed] = useState('')
    const [random, setRandom] = useState('')
    const [patient_id, Setpatient_id] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [isReturningPatient, setIsReturningPatient] = useState('');
    const [diabetesDate, setDiabetesDate] = useState('')

    useEffect(() => {
        const patientId = Cookies.get('selectedPatientId')
        const isReturningPatient = Cookies.get('isReturningPatient')
        setSelectedPatientId(patientId)
        setIsReturningPatient(isReturningPatient)
    }, [])

    useEffect(() => {
        const patientId = Cookies.get('patient_id')
        Setpatient_id(patientId)
    }, [preBreakfast])

    const handleDateChange = (date, dateString) => {
        if (dateString) {
            const formattedDate = moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD');
            setDiabetesDate(formattedDate);
        } else {
            setDiabetesDate(null);
        }
    };
    const currentDate = moment().format('DD/MM/YYYY');
    const currentDateForPayload = moment().format('YYYY-MM-DD');


    const handleSMBG = async () => {
        const data = {
            patient_id: isReturningPatient ? Cookies.get('selectedPatientId') : Cookies.get('patient_id'),
            pre_breakfast: preBreakfast,
            post_breakfast: postBreakfast,
            pre_lunch: prelunch,
            post_lunch: postlunch,
            pre_dinner: preDinner,
            post_dinner: postDinner,
            before_bed: beforeBed,
            date: diabetesDate ? diabetesDate : currentDateForPayload,
            random
        }
        try {
            const response = await API.post('/patient/add-smbg', data)
            if(response?.success){
                gettingSMBG()
                handleCloseSmgModal()
                setPreBreakfast('')
                setPostBreakfast('')
                setPrelunch('')
                setPostlunch('')
                setPreDinner('')
                setPostDinner('')
                setBeforeBed('')
                setRandom('')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal className='smbgModal' show={showSmbgModal} onHide={handleCloseSmgModal} centered >
            <Modal.Body className='showSmbgModalBody'>
                <div className="top">
                    <h3 className='mt-3 pt-3'> SMBG  </h3>
                    <span className='cross_icon_modal' onClick={handleCloseSmgModal}>  </span>

                </div>
            <div className="wraperInfo_bottom">
                <div className="wrape-bar">
                <div className="single datePickerSmbg">
                <label htmlFor=""> Date </label>
                                <DatePicker
                                  placeholder={currentDate}
                                  format="DD/MM/YYYY"
                                  disabledDate={(current) => {
                                    const tomorrow = moment().add(1, 'day').startOf('day');
                                    return current && current >= tomorrow;
                                  }}
                                  className='datePick'
                                  onChange={handleDateChange}/>
                    </div>
                    <div className="single">
                        <label htmlFor=""> Pre Breakfast </label>
                        <input type="number" placeholder='00' value={preBreakfast} onChange={(e) => {
                            const value = e.target.value.slice(0, 6)
                            setPreBreakfast(value)}}/>
                    </div>
                    <div className="single">
                        <label htmlFor=""> Post Breakfast </label>
                        <input type="number" placeholder='00' value={postBreakfast} onChange={(e) => {
                            const value = e.target.value.slice(0, 6)
                            setPostBreakfast(value)}}/>
                    </div>
                </div>

                <div className="wrape-bar">
                    <div className="single">
                        <label htmlFor=""> Pre Lunch </label>
                        <input type="number" placeholder='00' value={prelunch} onChange={(e) => {
                            const value = e.target.value.slice(0, 6)
                            setPrelunch(value)}}/> 
                    </div>
                    <div className="single">
                        <label htmlFor=""> Post Lunch </label>
                        <input type="number" placeholder='00' value={postlunch} onChange={(e) => {
                            const value = e.target.value.slice(0, 6)
                            setPostlunch(value)}}/> 
                    </div>
                    <div className="single">
                        <label htmlFor=""> Pre Dinner </label>
                        <input type="number" placeholder='00' value={preDinner} onChange={(e) => {
                            const value = e.target.value.slice(0, 6)
                            setPreDinner(value)}}/>  
                    </div>
                </div>

                <div className="wrape-bar">
                    <div className="single">
                        <label htmlFor=""> Post Dinner </label>
                        <input type="number" placeholder='00' value={postDinner} onChange={(e) => {
                            const value = e.target.value.slice(0, 6)
                            setPostDinner(value)}}/>  
                    </div>
                    <div className="single">
                        <label htmlFor=""> Before Bed </label>
                        <input type="number" placeholder='00' value={beforeBed} onChange={(e) => {
                            const value = e.target.value.slice(0, 6)
                            setBeforeBed(value)}}/> 
                    </div>
                    <div className="single">
                        <label htmlFor=""> Random </label>
                        <input type="number" placeholder='00' value={random} onChange={(e) => {
                            const value = e.target.value.slice(0, 6)
                            setRandom(value)}}/> 
                    </div>
                </div>
            </div>
            <div className="btnsWraping">
                    <button className='cancelBtn'  onClick={handleCloseSmgModal}> Cancel </button>
                    <div className="btn_wrape" onClick={handleSMBG}>
                        <button> SAVE DETAILS </button>
                        <div className="arrow_wrape">
                            <img src={arrowBtn} className="arrow1"></img>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SmbgModal;
