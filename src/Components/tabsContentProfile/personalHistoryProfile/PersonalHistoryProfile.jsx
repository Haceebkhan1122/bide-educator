import React, { useEffect, useState } from 'react'
import './personalHistoryProfile.scss'
import { Select } from 'antd'
import Loader from '../../customLoader/loader';
import API from '../../../utils/httpService';

const PersonalHistory = ({patientHistory,gender,fetchPatientDetails,setSuccessfullyUpdated}) => {

    const [maritalStatus,setMaritalStatus] = useState('');
    const [occupation,setOccupation] = useState('');
    const [lifestyle,setLifestyle] = useState('');
    const [fatherDiabetic,setFatherDiabetic] = useState();
    const [fatherDiabeticNumber,setFatherDiabeticNumber] = useState('');
    const [motherDiabetic,setMotherDiabetic] = useState();
    const [motherDiabeticNumber,setMotherDiabeticNumber] = useState('');
    const [spouseDiabetic,setSpouseDiabetic] = useState();
    const [spouseDiabeticNumber,setSpouseDiabeticNumber] = useState('');
    const [brotherDiabetic,setBrotherDiabetic] = useState();
    const [brotherDiabeticNumber,setBrotherDiabeticNumber] = useState('');
    const [sisterDiabetic,setSisterDiabetic] = useState();
    const [sisterDiabeticNumber,setSisterDiabeticNumber] = useState('');
    const [childrenDiabetic,setChildrenDiabetic] = useState();
    const [childrenDiabeticNumber,setChildrenDiabeticNumber] = useState('');
    const [liveBirth,setLiveBirth] = useState();
    const [liveBirthNumber,setLiveBirthNumber] = useState('');
    const [stillBirth,setStillBirth] = useState();
    const [stillBirthNumber,setStillBirthNumber] = useState('');
    const [neonatalDeath,setNeonatalDeath] = useState();
    const [neonatalDeathNumber,setNeonatalDeathNumber] = useState('');
    const [abortion,setAbortion] = useState();
    const [abortionNumber,setAbortionNumber] = useState('');
    const [loading,setLoading] = useState('');
    const [female,setFemale] = useState(false);
    const [lifeStyleOccupationList, setLifeStyleOccupationList] = useState('');

    useEffect(() => {
        if(gender == 'Female'){
            setFemale(true)
        }
    }, [patientHistory])

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
    
    useEffect(() => {
            if(patientHistory){
                setMaritalStatus(patientHistory?.marital_status == 'Married' ? 'Married' : 'Single' );              
                setFatherDiabetic(patientHistory?.father_diabetic == null ? " " : patientHistory?.father_diabetic == 0 ? 'No' : 'Yes' );
                setFatherDiabeticNumber(patientHistory?.father_diabetic_text);
                setMotherDiabetic(patientHistory?.mother_diabetic == null ? " " : patientHistory?.mother_diabetic == 0 ? 'No' : 'Yes' );
                setMotherDiabeticNumber(patientHistory?.mother_diabetic_text);
                setSpouseDiabetic(patientHistory?.spouse_diabetic == null ? " " : patientHistory?.spouse_diabetic == 0 ? 'No' : 'Yes' );
                setSpouseDiabeticNumber(patientHistory?.spouse_diabetic_text);
                setBrotherDiabetic(patientHistory?.brother_diabetic == null ? " " : patientHistory?.brother_diabetic == 0 ? 'No' : 'Yes' );
                setBrotherDiabeticNumber(patientHistory?.brother_diabetic_text);
                setChildrenDiabetic(patientHistory?.children_diabetic == null ? " " : patientHistory?.children_diabetic  == 0 ? 'No' : 'Yes');
                setChildrenDiabeticNumber(patientHistory?.children_diabetic_text);
                setSisterDiabetic(patientHistory?.sister_diabetic == null ? " " : patientHistory?.sister_diabetic  == 0 ? 'No' : 'Yes');
                setSisterDiabeticNumber(patientHistory?.sister_diabetic_text);
                setLiveBirth(patientHistory?.live_birth == null ? " " : patientHistory?.live_birth  == 0 ? 'No' : 'Yes');
                setLiveBirthNumber(patientHistory?.live_birth_text);
                setStillBirth(patientHistory?.still_birth == null ? " " : patientHistory?.still_birth  == 0 ? 'No' : 'Yes');
                setStillBirthNumber(patientHistory?.still_birth_text);
                setNeonatalDeath(patientHistory?.neonatal_deaths == null ? " " : patientHistory?.neonatal_deaths  == 0 ? 'No' : 'Yes');
                setNeonatalDeathNumber(patientHistory?.neonatal_deaths_text);
                setAbortion(patientHistory?.abortion == null ? " " : patientHistory?.abortion  == 0 ? 'No' : 'Yes');
                setAbortionNumber(patientHistory?.abortiont_ext);

                if(patientHistory?.length > 0 || Object.keys(patientHistory)?.length > 0){
                    setOccupation(patientHistory?.occupation);
                    setLifestyle(patientHistory?.lifestyle);
                }
    
            }
      }, [patientHistory])
      const updatePersonalHistory = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            patient_id : patientHistory?.patient_id,
            marital_status : maritalStatus,
            occupation : occupation,
            lifestyle : lifestyle,
            father_diabetic : fatherDiabetic == 'No' ? 0 : 1 ,
            father_diabetic_text : fatherDiabeticNumber,
            mother_diabetic : motherDiabetic == 'No' ? 0 : 1 ,
            mother_diabetic_text : motherDiabeticNumber,
            spouse_diabetic : spouseDiabetic == 'No' ? 0 : 1 ,
            spouse_diabetic_text : spouseDiabeticNumber,
            brother_diabetic : brotherDiabetic == 'No' ? 0 : 1 ,
            brother_diabetic_text : brotherDiabeticNumber,
            sister_diabetic : sisterDiabetic  == 'No' ? 0 : 1,
            sister_diabetic_text : sisterDiabeticNumber,
            children_diabetic : childrenDiabetic == 'No' ? 0 : 1 ,
            children_diabetic_text : childrenDiabeticNumber,
            live_birth : liveBirth == 'No' ? 0 : 1 ,
            live_birth_text : liveBirthNumber,
            still_birth : stillBirth == 'No' ? 0 : 1 ,
            still_birth_text : stillBirthNumber,
            neonatal_deaths : neonatalDeath == 'No' ? 0 : 1 ,
            neonatal_deaths_text : neonatalDeathNumber,
            abortion : abortion == 'No' ? 0 : 1 ,
            abortiont_ext   : abortionNumber
        }
            try {
                const response = await API.post('patient/add-personal-history',data)
                if(response?.status == 201){
                    fetchPatientDetails()
                    setSuccessfullyUpdated(true)
                    setLoading(false)
                    setTimeout(() => {
                        setSuccessfullyUpdated(false)
                        }, 1500);

                }
            } catch (error) {
                console.log({error})
                setLoading(false)
            }
      }


    return (
        <>
        {loading && (
            <Loader/>
        )}
        <div className='personalHistory '>
            <form onSubmit={updatePersonalHistory}>
                <div className="wraperForm profileWrapper personalHistoryBox row">
                    <div className="single col-lg-4">
                        <label htmlFor="">Marital Status </label>
                        <Select
                            value={maritalStatus}
                            onChange={(value) => setMaritalStatus(value)} 
                            options={[
                                { value: 'Select status', label: <span>Select status</span>, disabled: true },
                                { value: 'Married', label: <span>Married</span> },
                                { value: 'Single', label: <span>Single</span> },
                            ]}
                            className='enthncitySelect input__fields_personal'
                        />
                    </div>
                    {/* Select Occupation */}
                    <div className="single col-lg-4">
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

                    <div className="single col-lg-4">
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

                    {/* <div className="single col-lg-4">
                        <label htmlFor="">Occupation </label>
                        <input value={occupation} onChange={(e) => setOccupation(e.target.value)}  type="text" placeholder='Enter occupation' className='input__fields_personal' />
                    </div> */}
                    {/* <div className="single col-lg-4">
                        <label htmlFor="">Life Style </label>
                        <div className="life-style-wraper">
                            <div className="life-single">
                                <input type="radio" name='lifestyle' value='Smoker' checked={lifestyle == 'Smoker'}onChange={() => setLifestyle('Smoker')} />
                                <label htmlFor="">Smoker</label>
                            </div>
                            <div className="life-single">
                                <input type="radio" name='lifestyle' value='Drinker' checked={lifestyle == 'Drinker'} onChange={() => setLifestyle('Drinker')}/>
                                <label htmlFor="">Drinker</label>
                            </div>
                        </div>
                    </div> */}
                    {/* father */}
                    <div className="single col-lg-4">
                        <label htmlFor="">Is patient’s father diabetic?</label>
                        <div className="yesWraper">
                            <div className="checks-single-wraper">
                                <div className="yes-single">
                                    <input type="radio" name='father' value='Yes' checked={fatherDiabetic == 'Yes'} onChange={() => setFatherDiabetic('Yes')}/>
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single">
                                    <input disabled={fatherDiabetic == 'No'} type="radio" name='father' value='No' checked={fatherDiabetic == 'No'}
                                     onChange={() => {
                                        setFatherDiabetic('No');
                                        setFatherDiabeticNumber('');
                                    }}
                                    
                                     />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                            <input 
                                type='number' 
                                value={fatherDiabeticNumber} 
                                onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 6);
                                    setFatherDiabeticNumber(inputValue);
                                }} 
                                placeholder='Enter Number' 
                                className={`${fatherDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}
                            />
                        </div>
                    </div>
                    {/* father */}

                    {/* Is patient’s mother diabetic? */}
                    <div className="single col-lg-4">
                        <label htmlFor="">Is patient’s mother diabetic?</label>
                        <div className="yesWraper">
                            <div className="checks-single-wraper">
                                <div className="yes-single">
                                    <input type="radio" name='mother' value='Yes'  checked={motherDiabetic == 'Yes'} onChange={() => setMotherDiabetic('Yes')} />
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single">
                                    <input type="radio" name='mother'  value='No' checked={motherDiabetic == 'No'} 
                                    onChange={() => {
                                        setMotherDiabetic('No');
                                        setMotherDiabeticNumber('');
                                    }}
                                    />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                            <input type='number' disabled={motherDiabetic == 'No'} value={motherDiabeticNumber} onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 6);
                                    setMotherDiabeticNumber(inputValue) }}
                                     placeholder='Enter Number'
                                     className={`${motherDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}
                                     />
                        </div>
                    </div>
                    {/* Is patient’s mother diabetic? */}

                    {/* Is patient’s spouse diabetic? */}
                    <div className="single col-lg-4">
                        <label htmlFor="">Is patient’s spouse diabetic?</label>
                        <div className="yesWraper">
                            <div className="checks-single-wraper">
                                <div className="yes-single">
                                    <input type="radio" name='spouse' value='Yes'  checked={spouseDiabetic == 'Yes'} 
                                    onChange={() => setSpouseDiabetic('Yes')} />
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single">
                                    <input type="radio" name='spouse' value='No' checked={spouseDiabetic == 'No'} 
                                    onChange={() => {
                                        setSpouseDiabetic('No');
                                        setSpouseDiabeticNumber('');
                                    }} />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                            <input type='number' disabled={spouseDiabetic == 'No'} value={spouseDiabeticNumber} onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 6);
                                    setSpouseDiabeticNumber(inputValue) }} placeholder='Enter Number' 
                                    className={`${spouseDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} />
                        </div>
                    </div>
                    {/* Is patient’s spouse diabetic? */}

                    {/* Is patient’s brother diabetic? */}
                    <div className="single col-lg-4">
                        <label htmlFor="">Is patient’s brother diabetic?</label>
                        <div className="yesWraper">
                            <div className="checks-single-wraper">
                                <div className="yes-single">
                                    <input type="radio" name='brother' value='Yes'  checked={brotherDiabetic == 'Yes'} onChange={() => setBrotherDiabetic('Yes')}/>
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single">
                                    <input type="radio" name='brother'  value='No' 
                                    checked={brotherDiabetic == 'No'}
                                     
                                    onChange={() => {
                                        setBrotherDiabetic('No');
                                        setBrotherDiabeticNumber('');
                                    }} />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                            <input type='number' disabled={brotherDiabetic == 'No'} value={brotherDiabeticNumber} onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 6);
                                    setBrotherDiabeticNumber(inputValue) }} placeholder='Enter Number' 
                                    className={`${brotherDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} />
                        </div>
                    </div>
                    {/* Is patient’s brother diabetic? */}

                    {/* Is patient’s sister diabetic? */}
                    <div className="single col-lg-4">
                        <label htmlFor="">Is patient’s sister diabetic?</label>
                        <div className="yesWraper">
                            <div className="checks-single-wraper">
                                <div className="yes-single">
                                    <input type="radio" name='sister' value='Yes'  
                                    checked={sisterDiabetic == 'Yes'} 
                                    onChange={() => setSisterDiabetic('Yes')}/>
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single">
                                    <input type="radio" name='sister'  value='No' 
                                    checked={sisterDiabetic == 'No'} 
                                    onChange={() => {
                                        setSisterDiabetic('No');
                                        setSisterDiabeticNumber('');
                                    }}  />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                            <input type='number' disabled={sisterDiabetic == 'No'} value={sisterDiabeticNumber} onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 6);
                                    setSisterDiabeticNumber(inputValue) }} placeholder='Enter Number' 
                                    className={`${sisterDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} />
                        </div>
                    </div>
                    {/* Is patient’s sister diabetic? */}

                    {/* childre */}
                    <div className="single col-lg-4">
                        <label htmlFor="">Are patient’s children diabetic ?</label>
                        <div className="yesWraper">
                            <div className="checks-single-wraper">
                                <div className="yes-single">
                                    <input type="radio" name='children' value='Yes'  
                                    checked={childrenDiabetic == 'Yes'} 
                                    onChange={() => setChildrenDiabetic('Yes')}/>
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single">
                                    <input type="radio" name='children' value='No' 
                                    checked={childrenDiabetic == 'No'} 
                                    onChange={() => {
                                        setChildrenDiabetic('No');
                                        setChildrenDiabeticNumber('');
                                    }} />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                            <input type='number' disabled={childrenDiabetic == 'No'} value={childrenDiabeticNumber} onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 6);
                                    setChildrenDiabeticNumber(inputValue) }} placeholder='Enter Number' 
                                    className={`${childrenDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} />
                        </div>
                    </div>
                    {/* childre */}

                    {female &&
                        (<>
                            {/* Live Birth */}
                            <div className="single col-lg-4">
                                <label htmlFor="">Live Birth</label>
                                <div className="yesWraper">
                                    <div className="checks-single-wraper">
                                        <div className="yes-single">
                                            <input type="radio" name='liveBirth'  value='Yes'  
                                            checked={liveBirth == 'Yes'} 
                                            onChange={() => setLiveBirth('Yes')} />
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className="yes-single">
                                            <input type="radio" name='liveBirth' value='No' 
                                            checked={liveBirth == 'No'}
                                             onChange={() => {
                                                setLiveBirth('No');
                                                setLiveBirthNumber('');
                                            }} />
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                    <input type='number' disabled={liveBirth == 'No'} value={liveBirthNumber} onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 6);
                                    setLiveBirthNumber(inputValue) }} placeholder='Enter Number' 
                                    className={`${liveBirth == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}/>
                                </div>
                            </div>
                            {/* Live Birth */}

                            {/* Still Birth */}
                            <div className="single col-lg-4">
                                <label htmlFor="">Still Birth</label>
                                <div className="yesWraper">
                                    <div className="checks-single-wraper">
                                        <div className="yes-single">
                                            <input type="radio" name='stillBirth' value='Yes'  
                                            checked={stillBirth == 'Yes'} 
                                            onChange={() => setStillBirth('Yes')}/>
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className="yes-single">
                                            <input type="radio" name='stillBirth' value='No' 
                                            checked={stillBirth == 'No'} 
                                            onChange={() => {
                                                setStillBirth('No');
                                                setStillBirthNumber('');
                                            }}/>
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                    <input type='number' disabled={stillBirth == 'No'} value={stillBirthNumber} onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 6);
                                    setStillBirthNumber(inputValue) }} placeholder='Enter Number'
                                    className={`${stillBirth == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} />
                                </div>
                            </div>
                            {/* Still Birth */}

                            {/* Neonatal Deaths */}
                            <div className="single col-lg-4">
                                <label htmlFor="">Neonatal Deaths</label>
                                <div className="yesWraper">
                                    <div className="checks-single-wraper">
                                        <div className="yes-single">
                                            <input type="radio" name='deaths' value='Yes'  
                                            checked={neonatalDeath == 'Yes'} 
                                            onChange={() => setNeonatalDeath('Yes')}/>
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className="yes-single">
                                            <input type="radio" name='deaths' value='No' 
                                            checked={neonatalDeath == 'No'}
                                             onChange={() => {
                                                setNeonatalDeath('No');
                                                setNeonatalDeathNumber('');
                                            }}/>
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                    <input type='number' disabled={neonatalDeath == 'No'} value={neonatalDeathNumber} onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 6);
                                    setNeonatalDeathNumber(inputValue) }} placeholder='Enter Number' 
                                    className={`${neonatalDeath == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} />
                                </div>
                            </div>
                            {/* Neonatal Deaths */}

                            {/* Abortion */}
                            <div className="single col-lg-4">
                                <label htmlFor="">Abortion</label>
                                <div className="yesWraper">
                                    <div className="checks-single-wraper">
                                        <div className="yes-single">
                                            <input type="radio" name='abortion'  value='Yes'  
                                            checked={abortion == 'Yes'} 
                                            onChange={() => setAbortion('Yes')}/>
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className="yes-single">
                                            <input type="radio" name='abortion' value='No' 
                                            checked={abortion == 'No'} 
                                            onChange={() => {
                                                setAbortion('No');
                                                setAbortionNumber('');
                                            }}/>
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                    <input type='number' disabled={abortion == 'No'} value={abortionNumber} onChange={(e) => {
                                    const inputValue = e.target.value.slice(0, 6);
                                    setAbortionNumber(inputValue) }} placeholder='Enter Number' 
                                    className={`${abortion == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} />
                                </div>
                            </div>
                            {/* Abortion */}
                        </>)
                    }
                </div>
            <button type='submit' className='continueBtn'> UPDATE DATA  </button>
            </form>
        </div>
        </>
        
    )
}

export default PersonalHistory
