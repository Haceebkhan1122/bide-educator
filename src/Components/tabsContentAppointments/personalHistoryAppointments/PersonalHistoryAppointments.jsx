import React, { useEffect, useState } from 'react'
import './personalHistoryAppointments.scss'
import { Select } from 'antd'
import API from '../../../utils/httpService';
import Cookies from 'js-cookie';

const PersonalHistoryAppointments = ({returnPatientDetails, isReturningPatient, setKey, gender}) => {
    const [maritalStatus, setMaritalStatus] = useState('Select Status');
    const [occupation, setOccupation] = useState('');
    const [lifestyle, setLifestyle] = useState('');
    const [fatherDiabetic, setFatherDiabetic] = useState('No');
    const [fatherDiabeticInput, setFatherDiabeticInput] = useState('');
    const [motherDiabetic, setMotherDiabetic] = useState('No');
    const [motherDiabeticInput, setMotherDiabeticInput] = useState('');
    const [spouseDiabetic, setSpouseDiabetic] = useState('No');
    const [spouseDiabeticInput, setSpouseDiabeticInput] = useState('');
    const [brotherDiabetic, setBrotherDiabetic] = useState('No');
    const [brotherDiabeticInput, setBrotherDiabeticInput] = useState('');
    const [sisterDiabetic, setSisterDiabetic] = useState('No');
    const [sisterDiabeticInput, setSisterDiabeticInput] = useState('');
    const [childrenDiabetic, setChildrenDiabetic] = useState('No');
    const [childrenDiabeticInput, setChildrenDiabeticInput] = useState('');
    const [liveBirth, setLiveBirth] = useState('No');
    const [liveBirthInput, setLiveBirthInput] = useState('');
    const [stillBirth, setStillBirth] = useState('No');
    const [stillBirthInput, setStillBirthInput] = useState('');
    const [neonatalDeaths, setNeonatalDeaths] = useState('No');
    const [neonatalDeathsInput, setNeonatalDeathsInput] = useState('');
    const [abortion, setAbortion] = useState('No');
    const [abortionInput, setAbortionInput] = useState('');
    const [patient_id, Setpatient_id] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [updatedToast, setUpdateToast] = useState(false);
    const [errorToast, setErrorToast] = useState('');
    const [maritalStatusError, setMaritalStatusError] = useState('');
    const [lifeStatusError, setLifeStatusError] = useState('');
    const [lifeStyleOccupationList, setLifeStyleOccupationList] = useState('');

    const { Option } = Select;

    
    useEffect(() => {
        const patientId = Cookies.get('selectedPatientId')
        setSelectedPatientId(patientId)
    }, [maritalStatus])

    useEffect(() => {
        const patientId = Cookies.get('patient_id')
        Setpatient_id(patientId)
    }, [maritalStatus])

    const gettingLifestyleAndOccupation = async () => {
        try {
            const response = await API.get('/lifestyle-occupation')
            setLifeStyleOccupationList(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingLifestyleAndOccupation()
    }, [])


    const handlePersonalHistory = async () => {
        let maritalError  = ''
        let lifeStyleError = ''

        if(isReturningPatient){
            setKey('medicalHistory')
        }else { 
                if(!maritalStatus || maritalStatus == 'Select Status' ){
                    maritalError = 'Select your marital status';
                }
                setMaritalStatusError(maritalError)
                if (maritalError || lifeStyleError)    {
                    // If any field has an error, do not proceed with API call
                    return;
                }
            try {

                const data = {
                    patient_id: Cookies.get('patient_id'),
                    marital_status: maritalStatus,
                    occupation,
                    lifestyle,
                    father_diabetic: !fatherDiabetic ? '' : fatherDiabetic == 'Yes' ? 1 : 0,
                    father_diabetic_text: fatherDiabeticInput, 
                    mother_diabetic: !motherDiabetic ? '' : motherDiabetic == 'Yes' ? 1 : 0,
                    mother_diabetic_text: motherDiabeticInput,
                    spouse_diabetic: !spouseDiabetic ? '' : spouseDiabetic == 'Yes' ? 1 : 0,
                    spouse_diabetic_text: spouseDiabeticInput,
                    brother_diabetic: !brotherDiabetic ? '' : brotherDiabetic == 'Yes' ? 1 : 0,
                    brother_diabetic_text: brotherDiabeticInput,
                    sister_diabetic: !sisterDiabetic ? '' : sisterDiabetic == 'Yes' ? 1 : 0,
                    sister_diabetic_text: sisterDiabeticInput,
                    children_diabetic: !childrenDiabetic ? '' : childrenDiabetic == 'Yes' ? 1 : 0,
                    children_diabetic_text: childrenDiabeticInput,
                    live_birth: !liveBirth ? '' : liveBirth == 'Yes' ? 1 : 0,
                    live_birth_text: liveBirthInput,
                    still_birth: !stillBirth ? '' : stillBirth == 'Yes' ? 1 : 0,
                    still_birth_text: stillBirthInput,
                    neonatal_deaths: !neonatalDeaths ? '' : neonatalDeaths == 'Yes' ? 1 : 0,
                    neonatal_deaths_text: neonatalDeathsInput,
                    abortion: !abortion ? '' : abortion == 'Yes' ? 1 : 0,
                    abortiont_ext: abortionInput
                 }
                const response = await API.post('/patient/add-personal-history', data)
                if(response?.success){
                    setKey('medicalHistory')
                }
                else if (response?.status == 422){
                    setErrorToast(response?.error)
                 
                }
            } catch (error) {
                console.log(error, "error")
            }
        }   
    }

    const handleUpdatePatient = async () => {
        try {
            const data = {
                patient_id: +selectedPatientId,
                marital_status: maritalStatus,
                occupation,
                lifestyle,
                father_diabetic: fatherDiabetic == 'Yes' ? 1 : 0,
                father_diabetic_text: fatherDiabeticInput, 
                mother_diabetic: motherDiabetic == 'Yes' ? 1 : 0,
                mother_diabetic_text: motherDiabeticInput,
                spouse_diabetic: motherDiabetic == 'Yes' ? 1 : 0,
                spouse_diabetic_text: spouseDiabeticInput,
                brother_diabetic: brotherDiabetic == 'Yes' ? 1 : 0,
                brother_diabetic_text: brotherDiabeticInput,
                sister_diabetic: sisterDiabetic == 'Yes' ? 1 : 0,
                sister_diabetic_text: sisterDiabeticInput,
                children_diabetic: childrenDiabetic == 'Yes' ? 1 : 0,
                children_diabetic_text: childrenDiabeticInput,
                live_birth: liveBirth == 'Yes' ? 1 : 0,
                live_birth_text: liveBirthInput,
                still_birth: stillBirth == 'Yes' ? 1 : 0,
                still_birth_text: stillBirthInput,
                neonatal_deaths: neonatalDeaths == 'Yes' ? 1 : 0,
                neonatal_deaths_text: neonatalDeathsInput,
                abortion: abortion == 'Yes' ? 1 : 0,
                abortiont_ext: abortionInput
            }
            const response = await API.post('/patient/add-personal-history', data)
            if(response?.success){
                setUpdateToast(true)

                setTimeout(() => {
                    setUpdateToast(false)
                }, 1500);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (returnPatientDetails && (
                (returnPatientDetails?.patient_personal_history?.length > 0) ||
                (returnPatientDetails?.patient_personal_history && Object.keys(returnPatientDetails.patient_personal_history).length > 0)
            )
        ) {
        setMaritalStatus(returnPatientDetails.patient_personal_history?.marital_status)
        setOccupation(returnPatientDetails.patient_personal_history?.occupation)
        setLifestyle(returnPatientDetails.patient_personal_history?.lifestyle)
        setFatherDiabetic(returnPatientDetails.patient_personal_history?.father_diabetic == null ? " " : returnPatientDetails.patient_personal_history?.father_diabetic == 0 ? 'No' : 'Yes')
        setFatherDiabeticInput(returnPatientDetails.patient_personal_history?.father_diabetic_text)
        setMotherDiabeticInput(returnPatientDetails.patient_personal_history?.mother_diabetic_text)
        setSpouseDiabeticInput(returnPatientDetails.patient_personal_history?.spouse_diabetic_text)
        setBrotherDiabeticInput(returnPatientDetails.patient_personal_history?.brother_diabetic_text)
        setSisterDiabeticInput(returnPatientDetails.patient_personal_history?.sister_diabetic_text)
        setChildrenDiabeticInput(returnPatientDetails.patient_personal_history?.children_diabetic_text)
        setLiveBirthInput(returnPatientDetails.patient_personal_history?.live_birth_text)
        setStillBirthInput(returnPatientDetails.patient_personal_history?.still_birth_text)
        setNeonatalDeathsInput(returnPatientDetails.patient_personal_history?.neonatal_deaths_text)
        setAbortionInput(returnPatientDetails.patient_personal_history?.abortiont_ext)
        setMotherDiabetic(returnPatientDetails.patient_personal_history?.mother_diabetic == null ? " " : returnPatientDetails.patient_personal_history?.mother_diabetic == 0 ? 'No' : 'Yes')
        setSpouseDiabetic(returnPatientDetails.patient_personal_history?.spouse_diabetic == null ? " " : returnPatientDetails.patient_personal_history?.spouse_diabetic == 0 ? 'No' : 'Yes')
        setBrotherDiabetic(returnPatientDetails.patient_personal_history?.brother_diabetic == null ? " " : returnPatientDetails.patient_personal_history?.brother_diabetic == 0 ? 'No' : 'Yes')
        setSisterDiabetic(returnPatientDetails.patient_personal_history?.sister_diabetic == null ? " " : returnPatientDetails.patient_personal_history?.sister_diabetic == 0 ? 'No' : 'Yes')
        setChildrenDiabetic(returnPatientDetails.patient_personal_history?.children_diabetic == null ? " " : returnPatientDetails.patient_personal_history?.children_diabetic == 0 ? 'No' : 'Yes')
        setLiveBirth(returnPatientDetails.patient_personal_history?.live_birth == null ? " " : returnPatientDetails.patient_personal_history?.live_birth == 0 ? 'No' : 'Yes')
        setStillBirth(returnPatientDetails.patient_personal_history?.still_birth == null ? " " : returnPatientDetails.patient_personal_history?.still_birth == 0 ? 'No' : 'Yes')
        setNeonatalDeaths(returnPatientDetails.patient_personal_history?.neonatal_deaths == null ? " " : returnPatientDetails.patient_personal_history?.neonatal_deaths == 0 ? 'No' : 'Yes')
        setAbortion(returnPatientDetails.patient_personal_history?.abortion == null ? " " : returnPatientDetails.patient_personal_history?.abortion == 0 ? 'No' : 'Yes')
        
        }
    },[returnPatientDetails])

    useEffect(() => {
        if(fatherDiabetic == 'No'){
            setFatherDiabeticInput('')
        }
        if(motherDiabetic == 'No'){
            setMotherDiabeticInput('')
        }
        if(spouseDiabetic == 'No'){
            setSpouseDiabeticInput('')
        }
        if(brotherDiabetic == 'No'){
            setBrotherDiabeticInput('')
        }
        if(sisterDiabetic == 'No'){
            setSisterDiabeticInput('')
        }
        if(childrenDiabetic == 'No'){
            setChildrenDiabeticInput('')
        }
        if(liveBirth == 'No'){
            setLiveBirthInput('')
        }
        if(stillBirth == 'No'){
            setStillBirthInput('')
        }
        if(neonatalDeaths == 'No'){
            setNeonatalDeathsInput('')
        }
        if(abortion == 'No'){
            setAbortionInput('')
        }
    }, [fatherDiabetic, motherDiabetic, spouseDiabetic, brotherDiabetic, sisterDiabetic, childrenDiabetic, liveBirth, stillBirth, neonatalDeaths, abortion])


    useEffect(() => {
        // Clear error toast after 5 seconds
        const timeout = setTimeout(() => {
            setErrorToast('');
        }, 90000);

        return () => clearTimeout(timeout);
    }, [errorToast]);


    return (
        <div className='personalHistoryAppointments'>
            {
                updatedToast &&
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                 <div className="toasting-notification">
                    <span> Update Successfully! </span>
                </div>
                </div>
            }

            
            {errorToast && <div className="toasting-Error">
                    <span> {errorToast} </span>
                </div>
            }
            <form>
                <div className="wraperForm">
                    <div className="single">
                        <label htmlFor="">Marital Status </label>
                        <Select
                            defaultValue={"selectStatus"}
                            options={[
                                { value: 'selectStatus', label: <span>Select status</span> },
                                { value: 'married', label: <span>Married</span> },
                                { value: 'single', label: <span>Single</span> },
                            ]}
                            className='enthncitySelect input__fields_personal'
                            value={maritalStatus}
                            onChange={(value) => setMaritalStatus(value)}
                        />
                        {maritalStatusError && <div className="ErrorState">
                    <span> {maritalStatusError} </span>
                </div>}
                        
                    </div>

                    {/* Select Occupation */}
                    <div className="single">
                        <label htmlFor="">Occupation </label>
                        <Select
                            defaultValue="Select Occupation"
                            options={
                                lifeStyleOccupationList?.occupations?.map((occ) => ({
                                    value: occ.id,
                                    label: occ.name,
                                })) || [{ value: '', label: 'Select Occupation' }]
                            }
                            className="enthncitySelect input__fields_personal"
                            value={occupation}
                            onChange={(value) => setOccupation(value)}
                        />
                    </div>

                    {/* select Lifestyle */}

                    <div className="single">
                        <label htmlFor="">Lifestyle </label>
                        <Select
                            defaultValue="Select Lifestyle"
                            options={
                                lifeStyleOccupationList?.lifestyles?.map((occ) => ({
                                    value: occ.id,
                                    label: occ.name,
                                })) || [{ value: '', label: 'Select Lifestyle' }]
                            }
                            className="enthncitySelect input__fields_personal"
                            value={lifestyle}
                            onChange={(value) => setLifestyle(value)}
                        />
                    </div>

                    {/* <div className="single">
                        <label htmlFor="">Occupation </label>
                        <input type="text" placeholder='Enter occupation' className='input__fields_personal' value={occupation} onChange={(e) => setOccupation(e.target.value)}/>
                    </div> */}

                    {/* <div className="single"> */}
                        {/* <label htmlFor="">Lifestyle </label>
                        <div className="life-style-wraper">
                            
                            <div className="life-single checks_radio_customSmall">
                                <input
                                    type="radio"
                                    name='lifestyle'
                                    checked={lifestyle === 'Smoker'}
                                    onChange={() => setLifestyle('Smoker')}
                                />
                                <label htmlFor="">Smoker</label>

                                
                            </div>
           

                          
                            <div className="life-single checks_radio_customSmall">
                                <input
                                    type="radio"
                                    name='lifestyle'
                                    checked={lifestyle === 'Drinker'}
                                    onChange={() => setLifestyle('Drinker')}
                                />
                                <label htmlFor="">Drinker</label>
                            </div>
                            
                        </div> */}
                        {/* {lifeStatusError && <div className="ErrorState">
                    <span> {lifeStatusError} </span>
                </div>} */}
                    {/* </div> */}

                    {/* father */}
                    <div className="single">
                        <label htmlFor="">Is patient’s father diabetic?</label>
                        <div className="yesWraper">
                            <div className="checks-single-wraper">
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                        type="radio"
                                        name='father'
                                        value='Yes'
                                        checked={fatherDiabetic == 'Yes'}
                                        onChange={() => setFatherDiabetic('Yes')}
                                    />
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                        type="radio"
                                        name='father'
                                        value='No'
                                        checked={fatherDiabetic == 'No'}
                                        onChange={() => {
                                            setFatherDiabetic('No');
                                            setFatherDiabeticInput('');
                                        }}
                                    />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                    {/* Input field */}
                    
                        <input
                            type='number'
                            placeholder=''
                            id="mytext"
                            className={`${fatherDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}
                            disabled={fatherDiabetic == 'No'}
                            value={fatherDiabeticInput}
                            onChange={(e) => {
                                if(fatherDiabetic == 'Yes'){
                                    const value = e.target.value.slice(0, 4)
                                    setFatherDiabeticInput(value)
                                }
                            }}
                            onKeyDown={(evt) =>
                                    (evt.key === '-' || evt.key === 'e') &&
                                evt.preventDefault()
                            }
                        />
                    
                </div>
            </div>
                    {/* father */}

                    {/* Is patient’s mother diabetic? */}
                    <div className="single">
                <label htmlFor="">Is patient’s mother diabetic?</label>
                <div className="yesWraper">
                    <div className="checks-single-wraper ">
                        <div className="yes-single checks_radio_customSmall">
                            <input
                                type="radio"
                                name='mother'
                                value='Yes'
                                checked={motherDiabetic == 'Yes'}
                                onChange={(e) => setMotherDiabetic('Yes')}
                            />
                            <label htmlFor="">Yes</label>
                        </div>
                        <div className="yes-single checks_radio_customSmall">
                            <input
                                type="radio"
                                name='mother'
                                value='No'
                                checked={motherDiabetic === 'No'} // Change checked attribute here
                                onChange={() => {
                                    setMotherDiabetic('No');
                                    setMotherDiabeticInput('');
                                }}
                            />
                            <label htmlFor="">No</label>
                        </div>
                    </div>
                        <input
                            type='number'
                            placeholder=''
                            className={`${motherDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}
                            disabled={motherDiabetic == 'No'}
                            value={motherDiabeticInput}
                            onChange={(e) => {
                                if(motherDiabetic == 'Yes'){
                                    const value = e.target.value.slice(0, 4)
                                setMotherDiabeticInput(value)
                                }
                                
                            }}
                            onKeyDown={(evt) =>
                                (evt.key === '-' || evt.key === 'e') &&
                            evt.preventDefault()
                        }
                        />
                </div>
            </div>
                    {/* Is patient’s mother diabetic? */}

                    {/* Is patient’s spouse diabetic? */}
                    <div className="single">
                        <label htmlFor="">Is patient’s spouse diabetic?</label>
                        <div className="yesWraper">
                            <div className="checks-single-wraper">
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                        type="radio"
                                        name='spouse'
                                        value='Yes'
                                        checked={spouseDiabetic == 'Yes'}
                                        onChange={(e) => setSpouseDiabetic('Yes')}
                                    />
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                        type="radio"
                                        name='spouse'
                                        value='No'
                                        checked={spouseDiabetic == 'No'}
                                        onChange={() => {
                                            setSpouseDiabetic('No');
                                            setSpouseDiabeticInput('');
                                        }}
                                    />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                                <input
                                    type='number'
                                    placeholder=''
                                    className={`${spouseDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}
                                    disabled={spouseDiabetic == 'No'}
                                    value={spouseDiabeticInput}
                                    onChange={(e) => {
                                        if(spouseDiabetic == 'Yes'){
                                            const value = e.target.value.slice(0, 4)
                                            setSpouseDiabeticInput(value)
                                        }
                                    }}
                                    onKeyDown={(evt) =>
                                        (evt.key === '-' || evt.key === 'e') &&
                                    evt.preventDefault()
                                }
                                />
                        </div>
                    </div>
                    {/* Is patient’s spouse diabetic? */}

                    {/* Is patient’s brother diabetic? */}
                    <div className="single">
                        <label htmlFor="">Is patient’s brother diabetic?</label>
                        <div className="yesWraper">
                            <div className="checks-single-wraper">
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                        type="radio"
                                        name='brother'
                                        value='Yes'
                                        checked={brotherDiabetic == 'Yes'}
                                        onChange={(e) => setBrotherDiabetic('Yes')}
                                    />
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                        type="radio"
                                        name='brother'
                                        value='No'
                                        checked={brotherDiabetic == 'No'}
                                        onChange={() => {
                                            setBrotherDiabetic('No');
                                            // setBrotherDiabeticInput('');
                                        }}
                                    />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                                <input
                                    type='number'
                                    placeholder=''
                                    className={`${brotherDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}
                                    disabled={brotherDiabetic == 'No'}
                                    value={brotherDiabeticInput}
                                    onChange={(e) => {
                                        if(brotherDiabetic == 'Yes'){
                                            const value = e.target.value.slice(0, 4)
                                        setBrotherDiabeticInput(value)
                                        }

                                    }}
                                    onKeyDown={(evt) =>
                                        (evt.key === '-' || evt.key === 'e') &&
                                    evt.preventDefault()
                                }
                                />
                        </div>
                    </div>
                    {/* Is patient’s brother diabetic? */}

                    {/* Is patient’s sister diabetic? */}
                    <div className="single">
                        <label htmlFor="">Is patient’s sister diabetic?</label>
                        <div className="yesWraper">
                            <div className="checks-single-wraper">
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                     type="radio"
                                     name='sister'
                                     value='Yes'
                                     checked={sisterDiabetic == 'Yes'}
                                    onChange={(e) => setSisterDiabetic('Yes')}
                                    />
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                     type="radio"
                                     name='sister'
                                     value='No'
                                     checked={sisterDiabetic == 'No'}
                                     onChange={() => {
                                        setSisterDiabetic('No');
                                        setSisterDiabeticInput('');
                                    }} />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                            <input type='number'
                             placeholder=''
                             className={`${sisterDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}
                              disabled={sisterDiabetic == 'No'}
                              value={sisterDiabeticInput}
                              onChange={(e) => {
                                if(sisterDiabetic == 'Yes'){
                                    const value = e.target.value.slice(0, 4)
                                setSisterDiabeticInput(value)
                                }
                                
                            }}
                            onKeyDown={(evt) =>
                                (evt.key === '-' || evt.key === 'e') &&
                            evt.preventDefault()
                        }
                             />
                        </div>
                    </div>
                    {/* Is patient’s sister diabetic? */}

                    {/* childre */}
                    <div className="single">
                        <label htmlFor="">Are patient’s children diabetic ?</label>
                        <div className="yesWraper">
                            <div className="checks-single-wraper">
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                    type="radio"
                                    name='children'
                                    value='Yes'
                                    checked={childrenDiabetic == 'Yes'}
                                     onChange={(e) => setChildrenDiabetic('Yes')} /> 
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                     type="radio"
                                     name='children'
                                     value='No'
                                     checked={childrenDiabetic == 'No'}
                                     onChange={() => {
                                        setChildrenDiabetic('No');
                                        setChildrenDiabeticInput('');
                                    }} /> 
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                            <input type='number' placeholder='' className={`${childrenDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}
                            disabled={childrenDiabetic == 'No'} 
                            value={childrenDiabeticInput}
                            onChange={(e) => {
                                if(childrenDiabetic == 'Yes'){
                                    const value = e.target.value.slice(0, 4)
                                setChildrenDiabeticInput(value)
                                }
                                
                            }}
                            onKeyDown={(evt) =>
                                (evt.key === '-' || evt.key === 'e') &&
                            evt.preventDefault()
                        }
                             />
                        </div>
                    </div>
                    {/* childre */}

                    {gender == 'female' &&
                        (<>
                            {/* Live Birth */}
                            <div className="single">
                                <label htmlFor="">Live Birth</label>
                                <div className="yesWraper">
                                    <div className="checks-single-wraper">
                                        <div className="yes-single checks_radio_customSmall">
                                            <input
                                             type="radio"
                                              name='liveBirth'
                                              value='Yes'
                                            checked={liveBirth == 'Yes'}
                                            onChange={(e) => setLiveBirth('Yes')} /> 
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className="yes-single checks_radio_customSmall">
                                            <input type="radio" name='liveBirth'
                                            value='No'
                                            checked={liveBirth == 'No'}
                                             onChange={() => {
                                                setLiveBirth('No');
                                                setLiveBirthInput('');
                                            }}
                                             />  
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                    <input type='number' placeholder='' className={`${liveBirth == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} disabled={liveBirth == 'No'} value={liveBirthInput}
                                    onChange={(e) => {
                                        if(liveBirth == 'Yes'){
                                            const value = e.target.value.slice(0, 4)
                                        setLiveBirthInput(value)
                                        }
                                    }}
                                    onKeyDown={(evt) =>
                                        (evt.key === '-' || evt.key === 'e') &&
                                    evt.preventDefault()
                                }
                                     />
                                </div>
                            </div>
                            {/* Live Birth */}

                            {/* Still Birth */}
                            <div className="single">
                                <label htmlFor="">Still Birth</label>
                                <div className="yesWraper">
                                    <div className="checks-single-wraper">
                                        <div className="yes-single checks_radio_customSmall">
                                            <input type="radio" name='stillBirth'
                                             value='Yes'
                                            checked={stillBirth == 'Yes'}
                                            onChange={(e) => setStillBirth('Yes')}
                                             /> 
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className="yes-single checks_radio_customSmall">
                                            <input type="radio" name='stillBirth'
                                            value='No'
                                            checked={stillBirth == 'No'}
                                            onChange={() => {
                                                setStillBirth('No');
                                                setStillBirthInput('');
                                            }}
                                             /> 
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                    <input type='number' placeholder='' className={`${stillBirth == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} disabled={stillBirth == 'No'} value={stillBirthInput}
                                    onChange={(e) => {
                                        if(stillBirth == 'Yes'){
                                            const value = e.target.value.slice(0, 4)
                                            setStillBirthInput(value)
                                        }  
                                    }}
                                    onKeyDown={(evt) =>
                                        (evt.key === '-' || evt.key === 'e') &&
                                    evt.preventDefault()
                                }
                                    />
                                </div>
                            </div>
                            {/* Still Birth */}

                            {/* Neonatal Deaths */}
                            <div className="single">
                                <label htmlFor="">Neonatal Deaths</label>
                                <div className="yesWraper">
                                    <div className="checks-single-wraper">
                                        <div className="yes-single checks_radio_customSmall">
                                            <input type="radio" name='deaths'
                                            value='Yes'
                                            checked={neonatalDeaths == 'Yes'}
                                            onChange={(e) => setNeonatalDeaths('Yes')} />
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className="yes-single checks_radio_customSmall">
                                            <input type="radio" name='deaths'
                                            value='No'
                                            checked={neonatalDeaths == 'No'}
                                            onChange={() => {
                                                setNeonatalDeaths('No');
                                                setNeonatalDeathsInput('');
                                            }}
                                            />
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div> 
                                    <input type='number' placeholder='' className={`${neonatalDeaths == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} disabled={neonatalDeaths == 'No'} value={neonatalDeathsInput}
                                    onChange={(e) => {
                                        if(neonatalDeaths == 'Yes'){
                                            const value = e.target.value.slice(0, 4)
                                        setNeonatalDeathsInput(value)
                                        }
                                        
                                    }}
                                    onKeyDown={(evt) =>
                                        (evt.key === '-' || evt.key === 'e') &&
                                    evt.preventDefault()
                                }
                                     />
                                </div>
                            </div>
                            {/* Neonatal Deaths */}

                            {/* Abortion */}
                            <div className="single">
                                <label htmlFor="">Abortion</label>
                                <div className="yesWraper">
                                    <div className="checks-single-wraper">
                                        <div className="yes-single checks_radio_customSmall">
                                            <input type="radio" name='abortion'
                                            value='Yes'
                                            checked={abortion == 'Yes'}
                                            onChange={(e) => setAbortion('Yes')} />
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className="yes-single checks_radio_customSmall">
                                            <input type="radio" name='abortion'
                                            value='No'
                                            checked={abortion == 'No'}
                                            onChange={() => {
                                                setAbortion('No');
                                                setAbortionInput('');
                                            }}
                                            />
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                    <input type='number' placeholder='' className={`${abortion == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} disabled={abortion == 'No'} value={abortionInput}
                                    onChange={(e) => {
                                        if(abortion == 'Yes'){
                                            const value = e.target.value.slice(0, 4)
                                            setAbortionInput(value)
                                        }
                                    }}
                                    onKeyDown={(evt) =>
                                        (evt.key === '-' || evt.key === 'e') &&
                                    evt.preventDefault()
                                }
                                     />
                                </div>
                            </div>
                            {/* Abortion */}
                        </>)
                    }
                </div>
            </form>
            {isReturningPatient && <button className='continueBtn1' onClick={handleUpdatePatient}> UPDATE DATA</button>}
            <button className='continueBtn' onClick={handlePersonalHistory}> CONTINUE  </button>
        </div>
    )
}

export default PersonalHistoryAppointments
