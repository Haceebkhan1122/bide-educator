import React, { useRef } from 'react'
import '../tabsContentProfile/dietaryAssessmentProfile/dietaryAssessmentProfile.scss';
import {Modal, Button, Table} from 'react-bootstrap';
import download from '../../assets/images/svg/download.svg';
import Logo from '../../assets/images/svg/Logo.svg';
import {ReactToPrint, useReactToPrint} from 'react-to-print';
import API from '../../utils/httpService';
import moment from 'moment';


const PrintAssessmentModal = React.forwardRef(({handleDietaryDownload, prescriptionList,isPrefilledData,dateChangeDietaryAss,ethnicityList,patientDetails,printModal,handlePrintClose,printState},ref) => {

    const printRef = useRef();
    console.log({dateChangeDietaryAss})
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
      });

  return (
    <>
    
    <Modal className='print moda01' show={printModal} onHide={handlePrintClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
            <div style={{padding: '0 0 35px'}}>
                <div className='download'>
                    <h3 className='colorblue' style={{padding: '0 0 0 39px'}}>Dietary Assessment</h3>
                    <button className='belowinggg' onClick={handleDietaryDownload} style={{padding: '0 39px 0 0'}}><img src={download} alt="" /> DOWNLOAD</button>
                </div>
                <div ref={printRef} className="dietary-broder" style={{position: "relative", padding: "23px 0 0", margin: '15px 39px 0', border: '0.3px solid #313131', borderRadius: '14px'}}>
                    <div className='detail' style={{padding: '0 18px 37px'}}>
                        <h4 style={{fontSize: "22px", fontWeight: '600', marginBottom: '28px', fontFamily: 'Nunito', lineHeight: 'normal', color: '#313131'}}>{patientDetails?.patient_info?.name} - {patientDetails?.patient_info?.mr_no}</h4>
                        <img src={Logo} alt="ss" style={{width: "190px", height: "40px", position: "absolute", top: "23px", right: "31px"}} />
                        
                        <div className='detail-wrap' style={{display: 'flex', alignItems: 'center', gap: '50px'}}>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>Age</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{patientDetails?.patient_info?.age} years</p>
                            </div>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>Gender</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{patientDetails?.patient_info?.gender}</p>
                            </div>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>Date Of Birth</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{patientDetails?.patient_info?.date_of_birth}</p>
                            </div>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>CNIC</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{patientDetails?.patient_info?.cnic}</p>
                            </div>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>Address</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{patientDetails?.patient_info?.address}</p>
                            </div>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>Ethnicity</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{ethnicityList?.map((ethnicity) => {
                                    if(patientDetails?.patient_info?.ethnicity == ethnicity.id){
                                    return `${ethnicity.name}`;
                                    }
                                    return null;     
                                    })}</p>
                            </div>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>Follow Up</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{prescriptionList?.[0]?.follow_up_date ? moment(prescriptionList?.[0]?.follow_up_date)?.format('DD/MM/YYYY') : '-'}</p>
                            </div>
                        </div>
                    </div>
                    <Table className='dietary1' style={{marginBottom: '0'}}>
                        <thead>
                            <tr>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>Height (cm)</th>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>Weight (kg)</th>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>BMI</th>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>IBW</th>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>BEE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td style={{fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', textAlign: 'center', padding: '13px 0.5rem', border: '0.1px solid #000000', color: '#535151', width: '298px', borderLeft: "none"}}>{dateChangeDietaryAss ? dateChangeDietaryAss?.height : patientDetails?.patient_vitals?.[0]?.height}</td>
                            <td style={{height: "64px", fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', textAlign: 'center', padding: '13px 0.5rem', border: '0.1px solid #000000', color: '#535151', width: '298px'}}>{dateChangeDietaryAss ? dateChangeDietaryAss?.weight : patientDetails?.patient_vitals?.[0]?.weight}</td>
                            <td style={{height: "64px", fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', textAlign: 'center', padding: '13px 0.5rem', border: '0.1px solid #000000', color: '#535151', width: '298px'}}>{dateChangeDietaryAss ? dateChangeDietaryAss?.bmi : patientDetails?.patient_vitals?.[0]?.bmi}</td>
                            <td style={{height: "64px", fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', textAlign: 'center', padding: '13px 0.5rem', border: '0.1px solid #000000', color: '#535151', width: '298px'}}>{dateChangeDietaryAss?.ibw}</td>
                            <td style={{height: "64px", fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', textAlign: 'center', padding: '13px 0.5rem', border: '0.1px solid #000000', color: '#535151', width: '298px', borderRight: 'none'  }}>{dateChangeDietaryAss?.bee}</td>    
                            </tr>
                        </tbody>
                    </Table>
                    <Table className='dietary2' style={{marginBottom: '0'}}>
                        <thead>
                            <tr>
                                <th colSpan="6" style={{textAlign: 'center', background: 'rgba(217, 217, 217, 0.6)', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '18.26px', fontFamily: "Circular Std"}}>Food Groups</th>
                                <th colSpan="7" style={{background: 'rgba(217, 217, 217, 0.6)', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '18.26px', fontFamily: "Circular Std"}}>Miscellaneous</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', color: '#535151', borderLeft: 'none', textAlign: 'left', verticalAlign: 'middle'}}>Meal Timing</th>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', textAlign: 'center', color: '#535151', verticalAlign: 'middle'}}>Cereal</th>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', textAlign: 'center', color: '#535151', verticalAlign: 'middle'}}>Vegetable</th>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', textAlign: 'center', color: '#535151', verticalAlign: 'middle'}}>Meat</th>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', textAlign: 'center', color: '#535151', verticalAlign: 'middle'}}>Milk</th>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', textAlign: 'center', color: '#535151', verticalAlign: 'middle'}}>Fruits</th>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', textAlign: 'center', color: '#EF6286', verticalAlign: 'middle'}}>Cereal</th>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', textAlign: 'center', color: '#EF6286', verticalAlign: 'middle'}}>Fats</th>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', textAlign: 'center', color: '#EF6286', verticalAlign: 'middle'}}>Calories</th>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', textAlign: 'center', color: '#535151', verticalAlign: 'middle'}}>Carbo</th>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', textAlign: 'center', color: '#535151', verticalAlign: 'middle'}}>Fats</th>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', textAlign: 'center', color: '#535151', verticalAlign: 'middle'}}>Protein</th>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', textAlign: 'center', color: '#535151', verticalAlign: 'middle', borderRight: 'none'}}>Calories</th>
                            </tr>
                            <tr>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', color: '#535151', borderLeft: 'none', textAlign: 'left', verticalAlign: 'middle'}}>Breakfast Group</th>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[0]?.cereal}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[0]?.vegetable}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[0]?.meat}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[0]?.milk}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[0]?.fruits}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[0]?.cereal_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[0]?.fats_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[0]?.calories_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[0]?.carbo}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[0]?.fats}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[0]?.protein}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151', borderRight: 'none'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[0]?.calories}</td>
                            </tr>
                            <tr>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', color: '#535151', borderLeft: 'none', textAlign: 'left', verticalAlign: 'middle'}}>Mid Day Meal Group</th>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[1]?.cereal}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[1]?.vegetable}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[1]?.meat}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[1]?.milk}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[1]?.fruits}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[1]?.cereal_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[1]?.fats_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[1]?.calories_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[1]?.carbo}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[1]?.fats}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[1]?.protein}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151', borderRight: 'none'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[1]?.calories}</td>
                            </tr>
                            <tr>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', color: '#535151', borderLeft: 'none', textAlign: 'left', verticalAlign: 'middle'}}>Lunch Group</th>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[2]?.cereal}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[2]?.vegetable}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[2]?.meat}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[2]?.milk}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[2]?.fruits}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[2]?.cereal_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[2]?.fats_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[2]?.calories_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[2]?.carbo}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[2]?.fats}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[2]?.protein}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151', borderRight: 'none'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[2]?.calories}</td>
                            </tr>
                            <tr>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', color: '#535151', borderLeft: 'none', textAlign: 'left', verticalAlign: 'middle'}}>Tea Time Group</th>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[3]?.cereal}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[3]?.vegetable}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[3]?.meat}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[3]?.milk}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[3]?.fruits}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[3]?.cereal_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[3]?.fats_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[3]?.calories_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[3]?.carbo}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[3]?.fats}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[3]?.protein}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151', borderRight: 'none'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[3]?.calories}</td>
                            </tr>
                            <tr>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', color: '#535151', borderLeft: 'none', textAlign: 'left', verticalAlign: 'middle'}}>Dinner Group</th>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[4]?.cereal}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[4]?.vegetable}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[4]?.meat}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[4]?.milk}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[4]?.fruits}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[4]?.cereal_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[4]?.fats_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[4]?.calories_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[4]?.carbo}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[4]?.fats}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[4]?.protein}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151', borderRight: 'none'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[4]?.calories}</td>
                            </tr>
                            <tr>
                                <th style={{border: "0.5px solid #959494", fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', padding: '8px 0.5rem', color: '#535151', borderLeft: 'none', textAlign: 'left', verticalAlign: 'middle'}}>Bed Time Group</th>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[5]?.cereal}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[5]?.vegetable}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[5]?.meat}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[5]?.milk}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[5]?.fruits}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[5]?.cereal_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[5]?.fats_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#EF6286'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[5]?.calories_misc}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[5]?.carbo}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[5]?.fats}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[5]?.protein}</td>
                                <td style={{border: '0.49px solid #959494', fontSize: '14.94px', fontFamily: "Circular Std", fontWeight: '450', textAlign: 'center', padding: '8px 0.5rem', color: '#535151', borderRight: 'none'}}>{isPrefilledData && dateChangeDietaryAss?.meal_entries?.[5]?.calories}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table className='dietary3'>
                        <thead>
                            <tr>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>Visit</th>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>Activity Factor</th>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>Injury Factor</th>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>Fat Intake</th>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>Cal Intake</th>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>Cal Req</th>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>Cal Advised</th>
                                <th style={{background: 'rgba(217, 217, 217, 0.6)', textAlign: 'center', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>Compliance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', textAlign: 'center', border: '0.1px solid #000000', color: '#535151', borderLeft: 'none'}}>{isPrefilledData && dateChangeDietaryAss?.visit_no}</td>
                                <td style={{fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', textAlign: 'center', border: '0.1px solid #000000', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.activity_factor}</td>
                                <td style={{fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', textAlign: 'center', border: '0.1px solid #000000', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.injury_factor}</td>
                                <td style={{fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', textAlign: 'center', border: '0.1px solid #000000', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.fats_intake}</td>
                                <td style={{fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', textAlign: 'center', border: '0.1px solid #000000', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.calories_intake}</td>
                                <td style={{fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', textAlign: 'center', border: '0.1px solid #000000', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.calories_required}</td>
                                <td style={{fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', textAlign: 'center', border: '0.1px solid #000000', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.calories_advised}</td>
                                <td style={{fontSize: '18px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', textAlign: 'center', border: '0.1px solid #000000', color: '#535151', borderRight: 'none'}}>{isPrefilledData && dateChangeDietaryAss?.compliance} </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table className='dietary4'>
                        <thead>
                            <tr>
                                <th colSpan="6" style={{background: 'rgba(217, 217, 217, 0.6)', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>Diet Advised</th>
                                <th colSpan="6" style={{background: 'rgba(217, 217, 217, 0.6)', padding: '10px 0.5rem 11px', color: '#313131', fontWeight: '450', fontSize: '16.6px', fontFamily: "Circular Std"}}>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className='fontinggg' style={{ fontSize: '16px', width: '80px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', border: '0.12px solid #000000', color: '#535151', lineHeight: 'normal', borderLeft: 'none'}}>Protein:</th>
                                <td style={{fontSize: '18px', width: '80px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', border: '0.12px solid #000000', color: '#535151', lineHeight: 'normal'}}>{isPrefilledData && dateChangeDietaryAss?.protein_intake}</td>
                                <th className='fontinggg' style={{fontSize: '16px', width: '80px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', border: '0.12px solid #000000', color: '#535151', lineHeight: 'normal'}}>Calories:</th>
                                <td style={{fontSize: '18px', width: '80px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', border: '0.12px solid #000000', color: '#535151', lineHeight: 'normal'}}>{isPrefilledData && dateChangeDietaryAss?.calories_advised}</td>
                                <th className='fontinggg' style={{fontSize: '16px', width: '80px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', border: '0.12px solid #000000', color: '#535151', lineHeight: 'normal'}}>Sodium:</th>
                                <td style={{fontSize: '18px', width: '80px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', border: '0.12px solid #000000', color: '#535151'}}>{isPrefilledData && dateChangeDietaryAss?.sodium_intake}</td>
                                <td colSpan="6" style={{fontSize: '16px', width: '80px', fontFamily: "Circular Std", fontWeight: '300', padding: '13px 0.5rem', border: '0.12px solid #000000', color: '#535151', lineHeight: 'normal', borderRight: 'none'}}>{isPrefilledData && dateChangeDietaryAss?.remarks}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className='button-print'>
                    <Button onClick={handlePrint}>PRINT</Button>
                </div>
            </div>
        </Modal.Body>
    </Modal>
    </>
    );
    }
);

export default PrintAssessmentModal