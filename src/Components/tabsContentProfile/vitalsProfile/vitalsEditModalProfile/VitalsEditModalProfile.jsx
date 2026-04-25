import React, { useEffect, useState } from 'react'
import "./vitalsEditModalProfile.scss"
import {Modal} from 'react-bootstrap'
import API from '../../../../utils/httpService';

function VitalsEditModal({editModalShow, handleEditClose,vitals,setEditModalShow,fetchPatientDetails,setSuccessfullyUpdated}) {
    const [weight,setWeight] = useState();
    const [height,setHeight] = useState();
    const [heartRate,setHeartRate] = useState();
    const [sycholic,setSycholic] = useState();
    const [diastolic,setDiastolic] = useState();
    const [temperature,setTemperature] = useState();
    const [glucometer,setGlucometer] = useState();
    const [loading,setLoading] = useState(false);


    useEffect(() => {
      if(vitals){
        setWeight(vitals?.weight);
        setHeight(vitals?.height);
        setHeartRate(vitals?.heart_rate);
        setSycholic(vitals?.blood_pressure_systolic);
        setDiastolic(vitals?.blood_pressure_diastolic);
        setTemperature(vitals?.temperature);
        setGlucometer(vitals?.glucometer_result);
      }
    }, [vitals])
    
    const updateVitals = async (item) => {
        setLoading(false)
        const data = {
            patient_id: vitals?.patient_id,
            heart_rate: heartRate,
            blood_pressure_systolic: sycholic,
            blood_pressure_diastolic: diastolic ,
            temperature: temperature,
            glucometer_result: glucometer,
            weight: weight,
            height: height,
            bmi: 2,
        }
        try {
            const response = await API.put(`patient/update-vital/${item?.id}`,data)
            if (response?.status === 201) {
                fetchPatientDetails()
                setSuccessfullyUpdated(true)
                setEditModalShow(false)
                setLoading(false);
                setTimeout(() => {
                    setSuccessfullyUpdated(false)
                    }, 1500);
            }
        } catch (error) {
            
        }
    }

  return (
    <Modal className='smbgModal' show={editModalShow} onHide={handleEditClose} centered >
        <Modal.Header closeButton className='pb-0'></Modal.Header>
        <Modal.Body className='showSmbgModalBody'>
            <div className="top">
                <h3> Vitals  </h3>
            </div>
        <div className="wraperInfo_bottom">
            <div className="wrape-bar">
                <div className="single">
                    <label htmlFor=""> Weight (kg)</label>
                    <input min={0} value={weight} type="number" onChange={(e) => setWeight(e.target.value)} placeholder='00' />
                </div>
                <div className="single">
                    <label htmlFor=""> Height (m)</label>
                    <input min={0} value={height} type="number" onChange={(e) => setHeight(e.target.value)} placeholder='00' />
                </div>
                <div className="single">
                    <label htmlFor=""> Heart Rate (/min)</label>
                    <input min={0} value={heartRate} onChange={(e) => setHeartRate(e.target.value)} type="number" placeholder='00' />
                </div>
            </div>

            <div className="wrape-bar">
                <div className="single">
                    <label htmlFor=""> BP (Systolic) </label>
                    <input min={0} value={sycholic} onChange={(e) => setSycholic(e.target.value)} type="number" placeholder='00' />
                </div>
                <div className="single">
                    <label htmlFor=""> BP (Diastolic) </label>
                    <input min={0} value={diastolic} onChange={(e) => setDiastolic(e.target.value)} type="number" placeholder='00' />
                </div>
                <div className="single">
                    <label htmlFor=""> Temperature (°F)</label>
                    <input min={0} value={temperature} onChange={(e) => setTemperature(e.target.value)} type="number" placeholder='00' />
                </div>
            </div>

            <div className="wrape-bar">
                <div className="single">
                    <label htmlFor=""> Glucometer Result (mg/dL)</label>
                    <input min={0} value={glucometer} onChange={(e) => setGlucometer(e.target.value)} type="number" placeholder='00' />
                </div>
            </div>
        </div>
        <div className="btnsWraping">
                <button onClick={() => setEditModalShow(false)} className='cancelBtn'> CANCEL </button>
                <div className="btn_wrape">
                    <button onClick={() => updateVitals(vitals)}> SAVE DETAILS </button>
                    <div className="arrow_wrape">
                        <img src='/assets/images/svg/arrowBtn.svg' className="arrow"></img>
                    </div>
                </div>
            </div>
        </Modal.Body>
    </Modal>
  )
}

export default VitalsEditModal