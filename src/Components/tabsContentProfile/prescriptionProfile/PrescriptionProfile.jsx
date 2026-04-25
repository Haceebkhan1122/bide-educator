import React, { useState, useEffect } from 'react'
import './prescriptionProfile.scss';
import { DatePicker } from 'antd';
import { Table, Button } from 'react-bootstrap';
import PrescriptionPrintModal from './prescriptionPrintModalProfile/PrescriptionPrintModalProfile';
import customCalendar from '../../../assets/images/svg/customCalendar.svg'
import API from '../../../utils/httpService';
import moment from 'moment';

const Prescription = ({ patientID, patientInfo, ethnicites }) => {

  const [printModal, setPrintModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prescription, setPrescription] = useState([]);
  const [filteredMedicine, setFilteredMedicine] = useState([]);
  const [filteredInsuline, setFilteredInsuline] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [date, setDate] = useState();
  const handlePrintClose = () => setPrintModal(false);
  const handlePrintShow = () => setPrintModal(true);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [followupDate, setFollowupDate] = useState('');
  const [isOnchangeOccured, setIsOnchangeOccured] = useState(false);

  const currentDateForDownload = moment().format('YYYY-MM-DD');

  // useEffect(() => {
  //     if(!date && isOnchangeOccured == false){
  //       setDate(currentDateForDownload)
  //      }
  //     }, [date])
  
  useEffect(() => {
    if(patientInfo?.last_visit) {
        // const formattedDate = moment(patientInfo?.last_visit).format('YYYY-DD-MM');
        setAppointmentDate(moment(patientInfo?.last_visit,'DD/MM/YYYY')?.format("YYYY-MM-DD"));
        // setAppointmentDate(patientInfo?.last_visit);
    }
  }, [patientInfo]);
  
  const currentDate = moment().format('YYYY-MM-DD');

  const getPrescription = async () => {
    try {
      const response = await API.get(`consultation/prescriptions?date=${appointmentDate}&patient_id=${patientID}`);
      setPrescription(response?.data?.[0]?.prescribed_elements);
      setFollowupDate(response?.data?.[0]?.follow_up_date);
      setRemarks(response?.data?.[0]?.remarks)
      setLoading(false);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (appointmentDate) {
      getPrescription();
    }
  }, [appointmentDate]);



  const getDatedPrescription = async (date, dateString) => {
    setIsOnchangeOccured(true)
    let formattedDateString = moment(dateString,'DD/MM/YYYY')?.format('YYYY-MM-DD')
    setDate(formattedDateString);
    try {
      const response = await API.get(`consultation/prescriptions?date=${formattedDateString}&patient_id=${patientID}`);
      if(response?.data){
        setPrescription(response?.data?.[0]?.prescribed_elements);
        setRemarks(response?.data?.[0]?.remarks)
        setLoading(false);
      } else if(response?.status == 422){
        setShowToast("No prescription found")
        setTimeout(() => {
          setShowToast(false)
      },2000);
      setPrescription([]);
        setRemarks('')
      }

      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrescriptionDownload = async () => {
    try {
        const response = await API.get(`/consultation/prescriptions?patient_id=${patientID}&date=${date ? date : appointmentDate}&download=true`, {
            responseType: 'blob' 
        });

        const blob = new Blob([response], { type: 'application/pdf' });

        const filename = `Prescription`;
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

  // useEffect(() => {
  //   if (date) {
  //     getPrescription();
  //   }
  // }, [date]);

  const handleDateChange = (date, dateString) => {
    console.log(dateString, "dsa")
    const formattedDate = moment(dateString, 'DD/MM/YYYY', true);
    if (formattedDate.isValid()) {
      setDate(formattedDate.format('YYYY-MM-DD'));
    } else {
      console.log('Invalid date');
    }
  };
  useEffect(() => {
    if (prescription) {
      setFilteredMedicine(prescription?.filter(item => item?.type === 'medicine'))
      setFilteredInsuline(prescription?.filter(item => item?.type === 'insulin'))
      setFilteredLabs(prescription?.filter(item => item?.type === 'lab'))
    }
  }, [prescription])


  return (
    <div className='prescription dietaryAssessment-border'>
       {showToast && <div className="toasting-notification">
                                <span> {showToast} </span>
                            </div>}
      <div className='date'>
        <label htmlFor="">Date</label>
        <div className="date-input">
          <img src={"/assets/images/svg/customCalendar.svg"} alt="" />
          {/* <input type="date" /> */}
          <DatePicker inputReadOnly onChange={getDatedPrescription} placeholder={appointmentDate ? appointmentDate : currentDate} format="DD/MM/YYYY" suffixIcon={<img src={customCalendar} />} />
          <img src="/arrow-bottom.svg" className='arrow' alt="" />
        </div>
      </div>
      <div className="wraperForm ">
        <div className="custom-scrollbar">
          <Table responsive>
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Generic</th>
                <th>Type</th>
                <th>Route</th>
                <th>Item Strength</th>
                <th>Duration</th>
                <th>Frequency</th>
                {/* <th>Instructions</th> */}
              </tr>
            </thead>
            <tbody>
              <tr className='gen'>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><div className='gender'><span>M</span><span>A</span><span>E</span><span>N</span></div></td>
                {/* <td></td> */}
              </tr>
              {filteredMedicine?.map((item) => (
                <tr>
                  <td>{item?.element_name}</td>
                  <td>{item?.generic}</td>
                  <td>{item?.type}</td>
                  <td>{item?.route}</td>
                  <td>{item?.item_strength}</td>
                  <td>{item?.number_of_days}</td>
                  <td><div className='gender-number'><span>{item?.morning ? item?.morning : '-'}</span><span>{item?.afternoon ? item?.afternoon : '-'}</span><span>{item?.evening ? item?.evening : '-'}</span><span>{item?.night ? item?.night : '-'}</span></div></td>

                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
          {filteredInsuline?.length >= 0 ? (
            <Table responsive>
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
                <tr className='gen'>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><div className='gender'><span>M</span><span>A</span><span>E</span><span>N</span></div></td>
                  <td></td>
                </tr>
                {filteredInsuline?.map((item) => (
                  <tr>
                    <td>{item?.element_name}</td>
                    <td>{item?.unit}</td>
                    <td>{item?.number_of_days}</td>
                    <td><div className='gender-number'><span>{item?.morning ? item?.morning : '-'}</span><span>{item?.afternoon ? item?.afternoon : '-'}</span><span>{item?.evening ? item?.evening : '-'}</span><span>{item?.night ? item?.night : '-'}</span></div></td>
                    <td>{item?.is_before_meal == 1 ? 'Before Meal' : item?.is_after_meal == 1 ? 'After Meal' : null}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : null}
          {filteredLabs.length > 0 ? (
            <Table responsive className='table-lab'>
              <thead>
                <tr>
                  <th >Lab test</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  
                </tr>
              </thead>
              <tbody>
                {filteredLabs?.map((item) => (
                  <tr>
                    <td>{item?.element_name}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : null}
          <div className="remarks">
                <h5 style={{backgroundColor: '#F5F5F5', padding: '11px 0 11px 26px'}}>Remarks</h5>
                <div style={{padding: "42px"}}>
                    <textarea name="" placeholder={remarks} disabled style={{backgroundColor:"#fff", border: '0.5px solid #313131', padding: '14px 21px', borderRadius: '12px', height: '78px', width: '100%', color: '#313131', fontFamily: "Circular Std", fontSize: '18px', fontStyle: 'normal', fontWeight: '300', lineHeight: 'normal'}}></textarea>
                </div>
            </div>
        </div>
        <div className='bottom-print'>
          <Button className='btn' onClick={handlePrintShow}>Print</Button>
        </div>
      </div>
      <PrescriptionPrintModal
      handlePrescriptionDownload={handlePrescriptionDownload}
        handlePrintClose={handlePrintClose}
        printModal={printModal}
        filteredInsuline={filteredInsuline}
        filteredMedicine={filteredMedicine}
        filteredLabs={filteredLabs}
        patientInfo={patientInfo}
        ethnicites={ethnicites}
        remarks={remarks}
        followupDate={followupDate}
      />
    </div>
  )
}

export default Prescription