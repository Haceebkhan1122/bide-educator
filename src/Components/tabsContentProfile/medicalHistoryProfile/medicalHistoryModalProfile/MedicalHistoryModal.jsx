import React, { useEffect, useState } from 'react'
import {Modal, Button} from 'react-bootstrap';
import './medicalHistoryModal.scss';
import API from '../../../../utils/httpService';
import Cookies from 'js-cookie';
import Loader from '../../../customLoader/loader';

function MedicalHistoryModal({editModal, handleEditClose,setEditModal, patientMedicalHistory,fetchPatientDetails,setSuccessfullyUpdated }) {

    const [previousTreatment,setPreviousTreatment] = useState();
    const [previousTreatmentText,setPreviousTreatmentText] = useState('');
    const [eyeDrop,setEyeDrop] = useState();
    const [eyeDropText,setEyeDropText] = useState('');
    const [previousMedication,setPreviousMedication] = useState();
    const [previousMedicationText,setPreviousMedicationText] = useState('');
    const [ableToWalk,setAbleToWalk] = useState();
    const [loading,setLoading] = useState(false);
    const [patientId,setPatientId] = useState(false);

    useEffect(() => {
      if(patientMedicalHistory){
        setPatientId(Cookies.get('patientID'))
        setPreviousTreatment(patientMedicalHistory?.previous_treat  == 0 ? 'No' : 'Yes')
        setPreviousTreatmentText(patientMedicalHistory?.previous_treat_text)
        setEyeDrop(patientMedicalHistory?.eye_drop  == 0 ? 'No' : 'Yes')
        setEyeDropText(patientMedicalHistory?.eye_drop_text)
        setPreviousMedication(patientMedicalHistory?.previous_medication  == 0 ? 'No' : 'Yes')
        setPreviousMedicationText(patientMedicalHistory?.previous_medication_text)
        setAbleToWalk(patientMedicalHistory?.walk == 0 ? 'No' : 'Yes') 
      }
    }, [patientMedicalHistory])

    useEffect(() => {
        if(previousTreatment == 'No'){
            setPreviousTreatmentText('')
        }
        if(eyeDrop == 'No'){
            setEyeDropText('')
        }
        if(previousMedication == 'No'){
            setPreviousMedicationText('')
        }
    }, [previousTreatment, eyeDrop, previousMedication])


    const updateMedicalHistory = async () => {
        setLoading(true)
        const data = {
            patient_id: patientId, 
            previous_treat: previousTreatment == 'No' ? 0 : 1,
            previous_treat_text: previousTreatmentText,
            eye_drop: eyeDrop  == 'No' ? 0 : 1,
            eye_drop_text: eyeDropText,
            walk: ableToWalk  == 'No' ? 0 : 1,
            previous_medication: previousMedication == 'No' ? 0 : 1,
            previous_medication_text: previousMedicationText
        }
        try {   
                const response = await API.post('patient/add-medical-history',data)
                if(response?.status === 201){
                    fetchPatientDetails()
                    setSuccessfullyUpdated(true)
                    setLoading(false)
                    setEditModal(false)
                    setLoading(false)
                    setTimeout(() => {
                        setSuccessfullyUpdated(false)
                        }, 1500);
                }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Modal className="edit" show={editModal} onHide={handleEditClose}>
        {loading && <Loader/>}
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
            <form>
                <div className="wraperSingle">
                    <div className="wrapingCheck">
                        <label htmlFor=""> Previous Treatment  </label>
                        <div className="checks-single-wraper">
                            <div className="yes-single">
                                <input value='Yes' checked={previousTreatment == 'Yes'} onChange={() => setPreviousTreatment('Yes')} type="radio" name='Treatment' />
                                <label htmlFor="">Yes</label>
                            </div>
                            <div className="yes-single">
                                <input value='No' checked={previousTreatment == 'No'} onChange={() => setPreviousTreatment('No')} type="radio" name='Treatment' />
                                <label htmlFor="">No</label>
                            </div>
                        </div>
                    </div>
                    <textarea value={previousTreatmentText} disabled={!previousTreatment || previousTreatment === 'No'} onChange={(e) => setPreviousTreatmentText(e.target.value)} name="" id="" placeholder='If yes, type here' />
                </div>
                <div className="wraperSingle">
                    <div className="wrapingCheck">
                        <label htmlFor=""> Eye Drop  </label>
                        <div className="checks-single-wraper">
                            <div className="yes-single">
                                <input value='Yes' checked={eyeDrop == 'Yes'} onChange={() => setEyeDrop('Yes')} type="radio" name='eyeDrop' />
                                <label htmlFor="">Yes</label>
                            </div>
                            <div className="yes-single">
                                <input value='No' checked={eyeDrop == 'No'} onChange={() => setEyeDrop('No')} type="radio" name='eyeDrop' />
                                <label  htmlFor="">No</label>
                            </div>
                        </div>
                    </div>
                    <textarea value={eyeDropText} disabled={!eyeDrop || eyeDrop === 'No'} onChange={(e) => setEyeDropText(e.target.value)} name="" id="" placeholder='If yes, type here' />
                </div>
                <div className="wraperSingle">
                    <div className="wrapingCheck">
                        <label htmlFor=""> Previous Medication </label>
                        <div className="checks-single-wraper">
                            <div className="yes-single">
                                <input  value='Yes' checked={previousMedication == 'Yes'} onChange={() => setPreviousMedication('Yes')} type="radio" name='previousMedication' />
                                <label htmlFor="">Yes</label>
                            </div>
                            <div className="yes-single">
                                <input value='No' checked={previousMedication == 'No'} onChange={() => setPreviousMedication('No')} type="radio" name='previousMedication' />
                                <label htmlFor="">No</label>
                            </div>
                        </div>
                    </div>
                    <textarea value={previousMedicationText} disabled={!previousMedication || previousMedication === 'No'} onChange={(e) => setPreviousMedicationText(e.target.value)}  name="" id="" placeholder='If yes, type here' />
                </div>
                <div className="wraperSingle">
                    <div className="wrapingCheck">
                        <label htmlFor=""> Able to walk? </label>
                        <div className="checks-single-wraper">
                            <div className="yes-single">
                                <input value='Yes' checked={ableToWalk == 'Yes'} onChange={() => setAbleToWalk('Yes')} type="radio" name='walk' />
                                <label htmlFor="">Yes</label>
                            </div>
                            <div className="yes-single">
                                <input value='No' checked={ableToWalk == 'No'} onChange={() => setAbleToWalk('No')} type="radio" name='walk' />
                                <label htmlFor="">No</label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleEditClose}>
                CANCEL
            </Button>
            <div>
                <Button onClick={updateMedicalHistory} variant='secondary'>
                    Save Changes
                </Button>
                <span></span>
            </div>
        </Modal.Footer>
</Modal>
  )
}

export default MedicalHistoryModal