import React, { useRef } from 'react'
import {Modal, Button, Table} from 'react-bootstrap';
import './prescriptionPrintModalProfile.scss';
import moment from 'moment';
import download from '../../../../assets/images/svg/download.svg'
import { useReactToPrint } from 'react-to-print';
import hpf from '../../../../assets/images/svg/HPfLogo.svg'
import ndn from '../../../../assets/images/svg/ndnPre.svg'

function PrescriptionPrintModal({handlePrescriptionDownload, handlePrintClose, printModal,filteredInsuline,filteredMedicine,filteredLabs,followupDate,patientInfo,ethnicites,remarks}) {
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
      });

  return (
    <Modal className='printpresc' show={printModal} onHide={handlePrintClose}>
        <Modal.Body>
            <div style={{padding: '64px 0 35px'}}>
                <div className='download'>
                    <h3 style={{padding: '0 0 0 39px'}}>Prescription</h3>
                    <button onClick={handlePrescriptionDownload} style={{padding: '0 39px 0 0'}}><img  src={download} alt="" /> DOWNLOAD</button>
                </div>
                <div ref={printRef} className="prescrip-broder" style={{position: "relative", padding: "23px 0 0", margin: '15px 39px 0', border: '0.3px solid #313131', borderRadius: '14px'}}>
                    <div className='detail' style={{padding: '0 18px 37px'}}>
                    <h4 style={{fontSize: "22px", fontWeight: '600', marginBottom: '28px', fontFamily: 'Nunito', lineHeight: 'normal', color: '#313131'}}>{patientInfo?.name} - {patientInfo?.mr_no}</h4>
                        <img src={hpf} alt="" style={{width: "72px", height: "59px", position: "absolute", top: "3px", right: "424px"}} />
                        <img src={ndn} alt="" style={{width: "190px", height: "40px", position: "absolute", top: "23px", right: "251px"}} />
                        <img src="/Logo.png" alt="" style={{width: "190px", height: "40px", position: "absolute", top: "23px", right: "71px"}} />
                        <div className='detail-wrap' style={{display: 'flex', alignItems: 'center', gap: '50px'}}>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>Age</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{patientInfo?.age}</p>
                            </div>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>Gender</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{patientInfo?.gender}</p>
                            </div>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>Date Of Birth</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{moment(patientInfo?.date_of_birth).format('MM/DD/YYYY')}</p>
                            </div>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>CNIC</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{patientInfo?.cnic}</p>
                            </div>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>Address</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{patientInfo?.address}</p>
                            </div>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>Ethnicity</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{ethnicites?.map((ethnicity) => {
                                                if(patientInfo?.ethnicity === ethnicity.id){
                                                    return `${ethnicity.name}`;
                                                }
                                                return null;     
                                    })}</p>
                            </div>
                            <div>
                                <h6 style={{fontSize: '16px', fontWeight: '300', color: '#313131', fontFamily: "Circular Std", marginBottom: '8px', lineHeight: 'normal'}}>Follow Up</h6>
                                <p style={{fontSize: '18px', fontWeight: '450', color: '#313131', fontFamily: "Circular Std", lineHeight: 'normal'}}>{followupDate}</p>
                            </div>
                        </div>
                    </div>
                    <Table className='table-wrap' responsive style={{marginBottom: '0'}}>
                        <thead>
                        <tr>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Medicine</th>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Generic</th>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Type</th>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Route</th>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Item Strength</th>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Duration</th>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Frequency</th>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Instructions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}></td>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}></td>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}></td>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}></td>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}></td>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}></td>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}>
                            <div className='gender justify-content-around' style={{justifyContent: 'space-around', display: 'flex', alignItems: 'center'}}><span style={{color: '#078A8E'}}>M</span><span style={{color: '#078A8E'}}>A</span><span style={{color: '#078A8E'}}>E</span><span style={{color: '#078A8E'}}>N</span></div>
                            </td>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}></td>
                        </tr>
                        {filteredMedicine?.map((item) => (
                            <tr>

                            <td style={{padding: '19px 11px 18px', textAlign: 'center', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131'}}>{item?.element_name}</td>
                            <td style={{padding: '19px 11px 18px', textAlign: 'center', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131'}}>{item?.generic}</td>
                            <td style={{padding: '19px 11px 18px', textAlign: 'center', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131'}}>{item?.type}</td>
                            <td style={{padding: '19px 11px 18px', textAlign: 'center', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131'}}>{item?.route}</td>
                            <td style={{padding: '19px 11px 18px', textAlign: 'center', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131'}}>{item?.item_strenght}</td>
                            <td style={{padding: '19px 11px 18px', textAlign: 'center', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131'}}>{item?.duration} Days</td>
                            <td style={{padding: '19px 11px 18px', textAlign: 'center', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131'}}><div className='gender-number' style={{justifyContent: 'space-around', display: 'flex', alignItems: 'center'}}><span style={{color: '#078A8E'}}>1</span><span style={{color: '#078A8E'}}>-</span><span style={{color: '#078A8E'}}>1</span><span style={{color: '#078A8E'}}>-</span></div></td>
                            <td style={{padding: '19px 11px 18px', textAlign: 'center', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131'}}></td>
                        </tr>
                        ))}
                        </tbody>
                    </Table>
                    {filteredInsuline?.length > 0 ? (
                        <Table className='table-wrap' responsive style={{marginBottom: '0'}}>
                        <thead>
                        <tr>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Insulin</th>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Unit</th>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Duration</th>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Frequency</th>
                            <th style={{textAlign: 'center', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Instructions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}></td>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}></td>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}></td>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}><div className='gender justify-content-around' style={{justifyContent: 'space-around', display: 'flex', alignItems: 'center'}}><span style={{color: '#078A8E'}}>M</span><span style={{color: '#078A8E'}}>A</span><span style={{color: '#078A8E'}}>E</span><span style={{color: '#078A8E'}}>N</span></div></td>
                            <td style={{padding: '12px 11px', borderBottom: '1px solid #078A8E'}}></td>
                        </tr>
                        {filteredInsuline?.map((item) => (
                            <tr>
                            <td>{item?.element_name}</td>
                        <td>{item?.unit}</td>
                        <td>{item?.duration} Days</td>
                            <td><div className='gender-number justify-content-around'><span>1</span><span>-</span><span>1</span><span>-</span></div></td>
                            <td>Before Meal</td>
                        </tr>
                        ))}
                        </tbody>
                    </Table>
                    ) : null}
                    {filteredLabs?.length > 0 ? (
                        <Table responsive className='table-lab' style={{marginBottom: '0'}}>
                        <thead>
                            <tr>
                                <th style={{paddingLeft: '32px', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}>Lab Test</th>
                                <th style={{paddingLeft: '32px', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}></th>
                                <th style={{paddingLeft: '32px', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}></th>
                                <th style={{paddingLeft: '32px', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}></th>
                                <th style={{paddingLeft: '32px', border: 'none', backgroundColor: '#F5F5F5', color: '#313131', fontSize: '20px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: 'normal'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLabs?.map((item) => (
                                <tr>
                                <td style={{padding: '19px 11px 18px', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', paddingLeft: '32px'}}>{item?.element_name}</td>
                                <td style={{padding: '19px 11px 18px', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', paddingLeft: '32px'}}></td>
                                <td style={{padding: '19px 11px 18px', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', paddingLeft: '32px'}}></td>
                                <td style={{padding: '19px 11px 18px', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', paddingLeft: '32px'}}></td>
                                <td style={{padding: '19px 11px 18px', fontSize: '18px', fontWeight: '500', fontFamily: "Circular Std", lineHeight: '22.77px', color: '#313131', paddingLeft: '32px'}}></td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    ) : null}  
                    <div className="remarks">
                        <h5 style={{backgroundColor: '#F5F5F5', padding: '11px 0 11px 42px'}}>Remarks</h5>
                        <div>
                            <textarea name="" placeholder={remarks} disabled style={{border: '0.5px solid #313131', padding: '14px 21px', borderRadius: '12px', height: '78px', width: '100%', color: '#313131', fontFamily: "Circular Std", fontSize: '18px', fontStyle: 'normal', fontWeight: '300', lineHeight: 'normal'}}></textarea>
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

export default PrescriptionPrintModal