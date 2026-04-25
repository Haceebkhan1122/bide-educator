import React, { useEffect, useRef, useState } from 'react'
import './educatorAssessment.scss';

import '../../Components/tabsContentProfile/dietaryAssessmentProfile/dietaryAssessmentProfile.scss'
import { Row, Tab, Tabs, Col, Table, Container, Button } from 'react-bootstrap';
import SaveAssessmentModal from '../educatorModals/SaveAssessmentModal';
import PrintAssessmentModal from '../educatorModals/PrintAssessmentModal';
import API from '../../utils/httpService';
import { TimePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import SavEducationalAssesstment from '../educatorModals/SavEducationalAssesstment';

function EducatorAssessment({fetchAssessment, followupDate,prescriptionList, handleDietaryDownload, educationAssessmentList, isPrefilledData,setPrintState,printState, dateChangeDietaryAss, ethnicityList, selectedAppointmentId, patientDetails }) {
    const [key, setKey] = useState("eucational-assessment")
    const [printModal, setPrintModal] = useState(false);
    const [takingOHA, setTakingOHA] = useState('')
    const [correctTiming, setCorrectTiming] = useState('')

    const [cereal, setCereal] = useState('')
    const [vegetable, setVegetable] = useState('')
    const [meat, setMeat] = useState('')
    const [milk, setMilk] = useState('')
    const [fruits, setFruits] = useState('')
    const [cerealMisc, setCerealMisc] = useState('')
    const [fatsMisc, setFatsMisc] = useState('')
    const [caloriesMisc, setCaloriesMisc] = useState('')
    const [carbo, setCarbo] = useState('')
    const [fats, setFats] = useState('')
    const [protein, setProtein] = useState('')
    const [calories, setCalories] = useState('')

    const [cereal2, setCereal2] = useState('')
    const [vegetable2, setVegetable2] = useState('')
    const [meat2, setMeat2] = useState('')
    const [milk2, setMilk2] = useState('')
    const [fruits2, setFruits2] = useState('')
    const [cerealMisc2, setCerealMisc2] = useState('')
    const [fatsMisc2, setFatsMisc2] = useState('')
    const [caloriesMisc2, setCaloriesMisc2] = useState('')
    const [carbo2, setCarbo2] = useState('')
    const [fats2, setFats2] = useState('')
    const [protein2, setProtein2] = useState('')
    const [calories2, setCalories2] = useState('')

    const [cereal3, setCereal3] = useState('')
    const [vegetable3, setVegetable3] = useState('')
    const [meat3, setMeat3] = useState('')
    const [milk3, setMilk3] = useState('')
    const [fruits3, setFruits3] = useState('')
    const [cerealMisc3, setCerealMisc3] = useState('')
    const [fatsMisc3, setFatsMisc3] = useState('')
    const [caloriesMisc3, setCaloriesMisc3] = useState('')
    const [carbo3, setCarbo3] = useState('')
    const [fats3, setFats3] = useState('')
    const [protein3, setProtein3] = useState('')
    const [calories3, setCalories3] = useState('')

    const [cereal4, setCereal4] = useState('')
    const [vegetable4, setVegetable4] = useState('')
    const [meat4, setMeat4] = useState('')
    const [milk4, setMilk4] = useState('')
    const [fruits4, setFruits4] = useState('')
    const [cerealMisc4, setCerealMisc4] = useState('')
    const [fatsMisc4, setFatsMisc4] = useState('')
    const [caloriesMisc4, setCaloriesMisc4] = useState('')
    const [carbo4, setCarbo4] = useState('')
    const [fats4, setFats4] = useState('')
    const [protein4, setProtein4] = useState('')
    const [calories4, setCalories4] = useState('')

    const [cereal5, setCereal5] = useState('')
    const [vegetable5, setVegetable5] = useState('')
    const [meat5, setMeat5] = useState('')
    const [milk5, setMilk5] = useState('')
    const [fruits5, setFruits5] = useState('')
    const [cerealMisc5, setCerealMisc5] = useState('')
    const [fatsMisc5, setFatsMisc5] = useState('')
    const [caloriesMisc5, setCaloriesMisc5] = useState('')
    const [carbo5, setCarbo5] = useState('')
    const [fats5, setFats5] = useState('')
    const [protein5, setProtein5] = useState('')
    const [calories5, setCalories5] = useState('')

    const [cereal6, setCereal6] = useState('')
    const [vegetable6, setVegetable6] = useState('')
    const [meat6, setMeat6] = useState('')
    const [milk6, setMilk6] = useState('')
    const [fruits6, setFruits6] = useState('')
    const [cerealMisc6, setCerealMisc6] = useState('')
    const [fatsMisc6, setFatsMisc6] = useState('')
    const [caloriesMisc6, setCaloriesMisc6] = useState('')
    const [carbo6, setCarbo6] = useState('')
    const [fats6, setFats6] = useState('')
    const [protein6, setProtein6] = useState('')
    const [calories6, setCalories6] = useState('')

    const [visit, setVisit] = useState('')
    const [activityFactor, setActivityFactor] = useState('')
    const [injuryFactor, setInjuryFactor] = useState('')
    const [fatIntake, setFatIntake] = useState('')
    const [calIntake, setCalIntake] = useState('')
    const [calReq, setCalReq] = useState('')
    const [calAdvised, setCalAdvised] = useState('')
    const [compliance, setCompliance] = useState('')


    const [dietAdvisedProtein, setDietAdvisedProtein] = useState('')
    const [dietAdvisedCalories, setDietAdvisedCalories] = useState('')
    const [dietAdvisedSodium, setDietAdvisedSodium] = useState('')
    const [dietAdvisedRemarks, setDietAdvisedRemarks] = useState('')

    const [dietarySavedData, setDietarySavedData] = useState([])
    const [successfullySaved, setSuccessfullySaved] = useState(false)
    const [nestedFormData, setNestedFormData] = useState([])


    
    // Educational Assessment state
    const [questions, setQuestion] = useState([])
    const [eduAssessment, setEduAssessment] = useState([])
    const [formData, setFormData] = useState({
        elements: [] // Initialize elements as an empty array
    });

    const navigate = useNavigate()
    useEffect(() => {
        if (dateChangeDietaryAss && isPrefilledData) {
            setCereal(dateChangeDietaryAss?.meal_entries?.[0]?.cereal)
            setVegetable(dateChangeDietaryAss?.meal_entries?.[0]?.vegetable)
            setMeat(dateChangeDietaryAss?.meal_entries?.[0]?.meat)
            setMilk(dateChangeDietaryAss?.meal_entries?.[0]?.milk)
            setFruits(dateChangeDietaryAss?.meal_entries?.[0]?.fruits)
            setCarbo(dateChangeDietaryAss?.meal_entries?.[0]?.carbo)
            setFats(dateChangeDietaryAss?.meal_entries?.[0]?.fats)
            setProtein(dateChangeDietaryAss?.meal_entries?.[0]?.protein)
            setCalories(dateChangeDietaryAss?.meal_entries?.[0]?.calories)
            setCerealMisc(dateChangeDietaryAss?.meal_entries?.[0]?.cereal_misc)
            setFatsMisc(dateChangeDietaryAss?.meal_entries?.[0]?.fats_misc)
            setCaloriesMisc(dateChangeDietaryAss?.meal_entries?.[0]?.calories_misc)
            setCerealMisc2(dateChangeDietaryAss?.meal_entries?.[0]?.cereal_misc)
            setFatsMisc2(dateChangeDietaryAss?.meal_entries?.[0]?.fats_misc)
            setCaloriesMisc2(dateChangeDietaryAss?.meal_entries?.[0]?.calories_misc)
            setCerealMisc3(dateChangeDietaryAss?.meal_entries?.[0]?.cereal_misc)
            setFatsMisc3(dateChangeDietaryAss?.meal_entries?.[0]?.fats_misc)
            setCaloriesMisc3(dateChangeDietaryAss?.meal_entries?.[0]?.calories_misc)
            setCerealMisc4(dateChangeDietaryAss?.meal_entries?.[0]?.cereal_misc)
            setFatsMisc4(dateChangeDietaryAss?.meal_entries?.[0]?.fats_misc)
            setCaloriesMisc4(dateChangeDietaryAss?.meal_entries?.[0]?.calories_misc)
            setCerealMisc5(dateChangeDietaryAss?.meal_entries?.[0]?.cereal_misc)
            setFatsMisc5(dateChangeDietaryAss?.meal_entries?.[0]?.fats_misc)
            setCaloriesMisc5(dateChangeDietaryAss?.meal_entries?.[0]?.calories_misc)
            setCerealMisc6(dateChangeDietaryAss?.meal_entries?.[0]?.cereal_misc)
            setFatsMisc6(dateChangeDietaryAss?.meal_entries?.[0]?.fats_misc)
            setCaloriesMisc6(dateChangeDietaryAss?.meal_entries?.[0]?.calories_misc)
            setCereal2(dateChangeDietaryAss?.meal_entries?.[1]?.cereal)
            setVegetable2(dateChangeDietaryAss?.meal_entries?.[1]?.vegetable)
            setMeat2(dateChangeDietaryAss?.meal_entries?.[1]?.meat)
            setMilk2(dateChangeDietaryAss?.meal_entries?.[1]?.milk)
            setFruits2(dateChangeDietaryAss?.meal_entries?.[1]?.fruits)
            setCarbo2(dateChangeDietaryAss?.meal_entries?.[1]?.carbo)
            setFats2(dateChangeDietaryAss?.meal_entries?.[1]?.fats)
            setProtein2(dateChangeDietaryAss?.meal_entries?.[1]?.protein)
            setCalories2(dateChangeDietaryAss?.meal_entries?.[1]?.calories)
            setCereal3(dateChangeDietaryAss?.meal_entries?.[2]?.cereal)
            setVegetable3(dateChangeDietaryAss?.meal_entries?.[2]?.vegetable)
            setMeat3(dateChangeDietaryAss?.meal_entries?.[2]?.meat)
            setMilk3(dateChangeDietaryAss?.meal_entries?.[2]?.milk)
            setFruits3(dateChangeDietaryAss?.meal_entries?.[2]?.fruits)
            setCarbo3(dateChangeDietaryAss?.meal_entries?.[2]?.carbo)
            setFats3(dateChangeDietaryAss?.meal_entries?.[2]?.fats)
            setProtein3(dateChangeDietaryAss?.meal_entries?.[2]?.protein)
            setCalories3(dateChangeDietaryAss?.meal_entries?.[2]?.calories)
            setCereal4(dateChangeDietaryAss?.meal_entries?.[3]?.cereal)
            setVegetable4(dateChangeDietaryAss?.meal_entries?.[3]?.vegetable)
            setMeat4(dateChangeDietaryAss?.meal_entries?.[3]?.meat)
            setMilk4(dateChangeDietaryAss?.meal_entries?.[3]?.milk)
            setFruits4(dateChangeDietaryAss?.meal_entries?.[3]?.fruits)
            setCarbo4(dateChangeDietaryAss?.meal_entries?.[3]?.carbo)
            setFats4(dateChangeDietaryAss?.meal_entries?.[3]?.fats)
            setProtein4(dateChangeDietaryAss?.meal_entries?.[3]?.protein)
            setCalories4(dateChangeDietaryAss?.meal_entries?.[3]?.calories)
            setCereal5(dateChangeDietaryAss?.meal_entries?.[4]?.cereal)
            setVegetable5(dateChangeDietaryAss?.meal_entries?.[4]?.vegetable)
            setMeat5(dateChangeDietaryAss?.meal_entries?.[4]?.meat)
            setMilk5(dateChangeDietaryAss?.meal_entries?.[4]?.milk)
            setFruits5(dateChangeDietaryAss?.meal_entries?.[4]?.fruits)
            setCarbo5(dateChangeDietaryAss?.meal_entries?.[4]?.carbo)
            setFats5(dateChangeDietaryAss?.meal_entries?.[4]?.fats)
            setProtein5(dateChangeDietaryAss?.meal_entries?.[4]?.protein)
            setCalories5(dateChangeDietaryAss?.meal_entries?.[4]?.calories)
            setCereal6(dateChangeDietaryAss?.meal_entries?.[5]?.cereal)
            setVegetable6(dateChangeDietaryAss?.meal_entries?.[5]?.vegetable)
            setMeat6(dateChangeDietaryAss?.meal_entries?.[5]?.meat)
            setMilk6(dateChangeDietaryAss?.meal_entries?.[5]?.milk)
            setFruits6(dateChangeDietaryAss?.meal_entries?.[5]?.fruits)
            setCarbo6(dateChangeDietaryAss?.meal_entries?.[5]?.carbo)
            setFats6(dateChangeDietaryAss?.meal_entries?.[5]?.fats)
            setProtein6(dateChangeDietaryAss?.meal_entries?.[5]?.protein)
            setCalories6(dateChangeDietaryAss?.meal_entries?.[5]?.calories)
            setVisit(dateChangeDietaryAss?.visit_no)
            setActivityFactor(dateChangeDietaryAss?.activity_factor)
            setInjuryFactor(dateChangeDietaryAss?.injury_factor)
            setFatIntake(dateChangeDietaryAss?.fats_intake)
            setCalIntake(dateChangeDietaryAss?.calories_intake)
            setCalReq(dateChangeDietaryAss?.calories_required)
            setCalAdvised(dateChangeDietaryAss?.calories_advised)
            setCompliance(dateChangeDietaryAss?.compliance)
            setDietAdvisedProtein(dateChangeDietaryAss?.protein_intake)
            setDietAdvisedCalories(dateChangeDietaryAss?.calories_advised)
            setDietAdvisedSodium(dateChangeDietaryAss?.sodium_intake)
            setDietAdvisedRemarks(dateChangeDietaryAss?.remarks)
        } else if (!isPrefilledData) {
            setCerealMisc('')
            setFatsMisc('')
            setCaloriesMisc('')
            setCerealMisc2('')
            setFatsMisc2('')
            setCaloriesMisc2('')
            setCerealMisc3('')
            setFatsMisc3('')
            setCaloriesMisc3('')
            setCerealMisc4('')
            setFatsMisc4('')
            setCaloriesMisc4('')
            setCerealMisc5('')
            setFatsMisc5('')
            setCaloriesMisc5('')
            setCerealMisc6('')
            setFatsMisc6('')
            setCaloriesMisc6('')
            setCereal('')
            setVegetable('')
            setMeat('')
            setMilk('')
            setFruits('')
            setCarbo('')
            setFats('')
            setProtein('')
            setCalories('')
            setCereal2('')
            setVegetable2('')
            setMeat2('')
            setMilk2('')
            setFruits2('')
            setCarbo2('')
            setFats2('')
            setProtein2('')
            setCalories2('')
            setCereal3('')
            setVegetable3('')
            setMeat3('')
            setMilk3('')
            setFruits3('')
            setCarbo3('')
            setFats3('')
            setProtein3('')
            setCalories3('')
            setCereal4('')
            setVegetable4('')
            setMeat4('')
            setMilk4('')
            setFruits4('')
            setCarbo4('')
            setFats4('')
            setProtein4('')
            setCalories4('')
            setCereal5('')
            setVegetable5('')
            setMeat5('')
            setMilk5('')
            setFruits5('')
            setCarbo5('')
            setFats5('')
            setProtein5('')
            setCalories5('')
            setCereal6('')
            setVegetable6('')
            setMeat6('')
            setMilk6('')
            setFruits6('')
            setCarbo6('')
            setFats6('')
            setProtein6('')
            setCalories6('')
            setVisit('')
            setActivityFactor('')
            setInjuryFactor('')
            setFatIntake('')
            setCalIntake('')
            setCalReq('')
            setCalAdvised('')
            setCompliance('')
            setDietAdvisedProtein('')
            setDietAdvisedCalories('')
            setDietAdvisedSodium('')
            setDietAdvisedRemarks('')
        }
    }, [dateChangeDietaryAss, isPrefilledData])

    const handleInputChange = (e, element) => {
        const { value } = e.target;
        setFormData(prevData => {
            const elements = prevData.elements || []; // Ensure elements array is initialized
            const index = elements.findIndex(el => el.element_id === element.id);
            const updatedElements = [...elements];
            if (index !== -1) {
                updatedElements[index] = {
                    ...updatedElements[index],
                    element_value: value,
                    parent_question_id: element?.question_id
                };
            } else {
                updatedElements.push({
                    element_id: element.id,
                    element_value: value,
                    parent_question_id: element?.question_id
                });
            }
            return {
                ...prevData,
                elements: updatedElements
            };
        });
    };
    const handleSelectChange = (e, element) => {
        const { value } = e.target;
        setFormData(prevData => {
            const elements = prevData.elements || []; // Ensure elements array is initialized
            const index = elements.findIndex(el => el.element_id === element.id);
            const updatedElements = [...elements];
            if (index !== -1) {
                updatedElements[index] = {
                    ...updatedElements[index],
                    element_value: value,
                    parent_question_id: element?.question_id
                };
            } else {
                updatedElements.push({
                    element_id: element.id,
                    element_value: value,
                    parent_question_id: element?.question_id
                });
            }
            return {
                ...prevData,
                elements: updatedElements
            };
        });
    };

    const handleTimeChange = (key, value, element) => {
        setFormData(prevData => {
            const elements = prevData.elements || [];
            const index = elements.findIndex(el => el.element_id === key);
            const updatedElements = [...elements];
            if (index !== -1) {
                updatedElements[index] = {
                    ...updatedElements[index],
                    element_value: value.format('HH:mm'), // Format time to desired string format
                    parent_question_id: element?.question_id
                };
            } else {
                updatedElements.push({
                    element_id: element.id,
                    element_value: value.format('HH:mm'), // Format time to desired string format
                    parent_question_id: element?.question_id
                });
            }
            return {
                ...prevData,
                elements: updatedElements,
            };
        });
    };

    useEffect(() => {
        const keys = Object.keys(formData);
        const values = Object.values(formData);

        const elements = keys.map((key, index) => ({
            element_id: key,
            element_value: values[index]
        }));
    });

    useEffect(() => {
        const keys = Object.keys(formData);
        const values = Object.values(formData);

        const elements = keys.map((key, index) => ({
            element_id: key,
            element_value: values[index]
        }));


        setNestedFormData(elements)

    }, [formData]);

    const handlePrintClose = () => setPrintModal(false);
    const handlePrintShow = () => setPrintModal(true);

    const [showsaveModal, setShowSaveModal] = useState(false);
    const [showsaveModalEducational, setShowSaveModalEducational] = useState(false);
    const handleCloseSave = () => setShowSaveModal(false);
    const handleShowSave = () => setShowSaveModal(true);
    const handleShowSaveEducational = () => setShowSaveModalEducational(true);


    const [answers, setAnswers] = useState({});

    const handleRadioChange = (questionId, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: value
        }));
    };

    const convertToDesiredFormat = () => {
        const formattedData = {};
        Object.keys(answers).forEach(questionId => {
            formattedData[questionId] = {
                question_id: parseInt(questionId), // Add 1 to start from 1
                answer: answers[questionId] === 'Yes'
            };
        });
        return formattedData;
    };

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const postDataToEducationAssessment = async () => {
        const data = convertToDesiredFormat();

        // Filter out objects where question_id is 0
        const filteredData = Object.values(data).filter(question => question.question_id !== 0);

        // Iterate over each property (question) in the filtered data object
        for (const question of filteredData) {
            const matchedElements = formData.elements.filter(element => element.parent_question_id === question.question_id);
            if (matchedElements.length > 0) {
                question.elements = matchedElements;
            } else {
                question.elements = null;
            }
        }

        const data1 = {
            appointment_id: +selectedAppointmentId,
            assessment_date: formattedDate,
            question: filteredData
        };

        // Uncomment the code below when ready to make the API call
        try {
            const response = await API.post('/consultation/assessments-educational', data1);
            if (response?.status === 200) {
                setEduAssessment(response);
                setShowSaveModalEducational(false);
                setSuccessfullySaved(true);
                setTimeout(() => {
                    setSuccessfullySaved(false);
                    setKey('dietary-assessment');
                }, 1500);
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log(meat3, "meat3")
    const handleDieterySave = async () => {
        try {
            const data = {
                appointment_id: +selectedAppointmentId,
                age: patientDetails?.patient_info?.age,
                fats_intake: fatIntake,
                calories_intake: calIntake,
                calories_required: calReq,
                calories_advised: calAdvised,
                activity_factor: activityFactor,
                injury_factor: injuryFactor,
                compliance: compliance,
                visit_no: visit,
                remarks: dietAdvisedRemarks,
                protein_intake: dietAdvisedProtein,
                sodium_intake: dietAdvisedSodium,
                meal_entries: [
                    {
                        meal_time_id: 1,
                        cereal: cereal,
                        vegetable: vegetable,
                        meat: meat,
                        milk: milk,
                        fruits: fruits,
                        cereal_misc: cerealMisc,
                        fats_misc: fatsMisc,
                        calories_misc: caloriesMisc,
                        fats: fats,
                        calories: calories,
                        carbo: carbo,
                        protein: protein,
                    },
                    {
                        meal_time_id: 2,
                        cereal: cereal2,
                        vegetable: vegetable2,
                        meat: meat2,
                        milk: milk2,
                        fruits: fruits2,
                        cereal_misc: cerealMisc2,
                        fats_misc: fatsMisc2,
                        calories_misc: caloriesMisc2,
                        fats: fats2,
                        calories: calories2,
                        carbo: carbo2,
                        protein: protein2,
                    },
                    {
                        meal_time_id: 3,
                        cereal: cereal3,
                        vegetable: vegetable3,
                        meat: meat3,
                        milk: milk3,
                        fruits: fruits3,
                        cereal_misc: cerealMisc3,
                        fats_misc: fatsMisc3,
                        calories_misc: caloriesMisc3,
                        fats: fats3,
                        calories: calories3,
                        carbo: carbo3,
                        protein: protein3,
                    },
                    {
                        meal_time_id: 4,
                        cereal: cereal4,
                        vegetable: vegetable4,
                        meat: meat4,
                        milk: milk4,
                        fruits: fruits4,
                        cereal_misc: cerealMisc4,
                        fats_misc: fatsMisc4,
                        calories_misc: caloriesMisc4,
                        fats: fats4,
                        calories: calories4,
                        carbo: carbo4,
                        protein: protein4,
                    },
                    {
                        meal_time_id: 5,
                        cereal: cereal5,
                        vegetable: vegetable5,
                        meat: meat5,
                        milk: milk5,
                        fruits: fruits5,
                        cereal_misc: cerealMisc5,
                        fats_misc: fatsMisc5,
                        calories_misc: caloriesMisc5,
                        fats: fats5,
                        calories: calories5,
                        carbo: carbo5,
                        protein: protein5,
                    },
                    {
                        meal_time_id: 6,
                        cereal: cereal6,
                        vegetable: vegetable6,
                        meat: meat6,
                        milk: milk6,
                        fruits: fruits6,
                        cereal_misc: cerealMisc6,
                        fats_misc: fatsMisc6,
                        calories_misc: caloriesMisc6,
                        fats: fats6,
                        calories: calories6,
                        carbo: carbo6,
                        protein: protein6,
                    },
                ]

            }
            const response = await API.post('/consultation/assessments-dietary', data)
            if (response?.status === 200) {
                setDietarySavedData(response)
                setSuccessfullySaved(true)
                setPrintState(true)
                setShowSaveModal(false)
                fetchAssessment()
                setTimeout(() => {
                    setSuccessfullySaved(false);
                }, 1500);
                // setTimeout(() => {
                //     setSuccessfullySaved(false)
                //     navigate('/dashboard')
                //     setCereal('')
                //     setCereal2('')
                //     setCereal3('')
                //     setCereal4('')
                //     setCereal5('')
                //     setCereal6('')
                //     setVegetable('')
                //     setVegetable2('')
                //     setVegetable3('')
                //     setVegetable4('')
                //     setVegetable5('')
                //     setVegetable6('')
                //     setMeat('')
                //     setMeat2('')
                //     setMeat3('')
                //     setMeat4('')
                //     setMeat5('')
                //     setMeat6('')
                //     setMilk('')
                //     setMilk2('')
                //     setMilk3('')
                //     setMilk4('')
                //     setMilk5('')
                //     setMilk6('')
                //     setFruits('')
                //     setFruits2('')
                //     setFruits3('')
                //     setFruits4('')
                //     setFruits5('')
                //     setFruits6('')
                //     setCerealMisc('')
                //     setCerealMisc2('')
                //     setCerealMisc3('')
                //     setCerealMisc4('')
                //     setCerealMisc5('')
                //     setCerealMisc6('')
                //     setFatsMisc('')
                //     setFatsMisc2('')
                //     setFatsMisc3('')
                //     setFatsMisc4('')
                //     setFatsMisc5('')
                //     setFatsMisc6('')
                //     setCaloriesMisc('')
                //     setCaloriesMisc2('')
                //     setCaloriesMisc3('')
                //     setCaloriesMisc4('')
                //     setCaloriesMisc5('')
                //     setCaloriesMisc6('')
                //     setCarbo('')
                //     setCarbo2('')
                //     setCarbo3('')
                //     setCarbo4('')
                //     setCarbo5('')
                //     setCarbo6('')
                //     setFats('')
                //     setFats2('')
                //     setFats3('')
                //     setFats4('')
                //     setFats5('')
                //     setFats6('')
                //     setProtein('')
                //     setProtein2('')
                //     setProtein3('')
                //     setProtein4('')
                //     setProtein5('')
                //     setProtein6('')
                //     setCalories('')
                //     setCalories2('')
                //     setCalories3('')
                //     setCalories4('')
                //     setCalories5('')
                //     setCalories6('')
                //     setVisit('')
                //     setActivityFactor('')
                //     setInjuryFactor('')
                //     setFatIntake('')
                //     setCalIntake('')
                //     setCalReq('')
                //     setCalAdvised('')
                //     setCompliance('')
                //     setDietAdvisedProtein('')
                //     setDietAdvisedCalories('')
                //     setDietAdvisedSodium('')
                //     setDietAdvisedRemarks('')
                // }, 1500);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const gettingQuestions = async () => {
        try {
            const response = await API.get('/consultation/assessments-questions')
            setQuestion(response?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettingQuestions();
    }, [])

    useEffect(() => {
        for (const questionId in educationAssessmentList) {
            if (educationAssessmentList.hasOwnProperty(questionId)) {
                const responseItem = educationAssessmentList[questionId];
                const { answer } = responseItem;
                answers[questionId] = answer === 1 ? 'Yes' : 'No';
            }
        }
    }, [educationAssessmentList, questions])

    return (
        <>
            <Row>
                <Col lg={12}>
                    <div className='dietaryAssessment'>
                        <div className="wraperForm">
                            {
                                successfullySaved &&
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="toasting-notification2">
                                        <span> {dietarySavedData?.data || eduAssessment?.data} </span>
                                    </div>
                                </div>
                            }
                            <Tabs
                                defaultActiveKey="eucational-assessment"
                                id="uncontrolled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className=""
                            >
                                <Tab eventKey="eucational-assessment" title="Educational Assessment">
                                    <div className='eucational-height dd kh-educationBorder' >
                                        <Table className='eucational firstTable'>
                                            <thead>
                                                <tr>
                                                    <th>Questions</th>
                                                    <th>Current Consultation</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    questions?.filter((defaultQues) => defaultQues?.section === "default")?.map((ques) => (
                                                        <React.Fragment>
                                                            <tr key={ques?.question_id}>
                                                                <td>{ques?.question}</td>
                                                                <td>
                                                                    <div className="checks-single-wraper">
                                                                        <div className="yes-single checks_radio_customSmall">
                                                                            <input
                                                                                type="radio"
                                                                                name={`question_${ques?.question_id}`}
                                                                                value='Yes'
                                                                                checked={answers[ques?.question_id] === 'Yes'}
                                                                                onChange={() => handleRadioChange(ques?.question_id, 'Yes')}
                                                                            />
                                                                            <label htmlFor="">Yes</label>
                                                                        </div>
                                                                        <div className="yes-single checks_radio_customSmall">
                                                                            <input
                                                                                type="radio"
                                                                                name={`question_${ques?.question_id}`}
                                                                                value='No'
                                                                                checked={answers[ques?.question_id] === 'No'}
                                                                                onChange={() => handleRadioChange(ques?.question_id, 'No')}
                                                                            />
                                                                            <label htmlFor="">No</label>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {/* nested questions */}
                                                            {ques?.elements?.length > 0 && ques?.elements?.map((element) => (
                                                                <tr key={element?.id} className='hk_nested'>
                                                                    <td>{element?.option}</td>
                                                                    <td>
                                                                        {element?.type === "text" ?
                                                                            <input
                                                                                type="text"
                                                                                name={element?.id}
                                                                                maxLength={30}
                                                                                value={(formData.elements?.find(el => el.element_id === element.id) || {}).element_value || ''}
                                                                                placeholder={educationAssessmentList?.find(el => el.element_id == element.id) || ''.element_value ? ((educationAssessmentList?.find(el => el.element_id == element.id) || {}).element_value || '') : 'Type Here '}
                                                                                className='hideInput1 inpttt_te'
                                                                                onChange={(e) => {
                                                                                    handleInputChange(e, element)
                                                                                }}
                                                                            />
                                                                            :
                                                                            <select
                                                                                name={element?.id}
                                                                                value={(formData.elements?.find(el => el.element_id === element.id) || {}).element_value || ''}
                                                                                className="form-control hideBorder lighttt"
                                                                                placeholder="Select Option"
                                                                                onChange={(e) => handleSelectChange(e, element)}
                                                                            >
                                                                                {
                                                                                    educationAssessmentList?.find(el => el.element_id == element.id) || ''.element_value && ((formData.elements?.find(el => el.element_id === element.id) || {}).element_value || '')
                                                                                    //  : <option value=''>Select </option>
                                                                                }
                                                                                {element?.children && element?.children?.map((item) => (
                                                                                    <option key={item.option} value={item?.option}> {item?.option}</option>
                                                                                ))}
                                                                            </select>

                                                                        }
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </React.Fragment>
                                                    ))
                                                }

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
                                                {
                                                    questions?.filter((defaultQues) => defaultQues?.section == "smbg")?.map((ques) => (
                                                        <React.Fragment key={ques?.question_id}>
                                                            <tr>
                                                                <td>{ques?.question}</td>
                                                                <td>
                                                                    <div className="checks-single-wraper">
                                                                        <div className="yes-single checks_radio_customSmall">
                                                                            <input type="radio" name={`question_${ques?.question_id}`} value='Yes' checked={answers[ques?.question_id] === 'Yes'} onChange={() => handleRadioChange(ques?.question_id, 'Yes')} />
                                                                            <label htmlFor="">Yes</label>
                                                                        </div>
                                                                        <div className="yes-single checks_radio_customSmall">
                                                                            <input type="radio" name={`question_${ques?.question_id}`} value='No' checked={answers[ques?.question_id] === 'No'} onChange={() => handleRadioChange(ques?.question_id, 'No')} />
                                                                            <label htmlFor="">No</label>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {ques?.elements?.length > 0 && ques?.elements?.map((element) => (
                                                                <tr key={element?.id} className='hk_nested'>
                                                                    <td>{element?.option}</td>
                                                                    <td>
                                                                        {element?.type === "text" ?
                                                                            <input
                                                                                type="text"
                                                                                name={element?.id}
                                                                                maxLength={30}
                                                                                value={(formData.elements?.find(el => el.element_id === element.id) || {}).element_value || ''}
                                                                                placeholder={educationAssessmentList?.find(el => el.element_id == element.id) || ''.element_value ? ((educationAssessmentList?.find(el => el.element_id == element.id) || {}).element_value || '') : 'Type Here'}
                                                                                className='hideInput1 inpttt_te'
                                                                                onChange={(e) => handleInputChange(e, element)}
                                                                            />
                                                                            :
                                                                            <select
                                                                                name={element?.id}
                                                                                value={(formData.elements?.find(el => el.element_id === element.id) || {}).element_value || ''}
                                                                                className="form-control hideBorder peddd"
                                                                                placeholder="Select Option"
                                                                                onChange={(e) => handleSelectChange(e, element)}
                                                                            >
                                                                                {
                                                                                    educationAssessmentList?.find(el => el.element_id == element.id) || ''.element_value ? ((formData.elements?.find(el => el.element_id === element.id) || {}).element_value || '')
                                                                                        : element?.children && element?.children?.map((item) => (
                                                                                            <option key={item.option} value={item?.option}> {item?.option}</option>
                                                                                        ))
                                                                                }
                                                                                {/* {element?.children && element?.children?.map((item) => (
                                                                                    <option key={item.option} value={item?.option}> {item?.option}</option>
                                                                                ))} */}
                                                                            </select>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </React.Fragment>
                                                    ))
                                                }
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
                                                {
                                                    questions?.filter((defaultQues) => defaultQues?.section == "hypocalcemia")?.map((ques) => (
                                                        <React.Fragment key={ques?.question_id}>
                                                            <tr>
                                                                <td>{ques?.question}</td>
                                                                <td>
                                                                    <div className="checks-single-wraper">
                                                                        <div className="yes-single checks_radio_customSmall">
                                                                            <input type="radio" name={`question_${ques?.question_id}`} value='Yes' checked={answers[ques?.question_id] === 'Yes'} onChange={() => handleRadioChange(ques?.question_id, 'Yes')} />
                                                                            <label htmlFor="">Yes</label>
                                                                        </div>
                                                                        <div className="yes-single checks_radio_customSmall">
                                                                            <input type="radio" name={`question_${ques?.question_id}`} value='No' checked={answers[ques?.question_id] === 'No'} onChange={() => handleRadioChange(ques?.question_id, 'No')} />
                                                                            <label htmlFor="">No</label>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {ques?.elements?.length > 0 && ques?.elements?.map((element) => (
                                                                <tr key={element?.id} className='hk_nested'>
                                                                    <td>{element?.option}</td>
                                                                    <td>
                                                                        {element?.type === "text" ?
                                                                            <input
                                                                                type="text"
                                                                                name={element?.id}
                                                                                maxLength={30}
                                                                                value={(formData.elements?.find(el => el.element_id === element.id) || {}).element_value || ''}
                                                                                placeholder={educationAssessmentList?.find(el => el.element_id == element.id) || ''.element_value ? ((educationAssessmentList?.find(el => el.element_id == element.id) || {}).element_value || '') : 'Type Here'}
                                                                                className='hideInput1 inpttt_te peddd'
                                                                                onChange={(e) => handleInputChange(e, element)}
                                                                            />
                                                                            :
                                                                            <select
                                                                                name={element?.id}
                                                                                value={(formData.elements?.find(el => el.element_id === element.id) || {}).element_value || ''}
                                                                                className="form-control hideBorder peddd"
                                                                                placeholder="Select Option"
                                                                                onChange={(e) => handleSelectChange(e, element)}>
                                                                                {
                                                                                    educationAssessmentList?.find(el => el.element_id == element.id) || ''.element_value ? ((formData.elements?.find(el => el.element_id === element.id) || {}).element_value || '')
                                                                                        : element?.children && element?.children?.map((item) => (
                                                                                            <option key={item.option} value={item?.option}> {item?.option}</option>
                                                                                        ))
                                                                                }
                                                                                
                                                                            </select>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </React.Fragment>
                                                    ))
                                                }
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
                                                {
                                                    questions?.filter((defaultQues) => defaultQues?.section == "exercise")?.map((ques) => (
                                                        <React.Fragment key={ques?.question_id}>
                                                            <tr>
                                                                <td>{ques?.question}</td>
                                                                <td>
                                                                    <div className="checks-single-wraper">
                                                                        <div className="yes-single checks_radio_customSmall">
                                                                            <input type="radio" name={`question_${ques?.question_id}`} value='Yes' checked={answers[ques?.question_id] === 'Yes'} onChange={() => handleRadioChange(ques?.question_id, 'Yes')} />
                                                                            <label htmlFor="">Yes</label>
                                                                        </div>
                                                                        <div className="yes-single checks_radio_customSmall">
                                                                            <input type="radio" name={`question_${ques?.question_id}`} value='No' checked={answers[ques?.question_id] === 'No'} onChange={() => handleRadioChange(ques?.question_id, 'No')} />
                                                                            <label htmlFor="">No</label>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            {ques?.elements.length > 0 && ques?.elements.map((element) => (
                                                                <tr key={element?.id} className='hk_nested'>
                                                                    <td >{element?.option}</td>
                                                                    <td>
                                                                        {
                                                                            element?.type === "text" ?
                                                                                <input
                                                                                    type="text"
                                                                                    name={element?.id}
                                                                                    maxLength={30}
                                                                                    value={(formData.elements?.find(el => el.element_id === element.id) || {}).element_value || ''}
                                                                                    placeholder={educationAssessmentList?.find(el => el.element_id == element.id).element_value ? ((educationAssessmentList?.find(el => el.element_id == element.id) || {}).element_value || '') : 'Type Here'}
                                                                                    className='hideInput1 inpttt_te'
                                                                                    onChange={(e) => handleInputChange(e, element)}
                                                                                />
                                                                                : element?.type === "select" ?
                                                                                    <select
                                                                                        name={element?.id}
                                                                                        value={(formData.elements?.find(el => el.element_id === element.id) || {}).element_value || ''}
                                                                                        className="form-control hideBorder peddd"
                                                                                        placeholder="Select Option"
                                                                                        onChange={(e) => handleSelectChange(e, element)}
                                                                                    >
                                                                                        {
                                                                                            educationAssessmentList?.find(el => el.element_id == element.id) || ''.element_value ? ((formData.elements?.find(el => el.element_id === element.id) || {}).element_value || '')
                                                                                                : element?.children && element?.children?.map((item) => (
                                                                                                    <option key={item.option} value={item?.option}>{item?.option}</option>
                                                                                                ))
                                                                                        }
                                                                                        
                                                                                    </select>
                                                                                    : <div>
                                                                                        <TimePicker
                                                                                            placeholder='Start Time'
                                                                                            className='datePick'
                                                                                            format="h:mm"
                                                                                            value={formData.startTime}
                                                                                            onChange={(time, timeString) => handleTimeChange('startTime', time, element)}
                                                                                        />

                                                                                        <TimePicker
                                                                                            placeholder='End Time'
                                                                                            className='datePick'
                                                                                            format="h:mm"
                                                                                            value={formData.endTime}
                                                                                            onChange={(time, timeString) => handleTimeChange('endTime', time, element)}
                                                                                        />
                                                                                    </div>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </React.Fragment>
                                                    ))
                                                }
                                                <tr>
                                                    <td> Remarks </td>
                                                    <td> <textarea name="" id="" cols="30" rows="10" className='typeTextarea texint_add' placeholder='Type Here' maxLength='50' /> </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className='print-btn text-center saveButton'>
                                        <button className='btn' onClick={handleShowSaveEducational}>SAVE</button>
                                    </div>
                                </Tab>
                                <Tab eventKey="dietary-assessment" title="Dietary Assessment">
                                    <div className='dietary-height'>
                                        <Table responsive className='dietary1 tableOne'>
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
                                                    <td>{dateChangeDietaryAss?.height}</td>
                                                    <td>{dateChangeDietaryAss?.weight}</td>
                                                    <td>{dateChangeDietaryAss?.bmi}</td>
                                                    <td>{dateChangeDietaryAss?.ibw}</td>
                                                    <td>{dateChangeDietaryAss?.bee}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Table responsive className='dietary2 tableTwo'>
                                            <thead>
                                                <tr>
                                                    <th colSpan="7">Food Groups</th>
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
                                                    <td>
                                                        <input type="number" className='hideInput' value={cereal} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCereal(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={vegetable} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setVegetable(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={meat} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setMeat(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={milk} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setMilk(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fruits} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFruits(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={cerealMisc} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCerealMisc(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fatsMisc} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFatsMisc(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={caloriesMisc} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCaloriesMisc(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={carbo} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCarbo(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fats} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFats(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={protein} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setProtein(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={calories} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCalories(value)
                                                        }
                                                        } />
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <th>Mid Day Meal Group</th>
                                                    <td>
                                                        <input type="number" className='hideInput' value={cereal2} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCereal2(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={vegetable2} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setVegetable2(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={meat2} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setMeat2(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={milk2} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setMilk2(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fruits2} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFruits2(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={cerealMisc2} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCerealMisc2(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fatsMisc2} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFatsMisc2(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={caloriesMisc2} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCaloriesMisc2(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={carbo2} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCarbo2(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fats2} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFats2(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={protein2} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setProtein2(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={calories2} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCalories2(value)
                                                        }
                                                        } />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Lunch Group</th>
                                                    <td>
                                                        <input type="number" className='hideInput' value={cereal3} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCereal3(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={vegetable3} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setVegetable3(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={meat3} onChange={(e) => { setMeat3(e.target.value)
                                                            const value = e.target.value.slice(0, 5)
                                                            
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={milk3} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setMilk3(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fruits3} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFruits3(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={cerealMisc3} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCerealMisc3(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fatsMisc3} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFatsMisc3(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={caloriesMisc3} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCaloriesMisc3(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={carbo3} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCarbo3(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fats3} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFats3(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={protein3} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setProtein3(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={calories3} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCalories3(value)
                                                        }
                                                        } />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Tea Time Group</th>
                                                    <td>
                                                        <input type="number" className='hideInput' value={cereal4} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCereal4(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={vegetable4} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setVegetable4(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={meat4} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setMeat4(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={milk4} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setMilk4(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fruits4} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFruits4(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={cerealMisc4} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCerealMisc4(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fatsMisc4} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFatsMisc4(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={caloriesMisc4} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCaloriesMisc4(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={carbo4} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCarbo4(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fats4} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFats4(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={protein4} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setProtein4(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={calories4} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCalories4(value)
                                                        }
                                                        } />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Dinner Group</th>
                                                    <td>
                                                        <input type="number" className='hideInput' value={cereal5} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCereal5(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={vegetable5} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setVegetable5(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={meat5} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setMeat5(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={milk5} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setMilk5(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fruits5} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFruits5(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={cerealMisc5} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCerealMisc5(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fatsMisc5} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFatsMisc5(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={caloriesMisc5} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCaloriesMisc5(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={carbo5} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCarbo5(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fats5} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFats5(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={protein5} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setProtein5(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={calories5} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCalories5(value)
                                                        }
                                                        } />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Bed Time Group</th>
                                                    <td>
                                                        <input type="number" className='hideInput' value={cereal6} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCereal6(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={vegetable6} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setVegetable6(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={meat6} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setMeat6(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={milk6} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setMilk6(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fruits6} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFruits6(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={cerealMisc6} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCerealMisc6(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fatsMisc6} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFatsMisc6(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={caloriesMisc6} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCaloriesMisc6(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={carbo6} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCarbo6(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fats6} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFats6(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={protein6} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setProtein6(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={calories6} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCalories6(value)
                                                        }
                                                        } />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Table responsive className='dietary3 tableThree'>
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
                                                    <td>
                                                        <input type="number" className='hideInput' value={visit} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setVisit(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="text" className='hideInput' value={activityFactor} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 25)
                                                            setActivityFactor(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="text" className='hideInput' value={injuryFactor} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 25)
                                                            setInjuryFactor(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={fatIntake} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setFatIntake(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={calIntake} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCalIntake(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={calReq} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCalReq(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="number" className='hideInput' value={calAdvised} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setCalAdvised(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td>
                                                        <input type="text" className='hideInput' value={compliance} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 25)
                                                            setCompliance(value)
                                                        }
                                                        } />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Table responsive className='dietary4 tableFoure focccc'>
                                            <thead>
                                                <tr>
                                                    <th colSpan="6">Diet Advised</th>
                                                    <th colSpan="6">Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th className='prrrrr'>Protein:</th>
                                                    <td>
                                                        <input type="number" className='hideInput' value={dietAdvisedProtein} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setDietAdvisedProtein(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <th className='prrrrr'>Calories:</th>
                                                    <td>
                                                        <input type="number" className='hideInput' value={dietAdvisedCalories} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setDietAdvisedCalories(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <th className='prrrrr'>Sodium:</th>
                                                    <td>
                                                        <input type="number" className='hideInput' value={dietAdvisedSodium} onChange={(e) => {
                                                            const value = e.target.value.slice(0, 5)
                                                            setDietAdvisedSodium(value)
                                                        }
                                                        } />
                                                    </td>
                                                    <td colSpan="6">
                                                        <textarea className='form-control formfield' placeholder='Type here' value={dietAdvisedRemarks} maxLength={30} onChange={(e) => { setDietAdvisedRemarks(e.target.value) }
                                                        }></textarea>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className='print-btn text-center saveButton svinggg_dieter'>
                                        <button disabled={printState == false} className={`btn me-4 ${printState == true ? 'sacvvv' : 'sacvvvDisabled'}`}  onClick={handlePrintShow}>PRINT</button>
                                        <button className='btn sacvvv'  onClick={handleShowSave}>SAVE</button>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </Col>
            </Row>
            <SavEducationalAssesstment postDataToEducationAssessment={postDataToEducationAssessment} setShowSaveModalEducational={setShowSaveModalEducational} showsaveModalEducational={showsaveModalEducational} handleShowSaveEducational={handleShowSaveEducational} />
            <SaveAssessmentModal postDataToEducationAssessment={postDataToEducationAssessment} showsaveModal={showsaveModal} handleDieterySave={handleDieterySave} handleCloseSave={handleCloseSave} />
            <PrintAssessmentModal  prescriptionList={prescriptionList} handleDietaryDownload={handleDietaryDownload} printState={printState} isPrefilledData={isPrefilledData} dateChangeDietaryAss={dateChangeDietaryAss} ethnicityList={ethnicityList} handlePrintClose={handlePrintClose} printModal={printModal} patientDetails={patientDetails} />
        </>
    )
}

export default EducatorAssessment