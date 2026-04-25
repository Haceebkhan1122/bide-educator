import React, { useEffect, useState } from 'react'
import './basicDetailsProfile.scss'
import { Select } from 'antd';
import moment from 'moment';
import API from '../../../utils/httpService';
import Loader from '../../customLoader/loader'

const BasicDetails = ({patientInfo,setSuccessfullyUpdated,ethnicites,fetchPatientDetails}) => {
    
    const [patientName,setPatientName] = useState('');
    const [patientGender,setPatientGender] = useState('');
    const [patientMobile,setPatientMobile] = useState('');
    const [patientTelephone,setPatientTelephone] = useState('');
    const [patientWorkAddress,setPatientWorkAddress] = useState('');
    const [patientAddress,setPatientAddress] = useState('');
    const [patientCnic,setPatientCnic] = useState('');
    const [patientEthnicity,setPatientEthnicity] = useState();
    const [birthDate,setBirthDate] = useState('');
    const [birthMonth,setBirthMonth] = useState('');
    const [birthYear,setBirthYear] = useState('');
    const [loading,setLoading] = useState(false);

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const startYear = 1947;
    const endYear = 2024;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
    const optionsDays = days.map((item) => {
        return {
            value: item,
            label: <span> {item} </span>
        }
    })

    const optionsMonths = months.map((item) => {
        return {
            value: item,
            label: <span> {item} </span>
        }
    })

    const optionsYears = years.map(year => ({
        value: year.toString(),
        label: <span>{year}</span>,
    }));

    useEffect(() => {
      if(patientInfo){
        setPatientName(patientInfo?.name);
        setPatientGender(patientInfo?.gender);
        setPatientMobile(patientInfo?.number);
        setPatientWorkAddress(patientInfo?.work_address);
        setPatientAddress(patientInfo?.address);
        setPatientCnic(patientInfo?.cnic);
        setPatientEthnicity(patientInfo?.ethnicity);
        setPatientTelephone(patientInfo?.telephone);
        setBirthDate(moment(patientInfo?.date_of_birth).format('DD MM YYYY').slice(0,2));
        setBirthMonth(moment(patientInfo?.date_of_birth).format('DD MM YYYY').slice(3,5));
        setBirthYear(moment(patientInfo?.date_of_birth).format('DD MM YYYY').slice(6,10));

      }
    }, [patientInfo])

    const handleUpdatePatient = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            mr_no : patientInfo?.mr_no,
            // registration_date : patientDetails?.patient_info?.registration_date,
            telephone: patientTelephone,
            name : patientName,
            mobile_number : patientMobile,
            gender:  patientGender,
            dob : `${birthYear}-${birthMonth}-${birthDate}`,
            cnic: patientCnic,
            address: patientAddress,
            work_address: patientWorkAddress,
            ethnicity: patientEthnicity,
        }
        try {
            const response = await API.put(`patient/update/${patientInfo?.patient_id}`,data)
            if(response?.status === 201){
                fetchPatientDetails()
                setSuccessfullyUpdated(true)
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
        <>
            {loading && (
                <Loader/>
                        )}
              <div className='basicDetails'>
            <form className='container-fluid' onSubmit={handleUpdatePatient}>
            <div className='basic-wrap row'>
                <div className='col-12 col-lg-8'>
                    <div className='row'>
                      
                  
                    <div className="singleRow s">
                        <div className="single">
                            <label htmlFor="">MR No. </label>
                            <input readOnly type="text" placeholder={patientInfo?.mr_no} className='mr_input' />
                        </div>
                        <div className="single">
                            <label htmlFor="">Registration Date </label>
                            <input readOnly type="text" placeholder={patientInfo?.registration_date} className='mr_input' />
                        </div>
                    </div>

                    <div className="singleRowNames">
                        <div className="single">
                            <label htmlFor="">Name* </label>
                            <input type="text"
                            onChange={(e) => setPatientName(e.target.value)} 
                            value={patientName} 
                            placeholder='Enter your full name' 
                            className='input__fields_basic' />
                        </div>
                        <div className="genderswrapper">
                            <div className="single">
                                <label htmlFor="">Gender* </label>
                                <Select
                                    value={patientGender}
                                    onChange={(value) => setPatientGender(value)} 
                                    options={[
                                        { value: 'Female', label: <span>Female</span> },
                                        { value: 'Male', label: <span>Male</span> }
                                    ]}
                                    className='selectGender selectDropdown'
                                />
                            </div>

                            <div className="bdayWrapper">
                                <label htmlFor="">Date of Birth* </label>
                                <div className="bday">
                                    <Select
                                        value={birthDate}
                                        options={optionsDays}
                                        className='selectDate'
                                        onChange={(value) => setBirthDate(value)} 

                                    />
                                    <Select
                                        value={birthMonth}
                                        options={optionsMonths}
                                        className='selectDate'
                                        onChange={(value) => setBirthMonth(value)} 

                                    />
                                    <Select
                                        value={birthYear}
                                        options={optionsYears}
                                        className='selectYear'
                                        onChange={(value) => setBirthYear(value)} 

                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="singleRowBottoms">
                        <div className="single">
                            <label htmlFor="">Mobile Number* </label>
                            <input type="text" onChange={(e) => setPatientMobile(e.target.value)} value={patientMobile} placeholder='Enter your mobile number' className='input__fields_basic' />
                        </div>
                        <div className="single">
                            <label htmlFor="">Telephone Number </label>
                            <input type="text" onChange={(e) => setPatientTelephone(e.target.value)} value={patientTelephone} placeholder='Enter telephone number' className='input__fields_basic' />
                        </div>
                        {/* <div className="single">
                            <label htmlFor="">Email Address* </label>
                            <input type="email" placeholder='Enter Address' className='input__fields_basic' />
                        </div> */}
                    </div>

                    <div className="singleRowBottoms">
                        <div className="single">
                            <label htmlFor="">Work Address </label>
                            <input maxLength='100' type="text" value={patientWorkAddress}  onChange={(e) => setPatientWorkAddress(e.target.value)} placeholder='Address' className='input__fields_basic' />
                        </div>
                        <div className="single ">
                            <label htmlFor="">Ethnicity </label>
                            <Select
                            value={patientEthnicity}
                            onChange={(val) => setPatientEthnicity(val)}
                            
                            className='enthncitySelect input__fields_basic'>
                                {ethnicites.map((ethnicity,index) => (
                                    <option key={index} value={ethnicity.id}>
                                        {ethnicity.name}
                                    </option>
                                ))}
                                </Select>
                        </div>
                    </div>
                    <div className="singleRowBottoms">
                        <div className="single">
                            <label htmlFor="">CNIC* </label>
                            <input value={patientCnic} onChange={(e) => setPatientCnic(e.target.value)} type="text" placeholder='Enter CNIC Number' className='input__fields_basic' />
                        </div>
                        <div className="single">
                            <label htmlFor="">Address* </label>
                            <input maxLength='100' value={patientAddress} onChange={(e) => setPatientAddress(e.target.value)} type="text" placeholder='Enter Address' className='input__fields_basic' />
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className='updateBtnDiv'>
                <button type='submit'  className='updateBtn'> UPDATE DATA  </button>
            </div>
            </form>
        </div>
        </>
      
    )
}

export default BasicDetails;
