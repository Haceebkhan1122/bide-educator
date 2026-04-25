import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import './diabetesHistoryEditModal.scss';
import API from '../../../../utils/httpService';
import Loader from '../../../customLoader/loader';
import arrowBtn from '../../../../assets/images/svg/arrowBtn.svg'
function DiabetesHistoryEditModal({setSmbg, editModalShow, handleEditClose,modalSmbg,setEditModalShow,fetchPatientDetails,setSuccessfullyUpdated}) {

    const [laoding,setLoading] = useState(false);
    const [preBreakfast,setPreBreakfast] = useState('');
    const [postBreakfast,setPostBreakfast] = useState('');
    const [preLunch,setPreLunch] = useState('');
    const [postLunch,setPostLunch] = useState('');
    const [preDinner,setPreDinner] = useState('');
    const [postDinner,setPostDinner] = useState('');
    const [beforebed,setBeforebed] = useState('');
    const [random,setRandom] = useState('');

    useEffect(() => {
        if(modalSmbg){
            setPreBreakfast(modalSmbg?.pre_breakfast);
            setPostBreakfast(modalSmbg?.post_breakfast);
            setPreLunch(modalSmbg?.pre_lunch);
            setPostLunch(modalSmbg?.post_lunch);
            setPreDinner(modalSmbg?.pre_dinner);
            setPostDinner(modalSmbg?.post_dinner);
            setBeforebed(modalSmbg?.before_bed);
            setRandom(modalSmbg?.random);
        }
    }, [modalSmbg])

    const fetchingAllSMBG = async () => {
        try {
                const response = await API.get(`patient/get-smbg?patient_id=${modalSmbg?.patient_id}`)
                if(response){
                    setSmbg(response)
                }
          } catch (error) {
              console.log(error)
          }
    }
    

    const updateSmbg = async () => {
        setLoading(true);
        const payload = {
            patient_id: modalSmbg?.patient_id,
            pre_breakfast: preBreakfast,
            post_breakfast: postBreakfast,
            pre_lunch: preLunch,
            post_lunch: postLunch,
            pre_dinner: preDinner,
            post_dinner: postDinner,
            before_bed: beforebed,
            random: random
        };
    
        try {
            const response = await API.put(`patient/update-smbg/${modalSmbg?.id}`, payload);
            if (response?.status === 200) {
                setLoading(false);
                setEditModalShow(false)
                fetchingAllSMBG()
                setSuccessfullyUpdated(true)
                setTimeout(() => {
                    setSuccessfullyUpdated(false)
                    }, 1500);
            }
        } catch (error) {
            console.log(error);
        }
    };


  return (
    <>
        {laoding && <Loader/>}
        <Modal className='smbgModal' show={editModalShow} onHide={handleEditClose} centered >
        <Modal.Header closeButton className='pb-0'></Modal.Header>
        <Modal.Body className='showSmbgModalBody'>
            <div className="top">
                <h3> SMBG  </h3>
            </div>
        <div className="wraperInfo_bottom">
            <div className="wrape-bar">
                <div className="single">
                    <label htmlFor=""> Pre Breakfast </label>
                    <input value={preBreakfast} min={0} onChange={(e) => setPreBreakfast(e.target.value)} type="number" placeholder='00' />
                </div>
                <div className="single">
                    <label htmlFor=""> Post Breakfast </label>
                    <input value={postBreakfast} min={0} onChange={(e) => setPostBreakfast(e.target.value)} type="number" placeholder='00' />
                </div>
            </div>

            <div className="wrape-bar">
                <div className="single">
                    <label htmlFor=""> Pre Lunch </label>
                    <input value={preLunch} min={0} onChange={(e) => setPreLunch(e.target.value)} type="number" placeholder='00' />
                </div>
                <div className="single">
                    <label htmlFor=""> Post Lunch </label>
                    <input value={postLunch} min={0} onChange={(e) => setPostLunch(e.target.value)} type="number" placeholder='00' />
                </div>
                <div className="single">
                    <label htmlFor=""> Pre Dinner </label>
                    <input value={preDinner} min={0} onChange={(e) => setPreDinner(e.target.value)} type="number" placeholder='00' />
                </div>
            </div>

            <div className="wrape-bar">
                <div className="single">
                    <label htmlFor=""> Post Dinner </label>
                    <input value={postDinner} min={0} onChange={(e) => setPostDinner(e.target.value)} type="number" placeholder='00' />
                </div>
                <div className="single">
                    <label htmlFor=""> Before Bed </label>
                    <input value={beforebed} min={0} onChange={(e) => setBeforebed(e.target.value)} type="number" placeholder='00' />
                </div>
                <div className="single">
                    <label htmlFor=""> Random </label>
                    <input value={random} min={0} onChange={(e) => setRandom(e.target.value)} type="number" placeholder='00' />
                </div>
            </div>
        </div>
        <div className="btnsWraping">
                <button className='cancelBtn'> Cancel </button>
                <div className="btn_wrape">
                    <button onClick={updateSmbg}> SAVE DETAILS </button>
                    <div className="arrow_wrape">
                        <img src={arrowBtn} className="arrow"></img>
                    </div>
                </div>
            </div>
        </Modal.Body>
    </Modal>
    </>
    
  )
  }

export default DiabetesHistoryEditModal