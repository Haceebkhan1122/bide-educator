import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import './createBookingModal.scss';
import { Divider, FormControl, InputLabel, MenuItem } from '@mui/material';
import { Select } from 'antd';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const CreateBookingModal = ({ showPatientDetail, setShowPatientDetail, handlePatientDetailClose, showBookingModal, handleCloseBooking }) => {

    const navigate = useNavigate();
    const [patientType, setPatientType] = useState(''); // State to store selected patient type
    const [consultationType, setConsultationType] = useState(''); // State to store selected consultation type
    const [consultationTypeError, setConsultationTypeError] = useState(''); // State to store selected consultation type
    const [patientTypeError, setPatientTypeError] = useState(''); // State to store selected consultation type


    const handleContinue = () => {
        let hasError = false
        let consultationTypeErrorMessage = ''
        let patientTypeErrorMessage = ''
        Cookies.set("consultationType", consultationType)
        if(!consultationType || consultationType == ''){
            consultationTypeErrorMessage = 'Please select the type of consultation'
            hasError = true
        }
        setConsultationTypeError(consultationTypeErrorMessage)
        if(!patientType || patientType == ''){
            patientTypeErrorMessage = 'Please select the type of patient'
            hasError = true
        }
        setPatientTypeError(patientTypeErrorMessage)

        if(hasError){
            return
        }
        
        if (patientType === 'new') {
            navigate("/patient/create-appointment");
        } else if (patientType === 'returning') {
            setShowPatientDetail(true);
            handleCloseBooking();
            // navigate("/patient/returning-patient");
        } else {
            alert('Please select a patient type.');
        }
    };

    useEffect(() => {
        if(patientType){
            setPatientTypeError('')
        }
        if(consultationType){
            setConsultationTypeError('')
        }
    }, [patientType, consultationType])

    useEffect(() => {
        if(!showBookingModal){
            setConsultationType('')
            setPatientType('')
            setPatientTypeError('')
            setConsultationTypeError('')
        }
    }, [showBookingModal])
    return (
        <Modal className='createBookingModal' show={showBookingModal} onHide={handleCloseBooking} centered backdrop="static"  keyboard={false} >
            <Modal.Body className='createBookingModalBody'>
                <div className="wraperInfo">
                    <span className='cross_icon_modal' onClick={() => {
                        handleCloseBooking();
                        setPatientType("")
                    }}>  </span>
                    <h2> Appointment </h2>

                    {/* Patient Type */}
                    <h3 className='kh-patientType'>Patient Type*</h3>
                    <div className="patients-ask">
                        <div className="single checks_radio_custom1">
                            <input
                                type="radio"
                                id="newPatient"
                                checked={patientType === 'new'}
                                onChange={() => setPatientType('new')}
                            />
                            <label htmlFor="newPatient"> New patient </label>
                        </div>
                        <div className="single checks_radio_custom1">
                            <input
                                type="radio"
                                id="returningPatient"
                                checked={patientType === 'returning'}
                                onChange={() => setPatientType('returning')}
                            />
                            <label htmlFor="returningPatient"> Returning Patient </label>
                        </div>
                    </div>
                    
                    {patientTypeError &&
                            <span className='ErrorState1 kh-margintop'>{patientTypeError}</span>
                        }

                    {/* Consultation Type */}
                    <h3 className='kh-patientType'>Consultation Type*</h3>
                    <div className="consultation-type">
                        <div className="single checks_radio_custom1">
                            <input
                                type="radio"
                                id="person"
                                checked={consultationType === 'in-person'}
                                onChange={() => setConsultationType('in-person')}
                            />
                            <label htmlFor="person"> In Person </label>
                        </div>
                        <div className="single checks_radio_custom1">
                            <input
                                type="radio"
                                id="videoConsultation"
                                checked={consultationType === 'instant-consultation-video'}
                                onChange={() => setConsultationType('instant-consultation-video')}
                            />
                            <label htmlFor="videoConsultation"> Video </label>
                        </div>
                    </div>
                    {consultationTypeError &&
                        <span className='ErrorState'>{consultationTypeError}</span>
                    }
                    <button className='continueBtn' onClick={handleContinue}> CONTINUE </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CreateBookingModal;
