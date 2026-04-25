import React, { useEffect, useState } from 'react'
import './patientDetailsModal.scss';
import {Modal} from 'react-bootstrap'
import API from '../../../utils/httpService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PatientDetailsModal = ({selectedPatientIndex, setSelectedPatientIndex, handleSelectSinglePatient, changeState, showPatientDetail, handlePatientDetailClose}) => {
  const [mrNoChecked, setMrNoChecked] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [nameChecked, setNameChecked] = useState(false);
  const [cnicChecked, setCnicChecked] = useState(false);
  const [searchPatient, setSearchPatient] = useState('');
  const [searchPatientList, setSearchPatientList] = useState([]);

  const navigate = useNavigate()

  // const handleCheckboxChange = (e) => {
  //   const { name, checked } = e.target;
  //   switch (name) {
  //     case 'mr-no':
  //       setMrNoChecked(checked);
  //       break;
  //     case 'phone':
  //       setPhoneChecked(checked);
  //       break;
  //     case 'name':
  //       setNameChecked(checked);
  //       break;
  //     case 'cnic':
  //       setCnicChecked(checked);
  //       break;
  //     default:
  //     break;
  //   }
  // };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    const checkboxStateSetters = {
      'mr-no': setMrNoChecked,
      'phone': setPhoneChecked,
      'name': setNameChecked,
      'cnic': setCnicChecked
    };
    checkboxStateSetters[name](checked);
    if (checked) {
      Object.keys(checkboxStateSetters).forEach((checkboxName) => {
        if (checkboxName !== name) {
          checkboxStateSetters[checkboxName](false);
        }
      });
    }
  };

  const patientSearch = async () => {
    try {
        const response = await API.get(`/patient/search?${mrNoChecked ? `mr_no=${searchPatient} `: nameChecked ? `name=${searchPatient}` : phoneChecked ? `search_key=${searchPatient}` : cnicChecked ? `cnic=${searchPatient}` : ''}`)
        setSearchPatientList(response?.data)
      } catch (error) {
        console.log(error, "error")
    }
}

  useEffect(() => {
    if ((mrNoChecked || phoneChecked || nameChecked || cnicChecked) && searchPatient !== '') {
        patientSearch();
    }
  }, [mrNoChecked, phoneChecked, nameChecked, cnicChecked, searchPatient]);


  const handleSinglePatient = () => {
    if (changeState){
      Cookies.set('isReturningPatient', true);
      navigate('/patient/returning-patient')
    } else {
      console.log('please select')
    }

  }

  return (
    <Modal centered show={showPatientDetail} onHide={handlePatientDetailClose} className='modalpatientDetails'>
        <Modal.Body className='patientModalBody'>
          <div className="wraperInfo">
              <span className='cross_icon_modal' onClick={handlePatientDetailClose}>  </span>
              <h2> PATIENT  DETAILS </h2>
              <div className="patients-detail">
              <ul>
                <li>
                  <input
                    type="checkbox"
                    id='mr-no'
                    name='mr-no'
                    checked={mrNoChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="mr-no">MR No.</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id='phone'
                    name='phone'
                    checked={phoneChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="phone">Phone No.</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id='name'
                    name='name'
                    checked={nameChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="name">Name</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id='cnic'
                    name='cnic'
                    checked={cnicChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="cnic">CNIC No.</label>
                </li>
              </ul>
                <input type="text" placeholder='Type here' value={searchPatient} onChange={(e) => setSearchPatient(e.target.value)}/>
              </div>
              <div className="patient-contact">

              {(nameChecked || phoneChecked || mrNoChecked || cnicChecked) && searchPatientList && searchPatientList?.map((item, index) => (
                <div className={`patient-number `} key={index}>
                  <div className='single'>
                    <div>
                      <h4>{item?.mr_no}</h4>
                      <h4 className='name'>{item?.name}</h4>
                    </div>
                    <div>
                      <p>{item?.number}</p>
                      <p>{item?.cnic}</p>
                    </div>
                  </div>
                  <button className={`selectBtn ${selectedPatientIndex == index ? 'selected' : ''}`} onClick={() => handleSelectSinglePatient(item, index)}>SELECT</button>
                </div>
              ))}
              </div>
              <button className={`${changeState ? 'continueBtn' : 'NocontinueBtn'}`} onClick={handleSinglePatient}> CONTINUE </button>
          </div>
        </Modal.Body>
    </Modal>
  )
}

export default PatientDetailsModal