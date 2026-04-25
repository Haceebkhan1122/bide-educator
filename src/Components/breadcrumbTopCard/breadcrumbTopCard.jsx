import React, { useState } from 'react'
import './breadcrumbTopCard.scss';
import CreateBookingModal from '../dashboardModals/createBookingModal/CreateBookingModal';

const BreadcrumbTopCard = ({showPatientDetail,setShowPatientDetail,handlePatientDetailClose}) => {
    const [showBookingModal, setShowBookingModal] = useState(false);
    const handleCloseBooking = () => setShowBookingModal(false);
    const handleShowBooking = () => setShowBookingModal(true);

    return (
        <>
            <div className='BreadcrumbTopCard'>
                <h3> Queue  </h3>
                <button onClick={handleShowBooking}> CREATE BOOKING </button>
            </div>
            <CreateBookingModal showPatientDetail={showPatientDetail} setShowPatientDetail={setShowPatientDetail} handlePatientDetailClose={handlePatientDetailClose} showBookingModal={showBookingModal} handleCloseBooking={handleCloseBooking} />
        </>
    )
}

export default BreadcrumbTopCard;
