import React, { useEffect, useState } from 'react'
import './medicalHistoryAppointments.scss';
import API from '../../../utils/httpService';
import Cookies from 'js-cookie';

const MedicalHistoryAppointments = ({returnPatientDetails, isReturningPatient, setKey}) => {
    const [prevTreatment, setPrevTreatment] = useState('No');
    const [prevTreatmentInput, setPrevTreatmentInput] = useState('');
    const [prevMedication, setPrevMedication] = useState('No');
    const [prevMedicationInput, setPrevMedicationInput] = useState('');
    const [eyeDrop, setEyeDrop] = useState('No');
    const [eyeDropInput, setEyeDropInput] = useState('');
    const [ableToWalkInput, setAbleToWalkInput] = useState('No');
    const [patient_id, Setpatient_id] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [updatedToast, setUpdateToast] = useState(false);

    useEffect(() => {
        const patientId = Cookies.get('selectedPatientId')
        setSelectedPatientId(patientId)
    }, [prevTreatment])

    useEffect(() => {
        const patientId = Cookies.get('patient_id')
        Setpatient_id(patientId)
    }, [prevTreatment])

    useEffect(() => {
        if (
            returnPatientDetails &&
            returnPatientDetails.patient_medical_history &&
            returnPatientDetails.patient_medical_history.length > 0 ||
            (returnPatientDetails?.patient_medical_history &&
              Object.keys(returnPatientDetails.patient_medical_history).length > 0)
          ){
            setPrevTreatment(returnPatientDetails?.patient_medical_history?.previous_treat == null ? " " : returnPatientDetails?.patient_medical_history?.previous_treat == 0 ? 'No' : 'Yes')
            setPrevTreatmentInput(returnPatientDetails?.patient_medical_history?.previous_treat_text)
            setPrevMedication(returnPatientDetails?.patient_medical_history?.previous_medication == null ? " " : returnPatientDetails?.patient_medical_history?.previous_medication == 0 ? 'No' : 'Yes')
            setPrevMedicationInput(returnPatientDetails?.patient_medical_history?.previous_medication_text)
            setEyeDrop(returnPatientDetails?.patient_medical_history?.eye_drop == null ? " " : returnPatientDetails?.patient_medical_history?.eye_drop == 0 ? 'No' : 'Yes')
            setEyeDropInput(returnPatientDetails?.patient_medical_history?.eye_drop_text)           
        }
    },[returnPatientDetails])

    const handleMedicalHistory = async () => {
        // if(returnPatientDetails){
        //     setKey('labReports')
        // }else {
            const data = {
                previous_treat: !prevTreatment ? "" : prevTreatment == 'Yes' ? 1 : 0,
                patient_id: Cookies.get('patient_id') ? Cookies.get('patient_id') : Cookies.get('selectedPatientId'),
                previous_treat_text: prevMedicationInput,
                previous_medication: !prevMedication ? "" : prevMedication == 'Yes' ? 1 : 0,
                previous_medication_text: prevMedicationInput,
                eye_drop: !eyeDrop ? "" : eyeDrop == 'Yes' ? 1 : 0,
                eye_drop_text: eyeDropInput,
            }
            try {
                const response = await API.post('/patient/add-medical-history', data)
                if(response?.success){
                    setKey('labReports')
                }
            } catch (error) {
                console.log(error);
            }
        }    
    // }

    const handleUpdatePatient = async () => {
        try {
            const data = {
                patient_id: selectedPatientId,
                previous_treat: prevTreatment == 'Yes' ? 1 : 0,
                previous_treat_text: prevMedicationInput,
                previous_medication: prevMedication == 'Yes' ? 1 : 0,
                previous_medication_text: prevMedicationInput,
                eye_drop: eyeDrop == 'Yes' ? 1 : 0,
                eye_drop_text: eyeDropInput,
            }
            const response = await API.post('/patient/add-medical-history', data)
            if(response?.success){
                setUpdateToast(true)

                setTimeout(() => {
                    setUpdateToast(false)
                }, 1500);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='medicalHistoryAppointments'>
            {
                updatedToast &&
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                 <div className="toasting-notification">
                    <span> Update Successfully! </span>
                </div>
                </div>
            }
            <form>
                <div className="wraperForm">
                    <div className="wraperSingle">
                        <div className="wrapingCheck">
                            <label htmlFor=""> Co-morbid  </label>
                            <div className="checks-single-wraper">
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                    type="radio"
                                    name='prevTreatment'
                                    value='Yes'
                                    checked={prevTreatment == 'Yes'}
                                    onChange={(e) => setPrevTreatment('Yes')}
                                     />
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                    type="radio"
                                    name='prevTreatment'
                                    value='No'
                                    checked={prevTreatment == 'No'}
                                    onChange={() => {
                                        setPrevTreatment('No');
                                        setPrevTreatmentInput('');
                                    }} />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                        </div>
                        <textarea maxLength={150} name="" id="" placeholder='If yes, type here' disabled={prevTreatment == 'No'} value={prevTreatmentInput}
                         onChange={(e) => {
                            if (prevTreatment === 'Yes') {
                              setPrevTreatmentInput(e.target.value);
                            }
                          }} />
                    </div>

                    <div className="wraperSingle">
                        <div className="wrapingCheck">
                            <label htmlFor=""> Previous Medication  </label>
                            <div className="checks-single-wraper">
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                    type="radio"
                                    name='prevMedication'
                                    value='Yes'
                                    checked={prevMedication == 'Yes'}
                                    onChange={(e) => setPrevMedication('Yes')} />
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                    type="radio"
                                    name='prevMedication'
                                    value='No'
                                    checked={prevMedication == 'No'}
                                    onChange={() => {
                                        setPrevMedication('No');
                                        setPrevMedicationInput('');
                                    }} />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                        </div>
                        <textarea 
                        name="" 
                        id=""
                        maxLength={150} 
                        placeholder='If yes, type here' 
                        disabled={prevMedication == 'No'} 
                        value={prevMedicationInput} 
                        onChange={(e) => {
                            if (prevMedication === 'Yes') {
                                setPrevMedicationInput(e.target.value);
                            }
                          }} 
                        />
                    </div>
                    <div className="wraperSingle">
                        <div className="wrapingCheck">
                            <label htmlFor=""> Eye Drop </label>
                            <div className="checks-single-wraper">
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                    type="radio"
                                    name='eyeDrop'
                                    value='Yes'
                                    checked={eyeDrop == 'Yes'}
                                    onChange={(e) => setEyeDrop('Yes')} />
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                    type="radio"
                                    name='eyeDrop'
                                    value='No'
                                    checked={eyeDrop == 'No'}
                                    onChange={() => {
                                        setEyeDrop('No');
                                        setEyeDropInput('');
                                    }} />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                        </div>
                        <textarea 
                        name="" 
                        id="" 
                        placeholder='If yes, type here' 
                        disabled={eyeDrop == 'No'} 
                        value={eyeDropInput}
                        maxLength={150} 
                        onChange={(e) => {
                            if (eyeDrop === 'Yes') {
                                setEyeDropInput(e.target.value);
                            }
                          }} 
                        />
                    </div>

                    <div className="wraperSingle">
                        <div className="wrapingCheck">
                            <label htmlFor=""> Able to walk? </label>
                            <div className="checks-single-wraper">
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                    type="radio"
                                    name='ableToWalk'
                                    value='Yes'
                                    checked={ableToWalkInput == 'Yes'}
                                    onChange={(e) => setAbleToWalkInput('Yes')}
                                     />
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                    type="radio"
                                    name='ableToWalk'
                                    value='No'
                                    checked={ableToWalkInput == 'No'}
                                    onChange={(e) => setAbleToWalkInput('No')} />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {isReturningPatient && <button className='continueBtn1' onClick={handleUpdatePatient}> UPDATE DATA</button>}
            <button className='continueBtn' onClick={handleMedicalHistory}> CONTINUE  </button>
        </div>
    )
}

export default MedicalHistoryAppointments;
