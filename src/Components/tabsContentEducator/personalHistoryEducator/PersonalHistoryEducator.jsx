import React, { useEffect, useState } from 'react'
import './personalHistoryEducator.scss'
import { Select } from 'antd'
import API from '../../../utils/httpService';

const PersonalHistoryEducator = ({patientDetails}) => {
    const [maritalStatus, setMaritalStatus] = useState('Select Status');
    const [occupation, setOccupation] = useState('');
    const [lifestyle, setLifestyle] = useState('');
    const [fatherDiabetic, setFatherDiabetic] = useState('');
    const [fatherDiabeticInput, setFatherDiabeticInput] = useState('');
    const [motherDiabetic, setMotherDiabetic] = useState('');
    const [motherDiabeticInput, setMotherDiabeticInput] = useState('');
    const [spouseDiabetic, setSpouseDiabetic] = useState('');
    const [spouseDiabeticInput, setSpouseDiabeticInput] = useState('');
    const [brotherDiabetic, setBrotherDiabetic] = useState('');
    const [brotherDiabeticInput, setBrotherDiabeticInput] = useState('');
    const [sisterDiabetic, setSisterDiabetic] = useState('');
    const [sisterDiabeticInput, setSisterDiabeticInput] = useState('');
    const [childrenDiabetic, setChildrenDiabetic] = useState('');
    const [childrenDiabeticInput, setChildrenDiabeticInput] = useState('');
    const [liveBirth, setLiveBirth] = useState('');
    const [liveBirthInput, setLiveBirthInput] = useState('');
    const [stillBirth, setStillBirth] = useState('');
    const [stillBirthInput, setStillBirthInput] = useState('');
    const [neonatalDeaths, setNeonatalDeaths] = useState('');
    const [neonatalDeathsInput, setNeonatalDeathsInput] = useState('');
    const [abortion, setAbortion] = useState('');
    const [abortionInput, setAbortionInput] = useState('');
    const [lifeStyleOccupationList, setLifeStyleOccupationList] = useState('');

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
        if ((patientDetails?.patient_personal_history?.length ?? 0) > 0 || Object.keys(patientDetails?.patient_personal_history ?? {}).length > 0) {
        setMaritalStatus(patientDetails.patient_personal_history?.marital_status == null ? "" : patientDetails.patient_personal_history?.marital_status)
        setOccupation(patientDetails.patient_personal_history?.occupation == null ? "" : patientDetails.patient_personal_history?.occupation)
        setLifestyle(patientDetails.patient_personal_history?.lifestyle == null ? "" : patientDetails.patient_personal_history?.lifestyle)
        setFatherDiabetic(patientDetails.patient_personal_history?.father_diabetic == null ? "" : patientDetails.patient_personal_history?.father_diabetic == 0 ? 'No' : 'Yes')
        setFatherDiabeticInput(patientDetails.patient_personal_history?.father_diabetic_text)
        setMotherDiabeticInput(patientDetails.patient_personal_history?.mother_diabetic_text)
        setSpouseDiabeticInput(patientDetails.patient_personal_history?.spouse_diabetic_text)
        setBrotherDiabeticInput(patientDetails.patient_personal_history?.brother_diabetic_text)
        setSisterDiabeticInput(patientDetails.patient_personal_history?.sister_diabetic_text)
        setChildrenDiabeticInput(patientDetails.patient_personal_history?.children_diabetic_text)
        setLiveBirthInput(patientDetails.patient_personal_history?.live_birth_text)
        setStillBirthInput(patientDetails.patient_personal_history?.still_birth_text)
        setNeonatalDeathsInput(patientDetails.patient_personal_history?.neonatal_deaths_text)
        setAbortionInput(patientDetails.patient_personal_history?.abortiont_ext)
        setMotherDiabetic(patientDetails.patient_personal_history?.mother_diabetic == null ? "" : patientDetails.patient_personal_history?.mother_diabetic == 0 ? 'No' : 'Yes')
        setSpouseDiabetic(patientDetails.patient_personal_history?.spouse_diabetic == null ? "" : patientDetails.patient_personal_history?.spouse_diabetic == 0 ? 'No' : 'Yes')
        setBrotherDiabetic(patientDetails.patient_personal_history?.brother_diabetic == null ? "" : patientDetails.patient_personal_history?.brother_diabetic == 0 ? 'No' : 'Yes')
        setSisterDiabetic(patientDetails.patient_personal_history?.sister_diabetic == null ? "" : patientDetails.patient_personal_history?.sister_diabetic == 0 ? 'No' : 'Yes')
        setChildrenDiabetic(patientDetails.patient_personal_history?.children_diabetic == null ? "" : patientDetails.patient_personal_history?.children_diabetic == 0 ? 'No' : 'Yes')
        setLiveBirth(patientDetails.patient_personal_history?.live_birth == null ? "" : patientDetails.patient_personal_history?.live_birth == 0 ? 'No' : 'Yes')
        setStillBirth(patientDetails.patient_personal_history?.still_birth == null ? "" : patientDetails.patient_personal_history?.still_birth == 0 ? 'No' : 'Yes')
        setNeonatalDeaths(patientDetails.patient_personal_history?.neonatal_deaths == null ? "" : patientDetails.patient_personal_history?.neonatal_deaths == 0 ? 'No' : 'Yes')
        setAbortion(patientDetails.patient_personal_history?.abortion == null ? "" : patientDetails.patient_personal_history?.abortion == 0 ? 'No' : 'Yes')
        
        }
    },[patientDetails])

    return (
        <div className='personalHistoryEducator'>
            <form>
                <div className="wraperForm">
                    <div className="single">
                        <label htmlFor="">Marital Status </label>
                        <Select
                            defaultValue={"selectStatus"}
                            options={[
                                // { value: 'selectStatus', label: <span>Select status</span> },
                                { value: 'married', label: <span>Married</span> },
                                { value: 'single', label: <span>Single</span> },
                            ]}
                            className='enthncitySelect input__fields_personal'
                            value={maritalStatus}
                            onChange={(value) => setMaritalStatus(value)}
                        />
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

                    {/* <div className="single">
                        <label htmlFor="">Lifestyle </label>
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
                            
                        </div>
                    </div> */}
                </div>
                <div className="wraper_educatorChecks">
                    {/* father */}
                    <div className="single">
                        <label htmlFor="">Is patient’s father diabetic?</label>
                        <div className="yesWraper">
                            <div className="checks-single-wraper">
                                <div className="yes-single checks_radio_customSmall">
                                    <input type="radio" name='father' value='Yes' checked={fatherDiabetic == 'Yes'} onChange={() => setFatherDiabetic('Yes')}/>
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single checks_radio_customSmall">
                                    <input type="radio" name='father' value='No' checked={fatherDiabetic == 'No'} onChange={() => setFatherDiabetic('No')}/>
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                            <input type='text' placeholder='1234' className={`${fatherDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} disabled={fatherDiabetic == 'No'} value={fatherDiabeticInput} onChange={(e) => setFatherDiabeticInput(e.target.value)}/>
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
                                onChange={(e) => setMotherDiabetic('No')}
                            />
                            <label htmlFor="">No</label>
                        </div>
                    </div>
                        <input
                            type='text'
                            placeholder='1234'
                            className={`${motherDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}
                            disabled={motherDiabetic == 'No'}
                            value={motherDiabeticInput}
                            onChange={(e) => setMotherDiabeticInput(e.target.value)}
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
                                        onChange={(e) => setSpouseDiabetic('No')}
                                    />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                                <input
                                    type='text'
                                    placeholder='1234'
                                    className={`${spouseDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}
                                    disabled={spouseDiabetic == 'No'}
                                    value={spouseDiabeticInput}
                                    onChange={(e) => setSpouseDiabeticInput(e.target.value)}
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
                                        onChange={(e) => setBrotherDiabetic('No')}
                                    />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                                <input
                                    type='text'
                                    placeholder='1234'
                                    className={`${brotherDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}

                                    disabled={brotherDiabetic == 'No'}
                                    value={brotherDiabeticInput}
                                    onChange={(e) => setBrotherDiabeticInput(e.target.value)}
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
                                    onChange={(e) => setSisterDiabetic('Yes')}/>
                                    <label htmlFor="">Yes</label>
                                </div>
                                <div className="yes-single checks_radio_customSmall">
                                    <input
                                     type="radio"
                                     name='sister'
                                     value='No'
                                     checked={sisterDiabetic == 'No'}
                                     onChange={(e) => setSisterDiabetic('No')} />
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                            <input type='text'
                             placeholder='1234'
                             className={`${sisterDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}

                              disabled={sisterDiabetic == 'No'}
                              value={sisterDiabeticInput}
                            onChange={(e) => setSisterDiabeticInput(e.target.value)} />
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
                                     onChange={(e) => setChildrenDiabetic('No')} /> 
                                    <label htmlFor="">No</label>
                                </div>
                            </div>
                            <input type='text' placeholder='1234'  className={`${childrenDiabetic == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`}
 disabled={childrenDiabetic == 'No'} value={childrenDiabeticInput} onChange={(e) => setChildrenDiabeticInput(e.target.value)} /> 
                        </div>
                    </div>
                    {/* childre */}

                    {patientDetails?.patient_info?.gender == 'Female' &&
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
                                             onChange={(e) => setLiveBirth('No')} />  
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                    <input type='text' placeholder='1234' className={`${liveBirth == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} disabled={liveBirth == 'No'} value={liveBirthInput} onChange={(e) => setLiveBirthInput(e.target.value)} />
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
                                            onChange={(e) => setStillBirth('No')} /> 
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                    <input type='text' placeholder='1234'  className={`${stillBirth == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} disabled={stillBirth == 'No'} value={stillBirthInput} onChange={(e) => setStillBirthInput(e.target.value)} />
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
                                            onChange={(e) => setNeonatalDeaths('No')} />
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div> 
                                    <input type='text' placeholder='1234' className={`${neonatalDeaths == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} disabled={neonatalDeaths == 'No'} value={neonatalDeathsInput} onChange={(e) => setNeonatalDeathsInput(e.target.value)}/>
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
                                            onChange={(e) => setAbortion('No')} />
                                            <label htmlFor="">No</label>
                                        </div>
                                    </div>
                                    <input type='text' placeholder='1234' className={`${abortion == 'No' ? 'rect-inptDisabled' : 'rect-inpt'}`} disabled={abortion == 'No'} value={abortionInput} onChange={(e) => setAbortionInput(e.target.value)} />
                                </div>
                            </div>
                            {/* Abortion */}
                        </>)
                    }
                </div>
            </form>
        </div>
    )
}

export default PersonalHistoryEducator;
