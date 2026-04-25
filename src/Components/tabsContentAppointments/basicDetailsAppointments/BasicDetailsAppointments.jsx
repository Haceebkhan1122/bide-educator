import React, { useEffect, useMemo, useState } from 'react'
import './basicDetailsAppointments.scss'
import { Select } from 'antd';
import API from '../../../utils/httpService';
import Cookies from 'js-cookie';
import { ConsoleIcon } from 'evergreen-ui';

const BasicDetailsAppointments = ({ ethnicityList, returnPatientDetails, isReturningPatient, mrNo, gender, setGender, setKey }) => {
    const [name, setName] = useState('');
    const [dayOfBirth, setDayOfBirth] = useState('1');
    const [monthOfBirth, setMonthOfBirth] = useState('1');
    const [yearOfBirth, setYearOfBirth] = useState('2006');
    const [cnic, setCnic] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [workAddress, setWorkAddress] = useState('');
    const [ethnicity, setEthnicity] = useState('Select Ethnicity');
    const [address, setAddress] = useState('');
    const [updatedToast, setUpdateToast] = useState(false);
    const [nameError, setNameError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [dobError, setDobError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [telephoneError, setTelephoneError] = useState('');
    const [cnicError, setCnicError] = useState('');
    const [errorToast, setErrorToast] = useState('');
    const [ethnicityValidationError, setEthnicityValidationError] = useState('');
    const [isComeback, setIsComeback] = useState(false);


    const [selectedPatientId, setSelectedPatientId] = useState('');
    useEffect(() => {
        // const patientId = Cookies.get('selectedPatientId')
        const patientId = Cookies.get('selectedPatientId')
        setSelectedPatientId(patientId)
    }, [])
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    const handleBasicDetail = async () => {
        let nameError = '';
        let genderError = '';
        let dobError = '';
        let mobileError = '';
        let emailError = '';
        let telephoneError = '';
        let addressError = '';
        let cnicError = '';
        let ethnicityError = '';

        if (isComeback) {
            setKey('personalHistory')
        }

        if (isReturningPatient) {
            setKey('personalHistory')
        } else {
            if (!name) {
                nameError = 'The Name field is required.';
            }

            if (gender === 'select' || gender === 'Select' || !gender) {
                genderError = 'Gender is required.';
            }

            if (!yearOfBirth || !monthOfBirth || !dayOfBirth) {
                dobError = 'Date of birth is required.';
            }
            if (!cnic) {
                cnicError = 'Date of birth is required.';
            }

            if (!mobileNumber || !mobileNumber.startsWith('03')) {
                mobileError = "Valid mobile number is required.";
            }

            // if (!emailAddress || !isValidEmail(emailAddress)) {
            //     emailError = "Valid email is required.";
            // }

            // if (!telephoneNumber) {
            //     telephoneError = 'Telephone is required.';
            // }

            if (!address) {
                addressError = 'Address is required.';
            }
            if (!ethnicity || ethnicity === 'Select Ethnicity') {
                ethnicityError = 'ethnicity is required.'
            }

            setNameError(nameError);
            setGenderError(genderError);
            setDobError(dobError);
            setMobileError(mobileError);
            // setEmailError(emailError);
            // setTelephoneError(telephoneError);
            setAddressError(addressError);
            setCnicError(cnicError);
            setEthnicityValidationError(ethnicityError);

            // Check if any field has an error
            if (nameError || genderError || dobError || mobileError || emailError || telephoneError || addressError || cnicError || ethnicityError) {
                // If any field has an error, do not proceed with API call
                return;
            }

            try {
                const data = {
                    mr_no: mrNo,
                    name,
                    gender,
                    dob: `${yearOfBirth}-${monthOfBirth}-${dayOfBirth}`,
                    cnic,
                    mobile_number: mobileNumber,
                    telephone: telephoneNumber,
                    address,
                    work_address: workAddress,
                    ethnicity,
                    email: emailAddress
                }
                const response = await API.post('/patient/add', data)
                if (response?.success) {
                    // Cookies.remove('patient_id')
                    Cookies.set('patient_id', response?.data?.patient_id)
                    setKey('personalHistory')
                    setIsComeback(true)
                }
                else if (response?.status == 422) {
                    setErrorToast(response?.error)
                }
            } catch (error) {
                console.log(error, "error")
            }
        }
    }

    const handleUpdatePatient = async () => {
        let nameError = '';
        let genderError = '';
        let dobError = '';
        let mobileError = '';
        // let emailError = '';
        // let telephoneError = '';
        let addressError = '';
        let cnicError = '';
        let ethnicityError = '';

        if (!name) {
            nameError = 'The Name field is required.';
        }

        if (gender === 'select' || gender === 'Select' || !gender) {
            genderError = 'Gender is required.';
        }

        if (!yearOfBirth || !monthOfBirth || !dayOfBirth) {
            dobError = 'Date of birth is required.';
        }
        if (!cnic) {
            cnicError = 'Date of birth is required.';
        }

        if (!mobileNumber || !mobileNumber.startsWith('03')) {
            mobileError = "Valid mobile number is required";
        }

        // if (!emailAddress || !isValidEmail(emailAddress)) {
        //     emailError = "Valid email is required";
        // }

        // if (!telephoneNumber) {
        //     telephoneError = 'Telephone is required';
        // }

        if (!address) {
            addressError = 'Address is required';
        }
        if (!ethnicity || ethnicity === 'Select Ethnicity') {
            ethnicityError = 'ethnicity is required'
        }

        setNameError(nameError);
        setGenderError(genderError);
        setDobError(dobError);
        setMobileError(mobileError);
        // setEmailError(emailError);
        // setTelephoneError(telephoneError);
        setAddressError(addressError);
        setCnicError(cnicError);
        setEthnicityValidationError(ethnicityError);

        // Check if any field has an error
        if (nameError || genderError || dobError || mobileError || emailError || telephoneError || addressError || cnicError || ethnicityError) {
            // If any field has an error, do not proceed with API call
            return;
        }

        try {
            const data = {
                patient_id: Cookies.get('selectedPatientId'),
                mr_no: returnPatientDetails?.patient_info?.mr_no,
                name,
                gender,
                dob: `${yearOfBirth}-${monthOfBirth}-${dayOfBirth}`,
                cnic,
                mobile_number: mobileNumber,
                telephone: telephoneNumber,
                address,
                work_address: workAddress,
                ethnicity,
                email: emailAddress
            }
            const response = await API.put(`patient/update/${Cookies.get('selectedPatientId')}`, data)
            if (response?.success) {
                setUpdateToast(true)
                setKey('personalHistory')
                setTimeout(() => {
                    setUpdateToast(false)
                }, 1500);
            }
        } catch (error) {
            console.log(error)
        }

    }

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const startYear = 1947;
    const endYear = 2006;
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

    // const currentDate = new Date();
    // const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const currentDate = new Date();
    const day = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
    const month = (currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
    const formattedDate = `${day}/${month}/${currentDate.getFullYear()}`;

    useEffect(() => {
        if (returnPatientDetails && (Cookies.get('patient_id') || Cookies.get('selectedPatientId'))) {
            setName(returnPatientDetails.patient_info?.name)
            setDayOfBirth(returnPatientDetails?.patient_info?.date_of_birth?.split('/')[0])
            setMonthOfBirth(returnPatientDetails?.patient_info?.date_of_birth?.split('/')[1])
            setYearOfBirth(returnPatientDetails?.patient_info?.date_of_birth?.split('/')[2])
            setCnic(returnPatientDetails?.patient_info?.cnic)
            setMobileNumber(returnPatientDetails?.patient_info?.number)
            setTelephoneNumber(returnPatientDetails?.patient_info?.telephone)
            setEmailAddress(returnPatientDetails?.patient_info?.email)
            setWorkAddress(returnPatientDetails?.patient_info?.work_address)
            setEthnicity(returnPatientDetails?.patient_info?.ethnicity)
            setAddress(returnPatientDetails?.patient_info?.address)
            setGender(returnPatientDetails?.patient_info?.gender)
        }
    }, [returnPatientDetails])


    const handleKeyPress = (e) => {
        const keyPressed = e.key;
        const allowedCharacters = /^[a-zA-Z\s]*$/;
        if (!allowedCharacters.test(keyPressed)) {
            e.preventDefault();
        }
    };

    const cnicFormat = (e) => {
        let input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        const maxLength = 13;
        if (input.length > maxLength) {
            input = input.slice(0, maxLength); // Limit length to maxLength
        }
        setCnic(input);
    }

    function generateArrayWithoutNumber() {
        let res = [];

        for (let i = 0; i <= 255; i++) {
            if ((i >= 48 && i <= 57) || i === 46 || i === 45) {
            } else {
                res.push(String.fromCharCode(i));
            }
        }

        return res;
    }

    const arrayWithoutNumber = useMemo(() => generateArrayWithoutNumber(), []);

    useEffect(() => {
        // Clear error toast after 5 seconds
        const timeout = setTimeout(() => {
            setErrorToast('');
        }, 4000);

        // Clean up timeout to prevent memory leaks
        return () => clearTimeout(timeout);
    }, [errorToast]);

    return (
        <div className='basicDetailsAppointments'>
            {
                updatedToast && <div className="toasting-notification">
                    <span> Update Successfully! </span>
                </div>
            }

            {errorToast && <div className="toasting-Error">
                <span> {errorToast} </span>
            </div>
            }
            <div className="singleRow">
                <div className="single singleBas">
                    <label htmlFor="">MR No. </label>
                    <input readOnly type="text" placeholder={isReturningPatient ? `MS${returnPatientDetails?.patient_info?.mr_no}` : `MS${mrNo}`} className='mr_input' />
                </div>
                <div className="single singleBas">
                    <label htmlFor="">Registration Date </label>
                    <input readOnly type="text" placeholder={isReturningPatient ? returnPatientDetails?.patient_info?.registration_date : formattedDate} className='mr_input' />
                </div>
            </div>

            <div className="singleRowNames">
                <div className="single singleBas">
                    <label htmlFor="">Name* </label>
                    <input onKeyDown={handleKeyPress} maxLength="50" type="text" required placeholder='Enter your full name' value={name} className={`${'input__fields_basic'}`} onChange={(e) => setName(e.target.value)} />
                    {nameError &&
                        <span className='ErrorState'>{nameError}</span>
                    }
                </div>

                <div className="genderswrapper">
                    <div className="single singleBas">
                        <label htmlFor="">Gender* </label>
                        <Select
                            dropdownStyle={{ borderRadius: '8px' }}
                            defaultValue={"select"}
                            options={[
                                { value: 'male', label: <span>Male</span> },
                                { value: 'female', label: <span>Female</span> },
                            ]}
                            required
                            className='selectGender selectDropdown'
                            value={gender}
                            onChange={(value) => setGender(value)}
                        />
                        {genderError &&
                            <p className='ErrorState'>{genderError}</p>
                        }
                    </div>
                    <div className="bdayWrapper">
                        <label htmlFor="">Date of Birth* </label>
                        <div className="bday">
                            <Select
                                defaultValue={"12"}
                                required
                                options={optionsDays}
                                className='selectDate'
                                value={dayOfBirth}
                                onChange={(value) => setDayOfBirth(value)}
                            />
                            <Select
                                defaultValue={"06"}
                                required
                                options={optionsMonths}
                                className='selectDate'
                                value={monthOfBirth}
                                onChange={(value) => setMonthOfBirth(value)}
                            />
                            <Select
                                defaultValue={"2024"}
                                required
                                options={optionsYears}
                                className='selectYear'
                                value={yearOfBirth}
                                onChange={(value) => setYearOfBirth(value)}
                            />
                        </div>
                        {dobError &&
                            <span className='ErrorState'>{dobError}</span>
                        }
                    </div>
                </div>
                <div className="single singleBas">
                    <label htmlFor="">CNIC* </label>
                    <input
                        onKeyDown={(evt) =>
                            (arrayWithoutNumber.includes(evt.key) ||
                                evt.key === '.' ||
                                evt.key === '-') &&
                            evt.preventDefault()
                        }
                        maxLength={13} type="text" required placeholder='Enter CNIC Number' className='input__fields_basic' value={cnic} onChange={cnicFormat} />
                    {cnicError &&
                        <span className='ErrorState'>{cnicError}</span>}
                </div>
            </div>

            <div className="singleRowBottoms">
                <div className="single singleBas">
                    <label htmlFor="">Mobile Number* </label>
                    <input
                        type="text"
                        pattern="[0-9]+"
                        maxlength="11"
                        onKeyDown={(evt) =>
                            (arrayWithoutNumber.includes(evt.key) ||
                                evt.key === '.' ||
                                evt.key === '-') &&
                            evt.preventDefault()
                        }
                        required
                        placeholder='Enter your mobile number'
                        className='input__fields_basic'
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)} />
                    {mobileError &&
                        <span className='ErrorState'>
                            {mobileError}
                        </span>}
                </div>
                <div className="single singleBas">
                    <label htmlFor="">Telephone Number </label>
                    <input
                        type="text"
                        pattern="[0-9]+"
                        maxlength="11"
                        onKeyDown={(evt) =>
                            (arrayWithoutNumber.includes(evt.key) ||
                                evt.key === '.' ||
                                evt.key === '-') &&
                            evt.preventDefault()
                        }
                        required
                        placeholder='Enter telephone number'
                        className='input__fields_basic'
                        value={telephoneNumber}
                        onChange={(e) => setTelephoneNumber(e.target.value)} />
                    {telephoneError &&
                        <span className='ErrorState'>
                            {telephoneError}
                        </span>
                    }
                </div>
                <div className="single singleBas">
                    <label htmlFor="">Email Address </label>
                    <input maxLength="50" type="email" required placeholder='Enter email' pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" className='input__fields_basic' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                    {emailError && <span className='ErrorState'>{emailError}</span>}
                </div>
            </div>

            <div className="singleRowBottoms">
                <div className="single singleBas">
                    <label htmlFor="">Work Address </label>
                    <input maxlength="100" type="text" placeholder='Address' className='input__fields_basic' value={workAddress} onChange={(e) => setWorkAddress(e.target.value)} />
                </div>
                <div className="single singleBas ">
                    <label htmlFor="">Ethnicity* </label>
                    <Select
                        className='enthncitySelect input__fields_basic remo_padin'
                        value={ethnicity}
                        // dropdownAlign={{ offset: [-12, 4] }}
                        onChange={(value) => setEthnicity(value)}>
                        {ethnicityList && ethnicityList?.map((ethnicity, index) => (
                            <option key={index} value={ethnicity?.id}>
                                {ethnicity?.name}
                            </option>
                        ))}
                    </Select>
                    {ethnicityValidationError && <span className='ErrorState'>{ethnicityValidationError}</span>}
                </div>
                <div className="single singleBas">
                    <label htmlFor="">Address* </label>
                    <input maxlength="100" type="text" placeholder='Address' className='input__fields_basic' value={address} onChange={(e) => setAddress(e.target.value)} />
                    {addressError && <span className='ErrorState'>
                        {addressError}
                    </span>}
                </div>
            </div>
            {isReturningPatient && <button className='continueBtn1' onClick={handleUpdatePatient}> UPDATE DATA</button>}
            <button className='continueBtn' onClick={handleBasicDetail}> CONTINUE  </button>
        </div>
    )
}

export default BasicDetailsAppointments;
