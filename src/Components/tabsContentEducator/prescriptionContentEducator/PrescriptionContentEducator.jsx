import React, { useState } from 'react'
import { DatePicker } from 'antd';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import PrescriptionContentPrintModal from './prescriptionContentModal/PrescriptionContentModal';
import './prescriptionContentEducator.scss';
import { ConsoleIcon } from 'evergreen-ui';

const PrescriptionContentEducator = ({handlePrescriptionDownload, ethnicityList, prescriptionList, patientDetails}) => {
    const [printModal, setPrintModal] = useState(false);
    const handlePrintClose = () => setPrintModal(false);
    const handlePrintShow = () => setPrintModal(true);

    return (
        <Container fluid>
            <Row>
                <Col md={12}>
                    <div className='prescriptionContentEducator'>
                        <div className="wraperForm">
                            <h3>Prescription</h3>
                            <div className="custom-scrollbar">
                                <Table className='table-wrap tableOne1' responsive>
                                    <thead>
                                        <tr>
                                            <th>Medicine</th>
                                            <th>Generic</th>
                                            <th>Type</th>
                                            <th>Route</th>
                                            <th>Item Strength</th>
                                            <th>Duration</th>
                                            <th>Frequency</th>
                                            <th>Instructions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <div className='gender'><span>M</span><span>A</span><span>E</span><span>N</span></div>
                                            </td>
                                            <td></td>
                                        </tr>
                                        {prescriptionList?.map((items) => items?.prescribed_elements
                                            ?.filter((filterItem) => filterItem?.type === "medicine")
                                            ?.map((item) => (
                                                <tr key={item?.id}>
                                                    <td>{item?.element_name}</td>
                                                    <td>{item?.generic}</td>
                                                    <td>{item?.type}</td>
                                                    <td>{item?.route}</td>
                                                    <td>{item?.item_strength}</td>
                                                    <td>{item?.number_of_days}</td>
                                                    <td>
                                                        <div className='gender-number'>
                                                            <span>{item?.morning}</span>
                                                            <span>{item?.afternoon}</span>
                                                            <span>{item?.evening}</span>
                                                            <span>{item?.night}</span>
                                                        </div>
                                                    </td>
                                                    <td>{item?.is_before_meal == 1 ? 'Before Meal' : item?.is_after_meal == 1 ? 'After Meal' : null}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                                <Table className='table-wrap tabsCustom' responsive>
                                    <thead>
                                        <tr>
                                            <th>Insulin</th>
                                            <th>Unit</th>
                                            <th>Duration</th>
                                            <th>Frequency</th>
                                            <th>Instructions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><div className='gender'><span>M</span><span>A</span><span>E</span><span>N</span></div></td>
                                            <td></td>
                                        </tr>

                                        {prescriptionList?.map((items) => items?.prescribed_elements
                                            ?.filter((filterItem) => filterItem?.type === "insulin")
                                            ?.map((item) => (
                                        <tr>
                                            <td>{item?.element_name}</td>
                                            <td>{item?.unit}</td>
                                            <td>{item?.number_of_days}</td>
                                            <td>
                                            <div className='gender-number'>
                                                <span>{item?.morning}</span>
                                                <span>{item?.afternoon}</span>
                                                <span>{item?.evening}</span>
                                                <span>{item?.night}</span>
                                            </div>
                                            </td>
                                            <td>{item?.is_before_meal == 1 ? 'Before Meal' : item?.is_after_meal == 1 ? 'After Meal' : null}</td>
                                        </tr>
                                       ))
                                     )}
                                    </tbody>
                                </Table>
                                <Table responsive className='table-lab tableThree'>
                                    <thead>
                                        <tr>
                                            <th className='labbbb'>Lab Test</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prescriptionList?.map((items) => items?.prescribed_elements
                                            ?.filter((filterItem) => filterItem?.type === "lab")
                                            ?.map((item) => (
                                        <tr>
                                            <td>{item?.element_name}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        ))
                                        )}
                                    </tbody>
                                </Table>
                                <div className="remarks s">
                                    <h5>Remarks</h5>
                                    <div>
                                    <textarea
                                        name=""
                                        maxLength="500"
                                        disabled
                                        placeholder={prescriptionList?.[0]?.remarks || 'No remarks'}
                                        // onChange={(e) => {
                                        //     const inputValue = e.target.value;
                                        //     if (inputValue.length <= 200) { // Applying 200-character validation
                                        //     // Handle the input if within the character limit
                                        //     }
                                        // }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className='bottom-print'>
                                <Button className='btn' onClick={handlePrintShow}>Print</Button>
                            </div>
                        </div>
                        <PrescriptionContentPrintModal handlePrescriptionDownload={handlePrescriptionDownload} prescriptionList={prescriptionList} ethnicityList={ethnicityList} patientDetails={patientDetails} handlePrintClose={handlePrintClose} printModal={printModal} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default PrescriptionContentEducator;