import React, { useRef } from 'react'
import './prescriptionContentModal.scss'
import { Modal, Table, Button } from 'react-bootstrap'
import download from '../../../../assets/images/svg/download.svg';
import Logo from '../../../../assets/images/svg/Logo.svg';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import hpf from '../../../../assets/images/svg/HPfLogo.svg'
import ndn from '../../../../assets/images/svg/ndnPre.svg'

function PrescriptionContentModal({ handlePrescriptionDownload, prescriptionList, ethnicityList, patientDetails, handlePrintClose, printModal }) {
    const printRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });
    return (
        <Modal className='printpresc' show={printModal} onHide={handlePrintClose}>
            <Modal.Body>
                <div style={{ padding: '64px 0 35px' }}>
                    <div className='download'>
                        <h3 style={{ padding: '0 0 0 39px' }}>Prescription</h3>
                        <button onClick={handlePrescriptionDownload} style={{ padding: '0 39px 0 0' }} className='btnPres'>
                            <img src={download} alt="" /> 
                            <span> DOWNLOAD </span>
                        </button>
                    </div>
                    <div ref={printRef} className="prescrip-broder" style={{ position: "relative", padding: "23px 0 0", margin: '0 39px 0', border: '0.3px solid #313131', borderRadius: '14px' }}>
                        <div className='detail' style={{ padding: '0 18px 37px' }}>
                            <h4 style={{ fontSize: "22", fontWeight: '600', marginBottom: '28px', fontFamily: 'Nunito', lineHeight: 'normal', color: '#313131' }}>{patientDetails?.patient_info?.name} - {patientDetails?.patient_info?.mr_no}</h4>
                            <img src={hpf} alt="" style={{width: "72px", height: "59px", position: "absolute", top: "3px", right: "424px"}} />
                        <img src={ndn} alt="" style={{width: "190px", height: "40px", position: "absolute", top: "23px", right: "251px"}} />
                        <img src="/Logo.png" alt="" style={{width: "190px", height: "40px", position: "absolute", top: "23px", right: "71px"}} />
                            <div className='detail-wrap' style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
                                <div> 
                                    <h6 style={{ fontSize: '16', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal' }}>Age</h6>
                                    <p style={{ fontSize: '18', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal' }}>{patientDetails?.patient_info?.age} years</p>
                                </div> 
                                <div>
                                    <h6 style={{ fontSize: '16', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal' }}>Gender</h6>
                                    <p style={{ fontSize: '18', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal' }}>{patientDetails?.patient_info?.gender}</p>
                                </div>
                                <div>
                                    <h6 style={{ fontSize: '16', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal' }}>Date Of Birth</h6>
                                    <p style={{ fontSize: '18', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal' }}>{patientDetails?.patient_info?.date_of_birth}</p>
                                </div>
                                <div>
                                    <h6 style={{ fontSize: '16', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal' }}>CNIC</h6>
                                    <p style={{ fontSize: '18', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal' }}>{patientDetails?.patient_info?.cnic}</p>
                                </div>
                                <div>
                                    <h6 style={{ fontSize: '16', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal' }}>Address</h6>
                                    <p style={{ fontSize: '18', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal' }}>{patientDetails?.patient_info?.address}</p>
                                </div>
                                <div>
                                    <h6 style={{ fontSize: '16', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal' }}>Ethnicity</h6>
                                    <p style={{ fontSize: '18', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal' }}>{ethnicityList?.map((ethnicity) => {
                                        if (patientDetails?.patient_info?.ethnicity == ethnicity.id) {
                                            return `${ethnicity.name}`;
                                        }
                                        return null;
                                    })}</p>
                                </div>
                                <div>
                                    <h6 style={{ fontSize: '16', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal' }}>Follow Up</h6>
                                    <p style={{ fontSize: '18', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal' }}>{moment(prescriptionList?.[0]?.follow_up_date)?.format('DD/MM/YYYY')}</p>
                                </div>
                            </div>
                        </div>

                        <Table className='table-wrap' responsive style={{ marginBottom: '0' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Medicine</th>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Generic</th>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Type</th>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Route</th>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Item Strength</th>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Duration</th>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Frequency</th>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Instructions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}></td>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}></td>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}></td>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}></td>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}></td>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}></td>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}>
                                        <div className='gender' style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}><span style={{ color: '#078A8E' }}>M</span><span style={{ color: '#078A8E' }}>A</span><span style={{ color: '#078A8E' }}>E</span><span style={{ color: '#078A8E' }}>N</span></div>
                                    </td>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}></td>
                                </tr>
                                {prescriptionList?.map((items) => items?.prescribed_elements
                                    ?.filter((filterItem) => filterItem?.type === "medicine")
                                    ?.map((item) => (
                                        <tr key={item?.id}>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', verticalAlign: 'middle' }}>{item?.element_name}</td>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', verticalAlign: 'middle' }}>{item?.generic}</td>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', verticalAlign: 'middle' }}>{item?.type}</td>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', verticalAlign: 'middle' }}>{item?.route}</td>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', verticalAlign: 'middle' }}>{item?.item_strength}</td>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', verticalAlign: 'middle' }}>{item?.number_of_days}</td>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', verticalAlign: 'middle' }}>
                                                <div className='gender-number'>
                                                    <span>{item?.morning}</span>
                                                    <span>{item?.afternoon}</span>
                                                    <span>{item?.evening}</span>
                                                    <span>{item?.night}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131' }}>{item?.is_before_meal == 1 ? 'Before Meal' : item?.is_after_meal == 1 ? 'After Meal' : null}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                        <Table className='table-wrap' responsive>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Insulin</th>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Unit</th>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Duration</th>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Frequency</th>
                                    <th style={{ textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal', verticalAlign: 'middle' }}>Instructions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}></td>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}></td>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}></td>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}><div className='gender' style={{ justifyContent: 'space-around', display: 'flex', alignItems: 'center' }}><span style={{ color: '#078A8E' }}>M</span><span style={{ color: '#078A8E' }}>A</span><span style={{ color: '#078A8E' }}>E</span><span style={{ color: '#078A8E' }}>N</span></div></td>
                                    <td style={{ padding: '12px 11px', borderBottom: '1px solid #078A8E' }}></td>
                                </tr>
                                {prescriptionList?.map((items) => items?.prescribed_elements
                                    ?.filter((filterItem) => filterItem?.type === "insulin")
                                    ?.map((item) => (
                                        <tr>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', verticalAlign: 'middle' }}>{item?.element_name}</td>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', verticalAlign: 'middle' }}>{item?.unit}</td>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', verticalAlign: 'middle' }}>{item?.number_of_days}</td>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', verticalAlign: 'middle' }}>
                                                <div className='gender-number' style={{ display: "flex", justifyContent: 'space-around', padding: '0 5px' }}>
                                                    <span>{item?.morning}</span>
                                                    <span>{item?.afternoon}</span>
                                                    <span>{item?.evening}</span>
                                                    <span>{item?.night}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '19px 11px 18px', textAlign: 'center', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', verticalAlign: 'middle' }}>{item?.is_before_meal == 1 ? 'Before Meal' : item?.is_after_meal == 1 ? 'After Meal' : null}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                        <Table responsive className='table-lab test'>
                            <thead>
                                <tr>
                                    <th style={{ paddingLeft: '32px', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal' }}>Lab Test</th>
                                    <th style={{ paddingLeft: '32px', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal' }}></th>
                                    <th style={{ paddingLeft: '32px', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal' }}></th>
                                    <th style={{ paddingLeft: '32px', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal' }}></th>
                                    <th style={{ paddingLeft: '32px', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescriptionList?.map((items) => items?.prescribed_elements
                                    ?.filter((filterItem) => filterItem?.type === "lab")
                                    ?.map((item) => (
                                        <tr>
                                            <td style={{ padding: '19px 11px 18px', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', paddingLeft: '32px' }}>{item?.element_name}</td>
                                            <td style={{ padding: '19px 11px 18px', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', paddingLeft: '32px' }}></td>
                                            <td style={{ padding: '19px 11px 18px', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', paddingLeft: '32px' }}></td>
                                            <td style={{ padding: '19px 11px 18px', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', paddingLeft: '32px' }}></td>
                                            <td style={{ padding: '19px 11px 18px', fontSize: '18', fontWeight: '450', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', paddingLeft: '32px' }}></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                        <div className="remarks">
                            <h5 style={{ backgroundColor: '#F5F5F5', padding: '11px 0 11px 42px' }}>Remarks</h5>
                            <div style={{ padding: '26px 42px' }}>
                                <textarea name="" placeholder={prescriptionList?.[0]?.remarks || 'Enter text here'} style={{ border: '0.5px solid #313131', padding: '14px 21px', borderRadius: '12px', height: '78px', width: '100%', color: '#313131', fontFamily: "Circular Std", fontSize: '18', fontStyle: 'normal', fontWeight: '300', lineHeight: 'normal' }}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='button-print'>
                        <Button onClick={handlePrint}>PRINT</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default PrescriptionContentModal