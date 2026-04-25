import { useState } from 'react'
import { Modal } from 'react-bootstrap';



const SavEducationalAssesstment = ({setShowSaveModalEducational, postDataToEducationAssessment, showsaveModalEducational, handleShowSaveEducational, handleDieterySave }) => {


  return (
    <Modal className='createBookingModal saveassessmentModal' show={showsaveModalEducational} onHide={() => setShowSaveModalEducational(false)} centered >
      <Modal.Body className='createBookingModalBody'>
        <div className="wraperInfo">
          <span className='cross_icon_modal' onClick={() => setShowSaveModalEducational(false)}>  </span>
          <h2 className='pt-4'>Are you sure you want  <br></br>to save this?</h2>
          <div className='text-center mt-5 pt-3'>
            <button className='continueBtnNo me-4' onClick={() => setShowSaveModalEducational(false)} > NO </button>
            <button className='continueBtn' onClick={postDataToEducationAssessment}> YES </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
 
export default SavEducationalAssesstment