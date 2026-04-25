import React from 'react'
import './dietaryAssessmentModalProfile.scss';
import { Modal, Button, Table } from 'react-bootstrap';
import moment from 'moment';
import download from '../../../../assets/images/svg/download.svg'

const DietaryAssessmentModal = ({handleDietaryDownload, printModal, handlePrintClose, dietaryAssesment, patientInfo, ethnicites }) => {

    return (
        <Modal className='print' show={printModal} onHide={handlePrintClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div style={{padding: '0 39px 35px'}}>
                    <div className='download'>
                        <h3>Dietary Assessment</h3>
                        <button onClick={handleDietaryDownload}><img src={download} alt="" /> DOWNLOAD</button>
                    </div>
                    <div className="dietary-broder">
                        <div className='detail'>
                            <h4>{patientInfo?.name} - {patientInfo?.mr_no}</h4>
                            <img src="/Logo.png" alt="" />
                            <div className='detail-wrap'>
                                <div>
                                    <h6>Age</h6>
                                    <p>{patientInfo?.age}</p>
                                </div>
                                <div>
                                    <h6>Gender</h6>
                                    <p>{patientInfo?.gender}</p>
                                </div>
                                <div>
                                    <h6>Date Of Birth</h6>
                                    <p>{moment(patientInfo?.date_of_birth)?.format('DD/MM/YYYY')}</p>
                                </div>
                                <div>
                                    <h6>CNIC</h6>
                                    <p>{patientInfo?.cnic}</p>
                                </div>
                                <div>
                                    <h6>Address</h6>
                                    <p>{patientInfo?.address}</p>
                                </div>
                                <div>
                                    <h6>Ethnicity</h6>
                                    <p>{ethnicites?.map((ethnicity) => {
                                        if (patientInfo?.ethnicity === ethnicity.id) {
                                            return `${ethnicity.name}`;
                                        }
                                        return null;
                                    })}</p>
                                </div>
                                <div>
                                    <h6>Follow Up</h6>
                                    <p>{patientInfo?.registration_date}</p>
                                </div>
                            </div>
                        </div>
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
                                    <td>156</td>
                                    <td>57</td>
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
                    <div className='button-print'>
                        <Button>PRINT</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DietaryAssessmentModal