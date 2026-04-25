import React, { useEffect, useState } from 'react'
import './vitalsModal.scss';
import { Modal } from 'react-bootstrap';
import API from '../../utils/httpService';
import Cookies from 'js-cookie';
import arrowBtn from '../../assets/images/svg/arrowBtn.svg'

const VitalsModal = ({setIsVitalDataAdded, gettingVitals, showVitalsModal, handleClosevitalsModal}) => {
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [heartRate, setHeartRate] = useState('')
    const [bpSystolic, setBPSystolic] = useState('')
    const [bpDiastolic, setBPDiastolic] = useState('')
    const [temperature, setTemperature] = useState('')
    const [glucoMeter, setGlucoMeter] = useState('')
    const [patient_id, Setpatient_id] = useState('');
    const [isReturningPatient, setIsReturningPatient] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState('');

    const [heightError, setHeightError] = useState('');
    const [weightError, setWeightError] = useState('');

    useEffect(() => {
        const patientId = Cookies.get('selectedPatientId')
        const isReturningPatient = Cookies.get('isReturningPatient')
        setSelectedPatientId(patientId)
        setIsReturningPatient(isReturningPatient)
    }, [])

    useEffect(() => {
        const patientId = Cookies.get('patient_id')
        Setpatient_id(patientId)
    }, [weight])

    const handleVitalsModal = async () => {
        try {
            let weightMsg = 'The weight field is required.'
            let heightMsg = 'The height field is required.'
            if(!weight){
                setWeightError(weightMsg)
            }else if(!height){
                setHeightError(heightMsg)
            }else {
                const data = {
                    patient_id: isReturningPatient ? Cookies.get('selectedPatientId') : Cookies.get('patient_id'),
                    weight,
                    height,
                    heart_rate: heartRate,
                    blood_pressure_systolic: bpSystolic,
                    blood_pressure_diastolic: bpDiastolic,
                    temperature: temperature,
                    glucometer_result: glucoMeter
                }
                const response = await API.post('/patient/add-vital', data)
                if(response?.success){
                    gettingVitals()
                    handleClosevitalsModal()
                    setIsVitalDataAdded(true)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdateVitalsModal = async () => {
        try {
            let weightMsg = 'The weight field is required.'
            let heightMsg = 'The height field is required.'
            if(!weight){
                setWeightError(weightMsg)
            }else if(!height){
                setHeightError(heightMsg)
            }else {
                const data = {
                    patient_id: isReturningPatient ? Cookies.get('selectedPatientId') : Cookies.get('patient_id'),
                    weight,
                    height,
                    heart_rate: heartRate,
                    blood_pressure_systolic: bpSystolic,
                    blood_pressure_diastolic: bpDiastolic,
                    temperature: temperature,
                    glucometer_result: glucoMeter
                }
                const response = await API.post('/patient/add-vital', data)
                if(response?.success){
                    gettingVitals()
                    handleClosevitalsModal()
                    setIsVitalDataAdded(true)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal className='smbgModal vitalsModal001' show={showVitalsModal} onHide={handleClosevitalsModal} centered >
            <Modal.Body className='showSmbgModalBody vitalsModalBody'>
                <div className="top">
                    <h3 className='mt-3 pt-3'> Vitals  </h3>
                    <span className='cross_icon_modal' onClick={handleClosevitalsModal}>  </span>

                </div>
            <div className="wraperInfo_bottom">
                <div className="wrape-bar">
                    <div className="single">
                        <label htmlFor=""> Weight (kg)</label>
                        <input type="number" placeholder='00' value={weight} onChange={(e) => setWeight(e.target.value)}/>
                        {weightError &&
                            <span className='ErrorState'>{weightError}</span>
                        }
                    </div>
                    <div className="single">
                        <label htmlFor=""> Height (m)</label>
                        <input type="number" placeholder='00' value={height} onChange={(e) => setHeight(e.target.value)}/>
                        {heightError &&
                            <span className='ErrorState'>{heightError}</span>
                        }
                    </div>
                    <div className="single">
                        <label htmlFor=""> Heart Rate (/min)</label>
                        <input type="number" placeholder='00' value={heartRate} onChange={(e) => setHeartRate(e.target.value)}/>
                    </div>
                </div>

                <div className="wrape-bar">
                    <div className="single">
                        <label htmlFor=""> BP (Systolic) </label>
                        <input type="number" placeholder='00' value={bpSystolic} onChange={(e) => setBPSystolic(e.target.value)}/>
                    </div>
                    <div className="single">
                        <label htmlFor=""> BP (Diastolic) </label>
                        <input type="number" placeholder='00' value={bpDiastolic} onChange={(e) => setBPDiastolic(e.target.value)}/>
                    </div>
                    <div className="single">
                        <label htmlFor=""> Temperature (°F)</label>
                        <input type="number" placeholder='00' value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                    </div>
                </div>

                <div className="wrape-bar">
                    <div className="single">
                        <label htmlFor=""> Glucometer Result (mg/dL)</label>
                        <input type="number" placeholder='00' value={glucoMeter} onChange={(e) => setGlucoMeter(e.target.value)}/>
                    </div>
                    
                </div>
            </div>
            <div className="btnsWraping">
                    <button className='cancelBtn test001' onClick={handleClosevitalsModal}> Cancel </button>
                    <div className="btn_wrape" onClick={handleVitalsModal}>
                        <button> SAVE DETAILS </button>
                        <div className="arrow_wrape">
                            <img src={arrowBtn} className="arrow"></img>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default VitalsModal;
