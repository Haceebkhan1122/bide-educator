import React from 'react';
import './labReportsEditModal.scss';
import {Modal} from 'react-bootstrap';

const LabReportsEditModal = ({remarks, handleEditClose, editModalShow,report}) => {
  return (
    <div>
        <Modal className='editModal' show={editModalShow} onHide={handleEditClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className='pb-0'></Modal.Header>
            <Modal.Body>
                <label htmlFor="">Remarks</label>
                <textarea cols="30" rows="10" placeholder={remarks?.remarks} disabled ></textarea>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default LabReportsEditModal