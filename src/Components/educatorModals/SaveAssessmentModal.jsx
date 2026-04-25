import { useState } from 'react'
import { Modal } from 'react-bootstrap';



const saveAssessmentModal = ({ postDataToEducationAssessment, showsaveModal, handleCloseSave, handleDieterySave }) => {


  return (
    <Modal className='createBookingModal saveassessmentModal' show={showsaveModal} onHide={handleCloseSave} centered >
      <Modal.Body className='createBookingModalBody'>
        <div className="wraperInfo">
          <span className='cross_icon_modal' onClick={handleCloseSave}>  </span>
          <h2 className='pt-4'>Are you sure you want  <br></br>to save this?</h2>
          <div className='text-center mt-5 pt-3'>
            <button className='continueBtnNo me-4' onClick={handleCloseSave} > NO </button>
            <button className='continueBtn' onClick={handleDieterySave}> YES </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default saveAssessmentModal