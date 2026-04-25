import React, { useEffect, useState } from 'react';
import './labReportsViewModalProfile.scss';
import { Modal, Accordion, Row, Col } from 'react-bootstrap';
import { DatePicker } from 'antd';
import Cookies from 'js-cookie';
import API from '../../../../utils/httpService';
import moment from 'moment';
import Loader from '../../../customLoader/loader';
import { ConsoleIcon } from 'evergreen-ui';


const LabReportsViewModal = ({ handleViewClose, viewModalShow, setViewModalShow, fetchPatientDetails, setSuccessfullyUpdated, report }) => {

    const [fbs, setFbs] = useState('')
    const [rbs, setRbs] = useState('')
    const [hb1Ac, setHb1Ac] = useState('')
    const [sCr, setScr] = useState('')
    const [MAlb, setMAlb] = useState('')
    const [hUP24, set24hUP] = useState('')
    const [hCCT24, set24hCCT] = useState('')
    const [lipid, setLipid] = useState('')
    const [trigly, setTrigly] = useState('')
    const [lDL, setLDL] = useState('')
    const [hDL, setHDL] = useState('')
    const [cCG, setECG] = useState('')
    const [echo, setEcho] = useState('')
    const [t3, setT3] = useState('')
    const [t4, setT4] = useState('')
    const [xRayChest, setXRayChest] = useState('')
    const [glucose, setGlucose] = useState('')
    const [hBS, setHBS] = useState('')
    const [tsh, setTsh] = useState('')
    const [urineDR, setUrineDR] = useState('')
    const [chol, setChol] = useState('')
    const [eTT, setETT] = useState('')
    const [cDS, setCDS] = useState('')
    const [labName, setLabName] = useState('')
    const [remarks, setRemarks] = useState('')
    const [patient_id, Setpatient_id] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const patientId = Cookies.get('patientID')
        Setpatient_id(patientId)
    }, [])
    //   const handleDateChange = (date, dateString) => {
    //       setSelectedDate(moment(dateString).format('YYYY-MM-DD'));
    //     };

    const handleDateChange = (date, dateString) => {
        const formattedDate = moment(dateString, 'DD/MM/YYYY', true); // Parse the date string using the specified format
        if (formattedDate.isValid()) {
            setSelectedDate(formattedDate.format('YYYY-MM-DD'));
        } else {
            console.log('Invalid date');
        }
    };

    const closeView = () => {
        setViewModalShow(false)
    }
    useEffect(() => {
        setFbs(report?.fbs);
        setRbs(report?.rbs);
        setHb1Ac(report?.hba1c);
        setMAlb(report?.microalbumin);
        setScr(report?.s_creatinine);
        // set24hUP(report?.);
        // set24hCCT(report?.);
        setLipid(report?.total_lipid);
        setTrigly(report?.triglyceride);
        setLDL(report?.ldl);
        setHDL(report?.hdl);
        setECG(report?.ecg);
        setEcho(report?.echo);
        setT3(report?.t3);
        setT4(report?.t4);
        setXRayChest(report?.xray_chest);
        setGlucose(report?.glucose);
        setHBS(report?.hbs);
        setTsh(report?.tsh);
        setUrineDR(report?.urine_dr);
        setChol(report?.cholesterol);
        setETT(report?.ett);
        setCDS(report?.cds);
        setLabName(report?.lab_name);
        setSelectedDate(report?.date);
        setRemarks(report?.remarks);
    }, [report])
    const handleLabReports = async () => {
        setLoading(true)
        const data = {
            patient_id: patient_id,
            fbs: fbs,
            rbs: rbs,
            hba1c: hb1Ac,
            urine_dr: urineDR,
            tfh_cct: hCCT24,
            total_lipid: lipid,
            triglyceride: trigly,
            ldl: lDL,
            hdl: hDL,
            ecg: cCG,
            ett: eTT,
            echo: echo,
            t3: t3,
            t4: t4,
            cds: cDS,
            glucose: glucose,
            hbs: hBS,
            xray_chest: xRayChest,
            remarks: remarks,
            lab_name: labName,
            date: selectedDate,
            tsh: tsh,
            microalbumin: MAlb,
            alb: MAlb,
            hup: hUP24,
            cholesterol: chol,


        }
        try {
            const response = await API.put(`patient/update-lab-report/${patient_id}`, data)
            if (response?.success) {
                fetchPatientDetails()
                setSuccessfullyUpdated(true)
                setViewModalShow(false)
                setLoading(false)
                setTimeout(() => {
                    setSuccessfullyUpdated(false)
                }, 1500);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const currentDate = moment().format('DD/MM/YYYY');

    return (
        <div>
            {loading && <Loader />}
            <Modal
                className='repotViewModal' show={viewModalShow} onHide={handleViewClose}
                centered
            >
                <Modal.Header closeButton className='pb-0'></Modal.Header>
                <Modal.Body>
                    {loading &&
                        <Loader />}
                    <div className="wraperInfo">
                        <h2> LAB REPORTS </h2>
                    </div>
                    <div className="main-wraping">
                        <Row>
                            <Col md={7}>
                                <div className="left">
                                    <div className="top">
                                        <div className="single">
                                            <label htmlFor=""> Date </label>
                                            <DatePicker onChange={handleDateChange} value={moment(selectedDate)} className='dateInp' suffixIcon={null} format="DD/MM/YYYY" />
                                            {/* <input type="date"  /> */}
                                        </div>
                                        <div className="single">
                                            <label htmlFor=""> Lab Name </label>
                                            <input value={labName} onChange={(e) => setLabName(e.target.value)} type="text" className='labInp' placeholder='Enter Lab Name' />
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <div className="singling">
                                            <Row>
                                                <Col md={3}>
                                                    <Accordion className='accordian__singling'>
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> FBS </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={fbs} onChange={(e) => setFbs(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="1">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> M.Alb </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={MAlb} onChange={(e) => setMAlb(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="2">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> Trigly </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={trigly} onChange={(e) => setTrigly(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="3">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> Echo </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={echo} onChange={(e) => setEcho(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="4">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> Glucose </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={glucose} onChange={(e) => setGlucose(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="5">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> Chol </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={chol} onChange={(e) => setChol(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>
                                                <Col md={3}>
                                                    <Accordion className='accordian__singling'>
                                                        <Accordion.Item eventKey="6">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> RBS </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={rbs} onChange={(e) => setRbs(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="7">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> 24h UP </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={hUP24} onChange={(e) => set24hUP(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="8">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> LDL. </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={lDL} onChange={(e) => setLDL(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="9">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> T3 </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={t3} onChange={(e) => setT3(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="10">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> HBS </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={hBS} onChange={(e) => setHBS(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="11">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> ETT </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={eTT} onChange={(e) => setETT(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>
                                                <Col md={3}>
                                                    <Accordion className='accordian__singling'>
                                                        <Accordion.Item eventKey="12">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> Hb1Ac </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={hb1Ac} onChange={(e) => setHb1Ac(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="13">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> 24h CCT </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={hCCT24} onChange={(e) => set24hCCT(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="14">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> HDL. </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={hDL} onChange={(e) => setHDL(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="15">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> T4 </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={t4} onChange={(e) => setT4(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="16">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> X-Ray Chest </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={xRayChest} onChange={(e) => setXRayChest(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="17">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> Urine DR </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={urineDR} onChange={(e) => setUrineDR(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="18">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> CDS </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={cDS} onChange={(e) => setCDS(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>
                                                <Col md={3}>
                                                    <Accordion className='accordian__singling'>
                                                        <Accordion.Item eventKey="19">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> S. Cr. </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={sCr} onChange={(e) => setScr(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="20">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> Lipid </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={lipid} onChange={(e) => setLipid(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="21">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> ECG </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={cCG} onChange={(e) => setECG(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="22">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> TSH </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={tsh} onChange={(e) => setTsh(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="23">
                                                            <Accordion.Header>
                                                                <a className="wraping">
                                                                    <h3> FBS </h3>
                                                                </a>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <input type="number" min={0} className='inputFieldNum' value={fbs} onChange={(e) => setFbs(e.target.value)} />
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="right">
                                    <div className="single">
                                        <label htmlFor=""> Remarks </label>
                                        <textarea onChange={(e) => setRemarks(e.target.value)} value={remarks} name="" id="" placeholder='write' />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btnsWraping">
                        <button onClick={closeView} className='cancelBtn'> CANCEL </button>
                        <div className="btn_wrape">
                            <button onClick={handleLabReports} > SAVE DETAILS </button>
                            <div className="arrow_wrape">
                                <img src='/assets/images/svg/arrowBtn.svg' className="arrow"></img>
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default LabReportsViewModal