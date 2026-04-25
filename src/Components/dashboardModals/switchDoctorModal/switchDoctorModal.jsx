import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import './switchDoctorModal.scss';
import { Divider, FormControl, InputLabel, MenuItem } from '@mui/material';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Select  } from 'antd';
import 'antd/dist/antd.css'; // Import Ant Design styles

import arrowBtn from '../../../assets/images/svg/arrowBtn.svg';

const { Option } = Select;
const SwitchDoctorModal = ({handleUpdateDoctor, selectedDoctor, setDoctor, doctor, availableDoctors, handleCloseSwitchDoctor, showSwitchDoctor }) => {
    
    const handleChange = (value) => {
        setDoctor(value);
    }
  
    return (
        <Modal className='switchDoctorModal' show={showSwitchDoctor} onHide={handleCloseSwitchDoctor} centered >
            <Modal.Body className='switchDoctorModalBody'>
                <div className="wraperInfo">
                <span className='cross_icon_modal' onClick={handleCloseSwitchDoctor}>  </span>
                <h2>  Switch Doctor  </h2>
                <div className="single">
                    <label htmlFor="currentDoctor">
                        Current Doctor
                    </label>
                    <input id='currentDoctor' readOnly type="text" className='currentDocInp' value={`Dr. ${selectedDoctor?.doctor_name}`} />
                </div>
                <div className="single dropdoenAntd">
                    <label htmlFor="switchDoctor">
                        Switch Doctor 
                    </label>
                    <Select
                        className='switchDocInp'
                        getPopupContainer={(trigger) => trigger.parentNode}
                        defaultValue="Select doctor"
                        onChange={handleChange}
                        options={
                            availableDoctors
                            ?.filter((item) => item?.doctor_name !== selectedDoctor?.doctor_name)
                            .map((docname) => ({
                                label: `Dr. ${docname.doctor_name}`,
                                value: docname.doctor_id,
                            }))
                        }
                        />
                </div>
                </div>
                <Divider variant={"fullWidth"} className='divider' />
                <div className="continueBtnWraper">
                    <button onClick={handleUpdateDoctor}> UPDATE </button>
                    <div className="arrow_wrape">
                        <img src={arrowBtn} className="arrow"></img>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SwitchDoctorModal;
