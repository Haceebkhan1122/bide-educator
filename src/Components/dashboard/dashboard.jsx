import React, { useEffect, useState } from 'react'
import BreadcrumbTopCard from '../breadcrumbTopCard/breadcrumbTopCard'
import './dashboard.scss';
import QueueCardSingle from './queueCardSingle/queueCardSingle';
import AvailbleDoctorsCard from './availbleDoctorsCard/AvailbleDoctorsCard';
import { toast } from 'react-toastify';
import WraperLayout from '../wraperLayout/wraperLayout';
import Navbar from '../navbar/Navbar';
import API from '../../utils/httpService';
import Cookies from 'js-cookie';
import PatientDetailsModal from '../dashboardModals/patientDetailsModal/PatientDetailsModal';

const DashboardComp = () => {
    const availableDoctorsHeaders = ["Doctor", "Status", "Patient", "Patients’ Count", "Site"]
    const recentPatientsHeaders = ["MR No.", "Name",  "Number", "Last Visit", "Status", "Action"]

    const [dashboardData, setDashboardData] = useState([]);
    const [availableDoctors, setAvailableDoctor] = useState([])

    const [showPatientDetail, setShowPatientDetail] = useState(false);
    const [selectedPatientIndex, setSelectedPatientIndex] = useState(null);
    const [changeState, setChangeState] = useState(false);
    const [waitingLength, setWaitingLength] = useState(false);

    const [dashboardToast, setDashboardToast] = useState('')


    
    const handlePatientDetailClose = () => setShowPatientDetail(false);
    
    useEffect(() => {
        Cookies.remove('isReturningPatient')
        Cookies.remove('start_assessment_Patient_Id')
        Cookies.remove('start_assessment_Appointment_Id')
        Cookies.remove('patient_id')
        Cookies.remove('patientID') 
        Cookies.remove('selectedPatientId') 
        Cookies.remove('consultationType') 
        setTimeout(() => {
            Cookies.remove('dashboardToast')
            setDashboardToast('')
        }, 3000);
    }, [])

    useEffect(() => {
        if(Cookies.get('dashboardToast')){
            const parsedData = JSON?.parse(Cookies?.get('dashboardToast'))
            setDashboardToast(parsedData)
        }

        setTimeout(() => {
            Cookies.remove('dashboardToast')
            setDashboardToast('')
        }, 3000);
    }, [Cookies.get('dashboardToast')])

    useEffect(() => {
        const callingDashboardList = async () => {
            try {
                const response = await API.get('/dashboard/queue-and-waiting-list')
                setDashboardData(response)
            } catch (error) {
                console.log(error, "error")
            }
        }

        const interval = setInterval(callingDashboardList, 15000);

        return () => {
        clearInterval(interval);
        };
    }, [])


    useEffect(() => {
        const getiingAvailableDoctors = async () => {
            try {
                const response = await API.get('/doctor/listing')
                setAvailableDoctor(response?.data)
                if(response?.status == 404){
                    setWaitingLength(true)
                }
            } catch (error) {
                console.log(error, "error")
            }
        }

        const interval = setInterval(getiingAvailableDoctors, 15000);

        return () => {
        clearInterval(interval);
        };
    }, [])
    
    
    const callingDashboardList = async () => {
        try {
            const response = await API.get('/dashboard/queue-and-waiting-list')
            setDashboardData(response)
        } catch (error) {
            console.log(error, "error")
        }
    }
    
    const handleSelectSinglePatient = (item, index) => {
        if (item) {
            setChangeState(true)
            setSelectedPatientIndex(index);
            Cookies.set('selectedPatientId', item.patient_id);
        } else {
            console.log('No item present');
        }
    }
    
    const getiingAvailableDoctors = async () => {
        try {
            const response = await API.get('/doctor/listing')
            setAvailableDoctor(response?.data)
            if(response?.status == 404){
                setWaitingLength(true)
            }
        } catch (error) {
            console.log(error, "error")
        }
    }

    useEffect(() => {
        callingDashboardList()
        getiingAvailableDoctors()
    }, [])   

    return (
        <>
        <WraperLayout>
            <div className="dashboard">
                {dashboardToast && <div className="toasting-notification">
                    <span> {dashboardToast?.data} </span>
                </div>}
                <div className="wraper">
                    <BreadcrumbTopCard showPatientDetail={showPatientDetail} setShowPatientDetail={setShowPatientDetail} handlePatientDetailClose={handlePatientDetailClose}/>
                    <div className="queueCards">
                        <QueueCardSingle showPatientDetail={showPatientDetail} waitingLength={waitingLength} handlePatientDetailClose={handlePatientDetailClose} availableDoctors={availableDoctors} dashboardData={dashboardData} identity="waiting" heading="Waiting List" btnText="" />
                        <QueueCardSingle showPatientDetail={showPatientDetail}  handlePatientDetailClose={handlePatientDetailClose} callingDashboardList={callingDashboardList} availableDoctors={availableDoctors} dashboardData={dashboardData} identity="doctor" heading=" Doctor Queue" btnText="" />
                        <QueueCardSingle showPatientDetail={showPatientDetail}  handlePatientDetailClose={handlePatientDetailClose} dashboardData={dashboardData} availableDoctors={availableDoctors} identity="educator" heading="Educator Queue " btnText="" />
                    </div>
                    <div className="availbleDoctorsCardWraper">
                        <AvailbleDoctorsCard fromRecent={false} availableDoctors={availableDoctors} heading="Available Doctor" headers={availableDoctorsHeaders} identity="availableDoctor" />
                        <AvailbleDoctorsCard dashboardData={dashboardData} fromRecent={true} heading="Recent Patients" headers={recentPatientsHeaders} identity="recentPatients" />
                    </div>

                    <div>
                    {showPatientDetail &&
                            <PatientDetailsModal selectedPatientIndex={selectedPatientIndex} changeState={changeState} setChangeState={setChangeState} setSelectedPatientIndex={setSelectedPatientIndex} handleSelectSinglePatient={handleSelectSinglePatient} dashboardData={dashboardData} showPatientDetail={showPatientDetail} handlePatientDetailClose={handlePatientDetailClose} />
                    }
                    </div>
                </div>
            </div>
        </WraperLayout>
        </>
    )
}

export default DashboardComp;
