import React, { useEffect, useState } from 'react'
import './dietaryAssessmentProfile.scss';
import { DatePicker, TimePicker } from 'antd';
import { Tab, Table, Tabs } from 'react-bootstrap';
import DietaryAssessmentModal from './dietaryAssessmentModalProfile/DietaryAssessmentModalProfile';
import customCalendar from '../../../assets/images/svg/customCalendar.svg'
import moment from 'moment';
import API from '../../../utils/httpService';
import Loader from '../../customLoader/loader';

function DietaryAssessment({ patientID, patientInfo, ethnicites }) {
    const [printModal, setPrintModal] = useState(false);
    const [date, setDate] = useState();
    const [educationalDate, setEducationalDate] = useState();
    const [dietaryAssesment, setDietaryAssesment] = useState({});
    const [educationalAssesment, setEducationalAssesment] = useState([]);
    const [educationQuestions, setEducationQuestions] = useState([]);
    const [dataResultValidation, setDataResultValidation] = useState(false);
    const handlePrintClose = () => setPrintModal(false);
    const handlePrintShow = () => setPrintModal(true);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState({});
    const [selectedTab, setSelectedTab] = useState('educational-assessment');
    const handleTabSelect = (key) => {
        setSelectedTab(key);
    };
    const getDietaryAssessment = async () => {
        try {
            const response = await API.get(`/consultation/assessments-dietary?patient_id=${patientID}&appointment_date=${date}`);
            if (response?.status === 422) {
                setDataResultValidation(response?.error)
                setLoading(false);
                setTimeout(() => {
                    setDataResultValidation(false)
                }, 1500);

            }
            else if (response?.status === 200) {
                setDietaryAssesment(response?.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getEducationAssessmentDate = async () => {
        try {
            const response = await API.get(`consultation/educational-assessments?patient_id=${patientID}&date=${educationalDate}`);
            if (response?.data) {
                setEducationalAssesment(response?.data);
                setLoading(false);
            }
            else if (response?.error) {
                setLoading(false);
                setEducationalAssesment([]);
                setDataResultValidation(response?.error)
                setTimeout(() => {
                    setDataResultValidation(false)
                }, 1500);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleDietaryDownload = async () => {
        try {
            const response = await API.get(`/consultation/assessments-dietary?patient_id=${patientID}&appointment_date=${date}&download=true`, {
                responseType: 'blob'
            });

            const blob = new Blob([response], { type: 'application/pdf' });

            const filename = `Dietary_Assessment`;
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Download error:', error);
        }
    }

    // const handleRadioChange = (questionId, value) => {
    //     console.log(value, questionId, "dsadsadsa")
    //     setAnswers(prevAnswers => ({
    //         ...prevAnswers,
    //         [questionId]: value
    //     }));
    // };
    useEffect(() => {
        const getEducationAssessment = async () => {
            try {
                // const response = await API.get(`consultation/educational-assessments?patient_id=${patientID}&date=${educationalDate}`);
                const response = await API.get('consultation/assessments-questions');
                setEducationQuestions(response?.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getEducationAssessment()

    }, [])



    useEffect(() => {
        if (date) {
            getDietaryAssessment();
        }
    }, [date]);

    useEffect(() => {
        if (educationalDate) {
            getEducationAssessmentDate()
        }
    }, [educationalDate]);

    const handleDietaryDateChange = (date, dateString) => {
        const formattedDate = moment(dateString, 'DD/MM/YYYY', true);
        if (formattedDate.isValid()) {
            setDate(formattedDate.format('YYYY-MM-DD'));
        } else {
            console.log('Invalid date');
        }
    };


    const handleEducationalDateChange = (date, dateString) => {
        const formattedDate = moment(dateString, 'DD/MM/YYYY', true);
        if (formattedDate.isValid()) {
            setEducationalDate(formattedDate.format('YYYY-MM-DD'));
        } else {
            console.log('Invalid date');
        }
    };
    const currentDate = moment().format('YYYY-MM-DD');

    // useEffect(() => {
    //     for (const questionId in educationalAssesment) {
    //         if (educationalAssesment.hasOwnProperty(questionId)) {
    //             const responseItem = educationalAssesment[questionId];
    //             const { answer } = responseItem;
    //             educationalAssesment[questionId] = answer === 1 ? 'Yes' : 'No';
    //         }
    //     }
    // }, [educationalAssesment])

    return (

        <>
            {loading && <Loader />}
            <div className='dietaryAssessment'>
                {dataResultValidation && (
                    <div className="toasting-notification">
                        <span> {dataResultValidation}</span>
                    </div>
                )}
                <div className='date'>
                    <label htmlFor="">Date</label>
                    {selectedTab === 'educational-assessment' ? (
                        <div className="date-input">
                            <img src={"/assets/images/svg/customCalendar.svg"} alt="" />
                            <DatePicker inputReadOnly onChange={handleEducationalDateChange} className='datePickerTabs' suffixIcon={<img src={customCalendar} />} format="DD/MM/YYYY" />
                            {/* <img src="/arrow-bottom.svg" className='arrow' alt="" /> */}
                        </div>
                    ) :
                        <div className="date-input">
                            <img src={"/assets/images/svg/customCalendar.svg"} alt="" />
                            <DatePicker inputReadOnly onChange={handleDietaryDateChange} className='datePickerTabs' suffixIcon={<img src={customCalendar} />} format="DD/MM/YYYY" />
                            {/* <img src="/arrow-bottom.svg" className='arrow' alt="" /> */}
                        </div>
                    }

                </div>
                <div className="wraperForm ">
                    <Tabs
                        defaultActiveKey="educational-assessment"
                        onSelect={handleTabSelect}
                        id="uncontrolled-tab-example"
                        className=""
                    >
                        <Tab eventKey="educational-assessment" title="Educational Assessment">
                            <div className='eucational-height'>
                                <Table className='eucational'>
                                    <thead>
                                        <tr>
                                            <th>Questions</th>
                                            <th>Current Consultation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {educationQuestions?.filter((defaultQues) => defaultQues?.section === "default")?.map((ques) => (
                                            <React.Fragment>
                                                <tr key={ques?.question_id}>
                                                    <td>{ques?.question}</td>
                                                    <td>
                                                        <div className="checks-single-wraper">
                                                            <div className="yes-single checks_radio_customSmall">
                                                                {/* Check if educationalAssesment exists and the answer for this question is 'Yes' */}
                                                                <input
                                                                    type="radio"
                                                                    name={`question_${ques?.question_id}`}
                                                                    value='Yes'
                                                                    checked={educationalAssesment && ques && educationalAssesment.find(ans => ans.question_id === ques.question_id)?.answer === 1} // Make sure you're comparing the answer with a number, not a string
                                                                // onChange={() => handleRadioChange(ques?.question_id, 'Yes')}
                                                                />
                                                                <label htmlFor="">Yes</label>
                                                            </div>
                                                            <div className="yes-single checks_radio_customSmall">
                                                                {/* Check if educationalAssesment exists and the answer for this question is 'No' */}
                                                                <input
                                                                    type="radio"
                                                                    name={`question_${ques?.question_id}`}
                                                                    value='No'
                                                                    checked={educationalAssesment && ques && educationalAssesment.find(ans => ans.question_id === ques.question_id)?.answer === 0} // Make sure you're comparing the answer with a number, not a string
                                                                // onChange={() => handleRadioChange(ques?.question_id, 'No')} 
                                                                />
                                                                <label htmlFor="">No</label>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </Table>
                                <Table className='eucational firstTable'>
                                    <thead>
                                        <tr>
                                            <th>SMBG</th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {educationQuestions?.filter((defaultQues) => defaultQues?.section == "smbg")?.map((ques) => (
                                            <React.Fragment key={ques?.question_id}>
                                                <tr>
                                                    <td>{ques?.question}</td>
                                                    <td>
                                                        <div className="checks-single-wraper">
                                                            <div className="yes-single checks_radio_customSmall">
                                                                <input
                                                                    type="radio"
                                                                    name={`question_${ques?.question_id}`}
                                                                    value='Yes'
                                                                    checked={educationalAssesment && ques && educationalAssesment[ques?.question_id]?.answer === 1}
                                                                // onChange={() => handleRadioChange(ques?.question_id, 'Yes')}
                                                                />
                                                                <label htmlFor="">Yes</label>
                                                            </div>
                                                            <div className="yes-single checks_radio_customSmall">
                                                                <input
                                                                    type="radio"
                                                                    name={`question_${ques?.question_id}`}
                                                                    value='No'
                                                                    checked={educationalAssesment && ques && educationalAssesment[ques?.question_id]?.answer === 0}
                                                                // onChange={() => handleRadioChange(ques?.question_id, 'No')}
                                                                />
                                                                <label htmlFor="">No</label>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {ques?.elements.length > 0 && ques?.elements.map((element) => (
                                                    <tr key={element?.id}>
                                                        <td>{element?.option}</td>
                                                        <td>
                                                            {element?.type === "text" ? (
                                                                <input
                                                                    type="text"
                                                                    name={element?.id}
                                                                    value={educationalAssesment[ques?.question_id]?.[element?.id] || ''}
                                                                    placeholder='Type Here'
                                                                    className='hideInput1'
                                                                    readOnly // Add readOnly attribute to make it non-editable
                                                                />
                                                            ) : (
                                                                <select
                                                                    name={element?.id}
                                                                    value={educationalAssesment[ques?.question_id]?.[element?.id] || ''}
                                                                    className="form-control hideBorder"
                                                                    placeholder="Select Option"
                                                                    disabled // Add disabled attribute to make it non-editable
                                                                >
                                                                    <option value=''>Select</option>
                                                                    {element?.children && element?.children?.map((item) => (
                                                                        <option key={item?.id} value={item?.option}>{item?.option}</option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </Table>
                                <Table className='eucational firstTable'>
                                    <thead>
                                        <tr>
                                            <th>Hypoglycemia</th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {educationQuestions?.filter((defaultQues) => defaultQues?.section == "hypocalcemia")?.map((ques) => (
                                            <React.Fragment key={ques?.question_id}>
                                                <tr>
                                                    <td>{ques?.question}</td>
                                                    <td>
                                                        <div className="checks-single-wraper">
                                                            <div className="yes-single checks_radio_customSmall">
                                                                <input
                                                                    type="radio"
                                                                    name={`question_${ques?.question_id}`}
                                                                    value='Yes'
                                                                    checked={educationalAssesment && ques && educationalAssesment[ques?.question_id]?.answer === 1}
                                                                // onChange={() => handleRadioChange(ques?.question_id, 'Yes')}
                                                                />
                                                                <label htmlFor="">Yes</label>
                                                            </div>
                                                            <div className="yes-single checks_radio_customSmall">
                                                                <input
                                                                    type="radio"
                                                                    name={`question_${ques?.question_id}`}
                                                                    value='No'
                                                                    checked={educationalAssesment && ques && educationalAssesment[ques?.question_id]?.answer === 0}
                                                                // onChange={() => handleRadioChange(ques?.question_id, 'No')}
                                                                />
                                                                <label htmlFor="">No</label>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {ques?.elements.length > 0 && ques?.elements.map((element) => (
                                                    <tr key={element?.id}>
                                                        <td>{element?.option}</td>
                                                        <td>
                                                            {element?.type === "text" ? (
                                                                <input
                                                                    type="text"
                                                                    name={element?.id}
                                                                    value={educationalAssesment[ques?.question_id]?.[element?.id] || ''}
                                                                    placeholder='Type Here'
                                                                    className='hideInput1'
                                                                    readOnly // Add readOnly attribute to make it non-editable
                                                                />
                                                            ) : (
                                                                <select
                                                                    name={element?.id}
                                                                    value={educationalAssesment[ques?.question_id]?.[element?.id] || ''}
                                                                    className="form-control hideBorder"
                                                                    placeholder="Select Option"
                                                                    disabled // Add disabled attribute to make it non-editable
                                                                >
                                                                    <option value=''>Select</option>
                                                                    {element?.children && element?.children?.map((item) => (
                                                                        <option key={item?.id} value={item?.option}>{item?.option}</option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </Table>

                                <Table className='eucational firstTable'>
                                    <thead>
                                        <tr>
                                            <th>Exercise</th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {educationQuestions?.filter((defaultQues) => defaultQues?.section == "exercise")?.map((ques) => (
                                            <React.Fragment key={ques?.question_id}>
                                                <tr>
                                                    <td>{ques?.question}</td>
                                                    <td>
                                                        <div className="checks-single-wraper">
                                                            <div className="yes-single checks_radio_customSmall">
                                                                <input
                                                                    type="radio"
                                                                    name={`question_${ques?.question_id}`}
                                                                    value='Yes'
                                                                    checked={educationalAssesment && ques && educationalAssesment[ques?.question_id]?.answer === 1}
                                                                // onChange={() => handleRadioChange(ques?.question_id, 'Yes')}
                                                                />
                                                                <label htmlFor="">Yes</label>
                                                            </div>
                                                            <div className="yes-single checks_radio_customSmall">
                                                                <input
                                                                    type="radio"
                                                                    name={`question_${ques?.question_id}`}
                                                                    value='No'
                                                                    checked={educationalAssesment && ques && educationalAssesment[ques?.question_id]?.answer === 0}
                                                                // onChange={() => handleRadioChange(ques?.question_id, 'No')}
                                                                />
                                                                <label htmlFor="">No</label>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {ques?.elements.length > 0 && ques?.elements.map((element) => (
                                                    <tr key={element?.id}>
                                                        <td>{element?.option}</td>
                                                        <td>
                                                            {element?.type === "text" ? (
                                                                <input
                                                                    type="text"
                                                                    name={element?.id}
                                                                    value={educationalAssesment[ques?.question_id]?.[element?.id] || ''}
                                                                    placeholder='Type Here'
                                                                    className='hideInput1'
                                                                    readOnly // Add readOnly attribute to make it non-editable
                                                                />
                                                            ) : element?.type === "select" ? (
                                                                <select
                                                                    name={element?.id}
                                                                    value={educationalAssesment[ques?.question_id]?.[element?.id] || ''}
                                                                    className="form-control hideBorder"
                                                                    placeholder="Select Option"
                                                                    disabled // Add disabled attribute to make it non-editable
                                                                >
                                                                    <option value=''>Select</option>
                                                                    {element?.children && element?.children?.map((item) => (
                                                                        <option key={item?.id} value={item?.option}>{item?.option}</option>
                                                                    ))}
                                                                </select>
                                                            ) : (
                                                                <div>
                                                                    <TimePicker
                                                                        placeholder='Start Time'
                                                                        className='datePick'
                                                                    // value={formData.startTime}
                                                                    // onChange={(time, timeString) => handleTimeChange('startTime', timeString)} 
                                                                    // onChange={(current) => handleTime(current)}
                                                                    />
                                                                    <TimePicker
                                                                        placeholder='End Time'
                                                                        className='datePick'
                                                                    // value={formData.endTime}
                                                                    // onChange={(time, timeString) => handleTimeChange('endTime', timeString)} 
                                                                    />
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div className='print-btn'>
                                <button className='btn'>PRINT</button>
                            </div>
                        </Tab>
                        <Tab eventKey="dietary-assessment" title="Dietary Assessment">
                            <div className='dietary-height'>
                                <Table className='dietary1'>
                                    <thead>
                                        <tr>
                                            <th>Height (cm)</th>
                                            <th>Weight (kg)</th>
                                            <th>BMI</th>
                                            <th>IBW</th>
                                            <th>BEE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{dietaryAssesment?.height}</td>
                                            <td>{dietaryAssesment?.weight}</td>
                                            <td>{dietaryAssesment?.bmi}</td>
                                            <td>{dietaryAssesment?.ibw}</td>
                                            <td>{dietaryAssesment?.bee}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Table className='dietary2'>
                                    <thead>
                                        <tr>
                                            <th colSpan="6">Food Groups</th>
                                            <th colSpan="7">Miscellaneous</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Meal Timing</th>
                                            <th>Cereal</th>
                                            <th>Vegetable</th>
                                            <th>Meat</th>
                                            <th>Milk</th>
                                            <th>Fruits</th>
                                            <th>Cereal</th>
                                            <th>Fats</th>
                                            <th>Calories</th>
                                            <th>Carbo</th>
                                            <th>Fats</th>
                                            <th>Protein</th>
                                            <th>Calories</th>
                                        </tr>
                                        <tr>
                                            <th>Breakfast Group</th>
                                            <td>{dietaryAssesment?.meal_entries?.[0]?.cereal}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[0]?.vegetable}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[0]?.meat}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[0]?.milk}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[0]?.fruits}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[0]?.cereal}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[0]?.fats}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[0]?.calories}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[0]?.carbo}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[0]?.fats}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[0]?.protein}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[0]?.calories}</td>
                                        </tr>
                                        <tr>
                                            <th>Mid Day Meal Group</th>
                                            <td>{dietaryAssesment?.meal_entries?.[1]?.cereal}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[1]?.vegetable}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[1]?.meat}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[1]?.milk}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[1]?.fruits}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[1]?.cereal}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[1]?.fats}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[1]?.calories}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[1]?.carbo}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[1]?.fats}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[1]?.protein}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[1]?.calories}</td>
                                        </tr>
                                        <tr>
                                            <th>Lunch Group</th>
                                            <td>{dietaryAssesment?.meal_entries?.[2]?.cereal}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[2]?.vegetable}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[2]?.meat}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[2]?.milk}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[2]?.fruits}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[2]?.cereal}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[2]?.fats}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[2]?.calories}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[2]?.carbo}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[2]?.fats}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[2]?.protein}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[2]?.calories}</td>
                                        </tr>
                                        <tr>
                                            <th>Tea Time Group</th>
                                            <td>{dietaryAssesment?.meal_entries?.[3]?.cereal}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[3]?.vegetable}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[3]?.meat}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[3]?.milk}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[3]?.fruits}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[3]?.cereal}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[3]?.fats}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[3]?.calories}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[3]?.carbo}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[3]?.fats}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[3]?.protein}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[3]?.calories}</td>
                                        </tr>
                                        <tr>
                                            <th>Dinner Group</th>
                                            <td>{dietaryAssesment?.meal_entries?.[4]?.cereal}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[4]?.vegetable}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[4]?.meat}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[4]?.milk}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[4]?.fruits}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[4]?.cereal}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[4]?.fats}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[4]?.calories}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[4]?.carbo}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[4]?.fats}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[4]?.protein}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[4]?.calories}</td>
                                        </tr>
                                        <tr>
                                            <th>Bed Time Group</th>
                                            <td>{dietaryAssesment?.meal_entries?.[5]?.cereal}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[5]?.vegetable}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[5]?.meat}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[5]?.milk}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[5]?.fruits}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[5]?.cereal}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[5]?.fats}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[5]?.calories}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[5]?.carbo}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[5]?.fats}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[5]?.protein}</td>
                                            <td>{dietaryAssesment?.meal_entries?.[5]?.calories}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Table className='dietary3'>
                                    <thead>
                                        <tr>
                                            <th>Visit</th>
                                            <th>Activity Factor</th>
                                            <th>Injury Factor</th>
                                            <th>Fat Intake</th>
                                            <th>Cal Intake</th>
                                            <th>Cal Req</th>
                                            <th>Cal Advised</th>
                                            <th>Compliance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{dietaryAssesment?.visit_no}</td>
                                            <td>{dietaryAssesment?.activity_factor}</td>
                                            <td>{dietaryAssesment?.injury_factor}</td>
                                            <td>{dietaryAssesment?.fats_intake}</td>
                                            <td>{dietaryAssesment?.calories_intake}</td>
                                            <td>{dietaryAssesment?.calories_required}</td>
                                            <td>{dietaryAssesment?.calories_advised}</td>
                                            <td>{dietaryAssesment?.compliance} </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Table className='dietary4'>
                                    <thead>
                                        <tr>
                                            <th colSpan="6">Diet Advised</th>
                                            <th colSpan="6">Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Protein:</th>
                                            <td>{dietaryAssesment?.protein_intake}</td>
                                            <th>Calories:</th>
                                            <td>{dietaryAssesment?.calories_intake}</td>
                                            <th>Sodium:</th>
                                            <td>{dietaryAssesment?.sodium_intake}</td>
                                            <td colSpan="6">{dietaryAssesment?.remarks}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className='print-btn'>
                                <button className='btn' onClick={handlePrintShow}>PRINT</button>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                <DietaryAssessmentModal handleDietaryDownload={handleDietaryDownload} ethnicites={ethnicites} patientInfo={patientInfo} dietaryAssesment={dietaryAssesment} handlePrintClose={handlePrintClose} printModal={printModal} />
            </div>
        </>
    )
}

export default DietaryAssessment